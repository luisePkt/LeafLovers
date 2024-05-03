// import { useEffect, useState } from "react";
// import locations from "../utils/locations";

// const Fetching = () => {
//   const token = "kKWPbsRrPi5OVU2PB-Z54jYDXYwkJIfEbKUMNnqtl_Q";
//   const api = `https://trefle.io/api/v1/species?filter[vegetable]=true&filter[light]=8&token=${token}`;

//   const url = "https://corsproxy.io/?" + encodeURIComponent(api);

//   const [plants, setPlants] = useState([]);

//   useEffect(() => {
//     const fetchPlants = async () => {
//       try {
//         const res = await fetch(url);
//         const resJson = await res.json();
//         console.log(resJson);
//         const dataWithLocation = resJson.data.map((plant) => ({
//           ...plant,
//           location: locations[Math.floor(Math.random() * locations.length)],
//         }));
//         setPlants(dataWithLocation);
//         return dataWithLocation;
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     // fetchPlants();
//   }, []);

//   return (
//     <div>
//       <h1>Zimmerpflanzen</h1>
//       <ul>
//         {plants.map((plant) => (
//           <li key={plant.id}>{plant.common_name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Fetching;
