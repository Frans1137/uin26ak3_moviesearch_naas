// import { useState } from "react"

// const ReadMore = ({ movieInfo }) => {
//     const text = movieInfo
//     const [toReadMore, setToReadMore] = useState(true)
//     const toggleReadMore = () => {
//         setToReadMore(!toReadMore)
//     }

//     return (
//         <p>
//             {toReadMore ? text.slice() : text}
//             <span onClick={toggleReadMore}>
//                 {toReadMore 
//                     ? "...read more" 
//                     : " show less" }
//             </span>
//         </p>
//     )
// }

// const Content = () => {
//     return (
//         <article>
//                 <ReadMore>
//                     <p>Utgivelsesår: {film.Year}</p>
//                     <p>Spilletid: {film.Runtime}</p>
//                     <p>Skuespillere: {film.Actors ? film.Actors.split(",").slice(0,5).join(", ") : "Ikke oppgitt"}</p>
//                     <p>Sjanger: {film.Genre || "Ikke oppgitt"}</p>
//                     <p>Aldersgrense: {film.Rated || "Ikke oppgitt"}</p>
//                     <p>Beskrivelse: {film.Plot || "Ikke oppgitt"}</p>
//                 </ReadMore>
//         </article>
//     )
// }

// export default Content