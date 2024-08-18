import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import PlaceCard from "../../components/placecard/PlaceCard";
import Search from "../../components/search/Search";
import useFetch from "../../hooks/useFetch";
import NoResults from "../../components/noresults/NoResults";
import Loader from "../../components/loader/Loader";
import "./Home.css";

const Home = () => {
  const { data, isLoading, fetchData } = useFetch();
  const [currentPage, setCurrentPage] = useState(1);
  const [placesPerPage] = useState(10);

  useEffect(() => {
    setTimeout(() => {
      fetchData(`${import.meta.env.VITE_BASE_URL}/places/random`, "GET");
    }, 1000);
  }, []);

  // Calculate the current page data
  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
  const currentPlaces = data?.slice(indexOfFirstPlace, indexOfLastPlace);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            {currentPlaces?.map((place) => (
              <PlaceCard place={place} key={place?.place_id} />
            ))}
          </div>
          {/* Pagination controls */}
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
