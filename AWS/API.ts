import FormData from "form-data"
import {TEAM_DOMAIN, USER_TOKEN} from "../Codecks/Form";

export function UploadFile(url: string, fields: Record<string, string>, jsonContents: object, fileName: string) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(fields)) {
        formData.append(key, value)
    }

    formData.append("file", JSON.stringify(jsonContents, null, 2), {
        filename: fileName,
        contentType: "application/json"
    });

    formData.getHeaders({
        "X-Auth-Token": `${USER_TOKEN}`,
        "X-Account": `${TEAM_DOMAIN}`
    })

    // @ts-ignore
    formData.submit("https://s3.eu-central-1.amazonaws.com/uploads-codecks", function (error, response) {
        console.log(`upload attempt to https://s3.eu-central-1.amazonaws.com/uploads-codecks completed`)
        console.log(response.statusCode)

        if (error) {
            console.log(error.message)
        }
    })
}