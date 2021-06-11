import React , {useState,useEffect} from "react";
 import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import {SearchBox} from './components/SearchBox';
import {AddFavourites} from './components/AddFavourites';
import {RemoveFavourites} from './components/RemoveFavourites';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourite] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=adfaae8a`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search){
      setMovies(responseJson.Search);
    }

  };

  useEffect(() => {getMovieRequest(searchValue)}, [searchValue]);

  useEffect(()=>{
    const movieFavourites = JSON.parse(localStorage.getItem("react-movie-app-favourites"));

    if (movieFavourites) {
			setFavourite(movieFavourites);
		}
  },[]);

  const saveToLocalStorage = (items) => {
      localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) =>{
    
    const newFavouriteMovie = [...favourites, movie];
    
    setFavourite(newFavouriteMovie);
    saveToLocalStorage(newFavouriteMovie);

  };

  const removeFavourites = (movie) =>{
    const newFavouriteMovie = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);

    setFavourite(newFavouriteMovie);
    saveToLocalStorage(newFavouriteMovie);
  }

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading = 'Movies'/>
        <SearchBox searchValue = {searchValue} setSearchValue = {setSearchValue}/>
      </div>
      <div className='row'>
        <MovieList 
          movies={movies} 
          favouriteComponent = {AddFavourites}
          handleFavouritesClick = {addFavouriteMovie}
          />
      </div> 
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading = 'Favourites'/>
      </div>
      <MovieList 
          movies={favourites} 
          favouriteComponent = {RemoveFavourites}
          handleFavouritesClick = {removeFavourites}
      />
    </div>
  );
}

export default App;
