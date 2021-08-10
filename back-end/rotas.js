const express = require('express');
const login = require('./controladores/login');
const usuarios = require('./controladores/usuarios');
const produtos = require('./controladores/produtos');
const verificaLogin = require('./filtros/verificaLogin');

const rotas = express();

// Login //
rotas.post('/login', login.login);

// Usuarios //
rotas.post('/cadastro', usuarios.cadastrarUsuario);

rotas.use(verificaLogin);

// Perfis //  
rotas.get('/perfil/:id', usuarios.detalharUsuario);
rotas.put('/perfil/:id', usuarios.editarUsuario); 

// Produtos //
rotas.get('/produtos', produtos.listarProdutos);
rotas.get('/produtos/:id', produtos.detalharProduto);
rotas.post('/produtos', produtos.cadastrarProduto);
rotas.put('/produtos/:id', produtos.editarProduto);
rotas.delete('/produtos/:id', produtos.removerProduto);

module.exports = rotas;

