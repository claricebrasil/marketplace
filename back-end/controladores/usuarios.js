const conexao = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaToken = require('../senhaToken');

const cadastrarUsuario = async (req, res) => {
    const { nome, nome_loja, email, senha } = req.body;

    if (!nome) {
        return res.status(404).json("O campo nome é obrigatório!");
    }

    if (!nome_loja) {
        return res.status(404).json("O campo nome da loja é obrigatório!");
    }

    if (!email) {
        return res.status(404).json("O campo e-mail é obrigatório!");
    }

    if (!senha) {
        return res.status(404).json("O campo senha é obrigatório!");
    }

    try {
        const queryConsultaEmail = 'select * from usuarios where email = $1';
        const { rowCount: quantidadeUsuarios } = await conexao.query(queryConsultaEmail, [email]);

        if (quantidadeUsuarios > 0) {
            return res.status(404).json("O e-mail informado já existe!");
        }

        const queryConsultaNomeLoja = 'select * from usuarios where nome_loja = $1';
        const { rowCount: quantidadeNomesLoja } = await conexao.query(queryConsultaNomeLoja, [nome_loja]);

        if (quantidadeNomesLoja > 0) {
            return res.status(404).json("O nome da loja informado já existe, tente outro nome!");
        }

        const senhaCriptografada = await bcrypt.hash(senha, 8);

        const query = 'insert into usuarios (nome, nome_loja, email, senha) values ($1, $2, $3, $4)';
        const usuarioCadastado = await conexao.query(query, [nome, nome_loja, email, senhaCriptografada]);

        if (usuarioCadastado.rowCount === 0) {
            return res.status(400).json("Não foi possivel cadastrar usuário.");
        }

        return res.status(200).json("Usuário cadastrado com sucesso!");

    } catch (error) {
        return res.status(error.message);
    }

};

const detalharUsuario = async (req, res) => {
    const { id: idUsuario } = req.params;

    try {

        const usuario = await conexao.query ('select id, nome, nome_loja, email from usuarios where id = $1', [idUsuario]);

        if (usuario.rowCount === 0) {
            return res.status(404).json("Usuário não encontrado!");
        }

        return res.status(200).json(usuario.rows);

    } catch (error) {
        return res.status(error.message);
    }
};

const editarUsuario = async (req, res) => {
    const { nome, nome_loja, email, senha } = req.body;
    const { usuario } = req;

    if (!nome && !nome_loja && !email && !senha) {
        return res.status(404).json("Um ou mais campos obrigatórios!");
    }

    try {
        const perfil = await conexao.query('select * from usuarios where id = $1', [usuario.id]);

        if (perfil.rowCount === 0) {
            return res.status(404).json("Produto não encontrado!");
        }

        const query = 'update usuarios set nome = $1, nome_loja = $2, email = $3, senha = $4 where id = $5';
        const perfilAtualizado = await conexao.query(query, [nome, nome_loja, email, senha, usuario.id ]);

       if (perfilAtualizado.rowCount === 0) {
            return res.status(400).json("Não foi possível atualizar perfil.");
        }

        return res.status(200).json("Perfil atualizado com sucesso!");

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    cadastrarUsuario,
    detalharUsuario,
    editarUsuario
}