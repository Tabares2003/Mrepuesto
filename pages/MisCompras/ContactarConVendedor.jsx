import Container from "../../components/layouts/Container"
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, InputAdornment, TextField, InputBase } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import { Dropdown } from "react-bootstrap";
import { NextRouter } from "next/router";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link'; 
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import productos from "../../utilities/producsQuemados";
import { AiOutlineRight } from 'react-icons/ai';




export default function ContactarConVendedor() {

    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    //PosiciónTopPage
    //PosiciónTopPage
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
                                <Grid className="ContVendedor" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <div className="SubcontainerMisDatos" >
                                        <div style={{ width: '85%' }}>
                                            <p className="titlecontVend1">Contactar con vendedor</p>
                                            <p style={{ fontWeight: '500', fontSize: '20px', color: '#2C2E82' }}>Juan pablo R </p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', width: '25%' }}>
                                            <button style={{ backgroundColor: '#2C2E82', borderRadius: '10px', color: 'white', fontSize: '16px', padding: '.6rem', margin: '0 auto', width: '100%', height: '40px' }}>Enviar mensaje</button>
                                        </div>
                                    </div> 
                                </Grid>

                                <Grid className="ContVendedor2" container style={{ width: isMdDown ? '100%' : '90%', display:'flex', flexDirection:'column' }}>
                                    <div style={{marginBottom:'2rem', width:'100%'}}>
                                        <p className="titlecontVend2">Ayuda con mi compra</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
                                        <p style={{ fontWeight: '400', fontSize: '22px', color: '#2C2E82' }}>Tengo un problema con el producto o con el paquete que me llegó</p>
                                        <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                    </div>
                                </Grid>
                                <Grid className="subContVendedor2" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
                                        <p style={{ fontWeight: '400', fontSize: '22px', color: '#2C2E82' }}>Calificar vendedor</p>
                                        <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                    </div>
                                </Grid>
                                <Grid className="subContVendedor2" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
                                        <p style={{ fontWeight: '400', fontSize: '22px', color: '#2C2E82' }}>Calificar producto</p>
                                        <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                    </div>
                                </Grid>
                                <Grid className="UltsubContVendedor2" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
                                        <p style={{ fontWeight: '400', fontSize: '22px', color: '#2C2E82' }}>No llegó mi compra</p>
                                        <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                    </div>
                                </Grid>
                                
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}