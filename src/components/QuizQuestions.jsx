import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlantsContext } from "../utils/PlantsProvider";
import style from "../styles/quizQuestions.module.css";

const QuizQuestions = () => {
  // connection provider to save answer criteria:
  const { resultMatching, setResultMatching } = usePlantsContext([]);
  // show current question:
  const [currQuestion, setCurrQuestion] = useState(0);
  // show result:
  const [showResult, setShowResult] = useState(false);
  // redirect to results page:
  const navigate = useNavigate();
  // für balkendarstellung Fortschritt:
  const [progress, setProgress] = useState(60);

  // source questions:
  const quizQuestions = [
    {
      id: 0,
      questionText: "Which statement applies most to you?",
      // criteriaName: "cycle",
      answerChoices: [
        {
          answerText:
            "I don't want to look after the plant for more than a year.",
          criteria: "Annual",
        },
        {
          answerText:
            "I only want to look after the plant for one year, but I want it to flower twice in that time.",
          criteria: ["Annual", "Biannual"],
        },
        {
          answerText:
            "I can be there for the plant for more than a year. But I wouldn't want it for longer than two years.",
          criteria: ["Annual", "Biennial"],
        },
        {
          answerText:
            "I would like a plant that is perennial and will hopefully be with me for a very long time.",
          criteria: "Perennial",
        },
      ],
    },
    {
      id: 1,
      questionText: "I would like to...",
      // criteriaName: "watering",
      answerChoices: [
        {
          answerText: "...  take care of a plant often.",
          criteria: ["Frequent", "Average"],
        },
        {
          answerText: "...  take care of a plant regularly.",
          criteria: ["Average", "Minimum"],
        },
        {
          answerText: "... take care of a plant as little as possible.",
          criteria: ["Minimum", "None"],
        },
        {
          answerText: "...  actually not take care of a plant at all.",
          criteria: "None",
        },
      ],
    },
    {
      id: 2,
      questionText: "I have no problem with poisonous plants.",
      // criteriaName: "poisonous",
      answerChoices: [
        { answerText: "I agree with that.", criteria: true },
        { answerText: "I do not agree with that", criteria: false },
      ],
    },
    {
      id: 3,
      questionText: "I would have room for one plant on a...",
      // criteriaName: "sunlight",
      answerChoices: [
        {
          answerText: "... very shady place.",
          criteria: ["full shade", " part shade"],
        },
        {
          answerText: "... semi-shady place.",
          criteria: ["full sun", " part shade", "part sun/part shade"],
        },
        {
          answerText: "... sunny place with partial shade.",
          criteria: ["full sun", " part shade", "part sun/part shade"],
        },
        {
          answerText: "... very sunny place.",
          criteria: ["full sun", "part sun/part shade"],
        },
      ],
    },
    {
      id: 4,
      questionText: "I would like to eat parts of the plant or its fruit.",
      // criteriaName: "edible",
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
    setProgress((val) => val + 60);
 
    if (nextQuestion < quizQuestions.length) {
      // eröht value als neuen index
      setCurrQuestion(nextQuestion);
      setResultMatching((prevCriteria) => [
        ...prevCriteria,
        quizQuestions[currQuestion].answerChoices[
          answerIndex
        ].criteria.toString(),
        // `${quizQuestions[currQuestion].criteriaName} : ${quizQuestions[currQuestion].answerChoices[answerIndex].criteria}`,

        // gibt konkretes criteria aus:
        // quizQuestions[1].answerChoice[1].criteria,
      ]);
   
    } else {
      // fügt letzten Wert ins Array hinzu:
      setResultMatching((prevCriteria) => [
        ...prevCriteria,
        quizQuestions[currQuestion].answerChoices[
          answerIndex
        ].criteria.toString(),
      ]);

      setShowResult(true);
    }

  };

  // redirect to results page automatically:
  useEffect(() => {
    if (showResult) {
      navigate("/result");
    }
  }, [showResult, navigate]);
  // [showResult, navigate] => navigate hier wichtig, damit immer aktuellste Version von navigate-function verwendet wird

  return (
    <div className={style.questionBox}>
      {/* questions: */}
      <h4>{quizQuestions[currQuestion].questionText}</h4>

      {/* answers: */}
      {quizQuestions[currQuestion].answerChoices.map((answerChoice, index) => (
        <button
          key={index}
          onClick={() => handleQuestion(index)}
          className={style.questionBtn}
        >
          {answerChoice.answerText}
        </button>
      ))}

      <div className={style.progressBox}>
        <div
          className={style.progressBar}
          style={{ width: `${progress}px` }}
        ></div>
      </div>
    </div>
  );
};

export default QuizQuestions;
