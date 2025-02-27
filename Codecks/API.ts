﻿import {Form} from "../Form";
import {BugReportSchema} from "../ReportTypes/BugReport";
import {CodecksRequest, REPORT_TOKEN, TEAM_DOMAIN, USER_ID, USER_TOKEN} from "./Form";

export async function CreateCard(form: Form, fileName: string) {
    const result = BugReportSchema.safeParse(form.formData)

    let content: string = "";

    if (result.success) {
        content = `${result.data.Description}\n\n` +
            `Reported by: ${result.data.Username}\n` +
            `${result.data.CanContact ? `Contact info: ${result.data.ContactInformation}` : ``}\n\n`
    }

    content += `Report created on: ${form.date}\n` +
        `Filename: ${fileName}`

    const Request = new CodecksRequest();
    Request.content = content

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