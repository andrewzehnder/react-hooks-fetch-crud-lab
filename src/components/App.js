import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then ((r) => r.json())
    .then ((questions) => setQuestions(questions))
  }, []);

  function handleAdd(newItem) {
    setQuestions([...questions, newItem])
  }

  function handleDelete(deletedQuestion) {
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id);
    setQuestions(updatedQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" 
      ? 
      <QuestionForm onAddItem={handleAdd} /> 
      : 
      <QuestionList questions={ questions } onDeletedItem={handleDelete} />}
    </main>
  );
}

export default App;
