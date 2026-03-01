import { useEffect, useState } from "react"
import SearchForm from "../components/SearchForm"

export default function Home(){

    const [movies, setMovies] = useState(null)
    const apiKey = import.meta.env.VITE_OMDB_API_KEY

    const getMovies = async (query) => {
        if (!query || query.length < 3) return
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&type=movie`)
            const data = await response.json()
        if (data.Response === "True") {
            setMovies(data.Search)
        } else {
            setMovies([])
        }
        } catch (err) {
        console.error("Feil ved henting av filmer:", err)
        }
    }

    useEffect(()=>{
        const getJBMovies = async () => {
            try {
                const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=James Bond&type=movie`)
                const data = await response.json()
                    if (data.Response === "True") {
                        setMovies(data.Search)
                    }
            } catch (err) {
                console.error("Feil ved henting av Bond-filmer:", err)
            }
        }

        if (!movies) getJBMovies()
    }
    // , []
    // , [imdbID] 
)

    return (

        <main>
            <h1>Forside</h1>
            <SearchForm movies={movies} getMovies={getMovies} />
        </main>
    )
}