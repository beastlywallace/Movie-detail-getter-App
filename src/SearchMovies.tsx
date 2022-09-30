import React, { useState } from 'react'
import MovieCard from './MovieCard';
import NoMovies from './NoMovies';

const SearchMovies = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<any[]>([]);
    const searchMovies = async(e: any) => {
        e.preventDefault();
        
        const url = `https://api.themoviedb.org/3/search/movie?api_key=4da5edd4436c7e9af2999dd5f12f26c6&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try {
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label htmlFor="query" className="label">Movie Name</label>
                <input className="input" type="text" name="query" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="i.e Frozen"/>
                <button type="submit" className="button">Search</button>
            </form>
            <div>
                {movies.filter(movie => movie.poster_path).map(movie => (
                    // <MovieCard movie={movie} key={movie.id} />
                    !movie ? <NoMovies /> : <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        </>
    )
}

export default SearchMovies
