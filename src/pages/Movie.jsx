import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Movie() {

    const { movie } = useParams()
    const [film, setFilm] = useState(null)

    const apiKey = import.meta.env.VITE_OMDB_API_KEY
    const imdbID = movie.split("-").pop()

    useEffect(() => {

        const getMovieDetails = async () => {
            try {
                const response = await fetch(
                    `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`
                )

                const data = await response.json()

                if (data.Response === "True") {
                    setFilm(data)
                }

            } catch (err) {
                console.error("Feil ved henting av film:", err)
            }
        }

        getMovieDetails()

    }, [imdbID])

    if (!film) {
        return <p>Henter informasjon om film</p>
    }

    return (
        <main>
            <article>
                <header>
                    <h1>{film.Title}</h1>
                </header>
                <p>Utgivelsesår: {film.Year}</p>
                <p>Spilletid: {film.Runtime}</p>
            </article>
        </main>
    )
}