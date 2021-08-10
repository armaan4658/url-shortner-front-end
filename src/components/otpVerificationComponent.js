import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, Paper, TextField } from "@material-ui/core";
import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export const OtpVerification = () => {
    const {_id} = useParams();
    const [email,setEmail] = useState("");
    const [msg,setMsg] = useState("")

    const getData = () => {
        axios.get(`https://url-shortner-back-end-ak.herokuapp.com/user/get/${_id}`)
        .then(res=>{
            if(res.data.email){
                setEmail(res.data.email)
            }
        })
        .catch(res=>console.log(res))
        return ()=>{
            setEmail("");
        }
    }

    useEffect(getData,[_id]);
    const validationSchema = Yup.object().shape({
        otp: Yup.number().required('Enter otp')
    })

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver:yupResolver(validationSchema)})

    const onSubmit = (data) => {
        const body = {
            "email" : email,
            "otp": data.otp
        }
        axios.patch('https://url-shortner-back-end-ak.herokuapp.com/user/verification',body)
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
    const img = {
        borderRadius:"50%"
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
    return(
        <div className="login" style={div}>
            <Paper style={paper}>
                <h1>otp verification</h1>
                <img style={img} width="150px" alt="verification" src="https://store-images.s-microsoft.com/image/apps.14212.9007199266419762.56b9557e-4dc3-49a7-a9be-5fc3204dba85.5fd31f8e-651a-473d-9720-b03f777bd33c?mode=scale&q=90&h=300&w=300"/>
                {msg==="green"?(
                    <p>Your account is verified</p>
                ):(
                    <p>{msg}</p>
                )}
                {msg?hideMsg():""}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField 
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="otp"
                    type="number"
                    autoFocus
                    {...register("otp")}
                    />
                    {errors.otp && (
                        <span style={{color:'red'}}>{errors.otp.message}</span>
                    )}
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={btn}
                    >
                        verify
                    </Button>
                </form>
            </Paper>
        </div>
    )
}