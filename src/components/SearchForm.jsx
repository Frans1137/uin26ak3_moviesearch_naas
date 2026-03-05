import { useState, useEffect } from "react";
import History from "./History";

export default function SearchForm({ getMovies }) {
    const [search, setSearch] = useState('')
    // const storedHistory = localStorage.getItem("search")

    const removeHistory = () => {
        if (!confirm("Vil du slette tidligere søk?")) return
        setHistory([])
}

const [history, setHistory] = useState(() => {
    try {
        const stored = localStorage.getItem("search")
        return stored ? JSON.parse(stored) : []
    } catch {
        return []
    }
})

    useEffect(()=>{
        localStorage.setItem("search", JSON.stringify(history))
    }, [history])

    const handleChange = (e)=>{
        const value = e.target.value
        setSearch(value)

        if (value.length >= 4) {
            getMovies(value)
        }
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        if (!search.trim()) return
        getMovies(search)

        setHistory(prev =>
            prev.includes(search) ? prev : [search, ...prev].slice(0, 10)
        )
    }

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
                {history.length > 0 && (
                <button type="button" onClick={removeHistory}>Slett lagrede søk</button>
                )
            }
            </section>
            
        </form>
    )
}