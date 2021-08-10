import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import Sidebar from '../../components/sidebar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './profile.css';
import useAuth from '../../hook/useAuth';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: 320,
      height: 200,
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
    imageProduct: {
        width: 250,
        height: 260,
        borderRadius: '15px',
        marginLeft: '4rem'
    },
    addButton: {
        maxWidth: 140,
        fontSize: '10px'
    },
  }));

function Profile() {
    const classes = useStyles();
    const { token } = useAuth();
    const history = useHistory();
    const [data, setData] = useState({});

    if (!token) history.push('/');
    
    let { id } = useParams();

    async function loadingProfile() {
        try {
            const response = await fetch(`http://localhost:8000/perfil/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                  }
            });

            const userData = await response.json();
            setData(userData[0]);   
            console.log(userData[0]);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        loadingProfile();
    }, []);

    return(
        <div className="product-form">
            <Sidebar />
            <div className="productContent">
                <h1>{data.nome_loja}</h1>
                <h2>Perfil</h2>
                <div className="card-list">
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="standard-basic" label={data.nome} />
                        <TextField id="standard-basic" label={data.nome_loja} />
                        <TextField id="standard-basic" label={data.email} />
                    </form>
                </div>
                <div className="bottomContent">
                    <Link to={`/editarperfil/${id}`}>
                        <Button 
                            className={classes.addButton} variant="contained" 
                            color="primary" 
                        >
                            EDITAR PERFIL
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Profile;