import path from "path";
import fs from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import App from "../src/App.jsx";

const PORT = process.env.PORT || 3000;
const app = express();

async function fetchTodos() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
}

app.get("/", async (req, res) => {
  const todos = await fetchTodos();

  fs.readFile(path.resolve("./index.html"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("An error occurred");
    }

    const appHtml = ReactDOMServer.renderToStaticMarkup(<App todos={todos} />);

    const html = data.replace(
      '<div id="root"></div>',
      `<div id="root">${appHtml}</div>`
    );

    res.send(html);
  });
});

app.use(
  express.static(path.resolve(__dirname, "..", "build"), { maxAge: "30d" })
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});