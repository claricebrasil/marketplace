const conexao = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaToken = require('../senhaToken');

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(404).json("E-mail e senha obrigatórios.");
    }

    try {
        const queryVerificarEmail = 'select * from usuarios where email = $1';
        const { rows, rowCount } = await conexao.query(queryVerificarEmail, [email]);

        if (rowCount === 0) {
            return res.status(404).json("Usuário não encontrado.");
        }

        const usuario = rows[0];

        const verificarSenha = await bcrypt.compare(senha, usuario.senha);

        if(!verificarSenha) {
            return res.status(400).json("E-mail e/ou senha inválidos.");
        }

        const token = jwt.sign({ id: usuario.id }, senhaToken, { expiresIn: '4h' });

        const { senha: senhaUsuario, ...dadosUsuario } = usuario;

        return res.status(200).json({
            usuario: dadosUsuario,
            token
        })

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    login
}