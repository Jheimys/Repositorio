import { useParams } from "react-router-dom"

export default function Repositorio(){

    let {repositorio} = useParams()
    return(
        <h1 style={{color: '#FFF'}}>
            {repositorio}
        </h1>
    )
}