import { useState, useEffect } from "react";
// import MovieList from "../components/MovieList";
import History from "./History";

export default function SearchForm({ getMovies }) {
    const [search, setSearch] = useState('')
    const storedHistory = localStorage.getItem("search")
    // const [movieCache, setMovies] = useState({})

    const [history, setHistory] = useState(() =>{
        try {
            return storedHistory ? JSON.parse(storedHistory) : []
        } catch {
            return []
        }
    })

    console.log("denne kommer fra storage", storedHistory)

    useEffect(()=>{
        localStorage.setItem("search", JSON.stringify(history))
    }, [history])

    const handleChange = (e)=>{
        setSearch(e.target.value)
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        if (!search.trim()) return
        getMovies(search)
        setHistory((prev) => 
            prev.includes(search) ? prev : [...prev, search])
        setSearch("")
    }
    console.log(history)

    return (
        <form className="searchForm" onSubmit={handleSubmit}>
            <label >
                <p>Søk etter film</p>
                <input
                    type="search"
                    placeholder="Harry Potter.."
                    value={search}
                    onChange={handleChange}
                />
            <button type="submit">Søk</button>
            </label>
            <section >
                <p>Dine lagrede søk</p>
                <History history={history} setSearch={setSearch} />
            </section>
        </form>
    )
}