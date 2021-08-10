import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, Link, Paper, TextField } from "@material-ui/core";
import {Link as Connect} from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";

export const SignUp = () => {
    const [msg,setMsg] = useState("");
    const validationSchema = Yup.object().shape({
        email: Yup.string().required().email('Enter a valid email'),
        firstName: Yup.string().required("Enter your first name"),
        lastName: Yup.string().required("Enter your lastname"),
        password: Yup.string().required('Please enter your password'),
        confirmPassword:Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Password must match")
    })

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver:yupResolver(validationSchema)});

    const onSubmit = (data) => {
        axios.post(`https://url-shortner-back-end-ak.herokuapp.com/user/signup`,data)
        .then(res=>{
            if(res.data.message){
                setMsg(res.data.message)
            }
        })
        .catch(res=>console.log(data))
    }

    const hideMsg = () => {
        setTimeout(()=>setMsg(""),1000*10);
    }

    const form = {
        display:"grid",
        placeItems:"center",
        margin:"0 5px"
    }
    const div = {
        display:"grid",
        placeItems:"center"
    }
    const [width,setWidth] = useState("");
    const setPaperWidth = () => {
        if(window.innerWidth < 450){
            setWidth("75%");
        }
        else if(window.innerWidth<800){
            setWidth("65%");
        }else{
            setWidth("50%");
        }
    }
    try{
        useEffect(setPaperWidth,[]);
    }catch(e){
        console.log(e);
    }
    const paper = {
        display:"grid",
        width,
        placeItems:"center",
        padding:"5px 0"
    }
    const btn = {
        background:"#22bcef",
        color:"white"
    }
    return(
        <div className="login" style={div}>
            <Paper style={paper}>
            <h1>Sign Up</h1>
            <img src="https://image.flaticon.com/icons/png/512/149/149071.png" alt="user" width="150px"/>
            {msg==="green"?(
                <p>Verification link has been sent to your email</p>
            ):(
                <p>{msg}</p>
            )}
            {msg?hideMsg():""}
                <form onSubmit={handleSubmit(onSubmit)} style={form}>
                    <div style={{display:"flex",gap:"5px"}}>
                        <TextField 
                        variant="outlined"
                        margin="normal"
                        label="First name"
                        autoFocus
                        {...register("firstName")}
                        />
                        {errors.firstName && (
                            <span style={{color:'red'}}>{errors.firstName.message}</span>
                        )}
                        <TextField 
                        variant="outlined"
                        margin="normal"
                        label="Last name"
                        autoFocus
                        {...register("lastName")}
                        />
                        {errors.lastName && (
                            <span style={{color:'red'}}>{errors.lastName.message}</span>
                        )}
                    </div>
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    label="Email address"
                    fullWidth
                    autoFocus
                    {...register("email")}
                    />
                    {errors.email && (
                        <span style={{color:'red'}}>{errors.email.message}</span>
                    )}
                    <div style={{display:"flex",gap:"5px"}}>
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
                        <TextField 
                        variant="outlined"
                        margin="normal"
                        type="password"
                        label="confirm password"
                        autoFocus
                        {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                            <span style={{color:'red'}}>{errors.confirmPassword.message}</span>
                        )}
                    </div>
                    <Button
                        type="submit"
                        variant="contained"
                        style={btn}
                    >
                        Sign up
                    </Button>
                </form>
                <Link><Connect to='/'>Already have an account ? Log in</Connect></Link>
                </Paper>
        </div>
    )
}