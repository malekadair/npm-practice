const express = require("express");
const path = require("path");
const members = require("./Members");

app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json(members);
});
app.get("/sort/:sortBy", (req, res) => {
  if (req.params.sortBy === "rating") {
    members.sort((a, b) => (a.Rating > b.Rating ? -1 : 1));
    res.json(members);
  } else if (req.params.sortBy === "app") {
    members.sort((a, b) => (a.App > b.App ? 1 : -1));
    res.json(members);
  } else {
    res.send("Must provide either rating or app");
  }
});
app.get("/genre/:genreName", (req, res) => {
  let result = members.filter(a => a.Genres === req.params.genreName);
  if (result.length === 0) {
    res.status(400).send("must enter valid genre");
  } else {
    res.status(200).json(result);
  }
});

app.all("*", (req, res) => {
  res.status(404).send("page not found");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
