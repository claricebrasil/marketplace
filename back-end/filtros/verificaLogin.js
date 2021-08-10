const jwt  = require('jsonwebtoken');
const conexao = require('../conexao');
const senhaToken = require('../senhaToken');

const verificaLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization) {
        return res.status(404).json("Token não encontrado!");
    }

    try {
        const token = authorization.replace('Bearer', '').trim();

        const { id: userId } = jwt.verify(token, senhaToken);
        const query = 'select * from usuarios where id = $1';
        const { rows, rowCount } = await conexao.query(query, [userId]);

        if (rowCount === 0) {
            return res.status(404).json("Usuário não encontrado!");
        }

        const {senha, ...usuario} = rows[0];

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = verificaLogin;