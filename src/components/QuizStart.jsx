import style from "../styles/matching.module.css";

const QuizStart = () => {
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

  return (
    <div className={style.main}>
      <p>Would you like to find out which plant suits you?</p>
      <button className={style.startBtn}>press me to find out</button>
    </div>
  );
};

export default QuizStart;
