import React from 'react';
import './App.css';
import Login from './pages/login/login';
import UserCreate from './pages/user_create/createUser';
import ProductsList from './pages/products_list/listProducts';
import CreateProduct from './pages/products_create/createProduct';
import EditProduct from './pages/products_edit/editProduct';
import Profile from './pages/profile/profile';
import EditProfile from './pages/profile_edit/editProfile';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';


function App() {

  return (
      <div className="App">
        <AuthProvider>
          <Router>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/cadastro" component={UserCreate} />
              <Route path="/produtos" component={ProductsList} />
              <Route path="/addproduto" component={CreateProduct} />
              <Route path="/editarproduto/:id" component={EditProduct} useParams={useParams} />
              <Route path="/perfil/:id" component={Profile} />
              <Route path="/editarperfil/:id" component={EditProfile} />
            </Switch>
          </Router>
          
        </AuthProvider>
      </div>
  );
}

export default App;
