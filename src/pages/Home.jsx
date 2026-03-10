import { useEffect, useState } from "react"
import SearchForm from "../components/SearchForm"
import MovieCard from "../components/MovieCard"

export default function Home(){
    const [movies, setMovies] = useState([])
    const [viewMode] = useState("page")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const apiKey = import.meta.env.VITE_OMDB_API_KEY

    const getMovies = async (query) => {
        if (!query || query.length < 3) return

        try {
            setLoading(true)
            setError(null)
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
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=>{

        const getJbMovies = async () => {
            try {
                setLoading(true)
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
            } finally {
                setLoading(false)
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

            {loading && <p>Laster filmer</p>}
            {error && <p>{error}</p>}

            {!loading 
                && !error 
                && movies.length > 0 
                && (
                <ul className="movieList">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                            viewMode={viewMode}
                        />
                    ))}
                </ul>
            )}
            {!loading 
                && !error 
                && movies.length === 0 
                && (<p>Fant ingen filmer som matcher søket ditt</p>)}
        </main>
    )
}