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
import { FaCheck } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosSquareOutline } from "react-icons/io";
import { BsSquare } from "react-icons/bs";
import { PiSquare } from "react-icons/pi";


export default function tengoUnProblema() {

    const [comentario, setComentario] = useState('');
    const [contadorCaracteres, setContadorCaracteres] = useState(0);

    const handleComentarioChange = (event) => {
        const nuevoComentario = event.target.value;

        if (nuevoComentario.length <= 180) {
            setComentario(nuevoComentario);
            setContadorCaracteres(nuevoComentario.length);
        }
    };

    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const irA = useRef(null); //useref top page
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true); //abrir contenedor de problemas etc
    const [confirmationOpen, setConfirmationOpen] = useState(false); //estado confirmación modal
    const [fileData1, setFileData1] = useState(null); //primerArchivoImagen
    const [fileData2, setFileData2] = useState(null); //segundoArchivoImagen
    const [fileData3, setFileData3] = useState(null); //tercerArchivoImagen
    const [fileData4, setFileData4] = useState(null); //cuartoArchivoImagen
    const [fileData5, setFileData5] = useState(null); //quintoArchivoImagen
    const [showModal, setShowModal] = useState(false); //Estado de modal
    const [tituloMensajes, setTituloMensajes] = useState(''); //titulo modal
    const [textoMensajes, setTextoMensajes] = useState(''); //texto modal 
    //cerrar modal advertencia
    const handleModalClose = () => {
        setShowModal(false);
    };

    //Ruta de confirmación de modal
    const handleConfirmationSuccess = (route) => () => {
        router.push(route);
    };

    //handle de confirmación
    const handleConfirmationOpen = () => {
        setConfirmationOpen(true);
    };

    //top page transición
    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    //recibir producto y guardarlo y almacenarlo after en el localstorage

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



    const handleFileChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const allowedFileTypes = ['image/jpeg', 'image/png'];
            const maxImageSize = 819200; // 800 KB in bytes

            if (allowedFileTypes.includes(file.type)) {
                if (file.size > maxImageSize) {
                    setShowModal(true);
                    setTituloMensajes('Tamaño incorrecto');
                    setTextoMensajes('Las imágenes deben pesar máximo 800 KB.');
                    return;
                }

                const newFileData = {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    data: URL.createObjectURL(file),
                };

                switch (index) {
                    case 1:
                        setFileData1(newFileData);
                        localStorage.setItem('uploadedFile1', JSON.stringify(newFileData));
                        break;
                    case 2:
                        setFileData2(newFileData);
                        localStorage.setItem('uploadedFile2', JSON.stringify(newFileData));
                        break;
                    case 3:
                        setFileData3(newFileData);
                        localStorage.setItem('uploadedFile3', JSON.stringify(newFileData));
                        break;
                    case 4:
                        setFileData4(newFileData);
                        localStorage.setItem('uploadedFile4', JSON.stringify(newFileData));
                        break;
                    case 5:
                        setFileData5(newFileData);
                        localStorage.setItem('uploadedFile5', JSON.stringify(newFileData));
                        break;
                    default:
                        break;
                }
            } else {
                setShowModal(true);
                setTituloMensajes('Archivo incorrecto');
                setTextoMensajes('Solo se permiten archivos JPG, JPEG y PNG.');
            }
        }
    };

    const handleSquareClick = (index) => {
        document.getElementById(`fileInput${index}`).click();
    };

    const handleValidacion = () => {
        const requiredFiles = [fileData1, fileData2, fileData3, fileData4, fileData5];

        // Check if at least one required file is present
        const atLeastOneFilePresent = requiredFiles.some((fileData) => fileData !== null);

        if (!atLeastOneFilePresent) {
            setTituloMensajes('Validación de Archivos');
            setTextoMensajes('Debes subir al menos una imagen.');
            setShowModal(true);
            return;
        }

        handleConfirmationOpen();
    };

    const getFileIcon = (fileData) => {
        if (!fileData) {
            return <IoIosCamera size={65} style={{ color: '#2D2E83', position: 'relative', top: '30px' }} />;
        }

        const { type, data } = fileData || {}; // Asegúrate de que fileData sea un objeto

        if (type && type.startsWith('image/')) {
            return <img src={data} alt="Uploaded File" style={{ width: '65px', height: '65px', borderRadius: '50%' }} />;
        } else {
            return <IoIosCamera size={65} style={{ color: '#2D2E83', position: 'relative', top: '30px' }} />;
        }
    };




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

                                                <Grid className="subcPrincipTengoUnProblema" item xs={12} md={7} sx={{ width: isMdDown ? '100%' : '90%', flexDirection: 'column' }}>
                                                    <Grid className="ContVendedor4" container sx={{ width: isMdDown ? '100%' : '90%' }}>
                                                        <div className="ConttitlecontVend3">
                                                            <p className="titlecontVend3">¿Que pasó con tu compra?</p>
                                                        </div>
                                                    </Grid>
                                                    <Grid onClick={() => setIsOpen(false)} className="subContVendedor4" container sx={{ width: isMdDown ? '100%' : '90%' }} >
                                                        <div className="cajasProblemas">
                                                            <p className="titlesproblemas">El producto tiene defectos</p>
                                                            <AiOutlineRight size={23} />
                                                        </div>
                                                    </Grid>
                                                    <Grid onClick={() => setIsOpen(false)} className="subContVendedor4" container sx={{ width: isMdDown ? '100%' : '90%' }}>
                                                        <div className="cajasProblemas">
                                                            <p className="titlesproblemas">La compra llegó incompleta</p>
                                                            <AiOutlineRight size={23} />
                                                        </div>
                                                    </Grid>
                                                    <Grid onClick={() => setIsOpen(false)} className="subContVendedor4" container sx={{ width: isMdDown ? '100%' : '90%' }}>
                                                        <div className="cajasProblemas">
                                                            <p className="titlesproblemas">Mi compra es diferente al producto recibido</p>
                                                            <AiOutlineRight size={23} />
                                                        </div>
                                                    </Grid>
                                                    <Grid onClick={() => setIsOpen(false)} className="subContVendedor4" container sx={{ width: isMdDown ? '100%' : '90%' }}>
                                                        <div className="cajasProblemas">
                                                            <p className="titlesproblemas">Yo no realicé la compra</p>
                                                            <AiOutlineRight size={23} />
                                                        </div>
                                                    </Grid>
                                                    <Grid onClick={() => setIsOpen(false)} className="subContVendedorUlt" container sx={{ width: isMdDown ? '100%' : '90%' }} >
                                                        <div className="cajasProblemas">
                                                            <p className="titlesproblemas">Recibí el producto pero lo quiero devolver</p>
                                                            <AiOutlineRight size={23} />
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12} md={5} className="contImg1TengounPrblema">
                                                    <Grid className="contImgTengoProblema" item xs={12} md={4}>
                                                        <img src={`${URL_IMAGES_RESULTS}${producto.nombreimagen1}`} />
                                                    </Grid>
                                                    <Grid className="contdatosprobls" item xs={12} md={8} sx={{ flexDirection: 'column' }}>
                                                        <p className="contTengoProblemadatos">{producto.titulonombre}</p>
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
                                        ) : (
                                            <Grid container>
                                                <div className='titleTproblema'>
                                                    <p>Cuentanos qué pasó con tu compra</p>
                                                </div>
                                                <Grid className="ContPrinctextareatengounproblema" item xs={12} md={7} sx={{ width: isMdDown ? '100%' : '90%' }}>
                                                    <Grid className="SubContPrinctextareatengounproblema" container sx={{ width: isMdDown ? '100%' : '85%' }}>
                                                        <div style={{width:'100%'}}>
                                                            <textarea
                                                                value={comentario}
                                                                onChange={handleComentarioChange}
                                                                placeholder="Escribe un mensaje al vendedor"
                                                                style={{ height: '160px', width: '100%', resize: 'none' }}
                                                            />
                                                            <div style={{ textAlign: 'right', marginTop: '0.5rem', color: '#2C2E82', fontSize: '14px' }}>
                                                                {contadorCaracteres}/180
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                                <Grid className="subcontImgTengoProblema" item xs={12} md={5}>
                                                    <Grid className="contImgTengoProblema" item xs={12} md={4}>
                                                        <img src={`${URL_IMAGES_RESULTS}${producto.nombreimagen1}`} />
                                                    </Grid>
                                                    <Grid className="contdatosprobls" item xs={12} md={8} sx={{ flexDirection: 'column' }}>
                                                        <p className="contTengoProblemadatos">{producto.titulonombre}</p>
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
                                                <Grid className="contAGGFotosTengoProblema" item xs={12} md={7} sx={{ width: isMdDown ? '100%' : '90%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: '9rem', marginBottom: '5rem' }}>
                                                    <div className='titleTproblema' >
                                                        <p>Agregar fotos del producto o del paquete</p>
                                                    </div>
                                                    <Grid className="contSendImgsTengoProblema" container sx={{ width: isMdDown ? '100%' : '85%' }}>


                                                        {/* Primer div */}
                                                        <div>
                                                            <div className="aggfotosubcaja"
                                                                onClick={() => handleSquareClick(1)}
                                                            >
                                                                <input
                                                                    type="file"
                                                                    id="fileInput1"
                                                                    onChange={(event) => handleFileChange(1, event)}
                                                                    accept=".jpg, .jpeg, .png, .pdf"
                                                                />
                                                                <PiSquare size={115} style={{ color: '#2D2E83' }} />
                                                                {fileData1 ? (
                                                                    <div style={{ position: 'absolute' }}>{getFileIcon(fileData1)}</div>
                                                                ) : (
                                                                    <IoIosCamera size={55} className="icCam" />
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Segundo div */}
                                                        <div>
                                                            <div className="aggfotosubcaja"
                                                                onClick={() => handleSquareClick(2)}
                                                            >
                                                                <input
                                                                    type="file"
                                                                    id="fileInput2"
                                                                    onChange={(event) => handleFileChange(2, event)}
                                                                    accept=".jpg, .jpeg, .png, .pdf"
                                                                />
                                                                <PiSquare size={115} style={{ color: '#2D2E83' }} />
                                                                {fileData2 ? (
                                                                    <div style={{ position: 'absolute' }}>{getFileIcon(fileData2)}</div>
                                                                ) : (
                                                                    <IoIosCamera size={55} className="icCam" />
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Tercer div */}
                                                        <div>
                                                            <div className="aggfotosubcaja"
                                                                onClick={() => handleSquareClick(3)}
                                                            >
                                                                <input
                                                                    type="file"
                                                                    id="fileInput3"
                                                                    onChange={(event) => handleFileChange(3, event)}
                                                                    accept=".jpg, .jpeg, .png, .pdf"
                                                                />
                                                                <PiSquare size={115} style={{ color: '#2D2E83' }} />
                                                                {fileData3 ? (
                                                                    <div style={{ position: 'absolute' }}>{getFileIcon(fileData3)}</div>
                                                                ) : (
                                                                    <IoIosCamera size={55} className="icCam" />
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* cuarto div */}
                                                        <div>
                                                            <div className="aggfotosubcaja"
                                                                onClick={() => handleSquareClick(4)}
                                                            >
                                                                <input
                                                                    type="file"
                                                                    id="fileInput4"
                                                                    onChange={(event) => handleFileChange(4, event)}
                                                                    accept=".jpg, .jpeg, .png, .pdf"
                                                                />
                                                                <PiSquare size={115} style={{ color: '#2D2E83' }} />
                                                                {fileData4 ? (
                                                                    <div style={{ position: 'absolute' }}>{getFileIcon(fileData4)}</div>
                                                                ) : (
                                                                    <IoIosCamera size={55} className="icCam" />
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* quinto div div */}
                                                        <div>
                                                            <div className="aggfotosubcaja"
                                                                onClick={() => handleSquareClick(5)}
                                                            >
                                                                <input
                                                                    type="file"
                                                                    id="fileInput5"
                                                                    onChange={(event) => handleFileChange(5, event)}
                                                                    accept=".jpg, .jpeg, .png, .pdf"
                                                                />
                                                                <PiSquare size={115} style={{ color: '#2D2E83' }} />
                                                                {fileData5 ? (
                                                                    <div style={{ position: 'absolute' }}>{getFileIcon(fileData5)}</div>
                                                                ) : (
                                                                    <IoIosCamera size={55} className="icCam" />
                                                                )}
                                                            </div>
                                                        </div>


                                                    </Grid>
                                                    <div className="rectextprobl">
                                                        <p>- Cada imagen debe pesar máximo 800KB</p>
                                                        <p>- Tus imagenes debens ser en formato jpg, jpeg o png</p>
                                                    </div>

                                                </Grid>
                                                <Grid item xs={12} md={7} sx={{ width: isMdDown ? '100%' : '90%', display: 'flex', marginTop: '3rem', }}>
                                                    <Grid item xs={12} md={4}></Grid>
                                                    <Grid item xs={12} md={8}>
                                                        <Box display="flex" justifyContent="space-between" sx={{ width: '80%' }}>
                                                            <button className='CancelarFormButton'>Cancelar</button>
                                                            <button onClick={handleValidacion} className='GuardarFormButton'>Enviar</button>
                                                            <ModalMensajes
                                                                shown={showModal}
                                                                close={handleModalClose}
                                                                titulo={tituloMensajes}
                                                                mensaje={textoMensajes}
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

                                                                    <p className='dialogtituloP'>Información enviada con éxito!</p>
                                                                </DialogTitle>
                                                                <DialogContent className='dialogContentDatsGuardados'>
                                                                    <p className='PdialogContent'>Tu información fue enviada con exito. tendrás la respuesta en X días habiles.</p>
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
                        {/*Si el producto es null */}
                        <p>Cargando datos del producto...</p>
                    </div>
                )}
            </div>
        </div>
    )

}