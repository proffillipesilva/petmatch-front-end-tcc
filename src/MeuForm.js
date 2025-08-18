import React from 'react'
import api from './api'
import { Button, Container, Form } from 'react-bootstrap'
import { cnpj } from 'cpf-cnpj-validator';

const MeuForm = ({className})=> {

    const [form, setForm] = React.useState({nomeOng: "", emailOng: "", telefone: "", cnpj: "", endereco:""})

        const enviaServidor = async (e) => {
        e.preventDefault()

        if (!cnpj.isValid(form.cnpj)) {
        alert("CNPJ inválido!");
        return;
    }

        console.log(form)

        try{
            const resposta = await api.post ("/users", form);
            console.log(resposta)
        }   catch(err){
            console.log(err)
        }


    }
    const handleForm = (e) => {
        setForm({...form, [e.target.name]  : e.target.value})
    }

  return (
    <Container className={className}>

  <div className="logo-container">
      <h2 className="logo-title">PetMatch</h2>
    <img src="/imgs/Frame1.png" alt="logo" className="form-logo" />
  </div>

        <Form onSubmit={enviaServidor}>
            <Form.Group>
                <Form.Label htmlFor="nomeOng" >Nome:</Form.Label><br/>
                <Form.Control id= "nomeOng" name="nomeOng" type="text" value={form.nomeOng} onChange={handleForm}/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="emailOng" >E-mail:</Form.Label><br/>
                <Form.Control id= "emailOng" name="emailOng" type="email" value={form.emailOng} onChange={handleForm}/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="telefone" >Telefone:</Form.Label><br/>
                <Form.Control id= "telefone" name="telefone" type="text" value={form.telefone} onChange={handleForm}/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="cnpj" >CNPJ:</Form.Label><br/>
                <Form.Control id= "cnpj" name="cnpj" type="text" value={form.cnpj} onChange={handleForm}/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="endereco" >Endereço:</Form.Label><br/>
                <Form.Control id= "endereco" name="endereco" type="text" value={form.endereco} onChange={handleForm}/>
            </Form.Group>
        <Button style={{borderColor: "black"}} onClick={(e) => enviaServidor(e)}>Cadastrar</Button>
        </Form>
    </Container>
  )
}

export default MeuForm;