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


export default function tengoUnProblema() {


    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const irA = useRef(null);
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);


    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);


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







    return (
        <div ref={irA}> 
                <div >
                    {producto ? (
                        <Container title="Mi Cuenta">
                            <div className="ps-page ps-page--inner" id="myaccount">
                                <div className="container">
                                    <div className="ps-page__header"> </div>
                                    <div className="ps-page__content ps-account">

                                        <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '100%', marginBottom: '20rem' }}>
                                            {isOpen ? (
                                                <Grid container>

                                                    <Grid item xs={12} md={7} sx={{ width: isMdDown ? '100%' : '90%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                                        <Grid className="ContVendedor4" container sx={{ width: isMdDown ? '100%' : '90%' }}>
                                                            <div style={{ width: '100%' }}>
                                                                <p className="titlecontVend3">¿Que pasó con tu compra?</p>
                                                            </div>
                                                        </Grid>
                                                        <Grid onClick={() => setIsOpen(false)} className="subContVendedor4" container sx={{ width: isMdDown ? '100%' : '90%' }} >
                                                            <div className="cajasProblemas">
                                                                <p className="titlesproblemas">El producto tiene defectos</p>
                                                                <AiOutlineRight size={23} style={{ cursor: 'pointer' }} />
                                                            </div>
                                                        </Grid>
                                                        <Grid className="subContVendedor4" container sx={{ width: isMdDown ? '100%' : '90%' }}>
                                                            <div className="cajasProblemas">
                                                                <p className="titlesproblemas">La compra llegó incompleta</p>
                                                                <AiOutlineRight size={23} style={{ cursor: 'pointer' }} />
                                                            </div>
                                                        </Grid>
                                                        <Grid className="subContVendedor4" container sx={{ width: isMdDown ? '100%' : '90%' }}>
                                                            <div className="cajasProblemas">
                                                                <p className="titlesproblemas">Mi compra es diferente al producto recibido</p>
                                                                <AiOutlineRight size={23} style={{ cursor: 'pointer' }} />
                                                            </div>
                                                        </Grid>
                                                        <Grid className="subContVendedor4" container sx={{ width: isMdDown ? '100%' : '90%' }}>
                                                            <div className="cajasProblemas">
                                                                <p className="titlesproblemas">Yo no realicé la compra</p>
                                                                <AiOutlineRight size={23} style={{ cursor: 'pointer' }} />
                                                            </div>
                                                        </Grid>
                                                        <Grid className="subContVendedorUlt" container sx={{ width: isMdDown ? '100%' : '90%' }} >
                                                            <div className="cajasProblemas">
                                                                <p className="titlesproblemas">Recibí el producto pero lo quiero devolver</p>
                                                                <AiOutlineRight size={23} style={{ cursor: 'pointer' }} />
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={12} md={5} sx={{ borderLeft: '3px solid #E1E2EC', height: '50%', paddingLeft: '2rem', display: 'flex', }}>
                                                        <Grid item xs={12} md={4} sx={{ border: '4px solid #EBEBEB', borderRadius: '12px', height: '16rem', display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                                            <img src={`${URL_IMAGES_RESULTS}${producto.nombreimagen1}`} style={{ width: '150px', height: '150px' }} />
                                                        </Grid>
                                                        <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', marginTop: '2rem', paddingLeft: '2.5rem' }}>
                                                            <p style={{ fontSize: '20px', color: '#2D2E83', fontWeight: '600' }}>{producto.titulonombre}</p>
                                                            <div style={{ display: 'flex' }}>
                                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>Unidades compradas:</p>
                                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>{producto.cantidad}</p>
                                                            </div>
                                                            <div style={{ display: 'flex' }}>
                                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>Precio del producto:</p>
                                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>{producto.preciodeventa}</p>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            ) : (
                                                <Grid container>
                                                    <div className='titleTproblema'>
                                                        <p>Cuentanos qué pasó con tu compra</p>
                                                    </div>
                                                    <Grid item xs={12} md={7} sx={{ width: isMdDown ? '100%' : '90%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                                                        <Grid container sx={{ width: isMdDown ? '100%' : '85%' }}>
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
                                                        </Grid>

                                                    </Grid>
                                                    <Grid item xs={12} md={5} sx={{ borderLeft: '3px solid #E1E2EC', height: '27%', paddingLeft: '2rem', display: 'flex', }}>
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
                                                    <Grid item xs={12} md={7} sx={{ width: isMdDown ? '100%' : '90%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: '9rem', marginBottom: '5rem' }}>
                                                        <div className='titleTproblema' >
                                                            <p>Agregar fotos del producto o del paquete</p>
                                                        </div>
                                                        <Grid container sx={{
                                                            width: isMdDown ? '100%' : '85%',
                                                            border: '4px solid #EBEBEB',
                                                            borderRadius: '12px',
                                                            height: '25rem',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            position: 'relative'
                                                        }}>
                                                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                                                <IoSquareOutline size={94} style={{ color: '#2D2E83' }} />
                                                            </div>
                                                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                                                <IoIosCamera size={42} style={{ color: '#2D2E83' }} />
                                                            </div>
                                                        </Grid>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <p style={{ fontSize: '18px', color: '#2D2E83' }}>- Cada imagen debe pesar máximo 800KB</p>
                                                            <p style={{ fontSize: '18px', color: '#2D2E83' }}>- Tus imagenes debens ser en formato jpg, jpeg o png</p>
                                                        </div>

                                                    </Grid>
                                                    <Grid item xs={12} md={7} sx={{ width: isMdDown ? '100%' : '90%', display: 'flex', marginTop: '3rem', }}>
                                                        <Grid item xs={12} md={4}>

                                                        </Grid>
                                                        <Grid item xs={12} md={8}>
                                                            <Box display="flex" justifyContent="space-between"  sx={{width:'80%'}}>
                                                                <button className='CancelarFormButton'>Cancelar</button>
                                                                <button className='GuardarFormButton'>Enviar</button>
                                                            </Box>

                                                        </Grid>
                                                    </Grid>

                                                </Grid>
                                            )}
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