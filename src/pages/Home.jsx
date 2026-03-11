import { useEffect, useState } from "react"
import SearchForm from "../components/SearchForm"
import MovieCard from "../components/MovieCard"

export default function Home(){
    const [movies, setMovies] = useState([])
    const [viewMode] = useState("page")
    const [error, setError] = useState(null)

    const apiKey = import.meta.env.VITE_OMDB_API_KEY

    const getMovies = async (query) => {
        if (!query || query.length < 3) return

        try {
            const response = await fetch(
                `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`
            )
            const data = await response.json()

        if (data.Response === "True") {
            const uniqueMovies = [
                ...new Map(data.Search.map(movie => [movie.imdbID, movie])).values()
            ]

            setMovies(uniqueMovies)

            localStorage.setItem("lastSearch", query)
            localStorage.setItem("lastResults", JSON.stringify(data.Search))
        } else {
            setMovies([])
        }
        } catch (err) {
            console.error("Feil ved henting av filmer", err)
            setError("Noe gikk galt ved henting av data")
        }
    }

    useEffect(()=>{

        const getJbMovies = async () => {
            try {
                const response = await fetch(
                    `https://www.omdbapi.com/?apikey=${apiKey}&s=James Bond&type=movie` )

                const data = await response.json()

                    if (data.Response === "True") {
                        setMovies(data.Search)
                    } else {
                        setMovies([])
                    }
            } catch (err) {
                console.error("Feil ved henting av Bond-filmer", err)
                setError("Kunne ikke laste startside")
            }
        }
        getJbMovies()

    }, [apiKey]
)

    return (
        <main>
            <header>
                <h1>Forside</h1>
            </header>
            <SearchForm getMovies={getMovies} />
                <ul className="movieList">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                            viewMode={viewMode}
                        />
                    ))}
                </ul>
                <p>{!error}Fant ingen filmer som matcher søket ditt</p>
        </main>
    )
}