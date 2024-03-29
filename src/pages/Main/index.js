import { useCallback, useEffect, useState } from 'react'
import { Container, Form, SubmitButton, List, DeleteButton } from './styles'
import {FaBars, FaGithub, FaPlus, FaSpinner, FaTrash} from 'react-icons/fa'
import api from '../../services/api'
import { Link } from 'react-router-dom'

export default function Main(){

    const [ newRepo, setNewRepo ] = useState('')
    const [ respositorio, setRepositorio ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ alert, setAlert ] = useState(null)

    //Buscar
    useEffect(() => {
        const repoStorage = localStorage.getItem('repos')

        if(repoStorage){
            setRepositorio(JSON.parse(repoStorage))
        }

    }, [])

    //Salvar alterações
    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(respositorio))
    }, [respositorio])

    const handleSubmit = useCallback((e) => {
        e.preventDefault()

        async function submit() {
            
            setLoading(true)
            setAlert(null)

            try {

                if(newRepo === ''){
                    throw new Error('Você precisa digitar um repositório')
                }

                const response = await api.get(`repos/${newRepo}`)

                const hasRepo = respositorio.find(repo => repo.name === newRepo)

                if(hasRepo){
                    throw new Error('Repositório duplicado')
                }
        
                const data = {
                    name: response.data.full_name
                }
        
                setRepositorio([...respositorio, data])
                setNewRepo('')
                
            } catch (error) {
                setAlert(true)
                console.log(error)

            } finally {
                setLoading(false)
            }
        }

        submit()
    
    }, [newRepo, respositorio])
       

    const handleDelete = useCallback((repo) => {
        const find = respositorio.filter(r => r.name !== repo)
        setRepositorio(find)
    },[respositorio])

    function handleInputChange(e){
        setNewRepo(e.target.value)
        setAlert(null)
    }

    return( 

        <Container>
            
            <h1>
                <FaGithub />
                Meus Repositórios
            </h1>

            < Form onSubmit={handleSubmit} error={alert}>
                <input 
                    type='text'
                    placeholder='Adicionar repositório' 
                    value={newRepo}
                    onChange={handleInputChange}
                />

                <SubmitButton Loading={ loading ? 1 : 0 }>
                    { loading ? (
                        <FaSpinner color='#FFF' size={14} />
                    ) : (
                        <FaPlus color='#FFF' size={14} />
                    )}
                </SubmitButton>
            </Form>

            <List>
                { respositorio.map( repo => (
                    <li key={repo.name}>
                        <span>
                            <DeleteButton onClick={() => handleDelete(repo.name)}>
                                <FaTrash size={14} />
                            </DeleteButton>
                            {repo.name}
                        </span>
                        <Link to={`repositorio/${encodeURIComponent(repo.name)}`}>
                            <FaBars  size={20}/>
                        </Link>
                    </li>
                ))}
            </List>
        </Container>
    )
}