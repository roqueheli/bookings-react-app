import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import PlaceCard from "../../components/placecard/PlaceCard";
import Search from "../../components/search/Search";
import useFetch from "../../hooks/useFetch";
import NoResults from "../../components/noresults/NoResults";
import Loader from "../../components/loader/Loader";
import "./Home.css";

const Home = () => {
  const { data, isLoading, fetchData } = useFetch();

  useEffect(() => {
    setTimeout(() => {
      fetchData(`${import.meta.env.VITE_BASE_URL}/places/random`, "GET");
    }, 2000);
  }, []);

  return (
    <>
      <Search />
      {(data === null || data.length === 0) && isLoading === false ? (
        <NoResults />
      ) : isLoading ? (
        <Loader />
      ) : (
        <Container>
          <div className="home-container">
            {data?.map((place) => (
              <PlaceCard place={place} key={place?.place_id} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
};

export default Home;
