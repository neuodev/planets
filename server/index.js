const express = require("express");
const colors = require("colors");
const cors = require("cors");
const fs = require("fs");
const { text2, text1, text3 } = require("./templet");
const app = express();
app.use(express.json());
app.use(cors());

app.post("/screenshot", (req, res) => {
  if (!req.body.plants) {
    res.status(400).json({ error: "No info provided" });
    return;
  }

  if (!fs.existsSync("../client/public/media")) {
    fs.mkdirSync("../client/public/media");
  }
  let plantsHTML = "";
  let fileName = "";
  for (let planet of req.body.plants) {
    plantsHTML += text2(planet.image, planet.name);
    fileName += planet.name + " - ";
  }
  fs.writeFileSync(
    `../client/public/media/${fileName}.html`,
    text1(fileName) + plantsHTML + text3
  );
  res.status(200).json({ filePath: `media/${fileName}.html` });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`App run on port ${PORT}`.bgGreen));
