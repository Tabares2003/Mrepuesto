import { validateEmail } from "../../utilities/Validations"
//import MUI media
import {
    Box,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Button,
} from "@mui/material";
import Container from "../../components/layouts/Container";
import ModalMensajes from "../mensajes/ModalMensajes";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { URL_BD_MR } from "../../helpers/Constants";
import { useDispatch, connect, useSelector } from "react-redux";
import { FiEye, FiEyeOff } from 'react-icons/fi';



export default function formPassword() {

    const router = useRouter();
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));













    //Función ver o no password1
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const [showPassword2, setShowPassword2] = useState(false);

    const handleClickShowPassword2 = () => {
        setShowPassword2(!showPassword);
    };
    //Top screen
    const irA = useRef(null);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);


    //Ruta ir atrás
    const rutaBack = (e) => {
        e.preventDefault()
        router.push('./seguridadData')
    }


    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account">

                                <div className='titlesformsUsers'>
                                    <p>Editar contraseña</p>
                                </div>


                                <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '65%' }}>
                                <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <p className='titlesFormsUsers2'>Nueva contraseña</p>
                                            <input
                                                className='InputFormsUsers'
                                                type="password" 
                                            /> 
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <p className='titlesFormsUsers2'>Confirmar nueva contraseña</p>
                                            <input
                                                className='InputFormsUsers'
                                                type="password"  
                                            />
                                            <Box display="flex" justifyContent="space-between" marginTop={15}>
                                                <button className='CancelarFormButton' onClick={rutaBack}>Cancelar</button>
                                                <button className='GuardarFormButton'>Guardar</button> 
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}