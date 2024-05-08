import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlantsContext } from "../utils/PlantsProvider";

const QuizQuestions = () => {
  // connection provider to save answer criteria:
  const { resultMatching, setResultMatching} = usePlantsContext();
 
  
  // show current question:
  const [currQuestion, setCurrQuestion] = useState(0);
  // show result:
  const [showResult, setShowResult] = useState(false);
  // save answer criteria:
  // const [answerCriteria, setAnswerCriteria] = useState([]);
  // redirect to results page:
  const navigate = useNavigate();

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
      setResultMatching((prevCriteria) => [
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

  // redirect to results page with button:
  // const handleRedirection = () => {
  //   navigate("/result");
  // };

  // redirect to results page automatically:
  useEffect(() => {
    if (showResult) {
      navigate("/result", {
        resultMatching: "resultMatching",
      });
    }
  }, [showResult, navigate]);
  // [showResult, navigate] => navigate hier wichtig, damit immer aktuellste Version von navigate-function verwendet wird

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

      {/* show result on same page*/}
      {/* {showResult && (
        <div>
          <ul>
            {answerCriteria.map((criteria, index) => (
              // NOTICE: besster abfrage nach art der daten und dann, wenn boolen toString()?
              <li key={index}>{criteria.toString()}</li>
            ))}
          </ul>
        </div>
      )} */}

      {/* Umleitung mit button */}
      {/* {showResult && <button onClick={handleRedirection}>show result</button>} */}
    </div>
  );
};

export default QuizQuestions;
