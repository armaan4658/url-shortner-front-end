import { Avatar, Button, Paper } from "@material-ui/core"
import axios from "axios"
import { useEffect, useState } from "react"
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router";
export const Profile = () => {
    const [data,setData] = useState({})
    const getUserData = () => {
        axios.get(`https://url-shortner-back-end-ak.herokuapp.com/user/get/${localStorage.getItem("_id")}`)
        .then(res=>{
            if(res.data){
                setData(res.data);
                console.log("data",data);
            }
        })
        .catch(res=>console.log(res))
    }
    try{
        useEffect(getUserData,[]);
    }catch(e){
        console.log(e);
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
        backgroundColor:"#f5f3f3",
        margin:"20vh 0 0 0",
        display:"block",
        textAlign:"center"
    }
    const buttonStyle = {
        backgroundColor:"black",
        color:"white",
        margin:"0 5px 15px 0"
    }
    const history = useHistory();
    const goBack = () => {
        history.goBack();
    }
    const edit = () => {
        history.push(`/home/edit`);
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
            <div style={divStyle}>
                <Paper style={paperStyle}>
                    <div style={{
                    display:"grid",
                    placeItems:"center",
                    margin:"10px 0 -10px 0"
                    }}>
                        <Avatar>
                            
                        </Avatar>
                    </div>
                    <h3>First name : {data.firstName}</h3>
                    <h3>Last name : {data.lastName}</h3>
                    <h3>Email : {data.email}</h3>
                    <Button 
                    variant="contained"
                    startIcon={<BorderColorIcon/>}
                    style={buttonStyle}
                    onClick={edit}
                    >
                        Edit</Button>
                </Paper>
            </div>
        </div>
    )
}