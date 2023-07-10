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
    const clienteJaExiste = clientes.some((cliente) => cliente.cpf === cpf) //Validando o cpf, é verificado se o cpf informado já existe na base de dados
    if (clienteJaExiste) {
        return response.status(400).json({error: "Já existe um cliente com esse CPF !!"})
    }
    clientes.push({
        cpf,
        nome,
        id: uuidv4(),
        extrato:[]
    });
    const messagem = 'Conta criada com sucesso!!'
    return response.status(201).json({message: "Conta criada com sucesso !!"})
}) 

app.listen(3333);