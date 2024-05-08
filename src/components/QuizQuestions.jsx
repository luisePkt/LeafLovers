import React, { useState } from "react";

const QuizQuestions = () => {
  // show current question:
  const [currQuestion, setCurrQuestion] = useState(0);
  // show result:
  const [showResult, setShowResult] = useState(false);
  // save answer criteria:
  const [answerCriteria, setAnswerCriteria] = useState([]);

  // source questions:
  const quizQuestions = [
    {
      id: 0,
      questionText: "Which statement applies most to you?",
      answerChoices: [
        {
          answerText:
            "I don't want to look after the plant for more than a year.",
          criteria: "annual",
        },
        {
          answerText:
            "I only want to look after the plant for one year, but I want it to flower twice in that time.",
          criteria: "biannual",
        },
        {
          answerText:
            "I can be there for the plant for more than a year. But I wouldn't want it for longer than two years.",
          criteria: "biennial",
        },
        {
          answerText:
            "I would like a plant that is perennial and will hopefully be with me for a very long time.",
          criteria: "perennial",
        },
      ],
    },
    {
      id: 1,
      questionText: "I would like to...",
      answerChoices: [
        {
          answerText: "...  take care of a plant often.",
          criteria: "frequent",
        },
        {
          answerText: "...  take care of a plant regularly.",
          criteria: "average",
        },
        {
          answerText: "... take care of a plant as little as possible.",
          criteria: "minimum",
        },
        {
          answerText: "...  actually not take care of a plant at all.",
          criteria: "none",
        },
      ],
    },
    {
      id: 2,
      questionText: "I have no problem with poisonous plants.",
      answerChoices: [
        { answerText: "I agree with that.", criteria: true },
        { answerText: "I do not agree with that", criteria: false },
      ],
    },
    {
      id: 3,
      questionText: "I would have room for one plant on a...",
      answerChoices: [
        {
          answerText: "... very shady place.",
          criteria: "full_shade",
        },
        {
          answerText: "... semi-shady place.",
          criteria: "part_shade",
        },
        {
          answerText: "... sunny place with partial shade.",
          criteria: "sun-part_shade",
        },
        {
          answerText: "... very sunny place.",
          criteria: "full_sun",
        },
      ],
    },
    {
      id: 4,
      questionText: "I would like to eat parts of the plant or its fruit.",
      answerChoices: [
        {
          answerText: "Yes!",
          criteria: true,
        },
        {
          answerText: "I dont't care!",
          criteria: false,
        },
      ],
    },
  ];

  // handle questions/answers:
  const handleQuestion = (answerIndex) => {
    // eröht index um 1
    const nextQuestion = currQuestion + 1;

    if (nextQuestion < quizQuestions.length) {
      // setzt eröht value als neuen index
      setCurrQuestion(nextQuestion);
      setAnswerCriteria((prevCriteria) => [
        ...prevCriteria,
        quizQuestions[currQuestion].answerChoices[answerIndex].criteria,
        // gibt konkretes criteria aus:
        // quizQuestions[1].answerChoice[1].criteria,
      ]);
    } else {
      setShowResult(true);
    }

    // setCurrQuestion(nextQuestion);
  };

  //   console.log(answerCriteria);

  return (
    <div>
      {/* questions: */}
      <p>{quizQuestions[currQuestion].questionText}</p>

      {/* answers: */}
      {quizQuestions[currQuestion].answerChoices.map((answerChoice, index) => (
        // NOTICE wie komme ich an id?
        <button key={index} onClick={() => handleQuestion(index)}>
          {answerChoice.answerText}
        </button>
      ))}

      {/* show result */}
      {showResult && (
        <div>
          <ul>
            {answerCriteria.map((criteria, index) => (
              <li key={index}>{criteria.toString()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuizQuestions;
