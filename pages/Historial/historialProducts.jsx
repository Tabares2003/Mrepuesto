import Container from "../../components/layouts/Container"
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, InputAdornment, TextField, InputBase } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import { Dropdown } from "react-bootstrap";
import { NextRouter } from "next/router";
import productos from "../../utilities/producsQuemados";
import { useNavigate } from "react-router-dom";
import { Router } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { FaTrashAlt } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";





export default function historialProducts() {






    useEffect(() => {
        // Define una función asíncrona para obtener los datos del usuario
        const leerDatosUsuario = async () => {
            // Define los parámetros para la solicitud
            let params = {
                usuario: "1652703118227",
            };

            // Realiza una solicitud POST a tu endpoint
            await axios({
                method: "post",
                url: URL_BD_MR + "86",
                params,
            })
                .then((res) => {
                    // Si la solicitud es exitosa, mapea los datos del usuario
                    const productos = res.data.tolistallmyposts.map((producto) => {
                        return {
                            id: producto.id,
                            idproducto: producto.idproducto,
                            compatible: producto.compatible,
                            usuario: producto.usuario,
                            fechacreacion: producto.fechacreacion,
                            titulonombre: producto.titulonombre,
                            precio: producto.precio,
                            numerodeunidades: producto.numerodeunidades,
                            nombreimagen1: producto.nombreimagen1,
                        };
                    });
                    setDatosUsuarioOriginales(productos);
                    productos.sort((a, b) => new Date(b.fechacreacion) - new Date(a.fechacreacion));
                    console.log(productos); // Imprime los datos en la consola
                    setDatosUsuario(productos);
                })
                .catch(function (error) {
                    // Si ocurre un error, registra el error en la consola
                    console.error("Error al leer los datos del usuario", error);
                });
        };
        leerDatosUsuario();
    }, []);

    const [datosUsuario, setDatosUsuario] = useState([]);























    const [selectedSortOption, setSelectedSortOption] = useState(null);
    const [compras, setCompras] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

    const router = useRouter();



    //PosiciónTopPage
    const irA = useRef(null);


    const [datosUsuarioOriginales, setDatosUsuarioOriginales] = useState([]);


    const handleSelect = (eventKey) => {
        // Actualiza el estado para almacenar la opción seleccionada
        setSelectedSortOption(eventKey);

        // Ordena los productos según la opción seleccionada
        let productosOrdenados;
        const hoy = new Date();
        switch (eventKey) {
            case "Última semana":
                productosOrdenados = datosUsuarioOriginales.filter(producto => {
                    const fechaProducto = new Date(producto.fechacreacion);
                    const unaSemanaAtras = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 7);
                    return fechaProducto >= unaSemanaAtras;
                });
                break;
            case "Últimos 15 días":
                productosOrdenados = datosUsuarioOriginales.filter(producto => {
                    const fechaProducto = new Date(producto.fechacreacion);
                    const quinceDiasAtras = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 15);
                    return fechaProducto >= quinceDiasAtras;
                });
                break;
            case "Último mes":
                productosOrdenados = datosUsuarioOriginales.filter(producto => {
                    const fechaProducto = new Date(producto.fechacreacion);
                    const unMesAtras = new Date(hoy.getFullYear(), hoy.getMonth() - 1, hoy.getDate());
                    return fechaProducto >= unMesAtras;
                });
                break;
            case "Últimos dos meses":
                productosOrdenados = datosUsuarioOriginales.filter(producto => {
                    const fechaProducto = new Date(producto.fechacreacion);
                    const dosMesesAtras = new Date(hoy.getFullYear(), hoy.getMonth() - 2, hoy.getDate());
                    return fechaProducto >= dosMesesAtras;
                });
                break;
            case "Últimos seis meses":
                productosOrdenados = datosUsuarioOriginales.filter(producto => {
                    const fechaProducto = new Date(producto.fechacreacion);
                    const seisMesesAtras = new Date(hoy.getFullYear(), hoy.getMonth() - 6, hoy.getDate());
                    return fechaProducto >= seisMesesAtras;
                });
                break;
            default:
                productosOrdenados = [...datosUsuarioOriginales];
        }
        setDatosUsuario(productosOrdenados);
    };

    const CustomDropdownButton = React.forwardRef(({ children, onClick }, ref) => (
        <button
            ref={ref}
            onClick={onClick}
            className="dropdowncustomMiscomprasPersButton"
        >
            {selectedSortOption ? `${selectedSortOption}` : "Ordenar por"}
        </button>
    ));


    const [busqueda, setBusqueda] = useState("");

    const handleSearch = (event) => {
        setBusqueda(event.target.value);
    };

    useEffect(() => {
        let productosFiltrados = datosUsuarioOriginales;
        if (busqueda !== "") {
            const palabrasBusqueda = busqueda.toLowerCase().split(" ");
            productosFiltrados = datosUsuarioOriginales.filter(producto => {
                const titulonombreMinusculas = producto.titulonombre.toLowerCase();
                return palabrasBusqueda.every(palabra => titulonombreMinusculas.includes(palabra));
            });
        }
        setDatosUsuario(productosFiltrados);
    }, [busqueda, datosUsuarioOriginales]);








    //Obtener datos de mis compras

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`${URL_BD_MR}81`);
                // Formatear todas las fechas antes de establecerlas en el estado, simplemente quitarle los Ceros
                const comprasFormateadas = response.data.listarcompras.map((compra) => ({
                    ...compra,
                    fechacompra: compra.fechacompra.slice(0, 10),
                    fechaentrega: compra.fechaentrega.slice(0, 10),
                    fechadespacho: compra.fechadespacho.slice(0, 10),
                    fechadepago: compra.fechadepago.slice(0, 10),

                    // Sumar preciodeventa y precioenvio y guardar en nueva propiedad
                    nuevoValor: compra.preciodeventa + compra.precioenvio,
                }));


                setCompras(comprasFormateadas);
            } catch (error) {
                console.error('Error al obtener datos:', error);
            }
        };

        fetchData();
    }, [URL_BD_MR]);







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
                                    <Grid className="contDataUsers conTopH" container >
                                        <p>Tu historial</p>
                                        <div>

                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={6} className='titleHistorial1' >
                                        <div className="DeleteHistorial">
                                            <p>Eliminar historial</p>
                                            <FaTrashAlt className="iconDeleteHistorial" />
                                        </div>

                                    </Grid>
                                    <Grid item xs={12} md={6} className='titleHistorial '>
                                        <div className="ContTopHistorial">
                                            <Dropdown style={{ width: '30%' }} onSelect={handleSelect} className="DropHistorial">
                                                <Dropdown.Toggle
                                                    as={CustomDropdownButton}
                                                    id="dropdown-basic"
                                                >
                                                    {selectedSortOption ? `Ordenar por ${selectedSortOption}` : "Ordenar por"}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu className="tamañocajaoptionsHistorial">
                                                    <Dropdown.Item
                                                        eventKey="Última semana"
                                                        className="itemsdropdownTdocPersona"
                                                    >
                                                        Última semana
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        eventKey="Últimos 15 días"
                                                        className="itemsdropdownTdocPersona"
                                                    >
                                                        Últimos 15 días
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        eventKey="Último mes"
                                                        className="itemsdropdownTdocPersona"
                                                    >
                                                        Último mes
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        eventKey="Últimos dos meses"
                                                        className="itemsdropdownTdocPersona"
                                                    >
                                                        Últimos dos meses
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                        eventKey="Últimos seis meses"
                                                        className="itemsdropdownTdocPersona"
                                                    >
                                                        Últimos seis meses
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <InputBase
                                                placeholder="Buscar en mi historial"
                                                sx={{
                                                    borderRadius: '10px',
                                                    backgroundColor: '#f1f2f6',
                                                    padding: '8px',
                                                    width: '300px',
                                                    marginRight: '8px',
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
                                                onChange={handleSearch}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <SearchIcon style={{ fontSize: 30, color: '#3E4089' }} />
                                                    </InputAdornment>
                                                }
                                            />
                                        </div>
                                    </Grid>
                                    <Grid className="contProductsHistorial" container style={{ width: '100%' }}>
                                        <div className="ProducsH">
                                            {datosUsuario.length > 0 ? (
                                                datosUsuario.map((producto) => (
                                                    <div className="ContProductHistorial" key={producto.id}>
                                                        <img src={`${URL_IMAGES_RESULTS}${producto.nombreimagen1}`} alt={producto.titulonombre} />
                                                        <div className="DataProductHistorial">
                                                            <p className="ProductName">{producto.titulonombre}</p>
                                                            <p>${producto.fechacreacion}</p>
                                                        </div>
                                                        <div className="iconsHistorial">
                                                            <div className="iconsHrl">
                                                                <div className="icon1Delete">
                                                                    <FaTrashAlt className="iconDeleteH" />
                                                                </div>
                                                                <div className="icon1Delete">
                                                                    <IoMdHeartEmpty className="iconFavH" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No se encontraron productos.</p>
                                            )}
                                        </div>
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