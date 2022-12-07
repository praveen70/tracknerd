import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { errorToast, successToast } from '../toastMessage/toastMessage';

import "./login.scss";
const initialValues = {
    username: "",
    password: ""
};
const Login = () => {
    const paperStyle = { padding: 20, width: "25%", margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '10px 0' }
    const [loginInputs, setloginInputs] = useState(initialValues);
    const navigate = useNavigate()

    const handleLogininputs = (e) => {
        const { name, value } = e.target;
        setloginInputs({
            ...loginInputs,
            [name]: value,
        });
    }
    const submitInputs = async(e) => {
        e?.preventDefault()
        try {
            const response = await axios.post('https://staging-api.tracknerd.io/v1/auth/login', loginInputs);
            if(response?.status === 200){
                localStorage.setItem("accessToken", response?.data?.token);
                navigate("/vehicle-list");
                successToast("Loged in successfully")
            }
		} catch (err) {
            errorToast(err.response?.data?.message)
		}
    }
    return (
        <div className="login-container">
            <Grid >
                <Paper elevation={10} style={paperStyle} className="login-page">
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2>Sign In</h2>
                    </Grid>
                    <TextField label='Username'
                        placeholder='Enter username'
                        fullWidth required
                        variant="filled"
                        name="username"
                        onChange={handleLogininputs}
                        value={loginInputs?.username}
                    />
                    <div className='password'>
                        <TextField label='Password'
                            name="password"
                            onChange={handleLogininputs}
                            value={loginInputs?.password}
                            variant="filled" placeholder='Enter password'
                            type='password' fullWidth required />
                    </div>
                    <Button type='submit'
                        color='primary'
                        variant="contained"
                        onClick={submitInputs}
                        disabled={
                            loginInputs?.username?.length > 0 &&
                                loginInputs?.password?.length > 0 ? false : true
                        }
                        style={btnstyle} fullWidth>Sign in</Button>
                    <Typography >
                        <Link href="#" >
                            Forgot password ?
                        </Link>
                    </Typography>
                    <Typography > Do you have an account ?
                        <Link href="#" >
                            Sign Up
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </div>
    );
};

export default Login;