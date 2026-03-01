import MovieCard from "./MovieCard"

export default function MovieList({ movies }) {
    if (!movies || movies.length === 0) {
        return <p>Ingen filmer å vise</p>
    }

    return (
        <ul>
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
            ))}
        </ul>
    )
}