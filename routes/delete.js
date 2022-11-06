const express = require("express");
const { deleteUser } = require("../mysql/queries");
const router = express.Router();
const { getUser, updateUser } = require("../mysql/queries");

router.delete("/", async (req, res) => {
  const results = await req.asyncMySQL(deleteUser(req.headers.token));

  if (results.affectedRows === 0) {
    res.send({ status: 0, error: "Delete failed" });
    return;
  }
  res.send({ status: 1 });
});

module.exports = router;
