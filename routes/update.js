const express = require("express");
const { getUser, updateUser } = require("../mysql/queries");
const router = express.Router();
const sha256 = require("sha256");

router.put("/", async (req, res) => {
  const { body } = req;
  let { name, email, password } = req.body;

  let updateArray = [];
  if (name) {
    updateArray.push({ name });
  }
  if (email) {
    updateArray.push({ email });
  }
  if (password) {
    password = sha256(process.env.SALT + password);
    updateArray.push({ password });
  }

  const results =
    updateArray.length > 0 &&
    (await req.asyncMySQL(updateUser(req.headers.token, updateArray)));

  if (!results) {
    res.send({ status: 0, error: "No data to update" });
    return;
  }
  res.send({ status: 1 });
});

module.exports = router;
