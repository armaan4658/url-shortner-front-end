import { Button, Paper, TextField } from "@material-ui/core";
import { useHistory } from "react-router"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";
import { useState ,useEffect} from "react";
import LinearProgress from '@material-ui/core/LinearProgress';

export const Edit = () => {
    const history = useHistory();
    const [msg,setMsg] = useState("");
    const [loading,setLoading] = useState("none");
    const goBack = () => {
        history.goBack();
    }

    const validationSchema = Yup.object().shape({
        firstName: Yup.string(),
        lastName: Yup.string()
    })

    const {
        register,
        handleSubmit,
        formState:{errors}
    } = useForm({resolver:yupResolver(validationSchema)});

    const onSubmit = (data) => {
        setLoading("block");
        axios.patch(`https://url-shortner-back-end-ak.herokuapp.com/user/update/${localStorage.getItem("_id")}`,data)
        .then(res=>{
            setLoading("none");
            if(res.data){
                setMsg(res.data.message);
            }
        })
        .catch(res=>console.log(res))
    }

    const divStyle = {
        display:"grid",
        placeItems:"center"
    }

    const [width,setWidth] = useState("");
    const setPaperWidth = () => {
        if(window.innerWidth < 450){
            setWidth("75%");
        }
        else if(window.innerWidth < 800){
            setWidth("50%")
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
        backgroundColor:"#f5f3f3"
    }

    const formStyle ={
        display:"grid",
        margin:"30px 0",
        placeItems:"center"
    }

    const cancel = {
        backgroundColor:"white",
        color:"#de3a3a",
        margin:"10px 10px 0 0"
    }

    const update = {
        backgroundColor:"white",
        color:"navy",
        margin:"10px 0 0 0"
    }

    const hideMsg = () => {
        setTimeout(()=>setMsg(""),1000*10);
    }
    const btnDiv = {
        display:"flex",
        justifyContent:"flex-start",
        padding:"10px",
        background:"rgb(77 77 77)"
    }
    const hero = {
        background:"rgb(143 188 188)",
        height:"100vh"
    }
    return(
        <div style={hero}>
            <div style={btnDiv}>
                <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon/>}
                    onClick={goBack}
                    >
                        Go back
                </Button>
            </div>
            <div>
                
                <h1>Edit</h1>
                {msg==="green"?(
                <p>Profile updated successfully</p>
                ):(
                    <p>{msg}</p>
                )}
                {msg?hideMsg():""}
            </div>
            <div style={divStyle}>
                <Paper style={paperStyle}>
                    <LinearProgress style={{display:loading}}/>
                    <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
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
                    <div>
                        <Button
                        variant="contained"
                        endIcon={<CloseIcon/>}
                        style={cancel}
                        onClick={goBack}
                        >
                            cancel
                        </Button>
                        <Button
                        type="submit"
                        variant="contained"
                        endIcon={<CheckIcon/>}
                        style={update}
                        >
                            update
                        </Button>
                    </div>
                    </form>
                </Paper>
            </div>
        </div>
    )
}