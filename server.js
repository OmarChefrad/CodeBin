const express = require("express")
const app = express()
const port = 3000

app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", (req, res) => {
  const code = `# codeBin
  
Sharing code is a good thing, and it should be _really_ easy to do it.
A lot of times, I want to show you something I'm seeing - and that's where we
use pastebins.

codeBin is the prettiest, easiest to use pastebin ever made.

## Basic Usage

Type what you want me to see, click "Save", and then copy the URL. Send that
URL to someone and they'll see what you see.`
  res.render("index", { code })
})

app.get("/new", (req, res) => {
  res.render("new")
})

app.listen(port, () => console.log(`listening on port ${port}...`))
