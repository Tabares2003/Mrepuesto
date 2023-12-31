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
import { RiSettings5Fill } from "react-icons/ri";
import { SlPaperClip } from "react-icons/sl";
import { LuSendHorizonal } from "react-icons/lu";
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../helpers/Constants";
import { IoMdClose } from "react-icons/io";

import shortid from "shortid";

export default function msjVendedor() {


    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const irA = useRef(null);
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const scrollRef = useRef(null);
    const [fechacreacion, setFechacreacion] = useState(null);
    // Estado para almacenar el nombre de la imagen
    const [imageName, setImageName] = useState('');
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const messagesRef = useRef(null);



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

    //poner primeras letras en perfil de usuario sin espacios
    let primerasLetras = ''
    if (producto && producto.nombres) {
        primerasLetras = producto.nombres.split(' ').map(palabra => palabra[0]).join('');
    }


    //cerrar modal si no hay nada en el input
    const handleModalClose = () => {
        setShowModal(false);
    };
    //TopPage
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);


    // Función para validar el mensaje
    const validarMensaje = () => {
        // Validación del textarea
        if (!inputMessage.trim()) {
            setTituloMensajes('Validación de mensaje');
            setTextoMensajes('Debes rellenar el formulario del mensaje.');
            setShowModal(true);
            return false;
        }

        // Nueva validación para palabras no permitidas
        let validaword = [
            { word: "www" },
            { word: "carrera" },
            { word: "avenida" },
            { word: "#" },
            { word: "N°" },
            { word: "@" },
            { word: ".com" },
            { word: ".co" },
            { word: ".net" },
            { word: "contactanos" },
            { word: "contacto" },
            { word: "llama" },
            { word: "llamar" },
            { word: "telefono" },
            { word: "celular" },
            { word: "movil" },
            { word: "email" },
            { word: "gmail" },
            { word: "calle" },
            { word: "call" },
            { word: "cra" },
        ];

        // Dividir el comentario en palabras
        const palabrasComentario = inputMessage.split(' ');

        for (let i = 0; i < validaword.length; i++) {
            if (palabrasComentario.includes(validaword[i].word)) {
                setTituloMensajes('Validación de mensaje');
                setTextoMensajes('Tu mensaje contiene palabras o caracteres no permitidos.');
                setShowModal(true);
                return false;
            }
        }

        // Nueva validación para números y el carácter "@"
        let validacaracteres;

        for (let i = 0; i < palabrasComentario.length; i++) {
            let palabra = palabrasComentario[i];
            let valornum = "";
            for (var j = 0; j < palabra.length; j++) {
                validacaracteres = palabra.substr(j, 1);

                if (
                    validacaracteres == 0 ||
                    validacaracteres == 1 ||
                    validacaracteres == 2 ||
                    validacaracteres == 3 ||
                    validacaracteres == 4 ||
                    validacaracteres == 5 ||
                    validacaracteres == 6 ||
                    validacaracteres == 7 ||
                    validacaracteres == 8 ||
                    validacaracteres == 9
                ) {
                    valornum = valornum + validacaracteres;
                }

                if (valornum.length > 5) {
                    setTituloMensajes('Validación de mensaje');
                    setTextoMensajes('Tu mensaje contiene palabras o caracteres no permitidos.');
                    setShowModal(true);
                    return false;
                }

                if (validacaracteres == "@") {
                    setTituloMensajes('Validación de mensaje');
                    setTextoMensajes('Tu mensaje contiene palabras o caracteres no permitidos.');
                    setShowModal(true);
                    return false;
                }
            }
        }

        return true;
    };





    // Función para enviar un mensaje
    const sendMessage = async () => {
        const usuariorecibe = '1653147206453'; // UID del vendedor
        const estado = 32; // Estado pendiente por revisión y/o aprobación MR
        const usuarioenvia = producto.usuario;

        const nuevoMensaje = {
            usuarioenvia,
            usuariorecibe,
            fechacreacion,
            estado,
            comentario: inputMessage,
            observacionintera: '',
            nombreimagen1: imageName,
            nombreimagen2: '',
            nombreimagen3: '',
            nombreimagen4: '',
            nombreimagen5: '',
            imagen1: selectedImage
        };

        await axios({
            method: "post",
            url: `${URL_BD_MR}83`,
            params: nuevoMensaje,
        })
            .then((res) => {
                console.log("Respuesta del servidor:", res.data);

                // Actualizar la lista de mensajes después de enviar
                setMessages((prevMessages) => {
                    if (!Array.isArray(prevMessages)) {
                        // Si prevMessages no es un array, devolvemos un array con el nuevo mensaje
                        return [nuevoMensaje];
                    }
                    // Si prevMessages es un array, agregamos el nuevo mensaje
                    return [...prevMessages, nuevoMensaje];
                });

                // Desplazarse hacia abajo
                scrollToBottom();

                // Limpiar el campo de entrada después de enviar
                setInputMessage('');
                setImageName(''); // Restablecer el nombre de la imagen
                setSelectedImage(null); // Restablecer la imagen seleccionada
                // Leer los mensajes nuevamente para obtener la fecha y hora del servidor
                leerMensajes();
            })
            .catch((error) => {
                console.error('Error al enviar el mensaje:', error);
            });
    };


    // Función para enviar un mensaje
    const manejarEnvioMensaje = () => {
        if (validarMensaje()) {
            sendMessage();
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

            // Ordenar los mensajes por fecha de creación
            const mensajesOrdenados = mensajes.sort((a, b) => new Date(a.fechacreacion) - new Date(b.fechacreacion));

            // Actualizar el estado con los mensajes recibidos
            setMessages(mensajesOrdenados);

        } catch (error) {
            console.error('Error leyendo mensajes:', error);
        }
    };

    // Efecto para cargar mensajes al montar y actualizar
    useEffect(() => {
        leerMensajes();
    }, []);








    // Función para desplazar hacia abajo cuando se actualizan los mensajes
    const scrollToBottom = () => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        // Desplázate hacia abajo cuando el componente se monta o cuando los mensajes se actualizan
        scrollToBottom();
    }, [messages]);





    // Función para manejar la subida de la imagen 

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            // Convertir la imagen a base64
            const base64Image = reader.result;

            // Generar un ID único para la imagen
            let uniqueImageName = shortid.generate();
            uniqueImageName = uniqueImageName.substring(0, 11);

            // Almacenar la imagen en localStorage con el nuevo nombre
            localStorage.setItem(uniqueImageName, base64Image);

            // Actualizar el estado con la imagen seleccionada
            setSelectedImage(base64Image);
        };

        if (file) {
            const allowedFileTypes = ['image/jpeg', 'image/png'];
            const maxImageSize = 819200; // 800 KB in bytes
            const maxImageWidth = 1024;
            const maxImageHeight = 1024;

            if (allowedFileTypes.includes(file.type)) {
                if (file.size > maxImageSize) {
                    setShowModal(true);
                    setTituloMensajes('Tamaño incorrecto');
                    setTextoMensajes('Las imágenes deben pesar máximo 800 KB.');
                    return;
                }

                const image = new Image();
                image.src = URL.createObjectURL(file);

                // Esperar a que la imagen cargue antes de realizar las validaciones
                await new Promise(resolve => {
                    image.onload = resolve;
                });

                const imageWidth = image.width;
                const imageHeight = image.height;

                if (imageWidth > maxImageWidth || imageHeight > maxImageHeight) {
                    setShowModal(true);
                    setTituloMensajes('Dimensiones incorrectas');
                    setTextoMensajes(`Las dimensiones de las imágenes deben ser como máximo ${maxImageWidth} x ${maxImageHeight}.`);
                    return;
                }

                // Si la imagen pasa todas las validaciones, actualiza el estado
                setImageName(file.name);
                // Ahora puedes mostrar el nombre de la imagen en el input
                setInputMessage(file.name);

                // Leer la imagen como una URL de datos
                reader.readAsDataURL(file);
            } else {
                setShowModal(true);
                setTituloMensajes('Archivo incorrecto');
                setTextoMensajes('Solo se permiten archivos JPG, JPEG y PNG.');
            }
        } else {
            console.log('No se seleccionó ningún archivo');
        }
        // Restablecer el valor del campo de entrada del archivo
        event.target.value = null;
    };










    //funcion para bloquar en localstorage
    const [mostrar, setMostrar] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('mostrar') === 'true';
        }
        return true;
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('mostrar', mostrar);
        }
    }, [mostrar]);







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

                                                    <div className="ContMsjsVendedor">
                                                        <div className="msjsVend1">
                                                            <div className="namevendedor2">
                                                                <div className="BallNamEv2">
                                                                    <p>JP</p>
                                                                </div>
                                                            </div>
                                                            <div className="contComment">
                                                                <div className="msjVendedor1">
                                                                    Comentario del vendedor
                                                                </div>
                                                            </div> 
                                                        </div>
                                                        <div className="contDateMSJ">
                                                            <div style={{ width: '81%' }}></div>
                                                            <div style={{ width: '19%' }}>
                                                                <div style={{ width: '88%' }}>
                                                                    <p style={{ fontSize: '16px' }}>11:17</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {Array.isArray(messages) && messages.length > 0 ? (
                                                        messages.slice(0).map((message, index) => (
                                                            <div className="MsjVendedor" key={index}  >
                                                                {message.nombreimagen1 && (
                                                                    <div className="imageContainerChat">
                                                                        <div className="SubcontimageContainerChat">
                                                                            <img src={localStorage.getItem('chatImage')} alt={message.nombreimagen1} />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <div className="msjsVend">
                                                                    <div className="contComment">
                                                                        <div className="msjVendedor2">
                                                                            {message.comentario}
                                                                        </div>
                                                                    </div>
                                                                    <div className="namevendedor">
                                                                        <div className="BallNamEv">
                                                                            <p>{primerasLetras}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="contDateMSJ">
                                                                    <div style={{ width: '81%' }}></div>
                                                                    <div style={{ width: '19%' }}>
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
                                                <div className="contInputYimgSend">
                                                    {mostrar ? (
                                                        <div className="inputandsendMsjVendedor"
                                                            onKeyPress={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    e.preventDefault(); // Evita la recarga de la página
                                                                    manejarEnvioMensaje();
                                                                }
                                                            }}
                                                        >
                                                            <div className="contButtonImg">
                                                                <input
                                                                    type="file"
                                                                    id="imageUpload"
                                                                    onChange={handleImageUpload}
                                                                />
                                                                <button onClick={() => document.getElementById('imageUpload').click()}>
                                                                    <SlPaperClip size={19} />
                                                                </button>
                                                            </div>
                                                            <div className="contImgandInput">
                                                                
                                                                <input
                                                                    value={inputMessage}
                                                                    onChange={(e) => setInputMessage(e.target.value)}

                                                                    type="text"
                                                                    placeholder="Escribe un mensaje al vendedor"
                                                                    readOnly={imageName ? true : false} // Hacer el input de solo lectura si se ha seleccionado una imagen
                                                                />
                                                                {selectedImage && (
                                                                    <div className="contImgSelected" >
                                                                        <img src={selectedImage} />
                                                                        <button onClick={() => { setSelectedImage(null); setInputMessage(''); setImageName(''); }}>
                                                                            <IoMdClose size={30} />
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="contSendMessage">
                                                                <button onClick={manejarEnvioMensaje}>
                                                                    <LuSendHorizonal size={25} style={{ cursor: inputMessage.trim() ? 'pointer' : 'not-allowed' }} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="inputandsendMsjVendedor">
                                                            {/* Segundo subcontainer */}
                                                            <p>Has decidido no recibir mensajes del vendedor!</p>
                                                            <p className="unblocktext" onClick={() => setMostrar(true)}>Desbloquear</p>
                                                        </div>
                                                    )}
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
                                        <Grid item xs={12} md={7} sx={{ width: isMdDown ? '100%' : '90%' }} >

                                        </Grid>
                                        <Grid item xs={12} md={5} sx={{ textAlign: 'center', marginTop: '-4.3rem' }}>
                                            <p style={{ fontSize: '18px', color: '#2D2E83', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setMostrar(false)}>No deseo recibir más mensajes del vendedor</p>
                                            <ModalMensajes
                                                shown={showModal}
                                                close={handleModalClose}
                                                titulo={tituloMensajes}
                                                mensaje={textoMensajes}
                                                tipo="error"
                                            />
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