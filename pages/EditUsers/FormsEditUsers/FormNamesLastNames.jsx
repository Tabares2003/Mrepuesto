//import MUI media
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, Button } from '@mui/material';
import Container from '../../../components/layouts/Container'
import ModalMensajes from '../../mensajes/ModalMensajes';
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react"; 

export default function FormNamesLastNames() {

 
  const router = useRouter()

    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const handleConfirmationOpen = () => {
        setConfirmationOpen(true);
    };


    const handleConfirmationSuccess = (route) => () => {
        router.push(route);
    }; 


  
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState('');
    const [textoMensajes, setTextoMensajes] = useState('');

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleValidacion = () => {
        // Validar que hayan al menos 2 letras en cada input
        if (nombres.length < 2 || apellidos.length < 2) {
            setTituloMensajes('Validación de Nombres y Apellidos');
            setTextoMensajes('Cada campo debe tener al menos dos caracteres.');
            setShowModal(true);
            return;
        }

        // Validar que no haya números en los nombres y apellidos
        if (/^\d+$/.test(nombres) || /^\d+$/.test(apellidos)) {
            setTituloMensajes('Nombres y Apellidos');
            setTextoMensajes('Los nombres y apellidos no pueden contener solo números.');
            setShowModal(true);
            return;
        }

        // Validar que no haya más de 40 caracteres en nombres y apellidos
        if (nombres.length > 40 || apellidos.length > 40) {
            setTituloMensajes('Nombres y Apellidos');
            setTextoMensajes('Cada campo no puede exceder los 40 caracteres.');
            setShowModal(true);
            return;
        }
 
        handleConfirmationOpen();
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
                                <p>Editar nombres y apellidos</p>
                            </div>


                            <Grid className="contDataUsers" container style={{width: isMdDown ? '100%' : '65%'}}>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <p className='titlesFormsUsers2'>Nombres</p>
                                        <input value={nombres}
                                            onChange={(e) => setNombres(e.target.value)} type="text" placeholder="Ej: Juan Pablo" className='InputFormsUsers'/>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <p className='titlesFormsUsers2'>Apellidos</p>
                                        <input value={apellidos}
                                            onChange={(e) => setApellidos(e.target.value)} type="text" placeholder="Ej: Rojas" className='InputFormsUsers'/>
                                        <Box display="flex" justifyContent="space-between" marginTop={15}>
                                            <button onClick={handleValidP} className='CancelarFormButton'>Cancelar</button>
                                            <button onClick={handleValidacion}  className='GuardarFormButton'>Guardar</button>
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
                                                <div  className='div1buttonDialog' >
                                                    <button className='button1DialogDatsGuardados'  onClick={handleConfirmationSuccess('/')} >
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