import express from "express"

const app = express();
const port = 19100;

app.use(express.json())

app.post("/api/feedback", (req, res) => {
    console.log(req.body)
})

app.listen(port, () => {
    console.log("Startup_Complete")
})