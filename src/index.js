const express = require('express');
const { v4: uuidv4 }  = require('uuid');

const app = express();

app.use(express.json())

const clientes = [];

/**
 * DAdos da conta
 * CPF - string
 * nome - string
 * id - uuid
 * extrato - array
 */

/**Método para criar conta */
app.post("/conta", (request,response) => {
    const { cpf, nome } = request.body;
    const id = uuidv4();
    clientes.push({cpf, nome, id, extrato:[]});
    const messagem = 'Conta criada com sucesso!!'
    return response.status(201).send(messagem)
}) 

app.listen(3333);