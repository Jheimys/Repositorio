import { Container, Form, SubmitButton } from './styles'
import {FaGithub, FaPlus} from 'react-icons/fa'

export default function Main(){
    return(

        <Container>
            
            <h1>
                <FaGithub />
                Meus Repositórios
            </h1>

            <Form onSubmit={() => {}}>
                <input 
                    type='text'
                    placeholder='Adicionar repositório' 
                />

                <SubmitButton>
                    <FaPlus color='#FFF' size={14} />
                </SubmitButton>
            </Form>
        </Container>
    )
}