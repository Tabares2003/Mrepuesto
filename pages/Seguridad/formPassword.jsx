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


export default function formPassword() {


    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

    const irA = useRef(null);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

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
                                                type="tel"
                                                placeholder="Ej: 3006901715" 
                                            /> 
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <p className='titlesFormsUsers2'>Confirmar nueva contraseña</p>
                                            <input
                                                className='InputFormsUsers'
                                                type="tel"
                                                placeholder="Ej: 3006901715"  
                                            />
                                            <Box display="flex" justifyContent="space-between" marginTop={15}>
                                                <button className='CancelarFormButton'>Cancelar</button>
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