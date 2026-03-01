import { useState } from "react";
import MovieList from "../components/MovieList";

export default function SearchForm({ movies, getMovies }) {
    const [search, setSearch] = useState('')

    const handleChange = (e)=>{
        setSearch(e.target.value)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        getMovies(search)
    }

    return (
        <form onSubmit={handleSubmit}>
        <label>
            Søk etter film
            <input
            type="search"
            placeholder="Harry Potter.."
            value={search}
            onChange={handleChange}
            />
        </label>
        <button type="submit">Søk</button>
        <section>
            <MovieList movies={movies} />
        </section>
        </form>
    )
}