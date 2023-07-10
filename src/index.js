const express = require('express');
const { v4: uuidv4 }  = require('uuid');

const app = express();

app.use(express.json());

const clientes = [];

/**
 * DAdos da conta
 * CPF - string
 * nome - string
 * id - uuid
 * extrato - array
 */

// MiddleWare

const verificarSeCpfExiste = (req, res, next) => {
    const { cpf } = req.headers;

    const cliente = clientes.find(cliente => cliente.cpf === cpf);

    if(!cliente) {
        return res.status(400).json({error: "Cliente não encotrado"});
    }
    request.cliente = cliente;

    return next();
}

/**Método para criar conta */
app.post("/conta", (req,res) => {
    const { cpf, nome } = req.body;
    const clienteJaExiste = clientes.some((cliente) => cliente.cpf === cpf); //Validando o cpf, é verificado se o cpf informado já existe na base de dados
    if (clienteJaExiste) {
        return res.status(400).json({error: "Já existe um cliente com esse CPF !!"});
    }
    clientes.push({
        cpf,
        nome,
        id: uuidv4(),
        extrato:[]
    });
    return res.status(201).json({message: "Conta criada com sucesso !!"});
})

/**Obter informações de todas as contas */
app.get("/contas", (req, res) => {
    return res.json(clientes)
})


//app.use(verificarSeCpfExiste) => forma alternativa de usar middleware
/**Método para buscar o extrato de uma conta */
app.get("/extrato_bancario", verificarSeCpfExiste, (req,res) => {
    const { cliente } = req;
    
    return res.json(cliente.extrato);
})

/**Método para deposito */
app.post("/deposito", verificarSeCpfExiste, (req, res) => {
    const { descricao, quantia } = req.body;

    const { cliente } = request;

    const depositoOperacao = {
        descricao,
        quantia,
        created_at: new Date(),
        tipo: "credito",
    };

    cliente.extrato.push(depositoOperacao);

    return res.status(201).send();
})

app.get("/extrato_bancario/data", verificarSeCpfExiste, (req,res) => {
    const { cliente } = req;
    
    const { data } = req.query;

    const dataFormat = new Date(data + " 00:00");

    const extrato = cliente.extrato.filter((extrato) => extrato.created_at.toDateString() === new Date(dataFormat).toDateString());
    
    return res.json(extrato);
})

/**Atualizar conta */
app.put("/conta", verificarSeCpfExiste, (req, res) => {
    const { nome } = request.body;
    const { cliente } = request;

    cliente.nome = nome;

    return res.status(201).send();
});

/**Obter informações da conta */
app.get("/conta", verificarSeCpfExiste, (req, res) => {
    const { cliente } = req;

    return res.json(cliente);
})

/**Remover conta */

app.delete("/conta", verificarSeCpfExiste, (req, res) => {
    const { cliente } = req;

    clientes.splice(cliente, 1);

    return res.status(200).json(clientes);
});

// app.get("/balanco", verificarSeCpfExiste, (req, res) => {
//     const { cliente } = req;

//     const balanco = getBalanco(cliente);

//     return res.status(200).json(balanco);
// })

app.listen(3333);