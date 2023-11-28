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
import { IoIosCamera } from "react-icons/io";
import { IoSquareOutline } from "react-icons/io5";
import ModalMensajes from "../mensajes/ModalMensajes";
import { URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { RiSettings5Fill } from "react-icons/ri";




export default function calificarVendedor() {


    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const irA = useRef(null);
    const router = useRouter();
    //recibir los datos del producto comprado y guardar url para cuando reinicie seguir en el mismo
    let producto = null

    if (typeof window !== 'undefined') {
        if (router.query.producto) {
            producto = JSON.parse(router.query.producto)
            // Guardar los datos en el almacenamiento local
            localStorage.setItem('producto', JSON.stringify(producto))
        } else {
            // Recuperar los datos del almacenamiento local
            const data = localStorage.getItem('producto')
            if (data) {
                producto = JSON.parse(data)
            }
        }
    }

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);



    return (
        <div ref={irA}>
            <div>
                {producto ? (
                    <Container title="Mi Cuenta">
                        <div className="ps-page ps-page--inner" id="myaccount">
                            <div className="container">
                                <div className="ps-page__header"> </div>
                                <div className="ps-page__content ps-account">
                                    <Grid container>
                                        <Grid item xs={12} md={7} sx={{ width: isMdDown ? '100%' : '90%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>

                                            <div className='titleTproblema'>
                                                <p>Calificar vendedor</p>
                                            </div>
                                            <Grid item xs={12} md={12} sx={{ width: isMdDown ? '100%' : '90%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                <p style={{ fontSize: '18px', fontWeight: '500', color: '#2D2E83' }}>Elige de uno a cinco la calificación para tu vendedor, siendo uno lo más bajo y cinco lo más alto:</p>
                                                <div style={{ display: 'flex', marginTop: '3rem', width:'100%' }}>
                                                    <div>
                                                        <p style={{ fontSize: '28px', marginRight: '2rem', color: '#2D2E83' }}>0.0</p>
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                                        <RiSettings5Fill size={40} style={{ color: '#acadcd' }} />
                                                        <RiSettings5Fill size={40} style={{ color: '#acadcd' }} />
                                                        <RiSettings5Fill size={40} style={{ color: '#acadcd' }} />
                                                        <RiSettings5Fill size={40} style={{ color: '#acadcd' }} />
                                                        <RiSettings5Fill size={40} style={{ color: '#acadcd' }} />
                                                    </div>
                                                </div>
                                                <div style={{width:'100%'}}>
                                                <p style={{ fontSize: '18px', fontWeight: '500', color: '#2D2E83', marginTop: '3rem', marginBottom: '3rem' }}>Si deseas deja un comentario sobre tu experiencia con el vendedor:</p>

                                                </div>
                                                <textarea
                                                    placeholder="Describe tu problema aquí"
                                                    style={{
                                                        padding: '2rem',
                                                        width: '100%',
                                                        borderRadius: '15px',
                                                        backgroundColor: '#F0F1F5',
                                                        height: '20rem',
                                                        color: '#2D2E83',
                                                        fontSize: '20px',
                                                        fontWeight: '400',
                                                        resize: 'none',
                                                    }}
                                                />
                                                <button className='GuardarFormButtonvendedor' style={{ marginTop: '3rem' }}>Enviar</button>
                                            </Grid>



                                        </Grid>
                                        <Grid item xs={12} md={5} sx={{ borderLeft: '3px solid #E1E2EC', height: '27%', paddingLeft: '2rem', display: 'flex', flexDirection: 'column' }}>

                                            <div className='titlecalifVended' style={{ width: '100%' }}>
                                                <p>Producto vendido: </p>
                                            </div>
                                            <Grid container>
                                                <Grid item xs={12} md={4} sx={{ border: '4px solid #EBEBEB', borderRadius: '12px', height: '16rem', display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                                    <img src={`${URL_IMAGES_RESULTS}${producto.nombreimagen1}`} style={{ width: '150px', height: '150px' }} />
                                                </Grid>
                                                <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', marginTop: '2rem', paddingLeft: '2.5rem' }}>
                                                    <p style={{ fontSize: '20px', color: '#2D2E83', fontWeight: '600' }}>{producto.titulonombre}</p>
                                                    <div className="subtitlesvercompra">
                                                        <p>Unidades compradas:</p>
                                                        <p>{producto.cantidad}</p>
                                                    </div>
                                                    <div className="subtitlesvercompra">
                                                        <p>Precio del producto:</p>
                                                        <p>{producto.preciodeventa}</p>
                                                    </div>
                                                </Grid>
                                            </Grid>

                                        </Grid>

                                    </Grid>


                                </div>
                            </div>
                        </div>
                    </Container>
                ) : (
                    <div>
                        {/* Aquí puedes manejar el caso en que 'producto' es 'null' */}
                        <p>Cargando datos del producto...</p>
                    </div>
                )}
            </div>
        </div>
    )
}