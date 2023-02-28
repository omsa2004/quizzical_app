import React from "react";

export default function Questions(props) {
  const { question, answers, selectAnswer, isFinished } = props;
  answers.sort((a, b) =>
    a.answer > b.answer ? 1 : b.answer > a.answer ? -1 : 0
  );
  const allanswers = answers.map((item) => {
    let styles = {
      backgroundColor: item.isSelected
        ? isFinished
          ? item.isCorrect
            ? "#94D7A2"
            : "#F8BCBC"
          : "#D6DBF5"
        : "white",
    };

    return (
      <span
        className="answers"
        dangerouslySetInnerHTML={{ __html: item.answer }}
        style={styles}
        disabled={isFinished}
        onClick={() => selectAnswer(item.id)}
      />
    );
  });
  return (
    <div className="qSection">
      <h3
        className="question"
        dangerouslySetInnerHTML={{ __html: question }}
      ></h3>
      <div className="aSection" disabled={true}>
        {allanswers}
      </div>
    </div>
  );
}
