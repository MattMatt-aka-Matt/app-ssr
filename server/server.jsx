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
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchTodos:', error);
    throw error;
  }
}

app.get("/", async (req, res) => {
  try {
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
  } catch (error) {
    console.error('Error in route:', error);
    res.status(500).send("Error loading todos");
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});