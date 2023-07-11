import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import Movie from "./modules/Movie";
import MovieInfo from "./modules/MovieInfo";

export const API_KEY = "516b0f8a";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-style: italic;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 35px;
  margin: 30px auto;
  margin-left: 2px;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-right: 30px;
  width: 40%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 68px;
  height: 60px;
  margin: 20px;
  margin-left: 30px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
const Placeholder = styled.img`
  width: 3000px;
  height: 490px;
  margin: 5px;
  opacity: 0.92;
  animation: horizontal-loop 150s linear infinite;
  position: absolute;
  @keyframes horizontal-loop {
    0% {
      transform: translateX(0%);
    }
    50% {
      transform: translateX(50%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <Container>
      <Header>
      <MovieImage src="Logo2.jpg" />
        <AppName>
          Moviepedia
        </AppName>
        
        <SearchBox>
          <SearchIcon src="search-icon.png" />
          <SearchInput
            placeholder="Search Movie Details..."
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfo selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <Movie
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder src="Bg.jpg" />
        )}
      </MovieListContainer>
    </Container>
  );
}

export default App;