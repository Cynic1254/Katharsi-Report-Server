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

    formData.submit(url, function (error, response) {
        console.log(response.statusMessage)

        if (error) {
            console.log(error.message)
        }
    })
}