import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Paper from '@material-ui/core/Paper';
import { Button, Link, TextField } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";
import {Link as Connect} from 'react-router-dom';
import './login.css';
import { useEffect, useState } from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
axios.defaults.withCredentials = true;

export const LoginComponent = () => {
    const history = useHistory();
    const [msg,setMsg] = useState("");
    const [loading,setLoading] = useState("none")
    const validationSchema = Yup.object().shape({
        email: Yup.string().required().email('Enter a valid email'),
        password: Yup.string().required('Please enter your password')
    })

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver:yupResolver(validationSchema)});

    const onSubmit = (data) => {
        setLoading("block")
        // for netlify
        axios.post('https://url-shortner-back-end-ak.herokuapp.com/user/login',data,{withCredentials:true})
        // for localhost
        // axios.post('http://localhost:5000/user/login',data,{withCredentials:true})
        .then(res=>{
            setLoading("none")
            if(res.data.message!=="green"){
                setMsg(res.data.message);
            }
            if(res.data.message==="green"){
                localStorage.setItem("_id",res.data._id);
                history.push('/home');
            }
        })
        .catch(res=>console.log(res))
    }
    const divStyle = {
        display:"grid",
        placeItems:"center",
        margin:"0 0 0 0"
    }
    const [width,setWidth] = useState("");
    const setPaperWidth = () => {
        if(window.innerWidth < 450){
            setWidth("70%");
        }
        else if(window.innerWidth<800){
            setWidth("50%");
        }else{
            setWidth("30%");
        }
    }
    try{
        useEffect(setPaperWidth,[]);
    }catch(e){
        console.log(e);
    }
    
    const paperStyle = {
        width,
        margin:"10vh 0 0 0",
        padding:"5px 0"
    }
    const linkStyle={
        padding:"10px 0"
    }
    const h1={
        margin:"10px 0"
    }
    const imgStyle = {
        margin:"10px 0 0 0"
    }
    const btn = {
        background:"#22bcef",
        color:"white"
    }
    const hideMsg = () => {
        setTimeout(()=>setMsg(""),1000*10);
    }
    return(
        <div style={divStyle} className="login">
            <Paper style={paperStyle}>
                <LinearProgress style={{display:loading}}/>
                <img style={imgStyle} width="150px" src="https://image.flaticon.com/icons/png/512/149/149071.png" alt="user"/>
                <h1 style={h1}>Login</h1>
                {msg?(
                    <p>{msg}</p>
                ):(
                    <p></p>
                )}
                {msg?hideMsg():""}
                <form onSubmit={handleSubmit(onSubmit)} style={divStyle}>
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    label="Email address"
                    autoFocus
                    {...register("email")}
                    />
                    {errors.email && (
                        <span style={{color:'red'}}>{errors.email.message}</span>
                    )}
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    type="password"
                    label="password"
                    autoFocus
                    {...register("password")}
                    />
                    {errors.password && (
                        <span style={{color:'red'}}>{errors.password.message}</span>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        style={btn}
                    >
                        Sign in
                    </Button>
                </form>
                <Link style={linkStyle}><Connect to='/signup'>Don't have an account ? Sign Up</Connect></Link>
                <br/>
                <Link style={linkStyle}><Connect to='/forgotpassword'>Forgot password ?</Connect></Link>
            </Paper>
        </div>
    )
}