import { z } from "zod"
import dotenv from "dotenv"

dotenv.config({path: "Codecks.env"})
export const REPORT_TOKEN = process.env.REPORT_TOKEN
export const USER_TOKEN = process.env.USER_TOKEN
export const USER_ID = process.env.USER_ID
export const TEAM_DOMAIN = process.env.TEAM_DOMAIN

export class CodecksRequest {
    content: string = "Lorem ipsum"
    severity?: "critical" | "high" | "low" | "none"
    fileNames?: string[]
    userEmail?: string
    ToJsonString(): string {
        return JSON.stringify(this)
    }
}

const CodecksUploadUrlSchema = z.object({
    fileName: z.string(),
    url: z.string(),
    fields: z.object({
        key1: z.string(),
        key2: z.string()
    })
})

export const CodecksResponseSchema = z.object({
    ok: z.boolean(),
    cardId: z.string(),
    uploadUrls: z.array(CodecksUploadUrlSchema)
})

export type CodecksResponse = z.infer<typeof CodecksResponseSchema>