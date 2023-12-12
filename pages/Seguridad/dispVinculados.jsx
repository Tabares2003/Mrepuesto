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
import { AiOutlineRight } from 'react-icons/ai';

import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";



export default function dispVinculados() {


 

















    const router = useRouter();
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    //Posición top Pagina
    const irA = useRef(null);





    const handleroute = (route) => () => {
        router.push(route);
    };



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

                                <div className="ContDatosDocs" style={{ padding: '.5rem', justifyContent: 'center', display: 'flex' }}>
                                    <Grid sx={{ width: isMdDown ? '100%' : '65%' }}>
                                        <div>
                                            <p className="titlemisD">Dispositivos vinculados</p>
                                            {devices.map(device => (
                                                <div key={device.id}>
                                                    <h2>{device.deviceName}</h2>
                                                    <p>{device.deviceType}</p>
                                                    <p>Última vez en línea: {device.lastLoggedIn}</p>
                                                </div>
                                            ))}p
                                        </div>
                                        <div className="contDispVincSubTitle">
                                            <p className="subtitdispvinc">Actualmente hay 2 dispositivos vinculados a tu cuenta</p>
                                        </div>
                                        <div className="SubcontainerMisDatos">
                                            <div>
                                                <p className="titleSubContMisD">Xiaomi Redmi 9 pro</p>
                                                <p className="subtitleSubContMisD">Este dispositivo - Ultima vez de actividad</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <button className='ButtonCloseSession'  >Cerrar sesión</button>
                                            </div>
                                        </div>

                                        <div className="SubcontainerMisDatos">
                                            <div>
                                                <p className="titleSubContMisD">Windows 10</p>
                                                <p className="subtitleSubContMisD">Ubicación - Ultima vez de actividad</p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <button className='ButtonCloseSession'>Cerrar sesión</button>
                                            </div>
                                        </div>
                                        <Grid container style={{ width: '100%' }}>
                                            <Grid item xs={12} md={6}></Grid>
                                            <Grid item xs={12} md={6}>
                                                <Box display="flex" justifyContent="space-between" marginTop={15}>
                                                    <button className='CancelarFormButton' onClick={handleroute('./seguridadData')}>Ir a seguridad</button>
                                                    <button className='GuardarFormButton' onClick={handleroute('/')}>Ir al inicio</button>
                                                </Box>
                                            </Grid>
                                        </Grid>



                                    </Grid>

                                </div>

                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}