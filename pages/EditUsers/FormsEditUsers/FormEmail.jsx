import Container from '../../../components/layouts/Container'
//import MUI media
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, } from '@mui/material';
import React, { useState, useEffect, useRef } from "react";
import { validateEmail } from "../../../utilities/Validations";
import ModalMensajes from '../../mensajes/ModalMensajes';
import { useRouter } from "next/router";
//import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function FormEmail() {
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const router = useRouter();

    //ModalDatosGUardados
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const handleConfirmationOpen = () => {
        setConfirmationOpen(true);
    };

    const handleConfirmationSuccess = (route) => () => {
        router.push(route);
    };

    // Estado para manejar la visibilidad de los contenedores
    const [mostrarContenedorExistente, setMostrarContenedorExistente] = useState(true);
    const [mostrarNewContainer, setMostrarNewContainer] = useState(false);
    const [showContainer, setShowContainer] = useState(false);

    const [emailSeleccionado, setEmailSeleccionado] = useState("");
    const [confirmarEmail, setConfirmarEmail] = useState("");
    const [showEmailError, setShowEmailError] = useState(false);
    const [datok, setDatok] = useState(true);
    const [alertBtnEmail, setAlertBtnEmail] = useState("nombrespasarela alertboton");
    const [modalData, setModalData] = useState({
        shown: false,
        titulo: "",
        mensaje: "",
    });

    const handleChangeInputEmail = (data) => {
        setEmailSeleccionado(data);
        setShowEmailError(false);
        setDatok(true);
        setAlertBtnEmail("nombrespasarela alertboton");
    };

    const handleChangeConfirmarEmail = (data) => {
        setConfirmarEmail(data);
        setShowEmailError(false);
        setDatok(true);
        setAlertBtnEmail("nombrespasarela alertboton");
    };

    const handleModalClose = () => {
        setModalData({ shown: false, titulo: "", mensaje: "" });
    };

    //Si los datos son incorrectos mostrar modales, si son correctos enviarme a redirectToComponent

    const updateAddress = () => {
        if (!emailSeleccionado || !validateEmail(emailSeleccionado)) {
            setDatok(false);
            setAlertBtnEmail("nombrespasarela alertboton");
            setShowEmailError(true);
            setModalData({
                shown: true,
                titulo: "Validar email",
                mensaje: "Por favor ingresa un email válido.",
            });
            return;
        }

        if (emailSeleccionado !== confirmarEmail) {
            setDatok(false);
            setAlertBtnEmail("nombrespasarela alertboton");
            setShowEmailError(true);
            setModalData({
                shown: true,
                titulo: "Validar email",
                mensaje: "Los correos electrónicos no coinciden. Por favor, confirma tu correo electrónico.",
            });
            return;
        }

        if (datok) {
            redirectToComponent();
        }
    };


    //Simulación Recibir codigo a nuevo número de teléfono con modales
    //Modales
    const [showModalCodigo, setShowModalCodigo] = useState(false);
    const [tituloMensajesCodigo, setTituloMensajesCodigo] = useState('');
    const [textoMensajesCodigo, setTextoMensajesCodigo] = useState('');

    //InpusPonerCodigoRecibido
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [input5, setInput5] = useState('');
    const [input6, setInput6] = useState('');
    const [codigo, setCodigo] = useState('');
    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);
    const input5Ref = useRef(null);
    const input6Ref = useRef(null);


    const redirectToComponent = () => {
        const nuevoCodigo = Math.floor(100000 + Math.random() * 900000);
        setCodigo(nuevoCodigo.toString());
        console.log(nuevoCodigo);

        // Mostrar el nuevo contenedor
        setMostrarNewContainer(true);
        setMostrarContenedorExistente(false);
        setShowContainer(true);
    };


    const handleContinue = () => {
        const inputCodigo = input1 + input2 + input3 + input4 + input5 + input6;
        if (inputCodigo === codigo.toString()) {
            // alert indicando que el código es correcto
            handleConfirmationOpen();

            // Realizar otras acciones dependiendo necesidades
        } else {
            //  modal indicando que el código es incorrecto
            setShowModalCodigo(true);
            setTituloMensajesCodigo('Código Incorrecto');
            setTextoMensajesCodigo('El código ingresado es incorrecto.');
        }
    };

    //cerrarModalNuevoCodigoEmailError
    const handleModalCloseCodigo = () => {
        setShowModalCodigo(false);
    };


    const handleValidP = () => {
        router.push('../../my-account');
    };


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
                                    <p>Editar correo electrónico</p>
                                </div>

                                {mostrarContenedorExistente && (
                                    <form>
                                        <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '65%' }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} md={6}>
                                                    <p className='titlesFormsUsers2'>Correo electrónico</p>
                                                    <div className="mt-0 eliminarborde">
                                                        <input
                                                            className='InputFormsUsers'
                                                            type="email"
                                                            placeholder="Ej: daniela1998@mail.com"
                                                            value={emailSeleccionado}
                                                            onChange={(e) => handleChangeInputEmail(e.target.value)}
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <p className='titlesFormsUsers2'>Confirme dirección de correo *</p>
                                                    <div className="mt-0 eliminarborde">
                                                        <input
                                                            className='InputFormsUsers'
                                                            type="email"
                                                            placeholder="Ej: daniela1998@mail.com"
                                                            value={confirmarEmail}
                                                            onChange={(e) => handleChangeConfirmarEmail(e.target.value)}
                                                        />
                                                    </div>
                                                    <Box display="flex" justifyContent="space-between" marginTop={15}>
                                                        <button onClick={handleValidP} className='CancelarFormButton'>Cancelar</button>
                                                        <button className='GuardarFormButton' onClick={updateAddress} disabled={!datok}>Guardar</button>
                                                        <ModalMensajes
                                                            shown={modalData.shown}
                                                            close={handleModalClose}
                                                            titulo={modalData.titulo}
                                                            mensaje={modalData.mensaje}
                                                            tipo="error"
                                                        />
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </form>
                                )}
                                {mostrarNewContainer && (
                                    <Grid className="newContainer" container style={{ width: isMdDown ? '100%' : '50%', display: 'flex', margin: '0', padding: '.5rem', margin: '0 auto', backgroundColor: '#f0f1f5', padding: '5rem', borderRadius: '10px', justifyContent: 'center', marginTop: '3rem' }}>
                                        <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
                                            <p style={{ fontWeight: '400', fontSize: '2.1rem', color: '#2C2E82' }}>Ingresa el código que recibiste</p>
                                            <p style={{ fontWeight: '400', fontSize: '2.1rem', color: '#2C2E82' }}>a tu nuevo correo de 6 dígitos.</p>
                                        </div>
                                        <div className="input-fields" style={{ display: 'flex', width: '100%', marginTop: '2rem', marginBottom: '4.5rem', justifyContent: 'center' }}>
                                            {/* Inputs para el código de 6 dígitos */}
                                            {[input1, input2, input3, input4, input5, input6].map((value, index) => (
                                                <input
                                                    key={index}
                                                    style={{
                                                        height: '3.7em',
                                                        width: '3.2em',
                                                        outline: 'none',
                                                        textAlign: 'center',
                                                        fontSize: '1.5rem',
                                                        color: '#2C2E82',
                                                        borderRadius: '5px',
                                                        margin: '.5rem',
                                                        border: index === 0 ? '2px solid #2d2e83' : '1px solid #f0f1f5',
                                                    }}
                                                    maxLength="1"
                                                    type="tel"
                                                    value={value}
                                                    onChange={(e) => {
                                                        switch (index) {
                                                            case 0:
                                                                setInput1(e.target.value);
                                                                if (e.target.value) input2Ref.current.focus();
                                                                break;
                                                            case 1:
                                                                setInput2(e.target.value);
                                                                if (e.target.value) input3Ref.current.focus();
                                                                break;
                                                            case 2:
                                                                setInput3(e.target.value);
                                                                if (e.target.value) input4Ref.current.focus();
                                                                break;
                                                            case 3:
                                                                setInput4(e.target.value);
                                                                if (e.target.value) input5Ref.current.focus();
                                                                break;
                                                            case 4:
                                                                setInput5(e.target.value);
                                                                if (e.target.value) input6Ref.current.focus();
                                                                break;
                                                            case 5:
                                                                setInput6(e.target.value);
                                                                break;
                                                            default:
                                                                break;
                                                        }
                                                    }}
                                                    onKeyDown={(e) => {
                                                        switch (index) {
                                                            case 0:
                                                                if (e.key === 'Backspace' && !input1) input1Ref.current.focus();
                                                                break;
                                                            case 1:
                                                                if (e.key === 'Backspace' && !input2) input1Ref.current.focus();
                                                                break;
                                                            case 2:
                                                                if (e.key === 'Backspace' && !input3) input2Ref.current.focus();
                                                                break;
                                                            case 3:
                                                                if (e.key === 'Backspace' && !input4) input3Ref.current.focus();
                                                                break;
                                                            case 4:
                                                                if (e.key === 'Backspace' && !input5) input4Ref.current.focus();
                                                                break;
                                                            case 5:
                                                                if (e.key === 'Backspace' && !input6) input5Ref.current.focus();
                                                                break;
                                                            default:
                                                                break;
                                                        }
                                                    }}
                                                    ref={index === 0 ? input1Ref : index === 1 ? input2Ref : index === 2 ? input3Ref : index === 3 ? input4Ref : index === 4 ? input5Ref : input6Ref}
                                                    onFocus={(e) => e.target.style.border = '2px solid #2d2e83'}
                                                    onBlur={(e) => e.target.style.border = '1px solid #f0f1f5'}
                                                />
                                            ))}
                                        </div>
                                        <div style={{ width: '67%' }}>
                                            <button onClick={handleContinue} style={{ width: '100%', backgroundColor: '#2D2E83', color: '#F0F1F5', padding: '10px', borderRadius: '10px', fontSize: '1.8rem' }}>Continuar</button>
                                            <button type="button" style={{ width: '100%', backgroundColor: '#F0F1F5', color: '#2D2E83', padding: '10px', borderRadius: '10px', fontSize: '1.8rem', border: '2px solid #2D2E83', marginTop: '1.5rem' }}>Reenviar código en 00:40</button>
                                        </div>

                                        {/* Muestra el código generado */}
                                        <p style={{ marginTop: '1rem' }}>Código generado: {codigo}</p>
                                        <ModalMensajes
                                            shown={showModalCodigo}
                                            close={handleModalCloseCodigo}
                                            titulo={tituloMensajesCodigo}
                                            mensaje={textoMensajesCodigo}
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
                                                <CheckCircleOutlineIcon className='DialogDatsGuardadsIcon' style={{ color: '#00BF15', marginRight: '2px', fontSize: '5rem', marginLeft: '-23px' }} />
                                                <p className='dialogtituloP'>¡Cambios realizados con éxito!</p>
                                            </DialogTitle>
                                            <DialogContent className='dialogContentDatsGuardados'>
                                                <p className='PdialogContent'>Tus cambios fueron realizamos con exito. Se veran reflejados un unos minutos.</p>
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
                                )} 
                            </div>
                        </div>
                    </div>

                </Container>
            </div>
        </>
    )
}