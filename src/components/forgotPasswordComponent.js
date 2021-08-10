import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, Link, Paper, TextField } from "@material-ui/core";
import {Link as Connect} from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";

export const ForgotPassword = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Enter your email')
    })

    const [msg,setMsg] = useState("")

    const {
        register,
        handleSubmit,
        formState : {errors}
    } = useForm({resolver:yupResolver(validationSchema)})

    const onSubmit = (data) => {
        axios.get(`https://url-shortner-back-end-ak.herokuapp.com/user/passwordReset/${data.email}`)
        .then(res=>{
            if(res.data.message){
                setMsg(res.data.message)
            }
        })
        .catch(res=>console.log(res))
    }

    const hideMsg = () => {
        setTimeout(()=>setMsg(""),1000*10)
    }
    const div = {
        display:"grid",
        placeItems:"center"
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
    const paper = {
        width,
        padding:"10px 0"
    }
    const img = {
        borderRadius:"50%"
    }
    const btn = {
        background:"#22bcef",
        color:"white"
    }
    return(
        <div className="login" style={div}>
            <Paper style={paper}>
                <h1>Forgot password</h1>
                <img style={img} width="150px" alt="password" src="https://store-images.s-microsoft.com/image/apps.14212.9007199266419762.56b9557e-4dc3-49a7-a9be-5fc3204dba85.5fd31f8e-651a-473d-9720-b03f777bd33c?mode=scale&q=90&h=300&w=300"/>
                {msg==="green"?(
                    <p>Password reset link sent to your email</p>
                ):(
                    <p>{msg}</p>
                )}
                {msg?hideMsg():""}
                <form onSubmit={handleSubmit(onSubmit)}style={div}>
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
                    <Button
                    type="submit"
                    variant="contained"
                    style={btn}
                    >
                        send password reset link
                    </Button>
                </form>
                <Link><Connect to='/'>remember password ? Log in</Connect></Link>
            </Paper>
        </div>
    )
}