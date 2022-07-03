const express = require("express")
const app = express()
const port = 3000
const mongoose = require("mongoose")

const Document = require("./models/Document.js")

//ejs render
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  const code = `# codeBin
  
Sharing code is a good thing, and it should be _really_ easy to do it.
A lot of times, I want to show you something I'm seeing - and that's where we
use pastebins.

codeBin is the prettiest, easiest to use pastebin ever made.

## Basic Usage

Type what you want me to see, click "Save", and then copy the URL. Send that
URL to someone and they'll see what you see.`
  res.render("index", { code, language: "plaintext" })
})
const dasdsadsa =
  "mongodb+srv://Umar19:mlc2adrkE6fL2hkI@cluster0.hnvak.mongodb.net/?retryWrites=true&w=majority"

//no sql database connection
//mlc2adrkE6fL2hkI
mongoose
  .connect(dasdsadsa)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err))
  
app.get("/new", (req, res) => {
  res.render("new")
})

app.post("/save", async (req, res) => {
  const value = req.body.value
  try {
    const document = await Document.create({ value })
    res.redirect(`/${document.id}`)
  } catch (e) {
    res.render("new", { value })
  }
})

app.get(`/:id`, async (req, res) => {
  const id = req.params.id
  try {
    const document = await Document.findById(id)
    res.render("index", { code: document.value })
  } catch (e) {
    res.redirect("/")
  }
})

app.listen(process.env.PORT || 5000)
