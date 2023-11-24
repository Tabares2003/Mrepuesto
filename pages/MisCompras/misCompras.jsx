import Container from "../../components/layouts/Container"
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, InputAdornment, TextField, InputBase } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import { Dropdown } from "react-bootstrap";
import { NextRouter } from "next/router";
import productos from "./producsQuemados";
import { useNavigate } from "react-router-dom";
import { Router } from 'next/router';


const CustomDropdownButton = React.forwardRef(({ children, onClick }, ref) => (
    <button
        ref={ref}
        onClick={onClick}
        className="dropdowncustomMiscomprasPersButton"
    >
        {children}
    </button>
));



export default function misCompras() {


    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));


    const [productosFiltrados, setProductosFiltrados] = useState(productos);
    const [selectedItem, setSelectedItem] = useState('Ordenar por');
    const [fechaproduct, setFechaproduct] = useState(false);
    const [searchText, setSearchText] = useState('');
    const router = useRouter();

    const handleSelect = (eventKey, event) => {
        setSelectedItem(eventKey);

        // Filtrar productos por fecha
        if (eventKey === 'Más antiguo') {
            setProductosFiltrados([...productos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha)));
        } else if (eventKey === 'Más reciente') {
            setProductosFiltrados([...productos].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)));
        }

        setFechaproduct(true);
    };




    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();

        // Filtrar productos por nombre
        const filteredProducts = productos.filter((producto) =>
            producto.nombre.toLowerCase().includes(searchTerm)
        );

        setProductosFiltrados(filteredProducts);
        setSearchText(searchTerm);
    };



    const verProducto = (producto) => {
        router.push({
            pathname: './verCompra',
            query: { producto: JSON.stringify(producto) },
        });
    }










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
                                <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <div className='titlesformsUsers'>
                                        <p>Mis compras</p>
                                    </div>
                                </Grid>
                                <Grid className="contDataUsers TopContMisCompras" container style={{ width: isMdDown ? '100%' : '90%' }}>
                                    <Grid item xs={12} md={6}>
                                        <InputBase
                                            onChange={handleSearch}
                                            value={searchText}
                                            placeholder="Buscar en mis compras"
                                            sx={{
                                                borderRadius: '20px',
                                                backgroundColor: '#E1E2EC',
                                                padding: '8px',
                                                marginRight: '8px',
                                                width: '90%',
                                                height: '44px',
                                                padding: '10px',
                                                fontSize: '16px',
                                                paddingLeft: '3rem',
                                                color: '#2C2E82',
                                                fontWeight: '500',
                                                '&::placeholder': {
                                                    color: '#3E4089',
                                                    fontWeight: '600',
                                                },
                                            }}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <SearchIcon style={{ fontSize: 30, color: '#3E4089' }} />
                                                </InputAdornment>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Dropdown style={{ width: '40%' }} onSelect={handleSelect}>
                                            <Dropdown.Toggle
                                                as={CustomDropdownButton}
                                                id="dropdown-basic"
                                            >
                                                {selectedItem}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="tamañocajaoptionsTdocPersona">
                                                <Dropdown.Item eventKey="Más antiguo" className="itemsdropdownTdocPersona">Más antiguo</Dropdown.Item>
                                                <Dropdown.Item eventKey="Más reciente" className="itemsdropdownTdocPersona">Más reciente</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Grid>
                                </Grid>

                                <Grid className="contProdcOMPR" container style={{ width: isMdDown ? '100%' : '90%', marginTop: '2rem' }}>
                                    {/* Mostrar productos */}
                                    {productosFiltrados.length > 0 ? (
                                        productosFiltrados.map((producto, index) => (
                                            <Grid key={index} className="productComprado" container>
                                                <Grid item xs={12} md={9} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                                    <Grid xs={5} md={6} sx={{ border: '4px solid #EBEBEB', borderRadius: '12px', height: '19rem', display: 'flex', justifyContent: 'center' }}>
                                                        <img src={producto.Image} alt={producto.nombre} style={{ width: '200px', height: '200px' }} />
                                                    </Grid>

                                                    <Grid container>
                                                        <Grid item xs={12} md={9}>
                                                            <Grid sx={{ display: 'flex', paddingLeft: '2rem', flexDirection: 'column' }}>
                                                                <p style={{ fontSize: '24px', color: '#2D2E83', fontWeight: '700' }}>{producto.estadoCompra}</p>
                                                                <p style={{ fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>{producto.nombre}</p>
                                                                <div style={{ display: 'flex' }}>
                                                                    <p style={{ fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>Unidades compradas:</p>
                                                                    <p style={{ marginLeft: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>{producto.unidadesCompradas}</p>
                                                                </div>
                                                                <div style={{ display: 'flex' }}>
                                                                    <p style={{ fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}> Número de compra:</p>
                                                                    <p style={{ marginLeft: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>{producto.numerocompra}</p>
                                                                </div>
                                                                <p style={{ fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>{producto.fecha}</p>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={12} md={3} sx={{ display: 'flex', paddingLeft: '2rem', paddingTop: '2rem', paddingRight: '2rem', justifyContent: 'flex-end', borderRight: { md: '3px solid #EBEBEB', xs: 'none' } }}>
                                                            {/* Contenido del segundo subcontenedor */}
                                                            <p style={{ fontSize: '18px', color: '#2D2E83', fontWeight: '700' }}>${producto.precio}</p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '1.5rem', alignItems: 'center' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <p style={{ marginBottom: '5px', fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>{producto.nombreVendedor}</p>
                                                        <p style={{ fontSize: '18px', color: '#2D2E83', fontWeight: '500' }}>Enviar mensaje al vendedor</p>
                                                    </div>
                                                    <div style={{ marginTop: '3rem', width: '100%' }}>
                                                        <button onClick={() => verProducto(producto)} style={{ backgroundColor: '#2C2E82', borderRadius: '10px', color: 'white', fontSize: '16px', padding: '.6rem', margin: '0 auto', width: '100%' }}>Ver compra</button>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        ))
                                    ) : (
                                        <p>No se encontraron resultados</p>
                                    )}
                                </Grid>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
} 