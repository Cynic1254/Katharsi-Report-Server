import FormData from "form-data"

export function UploadFile(url: string, fields: Record<string, string>, jsonContents: object, fileName: string) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(fields)) {
        formData.append(key, value)
    }

    formData.append("file", JSON.stringify(jsonContents, null, 2), {
        filename: fileName,
        contentType: "application/json"
    });

    console.log(`headers: ${JSON.stringify(formData.getHeaders(), null, 2)}`)
    console.log(`Data:`)
    console.log(JSON.stringify(formData))

    formData.submit(url, function (error, response) {
        console.log(`upload attempt to ${JSON.stringify(response.headers, null, 2)} completed`)
        console.log(response.statusCode)

        if (error) {
            console.log(error.message)
        }
    })
}