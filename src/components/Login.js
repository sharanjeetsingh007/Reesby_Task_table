import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './Login.css';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { login } from '../redux/sliceLogin';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(3),
            width: '200ch',
        },
    },
}));

export default function Login() {
    const classes = useStyles();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validate, setValidate] = useState("")

    const dispatch = useDispatch();

    // using login action reducer
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name) {
            let errorname = 'Please enter name';
            return setValidate(errorname);

        } else if (!email) {

            let erroremail = 'Please enter email';
            return setValidate(erroremail);

        } else if (!password) {

            let errorpass = 'Please enter password';
            return setValidate(errorpass);

        } else {

            dispatch(login({
                name: name,
                email: email,
                password: password,
                loggedIn: true,
            }));
        }
    }

    return (

        <div className='main'>
            <div className='login'>
                <h2>Login</h2>
                <form className={classes.root} noValidate autoComplete="off"
                    onSubmit={e => handleSubmit(e)}>
                    <div className='input'>
                        <TextField
                            id="standard-basic"
                            label="Username"
                            value={name}
                            onChange={e => { setName(e.target.value) }}
                            style={{ width: 600, marginTop: 0 }} />
                    </div>
                    <div className='input'>
                        <TextField
                            id="standard-basic"
                            label="Email"
                            value={email}
                            onChange={e => { setEmail(e.target.value) }}
                            style={{ width: 600 }} />
                    </div>
                    <div className='input'>
                        <TextField
                            id="standard-basic"
                            label="Password"
                            value={password}
                            onChange={e => { setPassword(e.target.value) }}
                            style={{ width: 600 }} />
                    </div>
                    <div
                        style={{ width: '300px', height: '20px', color: 'red', padding: '1px', marginTop: '-4px' }}>
                        {validate}
                    </div>
                    <div className='login-button'>
                        <Button
                            type='submit'
                            style={{ width: 300, height: 39, backgroundColor: '#5900B4', color: '#FFFFFF', marginTop: '-13px' }}
                            diaplay='flex'>
                            Login In
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}