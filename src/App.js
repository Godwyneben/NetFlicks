import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=c467d466';

const movie1 = {
    "Title": "The Boondocks",
    "Year": "2005–2014",
    "imdbID": "tt0373732",
    "Type": "series",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjA5OTNhNDQtODU0ZS00MmMyLWJkZmMtZmIyNjRhOTFlODMwXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Avatar');
    }, []);

    return (
        <div className="app">
            <h1>FilmTricks</h1>

            <div className="search">
                <input placeholder='search for movies' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <img src={SearchIcon} alt='search' onClick={() => searchMovies(searchTerm)} />
            </div>

            {movies?.length > 0
                ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>

                ) : (
                    <div className='empty'>
                        <h2> Sorry! No movies found.</h2>
                    </div>
                )
            }

        </div>
    );
}

export default App;