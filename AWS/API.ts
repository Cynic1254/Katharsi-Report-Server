import FormData from "form-data"

export function UploadFile(url: string, fields: Record<string, string>, jsonContents: object, fileName: string) {
    const formData = new FormData();

    formData.append("Content-Type", "application/json")

    Object.entries(fields).forEach(([key, value]) => formData.append(key, value))

    formData.append("file", JSON.stringify(jsonContents), {
        filename: fileName,
        contentType: "application/json"
    });

    formData.submit(url, function (error, response) {
        // @ts-ignore safe to ignore since the absence of a status code should also be an error
        if (response.statusCode < 400) {
            console.log(`upload succeeded with code ${response.statusCode} - ${response.statusMessage}`)
            return;
        }

        console.log(`upload attempt to ${url} failed with status code: ${response.statusCode}`)

        if (error) {
            console.error(error)
        }
    })
}