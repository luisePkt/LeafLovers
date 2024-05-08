import { usePlantsContext } from "../utils/PlantsProvider";

const ResultPage = () => {
  // connection provider:
  const { resultMatching, setResultMatching } = usePlantsContext();

  return (
    <div>
      ResultPage
      {
        <div>
          <ul>
            {resultMatching.map((criteria, index) => (
              <li key={index}>{criteria.toString()}</li>
            ))}
          </ul>
        </div>
      }
    </div>
  );
};

export default ResultPage;
