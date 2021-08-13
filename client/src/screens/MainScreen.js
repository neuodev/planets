import React, { useState } from "react";
import UserForm from "../components/UserForm";
import axios from "axios";
import PlanetsList from "../components/PlanetsLlist";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import { TYPES } from "../utils/index";

const Main = () => {
  const [planetsText, setPlanetsText] = useState("");
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    try {
      if (!planetsText) {
        setError("This Can't be empty");
        return;
      }

      setLoading(true);
      const planetsFromText = planetsText.split(",");
      const planetsCollection = [];
      for (const planet of planetsFromText) {
        if (!planet) continue;
        const { data } = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: {
              query: planet,
              client_id: process.env.REACT_APP_CLIENT_ID,
            },
          }
        );
        planetsCollection.push({
          image: data.results[0].urls.thumb,
          name: planet,
          downloadLink: data.results[0].links.download,
        });
      }
      setLoading(false);
      setError("");
      setPlanets(planetsCollection);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <UserForm
        planetsText={planetsText}
        setPlanetsText={setPlanetsText}
        generate={generate}
      />

      {loading ? (
        <div className="my-4">
          <Loader />
        </div>
      ) : error ? (
        <Alert message={error} type={TYPES.ERROR} />
      ) : planets.length === 0 ? (
        <div className="w-full bg-indigo-100 h-full flex items-center justify-center">
          <h1 className=" transform -translate-y-48 text-indigo-600 text-xl font-semibold">
            What do you want to see?
          </h1>
        </div>
      ) : (
        <PlanetsList planets={planets} />
      )}
    </div>
  );
};

export default Main;
