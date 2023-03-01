import React from "react";

export default function Questions(props) {
  const { question, answers, selectAnswer, isFinished } = props;

  answers.sort((a, b) =>
    a.answer > b.answer ? 1 : b.answer > a.answer ? -1 : 0
  );
  const allanswers = answers.map((item) => {
    let styles = {backgroundColor:""}     
      if(isFinished){
          if(item.isSelected){
            if (item.isCorrect) {
               styles.backgroundColor = "#94D7A2"
            } else styles.backgroundColor = "#F8BCBC"
          } else if (item.isCorrect) {
            styles.backgroundColor = "#94D7A2"
          } else styles.backgroundColor = "white"
        }
        else {
          item.isSelected ? styles.backgroundColor = "#D6DBF5" : styles.backgroundColor= "white"
        }

    return (
      <span
        key={item.id}
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
