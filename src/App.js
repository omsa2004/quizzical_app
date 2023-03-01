import React, { useState, useEffect } from "react";
import Mainpage from "./component/Mainpage";
import { nanoid } from "nanoid";
import Startpage from "./component/Startpage";

function App() {
  const [newGame, setNewGame] = useState(true);
  const [allData, setAllData] = useState([]);
  const [formatedData, setformatedData] = useState([]);
  const [finalScore, setFinalScore] = useState(0);
  const [finish, setFinish] = useState(false);
  const [correctAnswers, setcorrectAnswers] = useState([]);
  const [category, setCategory] = useState("");

  function pullData() {
    if (!newGame) {
      fetch(
        `https://opentdb.com/api.php?amount=5&type=multiple&category=${category}`
      )
        .then((res) => res.json())
        .then((data) => setAllData(data.results));
    }
  }

  useEffect(() => {
    pullData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newGame]);

  useEffect(() => {
    const correct = [];
    const arr = [];
    allData.map((item, i) => {
      correct.push(item.correct_answer);
      const obj = {
        id: i + 1,
        question: item.question,
        answers: [
          ...item.incorrect_answers.map((i) => ({
            answer: i,
            id: nanoid(),
            isSelected: false,
            isCorrect: false,
          })),
          {
            answer: item.correct_answer,
            id: nanoid(),
            isSelected: false,
            isCorrect: true,
          },
        ],
      };
      return arr.push(obj);
    });
    setformatedData(arr);
    setcorrectAnswers(correct);
  }, [allData]);

  useEffect(() => {
    pullData();
    setFinish(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  function selectAnswer(id) {
    
    const prevData = formatedData;
    const newData = prevData.map((question) => {
      return {
        ...question,
        answers: question.answers.map((answer) =>
          answer.id === id
            ? { ...answer, isSelected: !answer.isSelected }
            : answer
        ),
      };
    });

    setformatedData(newData);
  }

  function checkAnswers() {
    if (!finish) {
      const selectedAnswers = [];
      let score = 0;
      formatedData.map((question) =>
        question.answers.map((item) =>
          item.isSelected ? selectedAnswers.push(item.answer) : ""
        )
      );

      correctAnswers.map((item) =>
        selectedAnswers.includes(item) ? score++ : score
      );
      setFinalScore(score);
      setFinish(true);
    } else {
      pullData();
      setFinish(false);
    }
  }

  function handleChange(event) {
    setCategory(event.target.value);
  }
  function newgamehandle() {
    setNewGame(false);
  }
  

  return (
    <div className="App">
      <div className="topCorner"></div>
      <div className="container">
        <Startpage
          key={nanoid()}
          newGame={newGame}
          newgamehandle={newgamehandle}
        />
        <Mainpage
          key={nanoid()}
          newGame={newGame}
          category={category}
          handleChange={handleChange}
          finish={finish}
          finalScore={finalScore}
          checkAnswers={checkAnswers}
          formatedData = {formatedData}
          selectAnswer = {selectAnswer}
        />
      </div>
      <div className="bottomCorner"></div>
    </div>
  );
}

export default App;
