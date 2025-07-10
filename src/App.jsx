import React from "react";

function App({ todos = [] }) {
  return (
    <div>
      <h1>Liste des Tâches</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.completed ? 'Terminée' : 'En cours'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;