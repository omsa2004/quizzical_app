import React from "react";
import Questions from "./Questions";
import { nanoid } from "nanoid";

export default function Mainpage(props){
    const {newGame, category, handleChange, finish, finalScore, checkAnswers, formatedData, selectAnswer} = props

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

    return(
        !newGame && (
            <div>
              {" "}
              <label htmlFor="categorySelect" className="selectLabel">
                Select your favorite category
              </label>
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
              </div>{" "}
            </div>
          )
    )
}