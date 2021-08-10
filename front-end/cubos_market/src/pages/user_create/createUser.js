import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
      display: 'flex',
    },
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: '18rem',
    height: '40rem',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 'calc(100vh - 50%)',
    borderRadius: '20px',
    boxShadow: '1px 3px 15px 2px #545454'
  },
  bottom_card: {
    display: 'flex',
    justifyContent: 'space-around',
    fontSize: '13px'
  },
}));

export default function CreateUser() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(data) {
    setLoading(true);
    setErr('');

    try {
      const response = await fetch('http://localhost:8000/cadastro', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json'
        }
      })
      
      const userData = await response.json();

      console.log(userData);

      history.push('/')
    } catch (error) {
      setErr(error.message);
    }
    
    setLoading(false);
  }

  return (
    <form 
      className={classes.root} 
      noValidate 
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >

      <div className={classes.card}>
        <h1>Criar uma conta</h1>
        <TextField  
          id="name" required
          label="Seu nome"
          {...register('nome')} 
        />
        <TextField required
          id="nome_loja" 
          label="Nome da loja"
          {...register('nome_loja')} 
        />
        <TextField required 
          id="standard-required" 
          label="E-mail"
          {...register('email')} 
        />
        <TextField required
          id="standard-password-input"
          label="Senha"
          type="password"
          {...register('senha')}
        />
        <TextField
          id="standard-repeat-password-input"
          label="Repita a senha"
          type="password"
          {...register('senha')}
        />
        {err && <Alert severity="error">{err}</Alert>}
        <Button variant="contained" color="primary" type="submit">
          CRIAR CONTA
        </Button>
        {loading && <CircularProgress />}
        <div className={classes.bottom_card}>
            <span>Já possui uma conta?</span> 
            <a href="/">ACESSE</a>
        </div>
      </div>
    </form>
  );
}