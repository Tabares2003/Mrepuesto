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


export default function verCompra() {

    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    //PosiciónTopPage


    const router = useRouter();
    const [producto, setProducto] = useState();

    useEffect(() => {
        let productoData;

        if (router.query.producto) {
            productoData = JSON.parse(router.query.producto);
            localStorage.setItem('producto', JSON.stringify(productoData));
        } else {
            productoData = JSON.parse(localStorage.getItem('producto'));
        }

        setProducto(productoData);
    }, [router.query.producto]);

    return (
        producto ? (
            < >
                <div  >
                    <Container title="Mi Cuenta">
                        <div className="ps-page ps-page--inner" id="myaccount">
                            <div className="container">
                                <div className="ps-page__header"> </div>
                                <div className="ps-page__content ps-account">
                                    <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                        <div className='titlesformsUsers' style={{ display: 'flex' }}>
                                            <p style={{ marginRight: '2rem' }}>Mis compras  </p>
                                            <p>Ver compra</p>
                                        </div>

                                    </Grid>
                                    <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                        <Grid item xs={12} md={8} style={{ borderRight: '3px solid #EBEBEB', height: '21rem' }}>
                                            <div>
                                                <p style={{ fontSize: '30px', color: '#2D2E83' }}> {producto.estadoCompra}</p>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>Numero de compra:</p>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>{producto.numerocompra}</p>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>Fecha de compra:</p>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>{producto.fecha}</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={4} sx={{ paddingLeft: '4rem' }}>
                                            <div>
                                                <p style={{ fontSize: '30px', color: '#2D2E83' }}>{producto.nombre}</p>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>Unidades compradas:</p>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>{producto.unidadesCompradas}</p>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>Precio del producto:</p>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>${producto.precio}</p>
                                            </div>
                                            <div style={{ display: 'flex', marginBottom: '5rem' }}>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>Precio del envío:</p>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>${producto.precioEnvio}</p>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>Total:</p>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>${producto.totalConEnvío}</p>
                                            </div>
                                        </Grid>
                                    </Grid>
                                    <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                        <div style={{ width: '100%', marginBottom: '3rem' }}>
                                            <p style={{ fontSize: '30px', color: '#2D2E83' }}>Detalles de pago y envio</p>
                                        </div>
                                        <Grid item xs={12} md={8} style={{ borderRight: '3px solid #EBEBEB', height: '21rem' }}>
                                            <div style={{ display: 'flex' }}>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>Forma de pago:</p>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>{producto.formaPago}</p>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>Valor pagado:</p>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>$2.025.000</p>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>Fecha de pago:</p>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>2023-11-15</p>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>Pago exitoso</p>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>Valor pagado:</p>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>$2.025.000</p>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={4} sx={{ paddingLeft: '4rem' }}>
                                            <div>

                                                <p style={{ fontSize: '25px', color: '#2D2E83' }}>Entregado</p>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>Dirección de envío:</p>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>CR 39 #89 A 23</p>
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <p style={{ marginRight: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>Medellín, Antioquia</p>
                                            </div>
                                            <button style={{ backgroundColor: '#2C2E82', borderRadius: '10px', color: 'white', fontSize: '18px', padding: '.6rem', margin: '0 auto', width: '80%', marginTop: '2.5rem' }}>Rastrear mi envio</button>

                                        </Grid>
                                    </Grid>


                                    <Grid className="ContVendedor" container style={{ width: isMdDown ? '100%' : '90%', margin: '0 auto', marginTop: '7rem',marginBottom:'.6rem'}}>
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
                                    <Grid className="ContVendedor3" container style={{ width: isMdDown ? '100%' : '90%'  }}>
                                        <div style={{ marginBottom: '2rem' }}>
                                            <p className="titlecontVend2">Ayuda con mi compra</p>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <p style={{ fontWeight: '400', fontSize: '22px', color: '#2C2E82' }}>Tengo un problema con el producto o con el paquete que me llegó</p>
                                            <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                        </div>
                                    </Grid>
                                    <Grid className="subContVendedor2" container style={{ width: isMdDown ? '100%' : '90%', margin: '0 auto',marginBottom:'.6rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <p style={{ fontWeight: '400', fontSize: '22px', color: '#2C2E82' }}>Calificar vendedor</p>
                                            <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                        </div>
                                    </Grid>
                                    <Grid className="subContVendedor2" container style={{ width: isMdDown ? '100%' : '90%', margin: '0 auto',marginBottom:'.6rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <p style={{ fontWeight: '400', fontSize: '22px', color: '#2C2E82' }}>Calificar producto</p>
                                            <AiOutlineRight size={30} style={{ cursor: 'pointer' }} />
                                        </div>
                                    </Grid>
                                    <Grid className="UltsubContVendedor2" container style={{ width: isMdDown ? '100%' : '90%', margin: '0 auto',marginBottom:'.6rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
        ) : null
    )
}