import React, { useState, useEffect } from "react";
import Questions from "./component/Questions";
import { nanoid } from "nanoid";

function App() {
  const [allData, setAllData] = useState([]);
  const [formatedData, setformatedData] = useState([]);
  const [finalScore, setFinalScore] = useState(0);
  const [finish, setFinish] = useState(false);
  const [correctAnswers, setcorrectAnswers] = useState([]);
  const [category, setCategory] = useState("");

  function pullData() {
    fetch(
      `https://opentdb.com/api.php?amount=5&type=multiple&category=${category}`
    )
      .then((res) => res.json())
      .then((data) => setAllData(data.results));
  }

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
  const questionList = formatedData.map((item) => {
    return (
      <Questions
        question={item.question}
        key={nanoid()}
        answers={item.answers}
        selectAnswer={selectAnswer}
        isFinished={finish}
      />
    );
  });

  return (
    <div className="App">
      <div className="topCorner"></div>
      <div className="container">
        <label htmlFor="categorySelect" className="selectLabel">Select your favorite category</label>
        <select
          value={category}
          onChange={handleChange}
          className="select"
          id="categorySelect"
        >
          <option value="">Any Category</option>
          <option value="9">General Knowledge</option>
          <option value="10">Books</option>
          <option value="11">Films</option>
          <option value="12">Music</option>
          <option value="13">Musicals & Theatres</option>
          <option value="14">Television</option>
          <option value="15">Video Games</option>
          <option value="16">Board Games</option>
          <option value="17">Science & Nature</option>
          <option value="18">Computers</option>
          <option value="19">Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
        </select>

        {questionList}
        <div className="scoreSection">
          {finish && <p>You scored {finalScore}/5 correct answers</p>}
          <button className="sbtn" onClick={checkAnswers}>
            {finish ? "Play again" : "Check answers"}
          </button>
        </div>
      </div>
      <div className="bottomCorner"></div>
    </div>
  );
}

export default App;
