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
                                        <Grid className="subcprinccalific" item xs={12} md={7} sx={{ width: isMdDown ? '100%' : '90%' }} flexDirection={'column'}>
                                            <div className='titleTproblema'>
                                                <p>Calificar vendedor</p>
                                            </div>
                                            <Grid className="calificSubC" item xs={12} md={12} sx={{ width: isMdDown ? '100%' : '90%' }} flexDirection={'column'} >
                                                <p>Elige de uno a cinco la calificación para tu vendedor, siendo uno lo más bajo y cinco lo más alto:</p>
                                                <div className="SubContcalificSubC">
                                                    <div className="notanumero">
                                                        <p>0.0</p>
                                                    </div>
                                                    <div className="iconsConfig" >
                                                        <RiSettings5Fill size={40} style={{ color: '#acadcd' }} />
                                                        <RiSettings5Fill size={40} style={{ color: '#acadcd' }} />
                                                        <RiSettings5Fill size={40} style={{ color: '#acadcd' }} />
                                                        <RiSettings5Fill size={40} style={{ color: '#acadcd' }} />
                                                        <RiSettings5Fill size={40} style={{ color: '#acadcd' }} />
                                                    </div>
                                                </div>
                                                <div className="textmiddlecalific">
                                                    <p>Si deseas deja un comentario sobre tu experiencia con el vendedor:</p>
                                                </div>
                                                <textarea placeholder="Escribe un mensaje al vendedor" />
                                                <button className='GuardarFormButtonvendedor btnsendcls'>Enviar</button>
                                            </Grid>
                                        </Grid>
                                        <Grid className="contInfoProdComprCalif" item xs={12} md={5} flexDirection={'column'}>

                                            <div className='titlecalifVended'>
                                                <p>Producto vendido: </p>
                                            </div>
                                            <Grid container>
                                                <Grid item xs={12} md={4} className="contImgRighCalif" mt={'2rem'}>
                                                    <img src={`${URL_IMAGES_RESULTS}${producto.nombreimagen1}`} />
                                                </Grid>
                                                <Grid item xs={12} md={8} className="continfocalifimg" flexDirection={'column'}>
                                                    <p className="pNameProductCalif">{producto.titulonombre}</p>
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