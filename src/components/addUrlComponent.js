import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import {GetTableDataContext} from './homeComponent.js';
import { useContext, useState } from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router";
import InputAdornment from '@material-ui/core/InputAdornment';
import LinearProgress from '@material-ui/core/LinearProgress';
axios.defaults.withCredentials = true;

export const AddUrl = () => {
    const [msg,setMsg] = useState("");
    const [loading,setLoading] = useState("none");
    const validationSchema = Yup.object().shape({
        url: Yup.string().required().url('Enter a valid url'),
    })

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({resolver:yupResolver(validationSchema)});

    const getTableData = useContext(GetTableDataContext);
    
    const onSubmit = (data) => {
        setLoading("block")
        const body = {
            "userId":localStorage.getItem("_id"),
            "url":data.url
        }
        axios.post('https://url-shortner-back-end-ak.herokuapp.com/url/add',body,{withCredentials:true})
        .then(res=>{
            setLoading("none");
            if(res.data.message==="green"){
                setMsg(res.data.message);
                getTableData();
            }
        })
        .catch(res=>console.log(data))
    }
    const history = useHistory();
    const goBack = () => {
        history.goBack();
    }
    const btn = {
        background:"black",
        color:"white"
    }
    const div = {
        background:"#4d4d4d",
        color:"white",
        padding:"10px",
        display:"flex",
        justifyContent:"flex-start"
    }
    const form = {
        display:"flex",
        justifyContent:"center"
    }
    const h1 = {
        background:"#8fbcbc",
        color:"black",
        margin:"0",
        padding:"10px"
    }
    const setShow = () => {
        setTimeout(()=>setMsg(""),1000*10)
    }
    return(
        <>
            <h1 style={h1}>Add url</h1>
            <LinearProgress style={{display:loading}}/>
            <div style={div}>
                <Button
                variant="contained"
                startIcon={<ArrowBackIcon/>}
                onClick={goBack}
                >
                    Go back
                </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} style={form}>
                <TextField 
                variant="outlined"
                margin="normal"
                label="url"
                autoFocus
                InputProps={{endAdornment:(
                    <InputAdornment position="start">
                        <Button
                            type="submit"
                            style={btn}
                            >Add url</Button>
                        </InputAdornment>
                )}}
                
                {...register("url")}
                />
                {errors.url && (
                        <span style={{color:'red'}}>{errors.url.message}</span>
                )}
            </form>
            {msg==="green"?(
                <p>URL added successfully</p>
            ):(
                <p></p>
            )}
            {msg==="green"?setShow():""}

        </>
    )
}