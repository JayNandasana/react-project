import { Box, Button, Dialog, TextField, Typography, styled} from '@mui/material'
import React from 'react'
import { authenticateSignup, authenticateLogin } from '../service/api';
import { useState,useContext } from 'react';
import { DataContext}  from '../context/DataProvider';
import { useNavigate } from 'react-router-dom';

const Component = styled(Box)`
    height: 75vh;
    width: 100vh;
    display: flex;  
`;

const Image = styled(Box)`
    background: Black url(https://myportfolio.awraq.com/Equery/Images/loginPage.png) center 85% no-repeat;
    height: 100%;
    width: 40%;
    padding: 45px 35px;
    & > p, & > h5 {
        color: #FFFFFF;
        font-weight: 600;
    }
`;

const Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 25px 35px;
    flex: 1;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #00008b;
    color: #FFFFFF;
    height: 48px;
    border-radius: 2px;
    hover: none;
`;

const Text = styled(Typography)`
    font-size: 12px;
`;

const CreateAccount = styled(Typography)`
    font-size: 14px;
    text-align: center;
    font-weight: 600;
    cursor: pointer;
`;

const Error  = styled(Typography)`
    font-size: 10px;
    color: red;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`

const accountInitialValues = {
    login: {
        view: 'login',
        heading: "Log In",
        subHeading: "Get access to your Custom template and download it."

    },
    signup: {
        view: 'signup',
        heading: "Looks like you're new here!",
        subHeading: "Sign up with your mobile number to get started"
    }
}

const signupInitialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: ''
}

const loginInitialValues = {
    username: '',
    password: ''
}

export default function Login({open,setOpen}) {
    const navigate = useNavigate();

    const [account, toggleAccount] = useState(accountInitialValues.login)
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error,setError] = useState(false);

    const {setAccount} = useContext(DataContext); 

    const handleClose = () => {
        setOpen(false);
        toggleAccount(accountInitialValues.login);
        setError(false);
    }

    const toggleSignup = () => {
        toggleAccount(accountInitialValues.signup);
    }

    const onInputChange = (e) => {
        if (e.target.name === "username" && e.target.value === "admin") {
            setError(true);
        }
        else {
            setSignup({ ...signup, [e.target.name]: e.target.value });
            setError(false);
        } 
    }
    const signupuser = async () => {
        let response = await authenticateSignup(signup); 
        if(!response) return;
        handleClose();
        setAccount(signup.username);
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const loginUser = async () => {
        if (login.username === "admin" && login.password === "admin") {
          handleClose();
          setAccount('admin');
          localStorage.setItem('account', 'admin'); // Store the login value in localStorage
          navigate('/AdminPanel');
        } else {
          let response = await authenticateLogin(login);
          console.log(response);
          if (response.status === 200) {
            handleClose();
            setAccount(response.data.data.username);
            localStorage.setItem('account', response.data.data.firstname); // Store the login value in localStorage
          } else {
            setError(true);
          }
        }
      }

    return(
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: {maxWidth: 'unset'}}}>
            <Component>
                <Image>
                    <Typography variant='h5'>{account.heading}</Typography>
                    <Typography style={{ marginTop: 20, fontSize:14}}>{account.subHeading}</Typography>
                </Image>
                {
                    account.view === 'login' ?
                    <Wrapper>
                        <TextField variant='standard' onChange={(e) => onValueChange(e)} name='username' label='Enter UserName' required></TextField>
                        <TextField variant='standard' onChange={(e) => onValueChange(e)} name='password' label='Enter Password' type='password' required></TextField>
                        {error && <Error>Please enter valid username or password</Error> }
                        <Text>By continuing, you agree to CTD's Terms of Use and Privacy Policy.</Text>
                        <LoginButton onClick={() => loginUser()}>Login</LoginButton>
                        <CreateAccount onClick={() =>  toggleSignup()}>New To CTD? Create an account</CreateAccount>
                    </Wrapper>
                :
                    <Wrapper>
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name='firstname' label='Enter FirstName' required></TextField>
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name='lastname' label='Enter LastName' required></TextField>
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name='username' label='Enter UserName' error={error} helperText={error && "Username cannot be 'admin'"} required></TextField>
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name='email' label='Enter Email' required></TextField>
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name='password' label='Enter Password' required minLength={8} maxLength={20}  error={error} pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}' helperText={error && 'Password must be 8-20 characters, contain at least one digit, one lowercase and one uppercase letter.'}></TextField>
                        <TextField variant='standard' onChange={(e) => onInputChange(e)} name='phone' label='Enter Phone' required></TextField>
                        <LoginButton onClick={() => signupuser()}>Register</LoginButton>
                    </Wrapper>
                }
            </Component>
        </Dialog>
    )
}
