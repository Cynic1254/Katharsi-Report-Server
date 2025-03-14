﻿import express from "express"
import {FormSchema} from "./Form";
import * as fs from "node:fs";
import path from "node:path";
import {CreateCard, CreateComment} from "./Codecks/API";

const app = express();
const port = 19100;

app.use(express.json())

// Function to generate a unique filename based on IP and Date
function generateFilename(req: express.Request): string {
    // @ts-ignore
    const ip = req.ip.replace(/[:.]/g, "-"); // Replace colons & dots (IPv6 & IPv4 safe)
    const timestamp = new Date().toISOString().replace(/:/g, "-"); // Ensure a safe filename
    return `form_${ip}_${timestamp}.json`;
}

app.post("/api/feedback", (req, res) => {
    if (!req.is("application/json")) {
        res.status(400).json({error: "Expected JSON body"})
        return
    }

    console.log("Handling request from: " + req.ip)

    const result = FormSchema.safeParse(req.body)

    if (!result.success) {
        console.log(result.error.format())
        res.status(400).json({error: result.error.format()})
        return;
    }

    const fileName = generateFilename(req)
    const filePath = "./reports/" + fileName

    //data is valid enough, safe it
    fs.mkdirSync(path.dirname(filePath), {recursive: true});
    fs.writeFile(filePath, JSON.stringify(result.data, null, 2), (err) => {
        if (err) {
            console.error("Error saving JSON:", err);
            return res.status(500).json({error: "Failed to save file"});
        }

        console.log("Form saved successfully locally as: " + filePath)
        res.json({message: "Form saved successfully", file: filePath});
    })

    CreateCard(result.data, fileName).then((value) => {
        CreateComment(value, JSON.stringify(result.data, null, 2)).then(() => {
            console.log(`Successfully created card with ID: ${value}`)
        })
    })
})

app.listen(port, () => {
    console.log("Startup_Complete")
})