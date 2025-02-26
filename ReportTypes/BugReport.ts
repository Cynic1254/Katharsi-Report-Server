import {z} from "zod";

export const BugReportSchema = z.object({
    Username: z.string(),
    CanContact: z.boolean(),
    ContactInformation: z.string(),
    Description: z.string()
})

export type BugReport = z.infer<typeof BugReportSchema>