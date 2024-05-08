const ResultPage = ({ answerCriteria }) => {
  return (
    <div>
      ResultPage
      {
        <div>
          <ul>
            {answerCriteria.map((criteria, index) => (
              <li key={index}>{criteria.toString()}</li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
};

export default ResultPage;
