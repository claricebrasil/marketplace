import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import './createProduct.css';
import useAuth from '../../hook/useAuth';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: 320,
      height: 280,
      borderRadius: '15px',
      marginTop: '-2rem',
      marginRight: '2rem'
    },
    inputProduct: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '10px'
    },
    inputPrice: {
        marginRight: '5px'
    },
    inputStorage: {
        marginLeft: '5px'
    },
    addButton: {
        maxWidth: 140,
        fontSize: '10px'
    },
  }));

function CreateProduct() {
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const [err, setErr] = useState('');
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    if (!token) history.push('/');
    
    async function onSubmit(data) {
        
        setLoading(true);
        setErr('');
    
        try {
          const response = await fetch('http://localhost:8000/produtos', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
          
          const productData = await response.json();
    
          console.log(productData);
    
          history.push('/produtos')
        } catch (error) {
          setErr(error.message);
        }
        
        setLoading(false);
      }

    return(
        <div className="product-form">
            <Sidebar />
            <div className="productContent">
                <h2>Adicionar Produto</h2>
                <div className="card-list">
                    <form 
                        className={classes.root} 
                        noValidate 
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <TextField 
                            id="standard-basic" required 
                            label="Nome do produto"
                            {...register('nome')}  
                        />
                        <div className={classes.inputProduct}>
                            <Input 
                                className={classes.inputPrice}
                                id="standard-adornment-amount" required
                                label="Preço"
                                startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                                {...register('preco')}
                            />
                            <Input 
                            className={classes.inputStorage}
                                id="standard-adornment-amount" required
                                label="Estoque"
                                startAdornment={<InputAdornment position="start">Un</InputAdornment>}
                                {...register('estoque')}
                            />
                        </div>
                        <TextField 
                            id="standard-basic" 
                            label="Descrição do produto"
                            {...register('descricao')} 
                        />
                        <TextField 
                            id="standard-basic" 
                            label="Imagem"
                            {...register('imagem')} 
                        />
                
                        {loading && <CircularProgress />}
                        {err && <Alert severity="error">{err}</Alert>}
                        <div className="bottomContent">
                            <a href="/produtos">Cancelar</a>
                            <Button className={classes.addButton} variant="contained" color="primary" type="submit">
                                ADICIONAR PRODUTO 
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateProduct;