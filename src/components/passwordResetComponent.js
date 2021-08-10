import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, Paper, TextField } from "@material-ui/core";
import axios from "axios";
import { useParams } from "react-router";
import { useState , useEffect } from "react";

export const PasswordReset = () => {
    const {_id} = useParams();
    const [msg,setMsg] = useState("")
    const validationSchema = Yup.object().shape({
        password: Yup.string().required('Please enter your password'),
        confirmPassword:Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Password must match")
    })

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver:yupResolver(validationSchema)})

    const onSubmit = (data) => {
        axios.patch(`https://url-shortner-back-end-ak.herokuapp.com/user/update/${_id}`,data.password)
        .then(res=>{
            if(res.data.message){
                setMsg(res.data.message)
            }
        })
        .catch(res=>console.log(res))
    }

    const hideMsg = () =>{
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
        padding:"10px 10px"
    }
    const btn = {
        background:"#22bcef",
        color:"white"
    }
    const img = {
        borderRadius:"50%"
    }
    return(
        <div className="login" style={div}>
            <Paper style={paper}>
                <h1>reset password</h1>
                <img style={img} width="150px" alt="password reset" src="https://store-images.s-microsoft.com/image/apps.14212.9007199266419762.56b9557e-4dc3-49a7-a9be-5fc3204dba85.5fd31f8e-651a-473d-9720-b03f777bd33c?mode=scale&q=90&h=300&w=300"/>
                {msg==="green"?(
                    <p>Your password has been reset</p>
                ):(
                    <p>{msg}</p>
                )}
                {msg?hideMsg():""}
                <form onSubmit={handleSubmit(onSubmit)} style={div}>
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
                    <Button
                        type="submit"
                        variant="contained"
                        style={btn}
                    >
                        Reset password
                    </Button>
                </form>
            </Paper>
        </div>
    )
}