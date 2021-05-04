const util = require("util");

const express = require("express");
const app = express();
const port = 3000;

const mysql = require("mysql");
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const connection = mysql.createConnection(config);
const query = util.promisify(connection.query).bind(connection);

const Fakerator = require("fakerator");
const fakerator = Fakerator();

function to_table(arr, header) {
  let result = "<table>";

  if (header) {
    result += "<thead>";

    header.forEach((obj) => {
      result += `<th>${obj}</th>`;
    });

    result += "</thead>";
  }

  result += "<tbody>";
  arr.forEach((obj) => {
    result += "<tr>";
    for (data in obj) {
      result += `<td>${obj[data]}</td>`;
    }
    result += "</tr>";
  });
  result += "</tbody>";

  result += "</table>";

  return result;
}

app.get("/", async (req, res) => {
  let response_page = "<h1>Full Cycle Rocks!</h1><br>";
  const name = fakerator.names.firstName();
  const sql_insert = `INSERT INTO people(name) values('${name}');`;
  await connection.query(sql_insert);
  await connection.commit();
  const sql_select = "SELECT * FROM people;";
  const rows = await query(sql_select);
  response_page += `<p>Nomes cadastrados</p><br>${to_table(rows, [
    "ID",
    "Nome",
  ])}`;

  res.send(response_page);
});

const server = app.listen(port);
process.on("SIGINT", () => {
  server.close();
  connection.end();
});
