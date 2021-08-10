const conexao = require('../conexao');

const listarProdutos = async (req, res) => {
    const { usuario } = req;

    try {
        const { rows: produtos, rowCount } = await conexao.query('select * from produtos where usuario_id = $1', [usuario.id]);

        if (rowCount === 0) {
            return res.status(404).json("Nenhum produto cadastrado!");
        }

        console.log(produtos)
        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const detalharProduto = async (req, res) => {
    const { usuario } = req;
    const { id: idProduto } = req.params;

    try {
        const {rows: produto, rowCount} = await conexao.query('select * from produtos where id = $1 and usuario_id = $2', [idProduto, usuario.id]);

        if (rowCount === 0) {
            return res.status(404).json("Produto não encontrado!");
        }

        return res.status(200).json(produto);
    } catch (error) {
        return res.status(400).json(error.message);
    }
    
};

const cadastrarProduto = async (req, res) => {
    const { nome, estoque, categoria, preco, descricao, imagem } = req.body;
    const { usuario } = req;

    if (!nome) {
        return res.status(404).json("O campo nome é obrigatório!");
    }

    if (!estoque) {
        return res.status(404).json("O campo estoque é obrigatório!");
    }

    if (!preco) {
        return res.status(404).json("O campo preço é obrigatório!");
    }

    if (!descricao) {
        return res.status(404).json("O campo descrição é obrigatório!");
    }

    try {

        const query = 'insert into produtos (usuario_id, nome, estoque, categoria, preco, descricao, imagem) values ($1, $2, $3, $4, $5, $6, $7)';
        const produtoCadastrado = await conexao.query(query, [usuario.id, nome, estoque, categoria, preco, descricao, imagem]);

        if (produtoCadastrado.rowCount === 0) {
            return res.status(400).json("Não foi possivel cadastrar produto.");
        }

        return res.status(200).json("Produto cadastrado com sucesso!");
    } catch (error) {
        return res.status(400).json(error.message);
    }

};

const editarProduto = async (req, res) => {
    const { id: idProduto } = req.params;
    const { nome, estoque, categoria, preco, descricao, imagem } = req.body;
    const { usuario } = req;

    if (!nome && !estoque && !preco && !descricao) {
        return res.status(404).json("Um ou mais campos obrigatórios!");
    }

    try {
        const produto = await conexao.query('select * from produtos where id = $1 and usuario_id = $2', [idProduto, usuario.id]);

        if (produto.rowCount === 0) {
            return res.status(404).json("Produto não encontrado!");
        }

        const query = 'update produtos set nome = $1, estoque = $2, preco = $3, descricao = $4, imagem = $5, categoria = $6 where id = $7';
        const produtoAtualizado = await conexao.query(query, [nome, estoque, preco, descricao, imagem, categoria, idProduto]);

       if (produtoAtualizado.rowCount === 0) {
            return res.status(400).json("Não foi possível atualizar produto.");
        }

        return res.status(200).json("Produto atualizado com sucesso!");

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const removerProduto = async (req, res) => {
    const { id: idProduto } = req.params;
    const { usuario } = req;

    try {
        const produto = await conexao.query('select * from produtos where id = $1 and usuario_id = $2', [idProduto, usuario.id]);

        if (produto.rowCount === 0) {
            return res.status(404).json("Produto não encontrado!");
        }

        const query = 'delete from produtos where id = $1 and usuario_id = $2';
        const produtoExcluido = await conexao.query(query, [idProduto, usuario.id]);


        if (produtoExcluido.rowCount === 0) {
            return res.status(400).json("Não foi possível excluir o produto!");
        }

        return res.status(200).json("Produto excluído com sucesso!");

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    listarProdutos,
    detalharProduto,
    cadastrarProduto,
    editarProduto,
    removerProduto
}