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
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { RiSettings5Fill } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";




export default function calificarProducto() {

    const [confirmationOpen, setConfirmationOpen] = useState(false); //Modal de confirmación si ingresó los datos
    const [showCalificacionModal, setShowCalificacionModal] = useState(false); //Modal que avisa si no puso calificación
    const [showComentarioModal, setShowComentarioModal] = useState(false);//Modal que avisa si no puso comeents
    const [showAmbosModal, setShowAmbosModal] = useState(false);//Modal que avisa si no puso nada

    const [calificacionSeleccionada, setCalificacionSeleccionada] = useState(0);
    const [comentario, setComentario] = useState("");

    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const irA = useRef(null);
    const router = useRouter();
    const contadorCaracteres = `${comentario.length}/180`;

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


    //router push si los datos son colocados correctamente sale esto en el dialog
    const handleConfirmationSuccess = (route) => () => {
        router.push(route);
    };

    //handlechange calificación
    const handleCalificacionIconClick = (calificacion) => {
        setCalificacionSeleccionada(calificacion);
    };

    //handlechange de comentario con max 180 caracteres
    const handleComentarioChange = (event) => {
        const nuevoComentario = event.target.value.slice(0, 180); // Limitar a 180 caracteres
        setComentario(nuevoComentario);
    };

    //envío calificación vendedor con mvalidaciones
    const enviarCalificacion = async () => {
        if (!calificacionSeleccionada && !comentario) { //modal si no puso nada
            setShowAmbosModal(true);
            return;
        }

        if (!calificacionSeleccionada) {  //modal si no puso calificacion
            setShowCalificacionModal(true);
            return;
        }

        if (!comentario) {  //modal si no puso comment
            setShowComentarioModal(true);
            return;
        }

        const compatible = producto.compatible; //recupera el compatible del usuario por medio de producto.compatible

        const nuevaCalificacion = { //envia la calificacion al endpoint
            compatible,
            calificacion: calificacionSeleccionada,
            comentario,
        };

        try {
            const response = await axios.post(`${URL_BD_MR}47`, nuevaCalificacion);
            console.log("Respuesta del servidor:", response.data);

            setConfirmationOpen(true);
            // Actualizar lógica adicional según sea necesario
        } catch (error) {
            console.error('Error al enviar la calificación:', error);
        }
    };


























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
                                                <p>Calificar producto</p>
                                            </div>
                                            <Grid className="calificSubC" item xs={12} md={12} sx={{ width: isMdDown ? '100%' : '90%' }} flexDirection={'column'} >
                                                <form style={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
                                                    <p>Elige de uno a cinco la calificación para tu vendedor, siendo uno lo más bajo y cinco lo más alto:</p>
                                                    <div className="SubContcalificSubC">
                                                        <div className="notanumero">
                                                            <p>{calificacionSeleccionada.toFixed(1)}</p>
                                                        </div>
                                                        <div className="iconsConfig">
                                                            {[1, 2, 3, 4, 5].map((valoracion, index) => (
                                                                <RiSettings5Fill
                                                                    key={index}
                                                                    size={40}
                                                                    style={{
                                                                        color: valoracion <= calificacionSeleccionada ? '#2C2E82' : '#acadcd', cursor: 'pointer'
                                                                    }}
                                                                    onClick={() => handleCalificacionIconClick(valoracion)}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="textmiddlecalific">
                                                        <p>Si deseas deja un comentario sobre tu experiencia con el vendedor:</p>
                                                    </div>
                                                    <div>
                                                        <textarea
                                                            value={comentario}
                                                            onChange={handleComentarioChange}
                                                            placeholder="Escribe un mensaje al vendedor"
                                                            style={{ height: '160px', width: '100%', resize: 'none' }}
                                                        />
                                                        <div style={{ textAlign: 'right', marginTop: '0.5rem', color: '#2C2E82', fontSize: '14px' }}>
                                                            {contadorCaracteres}
                                                        </div>
                                                    </div>
                                                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '3rem' }}>
                                                        <button
                                                            style={{
                                                                width: '170px', // Ajusté el valor de ancho
                                                                backgroundColor: '#2D2E83',
                                                                color: 'white',
                                                                borderRadius: '10px',
                                                                fontSize: '16px',
                                                                height: '40px'
                                                            }}
                                                            onClick={enviarCalificacion}
                                                            type="button"
                                                        >
                                                            Enviar
                                                        </button>
                                                    </div>
                                                </form>
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
                                                        <ModalMensajes
                                                            shown={showCalificacionModal}
                                                            close={() => setShowCalificacionModal(false)}
                                                            titulo="Calificación"
                                                            mensaje="Por favor, elige una calificación."
                                                            tipo="error"
                                                        />
                                                        <ModalMensajes
                                                            shown={showComentarioModal}
                                                            close={() => setShowComentarioModal(false)}
                                                            titulo="Comentario"
                                                            mensaje="Por favor, deja un comentario sobre tu experiencia."
                                                            tipo="error"
                                                        />
                                                        <ModalMensajes
                                                            shown={showAmbosModal}
                                                            close={() => setShowAmbosModal(false)}
                                                            titulo="Calificación y Comentario"
                                                            mensaje="Por favor, elige una calificación y deja un comentario sobre tu experiencia."
                                                            tipo="error"
                                                        />
                                                        <Dialog
                                                            className='dialogDatsGuardados'
                                                            open={confirmationOpen}
                                                            PaperProps={{
                                                                style: {
                                                                    width: isMdDown ? '80%' : '35%',
                                                                    backgroundColor: 'white',
                                                                    border: '2px solid gray',
                                                                    padding: '1.4rem',
                                                                    borderRadius: '10px'
                                                                },
                                                            }}
                                                        >
                                                            <DialogTitle className='dialogtitleDtsGUardados' >
                                                                <FaCheckCircle size={37} style={{ color: '#10c045', marginLeft: '-17px', marginRight: '8px' }} />
                                                                <p className='dialogtituloP'>¡Calificación enviada con exito!</p>
                                                            </DialogTitle>
                                                            <DialogContent className='dialogContentDatsGuardados'>
                                                                <p className='PdialogContent'>Tus comentarios fueron enciados con exito. Se verán reflejados un unos minutos.</p>
                                                            </DialogContent>
                                                            <DialogActions className='DialogActionsDatsGuardados'>
                                                                <div className='div1buttonDialog' >
                                                                    <button className='button2DialogDatsGuardados' onClick={handleConfirmationSuccess('./misCompras')} >
                                                                        Ir a mis compras
                                                                    </button>
                                                                </div>
                                                                <div className='div1buttonDialog' >
                                                                    <button className='button1DialogDatsGuardados' onClick={handleConfirmationSuccess('/')} >
                                                                        Ir al inicio
                                                                    </button>
                                                                </div>
                                                            </DialogActions>
                                                        </Dialog>
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