import './App.css';
import {useState, useEffect} from 'react';
import Layout from './components/Layout';
import {Routes, Route} from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailer from './components/trailer/Trailer';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () =>{
    
    await fetch("https://movie-api-service.onrender.com/api/v1/movies")
    .then(response=>{
      return response.json();
    })
    .then(movi=>{
     
      setMovies(movi);
    });
    
  }

  const getMovieData = async (movieId) => {
     
    await fetch(`https://movie-api-service.onrender.com/api/v1/movies/${movieId}`).then(response=>{
      return response.json();
    }).then(singlemovi=>{
      
      setMovie(singlemovi);
      setReviews(singlemovi.reviewIds);
    });
    
    // try 
    // {
    //     const response = await api.get(`/api/v1/movies/${movieId}`);

    //     const singleMovie = response.data;

    //     setMovie(singleMovie);

    //     setReviews(singleMovie.reviews);
        

    // } 
    // catch (error) 
    // {
    //   console.error(error);
    // }

  }

  useEffect(() => {
    getMovies();
  },[])

  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home movies={movies} />} ></Route>
            <Route path="/Trailer/:ytTrailerId" element={<Trailer/>}></Route>
            <Route path="/Reviews/:movieId" element ={<Reviews getMovieData = {getMovieData} movie={movie} reviews ={reviews} setReviews = {setReviews} />}></Route>
            <Route path="*" element = {<NotFound/>}></Route>
          </Route>
      </Routes>

    </div>
  );
}

export default App;
