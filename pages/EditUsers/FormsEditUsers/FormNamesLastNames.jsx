//import MUI media
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, Button, } from '@mui/material';
import Container from '../../../components/layouts/Container'
import ModalMensajes from '../../mensajes/ModalMensajes';
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { URL_BD_MR } from '../../../helpers/Constants';
export default function FormNamesLastNames() {


    const router = useRouter()

    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));


    /*States Modales*/
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState('');
    const [textoMensajes, setTextoMensajes] = useState('');


    //modal Open cuando se guarde
    const handleConfirmationOpen = () => {
        setConfirmationOpen(true);
    };

    //Cerrar Modal
    const handleModalClose = () => {
        setShowModal(false);
    };

    //ruta de cuando se confirma correctamente el modal
    const handleConfirmationSuccess = (route) => () => {
        router.push(route);
    };




    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [apellidosCompletos, setApellidosCompletos] = useState('');
    const handleInputChange = (event, setInput) => {
        const inputValue = event.target.value;
        if (/^[A-Za-z\s]+$/.test(inputValue) || inputValue === '') {
            setInput(prevValue => inputValue);
        }
    };
    const handleValidacion = () => {
        if (nombres.length < 2 || apellidos.length < 2) {
            setTituloMensajes('Validación de Nombres y Apellidos');
            setTextoMensajes('Cada campo debe tener al menos dos caracteres.');
            setShowModal(true);
            return;
        }
        if (/^\d+$/.test(nombres) || /^\d+$/.test(apellidos)) {
            setTituloMensajes('Nombres y Apellidos');
            setTextoMensajes('Los nombres y apellidos no pueden contener solo números.');
            setShowModal(true);
            return;
        }
        if (nombres.length > 40 || apellidos.length > 40) {
            setTituloMensajes('Nombres y Apellidos');
            setTextoMensajes('Cada campo no puede exceder los 40 caracteres.');
            setShowModal(true);
            return;
        }
        updateData();
    };
    const updateData = () => {
        const url = 'https://gimcloud.com.co/mrp/api/+75';
        const [primerNombre, segundoNombre] = nombreCompleto.split(' ');
        const [primerApellido, segundoApellido] = apellidosCompletos.split(' ');
        const data = {
            primernombre: nombres,
            segundonombre: segundoNombre,
            primerapellido: apellidos,
            segundoapellido: segundoApellido,
            razonsocial: '.',
            tipoidentificacion: 1,
            identificacion: 1081052559,
            celular: '+573118434571',
            email: 'nmflorezr@gmail.com',
            token: 3217,
            activo: 'S',
            direccion: 'XXXXXXX',
            fechacreacion: '2023-11-30',
            fechatoken: '2023-11-30',
            uid: 1671495436242
            // ...resto de los datos
        };
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(response => {
                console.log('Success:', response);
                handleConfirmationOpen();  // Muestra el modal después de guardar los datos
            })
            .catch(error => console.error('Error:', error));
    };
    const [datUsers, SetDatUser] = useState(null);
    const [nombresData, SetnombresData] = useState(null);
    const [apellidosData, SetapellidosData] = useState(null);
    const leerDatosUsuario = async () => {
        let params = {
            email: "nmflorezr@gmail.com",
        };
        await axios({
            method: "post",
            url: URL_BD_MR + "21",
            params,
        })
            .then((res) => {
                console.log("DAT XXXX: ", res.data);
                SetnombresData(res.data[0].primernombre + " " + res.data[0].segundonombre);
                SetapellidosData(res.data[0].primerapellido);
                SetDatUser(res.data[0]);
                // Actualiza los estados locales con los nuevos valores obtenidos
                setNombres(res.data[0].primernombre);
                setApellidos(res.data[0].primerapellido);
                setNombreCompleto(res.data[0].primernombre + " " + res.data[0].segundonombre);
                setApellidosCompletos(res.data[0].primerapellido + " " + res.data[0].segundoapellido);
            })
            .catch(function (error) {
                console.log("Error leyendo el usuario");
            }, []);
    };
    console.log("Nombres:", nombresData)
    useEffect(() => {
        leerDatosUsuario();
    }, []);







    //Botón ir a mis datos
    const handleValidP = () => {
        router.push('../../my-account');
    };


    //Posición top Pagina
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

                                <div className='titlesformsUsers'>
                                    <p>Editar nombres y apellidos</p>
                                </div>


                                <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '65%' }}>

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <p className='titlesFormsUsers2'>Nombres</p>
                                            <input
                                                type="text"
                                                value={nombreCompleto}
                                                placeholder='Juan Pablo'
                                                className='InputFormsUsers'
                                                onChange={(e) => handleInputChange(e, setNombreCompleto)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <p className='titlesFormsUsers2'>Apellidos</p>
                                            <input
                                                type="text"
                                                value={apellidosCompletos}
                                                placeholder='Rojas Tabares'
                                                className='InputFormsUsers'
                                                onChange={(e) => handleInputChange(e, setApellidosCompletos)}
                                            />
                                            <Box display="flex" justifyContent="space-between" marginTop={15}>
                                                <button onClick={handleValidP} className='CancelarFormButton'>Cancelar</button>
                                                <button onClick={handleValidacion} className='GuardarFormButton'>Guardar</button>
                                                <ModalMensajes
                                                    shown={showModal}
                                                    close={handleModalClose}
                                                    titulo={tituloMensajes}
                                                    mensaje={textoMensajes}
                                                    tipo="error"
                                                />
                                            </Box>
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
                                                    <p className='dialogtituloP'>¡Cambios realizados con éxito!</p>
                                                </DialogTitle>
                                                <DialogContent className='dialogContentDatsGuardados'>
                                                    <p className='PdialogContent'>Tus cambios fueron realizamos con exito. Se verán reflejados un unos minutos.</p>
                                                </DialogContent>
                                                <DialogActions className='DialogActionsDatsGuardados'>
                                                    <div className='div1buttonDialog' >
                                                        <button className='button2DialogDatsGuardados' onClick={handleConfirmationSuccess('../../my-account')} >
                                                            Ir a Mis datos
                                                        </button>
                                                    </div>
                                                    <div className='div1buttonDialog' >
                                                        <button className='button1DialogDatsGuardados' onClick={handleConfirmationSuccess('/')} >
                                                            Ir al inicio
                                                        </button>
                                                    </div>
                                                </DialogActions>
                                            </Dialog>
                                        </Grid>
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

