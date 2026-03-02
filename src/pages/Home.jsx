import { useEffect, useState } from "react"
import SearchForm from "../components/SearchForm"
import MovieCard from "../components/MovieCard"

export default function Home(){
    const [movies, setMovies] = useState([])
    const [viewMode, setViewMode] = useState("page")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    // const [search, setSearch] = useState("")
    // const [movieCache, setMovieCache] = useState({})

    // const baseUrl = `http://www.omdbapi.com/?s=${search}&apikey=`
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
            setMovies(data.Search)
        } else {
            setMovies([])
            setError("Fant ikke filmen du søkte etter. Prøv igjen!")
        }
        } catch (err) {
            console.error("Feil ved henting av filmer:", err)
            setError("Noe gikk galt ved henting av data")
        } finally {
            setLoading(false)
        }
    }

        // if (movieCache[query]) {
    //     setMovies(movieCache[query])
    //     return
    // }

    // setMovieCache(prev =>({
    //     ...prev, 
    //     [imdbID]: data
    // }))
    

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
                console.error("Feil ved henting av Bond-filmer:", err)
                setError("Kunne ikke laste startside")
            } finally {
                setLoading(false)
            }
        }
        getJbMovies()

        // if (!movies) getJBMovies()
    }, [apiKey]
    // , [imdbID] 
)

    return (
        <main>
            <header>
                <button onClick={() => setViewMode("dropdown")} >
                    Dropdown-visning
                </button>
                <button onClick={() => setViewMode("page")} >
                    Egen side
                </button>
            </header>

            <h1>Forside</h1>
            <SearchForm 
                getMovies={getMovies} 
            />
            {loading && <p>Laster filmer</p>}

            {error && <p>{error}</p>}

            {!loading && !error && movies.length > 0 && (
                <ul>
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.imdbID}
                            movie={movie}
                            viewMode={viewMode}
                        />
                    ))}
                </ul>
            )}
            {!loading && !error && movies.length === 0 && (
                <p>Ingen filmer å vise</p>
            )}
        </main>
    )
}