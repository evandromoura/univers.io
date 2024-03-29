const fs = require("fs");
const path = require('path');
const express = require('express');
const app = express();
const port = 8082;

app.use(express.static('./'));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});