import {Form} from "../Form";
import {BugReportSchema} from "../ReportTypes/BugReport";
import {CodecksRequest, REPORT_TOKEN, TEAM_DOMAIN, USER_ID, USER_TOKEN} from "./Form";
import {UploadFile} from "../AWS/API";

export async function CreateCard(form: Form, fileName: string) {
    const result = BugReportSchema.safeParse(form.formData)

    let content: string = "";

    if (result.success) {
        content = `${result.data.Description}\n\n` +
            `Reported by: ${result.data.Username}\n` +
            `${result.data.CanContact ? `Contact info: ${result.data.ContactInformation}` : ``}\n\n`
    }

    content += `Report created on: ${form.date}\n` +
        `Filename: [${fileName}](${fileName})`

    const Request = new CodecksRequest();
    Request.content = content
    Request.fileNames = [fileName]

    return new Promise<string>((resolve, reject) => {
        fetch(`https://api.codecks.io/user-report/v1/create-report?token=${REPORT_TOKEN}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: Request.ToJsonString()
        }).then(async (response) => {
            if (response.status != 200) {
                reject("Request denied")
                return
            }

            const data = await response.json()

            console.log(JSON.stringify(data, null, 2))

            for (const uploadUrlsKey of data.uploadUrls) {
                if (uploadUrlsKey.fileName != fileName) {
                    console.log(`File ${uploadUrlsKey.fileName} is not ${fileName}`)
                    continue
                }

                console.log(`uploading: ${uploadUrlsKey.fileName}`)

                if (result.data)
                    UploadFile(uploadUrlsKey.url, uploadUrlsKey.fields, result.data, fileName)
                else {
                    reject("No valid data to upload")
                    return
                }
            }

            resolve(data.cardId)
        }).catch((err) => {
            reject(err)
        })
    })
}

export async function CreateComment(cardId: string, content: string) {
    return new Promise<string>((resolve, reject) => {
        fetch(`https://api.codecks.io/dispatch/resolvables/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": `${USER_TOKEN}`,
                "X-Account": `${TEAM_DOMAIN}`
            },
            body: JSON.stringify({
                cardId: cardId,
                content: content,
                context: "comment",
                userId: USER_ID
            })
        }).then(async (res) => {
            if (res.status != 200) {
                reject("Request denied")
                return
            }

            const data = await res.json()
            resolve(data.payload.id)
        }).catch((err) => {
            reject(err)
        });
    });
}