import React from 'react'
import api from './api'
import { Button, Container, Form } from 'react-bootstrap'
import { cnpj } from 'cpf-cnpj-validator';

const MeuForm = ({className = "centerContainer"})=> {

    const [form, setForm] = React.useState({nomeOng: "", emailOng: "", telefone: "", cnpj: "", endereco:""})

    const enviaServidor = async (e) => {
        e.preventDefault()

        if (!cnpj.isValid(form.cnpj)) {
            alert("CNPJ inválido!");
            return;
        }

        try{
            const resposta = await api.post("/users", form)
            console.log(resposta)
        } catch(err){
            console.log(err)
        }
    }

    const handleForm = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

  return (
    <Container className={className}>

        <div className="logo-container">
            <h2 className="logo-title">PetMatch</h2>
            <img src="/imgs/Frame1.png" alt="logo" className="form-logo" />
        </div>

        <Form onSubmit={enviaServidor} className="formContainer">
            <Form.Group>
                <Form.Label htmlFor="nomeOng">Nome:</Form.Label><br/>
                <Form.Control id="nomeOng" name="nomeOng" type="text" value={form.nomeOng} onChange={handleForm} placeholder="Digite o nome"/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="emailOng">E-mail:</Form.Label><br/>
                <Form.Control id="emailOng" name="emailOng" type="email" value={form.emailOng} onChange={handleForm} placeholder="Digite o e-mail"/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="telefone">Telefone:</Form.Label><br/>
                <Form.Control id="telefone" name="telefone" type="text" value={form.telefone} onChange={handleForm} placeholder="Digite o telefone"/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="cnpj">CNPJ:</Form.Label><br/>
                <Form.Control id="cnpj" name="cnpj" type="text" value={form.cnpj} onChange={handleForm} placeholder="Digite o CNPJ"/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="endereco">Endereço:</Form.Label><br/>
                <Form.Control id="endereco" name="endereco" type="text" value={form.endereco} onChange={handleForm} placeholder="Digite o endereço"/>
            </Form.Group>
            <Button type="submit" style={{borderColor: "black"}}>Cadastrar</Button>

            <p className="form-footer">
                Ao clicar em continuar, você concorda com os nossos <a href="https://youtu.be/LHqRwGTP2qQ?si=ORCAvf9YCwXQYFSk" target="_blank" rel="noopener noreferrer">Termos de Serviço</a> e <a href="#" target="_blank" rel="noopener noreferrer">Política de Privacidade</a>.
            </p>
        </Form>
    </Container>
  )
}

export default MeuForm