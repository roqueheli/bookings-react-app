import React, { useCallback, useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import PlaceCard from "../../components/placecard/PlaceCard";
import Search from "../../components/search/Search";
import useFetch from "../../hooks/useFetch";
import NoResults from "../../components/noresults/NoResults";
import Loader from "../../components/loader/Loader";
import "./Home.css";

const Home = () => {
  const [ places, setPlaces ] = useState([]);
  const { data, isLoading, fetchData } = useFetch();
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ placesPerPage ] = useState(10);

  const loadPlaces = useCallback(() => {
    if (!places.length) {
      fetchData(`${import.meta.env.VITE_BASE_URL}/places/random`, "GET");
    }
  }, [places.length, fetchData]);

  useEffect(() => {
    if (data && data.length > 0) {
      setPlaces(data);
    }
  }, [data]);

  useEffect(() => {
    loadPlaces();
  }, [loadPlaces]);

  // Calculate the current page data
  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
  const currentPlaces = places?.slice(indexOfFirstPlace, indexOfLastPlace);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Search />
      {(data === null || data?.length === 0) && isLoading === false ? (
        <NoResults />
      ) : isLoading ? (
        <Loader />
      ) : (
        <Container>
          <div className="home-container">
            {currentPlaces?.map((place) => (
              <PlaceCard place={place} key={place?.place_id} />
            ))}
          </div>
          <div className="pagination-controls">
            <Button className="m-2"
              variant="secondary"
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}>
              {"<"}
            </Button>
            <span className="page-counter">
              Page {currentPage} of {Math.ceil(data.length / placesPerPage)}
            </span>
            <Button className="m-2"
              variant="secondary"
              disabled={currentPage === Math.ceil(data.length / placesPerPage)}
              onClick={() => paginate(currentPage + 1)}>
              {">"}
            </Button>
          </div>
        </Container>
      )}
    </>
  );
};

export default Home;
