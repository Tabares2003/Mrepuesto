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
import { SlPaperClip } from "react-icons/sl";
import { LuSendHorizonal } from "react-icons/lu";
//import { URL_BD_MR } from "../../helpers/Constants";



export default function msjVendedor() {


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


    const scrollRef = useRef(null);
    const [fechacreacion, setFechacreacion] = useState(null);
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const usuarioenvia = '1653147206453'; // Tu UID de usuario
    const usuariorecibe = '1653147206453'; // UID del vendedor
    const URL_BD_MR = 'https://gimcloud.com.co/mrp/api/';

    // Función para enviar un mensaje
    const sendMessage = async () => {
        const estado = 32; // Estado pendiente por revisión y/o aprobación MR

        const nuevoMensaje = {
            usuarioenvia,
            usuariorecibe,
            fechacreacion,
            estado,
            comentario: inputMessage,
            observacionintera: '',
            nombreimagen1: '',
            nombreimagen2: '',
            nombreimagen3: '',
            nombreimagen4: '',
            nombreimagen5: ''
        };

        try {
            // Enviar el mensaje
            await axios.post(`${URL_BD_MR}83`, nuevoMensaje);

            // Actualizar la lista de mensajes después de enviar
            setMessages((prevMessages) => {
                if (!Array.isArray(prevMessages)) {
                    // Si prevMessages no es un array, devolvemos un array con el nuevo mensaje
                    return [nuevoMensaje];
                }
                // Si prevMessages es un array, agregamos el nuevo mensaje
                return [...prevMessages, nuevoMensaje];
            });

            // Limpiar el campo de entrada después de enviar
            setInputMessage('');
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
        }
    };

    // Función para leer mensajes
    const leerMensajes = async () => {
        let params = {
            estado: 32,
        };

        try {
            const response = await axios({
                method: 'post',
                url: `${URL_BD_MR}84`,
                params,
            });

            const mensajes = response.data.listarmensajes;

            // Actualizar el estado con los mensajes recibidos
            setMessages(mensajes);
        } catch (error) {
            console.error('Error leyendo mensajes:', error);
        }
    };

    // Efecto para cargar mensajes al montar y actualizar
    useEffect(() => {
        leerMensajes();
    }, []);



    const messagesRef = useRef(null);

    // Función para desplazar hacia abajo cuando se actualizan los mensajes
    const scrollToBottom = () => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    };

    useEffect(() => {
        // Desplázate hacia abajo cuando el componente se monta o cuando los mensajes se actualizan
        scrollToBottom();
    }, [messages]);

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
                                                <p>Contactar con el vendedor</p>
                                            </div>
                                            <Grid container className="calificSubC contPrincMsjVend" item xs={12} md={12} sx={{ width: isMdDown ? '100%' : '90%' }} flexDirection={'column'} >
                                                <div className="fstdivmsjV">
                                                    <p>{producto.nombres}</p>
                                                </div>
                                                <div className="diaMsj">
                                                    <p>Hoy</p>
                                                </div>

                                                <div className="contMensajes" ref={messagesRef}>
                                                    {Array.isArray(messages) && messages.length > 0 ? (
                                                        messages.slice(0).reverse().map((message, index) => (
                                                            <div className="MsjVendedor" key={index}  >
                                                                <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                                                                    <div className="namevendedor">
                                                                        <div className="BallNamEv">
                                                                            <p>JR</p>
                                                                        </div>
                                                                    </div>
                                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                        <div className="msjVendedor2">
                                                                            {message.comentario}
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                                <div style={{ width: '100%', display: 'flex', marginTop: '-1.5rem' }}>
                                                                    <div style={{ width: '12%' }}></div>
                                                                    <div style={{ width: '88%' }}>
                                                                        <div style={{ width: '88%' }}>
                                                                            <p style={{ fontSize: '16px' }}>{message.fechacreacion ? message.fechacreacion.slice(11, 16) : ''}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div>No hay mensajes disponibles</div>
                                                    )}
                                                </div>
                                                <div className="inputandsendMsjVendedor">
                                                    <div style={{ width: '10%', height: '4rem', display: 'flex', justifyContent: 'center' }}>
                                                        <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: '50%', width: '40px', }}>
                                                            <SlPaperClip size={19} style={{ color: '#2D2E83' }} />
                                                        </div>
                                                    </div>
                                                    <div style={{ width: '80%' }}>
                                                        <input
                                                            value={inputMessage}
                                                            onChange={(e) => setInputMessage(e.target.value)}
                                                            type="text"
                                                            placeholder="Escribe un mensaje al vendedor"
                                                            style={{ width: '100%', borderRadius: '12px', fontSize: '14px', padding: '1rem', backgroundColor: 'white' }}
                                                        />
                                                    </div>
                                                    <div style={{ width: '10%', height: '4rem', display: 'flex', justifyContent: 'center' }}>
                                                        <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: '50%', width: '40px', }}>
                                                            <LuSendHorizonal size={25} style={{ color: '#2D2E83', cursor: inputMessage.trim() ? 'pointer' : 'not-allowed' }} onClick={inputMessage.trim() ? sendMessage : undefined} />
                                                        </div>
                                                    </div>
                                                </div>
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