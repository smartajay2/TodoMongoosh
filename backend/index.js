const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
app.use(cors())

app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/todo")
  .then(() => console.log("db success"))
  .catch(err => console.error("DB failed", err));

const Fruit = mongoose.model("fruit", { name: String }, "fruit")



app.get("/fruitlist", function (req, res) {
  Fruit.find().then(function (retdata) {
    console.log(retdata)
    res.send(retdata)
  })
})


app.post("/addfruit", function (req, res) {
  var newfruit = req.body.newfruit
  const newFruit = new Fruit(
    {
      name: newfruit
    }
  );
  newFruit.save().then(function () {
    console.log("Saved Successfully")
  })
})

app.delete("/deletefruit/:id", (req, res) => {
  const fruitId = req.params.id;
  Fruit.findByIdAndDelete(fruitId)
    .then(() => {
      console.log("Fruit deleted successfully");
      res.send("Fruit deleted successfully");
    })
    .catch(err => {
      console.error("Error deleting fruit:", err);
      res.status(500).send("Internal Server Error");
    });
});

app.listen(5000, function () {
  console.log("server started...")
})