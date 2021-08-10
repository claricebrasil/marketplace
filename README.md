![Logo of the project](https://github.com/claricebrasil/marketplace/blob/main/front-end/cubos_market/public/readme_images/logo.png)
 
## Market Cubos
 
Marketplace desenvolvido com ReactJS e NodeJS. Na aplicação é possível cadastrar uma loja com seus produtos, onde cada produto pode ter nome, descrição, preço, foto e quantidade em estoque.
Obs: a aplicação ainda está em processo de construção e alguns ajustes serão implementados.
 
 
## Tecnologias utilizadas
 
As tecnologias utilizadas para o Front-end foram:
 
* ReactJS (com uso do useContext, createContext, react-router-dom e react-hook-form)
* CSS e componentes do Material UI

Para construir o Back-end foram usadas:

* NodeJS para construção da API
* PostegreSQL para construção do Banco de Dados
 
## Como iniciar a aplicação
 
* Baixar os pacotes de Back-end e Front-end;
* Criar um banco de dados com as informações passadas no schema.sql dentro do arquivo de back-end
* Preencher as informações da sua conexão com o banco de dados dentro do arquivo conexao.js
* Rodar a aplicação back-end:
>    npm run dev
* Para rodar a aplicação do cliente (front-end):
>    npm start
 
## Aplicação:

#### Página de Login:

![login_page](https://github.com/claricebrasil/marketplace/blob/main/front-end/cubos_market/public/readme_images/login_page.png)

#### Página de Cadastro de usuário:
![createUser_page](https://github.com/claricebrasil/marketplace/blob/main/front-end/cubos_market/public/readme_images/createUser_page.png)

#### Home (página de exibição dos produtos cadastrados):
![productsList_page](https://github.com/claricebrasil/marketplace/blob/main/front-end/cubos_market/public/readme_images/products_page.png)

#### Editar produto:
![editProduct_page](https://github.com/claricebrasil/marketplace/blob/main/front-end/cubos_market/public/readme_images/editProduct_page.png)

#### Criar novo produto:
![createProduct_page](https://github.com/claricebrasil/marketplace/blob/main/front-end/cubos_market/public/readme_images/addProduct_page.png)

#### Página de perfil:
![profile_page](https://github.com/claricebrasil/marketplace/blob/main/front-end/cubos_market/public/readme_images/profile_page.png)

#### Editar perfil:
![editProfile_page](https://github.com/claricebrasil/marketplace/blob/main/front-end/cubos_market/public/readme_images/editProfile_page.png)
 
## Sobre a aplicação

No Market Cubos é possível:
- Cadastrar uma loja com seus produtos;
- Exibir lista de produtos cadastrados com nome do produto, imagem, descrição, preço e quantidade em estoque;
- Editar informações dos produtos já cadastrados;
- Criar novo produto;
- Apagar produto cadastrado;
- Visualizar informações perfil;
- Editar perfil;
Obs: Ao ser feito o login, será gerado um token para o usuário e ele só pode acessar a página de produtos, bem como editar produtos e editar perfil, se tiver o Token. Ao clicar em sair, o usuário é redirecionado à página de login. 
Obs2: Ao cadastrar senha, é gerada uma senha criptografada para maior segurança do usuário. Dessa forma, ninguém terá acesso à senha original cadastrada, a não ser o próprio usuário.
 
 
## Versioning
 
1.0.0.0
 
 
## Autores
 
* **Clarice Brasil**: @claricebrasil (https://github.com/claricebrasil)
 
Obrigade pela visita!
