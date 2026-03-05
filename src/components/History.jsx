export default function History({history, setSearch}){
    
    const handleChange = (e)=>{
        setSearch(e.target.value)
    }

    return (
        <select 
            onChange={handleChange}
            value=""
            disabled={history.length === 0} 
            >
            {history.length > 0 ? (
            history?.map((item, i) => ( 
                <option key={i} value={item}>
                    {item}
                </option>
            )) 
        ) : (
                <option value="">Ingen søk</option>
            )}
                </select>
        )
    }