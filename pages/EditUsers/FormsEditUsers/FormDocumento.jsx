import Fade from '@mui/material/Fade';
import { AiFillCaretDown } from 'react-icons/ai'
import { AiFillCaretUp } from 'react-icons/ai'
import Container from '../../../components/layouts/Container'
import {
    Dropdown,
    DropdownButton
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalMensajes from '../../mensajes/ModalMensajes';
import { useRouter } from "next/router";
//import MUI media
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, Button } from '@mui/material';
import React, { useState, useEffect, useRef } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const CustomDropdownButton = React.forwardRef(({ children, onClick, href }, ref) => (
    <button
        ref={ref}
        onClick={onClick}
        href={href}
        className="dropdowncustomTdocPersButton"
    >
        {children}
    </button>
));

export default function FormDocumento() {

    const router = useRouter();


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

    const [selectedItem, setSelectedItem] = useState('Tipo documento');


    const [nroDocumentoSeleccionado, setNroDocumentoSeleccionado] = useState("");
    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [alertBtnNroDcto, setAlertBtnNroDcto] = useState("cajanrodocto alertboton");
    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [tipoDocumentoValido, setTipoDocumentoValido] = useState(false); // Nuevo estado



    const handleSelect = (eventKey, event) => {
        setSelectedItem(eventKey);
        setTipoDocumentoValido(true); // Seleccionar un tipo de documento establece el estado en verdadero
    };
    const handleModalClose = () => {
        setShowModalMensajes(false);
    };
    const handleChangeInputCedula = (data) => {
        setNroDocumentoSeleccionado(data);
    };
    const handleValidacionCedula = () => {
        let control = false;
        // Validar caracteres de la cédula
        let validarid;
        let haycaracterididentificacion = false;
        for (let i = 0; i < nroDocumentoSeleccionado.length; i++) {
            validarid = nroDocumentoSeleccionado.substr(i, 1);
            if (!/^\d+$/.test(validarid)) {
                haycaracterididentificacion = true;
                console.log("CARACTER", i, validarid);
            } else {
                console.log("ES UN NUMERO ", i, validarid);
            }
        }
        // Validar longitud mínima de la cédula
        if (nroDocumentoSeleccionado.length < 6) {
            haycaracterididentificacion = true;
        }
        if (haycaracterididentificacion) {
            control = true;
            setAlertBtnNroDcto("cajanrodocto alertboton");
            setShowModalMensajes(true);
            setTituloMensajes("Datos de pago");
            setTextoMensajes("Por favor ingresa una identificación válida!");
        }
        // Validar si se ha seleccionado un tipo de documento
        if (tipoDocumentoValido === false) {
            setShowModalMensajes(true);
            setTituloMensajes("Datos de pago");
            setTextoMensajes("Por favor, selecciona un tipo de documento.");
            return;
        }
        if (!control) {
            handleConfirmationOpen();
        }
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
                <div className="ps-page ps-page--inner" id="myaccount" ref={irA}>
                    <div className="container">
                        <div className="ps-page__header"> </div>
                        <div className="ps-page__content ps-account">

                            <div className='titlesformsUsers'>
                                <p>Editar documento identidad</p>
                            </div>

                            <Grid className="contDataUsers" container style={{width: isMdDown ? '100%' : '65%'}}>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={4}>
                                        <p className='titlesFormsUsers2'>Tipo de documento</p>
                                        <Dropdown style={{ width: '100%' }} onSelect={handleSelect}>
                                            <Dropdown.Toggle
                                                as={CustomDropdownButton}
                                                id="dropdown-basic"
                                            >
                                                {selectedItem}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="tamañocajaoptionsTdocPersona">
                                                <Dropdown.Item eventKey="C.C" className="itemsdropdownTdocPersona">C.C</Dropdown.Item>
                                                <Dropdown.Item eventKey="T.I" className="itemsdropdownTdocPersona">T.I</Dropdown.Item>
                                                <Dropdown.Item eventKey="Cédula de Extranjería" className="itemsdropdownTdocPersona">Cédula de Extranjería</Dropdown.Item>
                                                <Dropdown.Item eventKey="Pasaporte" className="itemsdropdownTdocPersona">Pasaporte</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <p className='titlesFormsUsers2'>Documento de identidad</p>
                                        <input
                                            type="text"
                                            placeholder="Ej: 1000193191"
                                            className='InputFormsUsers' 
                                            value={nroDocumentoSeleccionado}
                                            onChange={(e) => handleChangeInputCedula(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}></Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box display="flex" justifyContent="space-between" marginTop={15}>
                                            <button  onClick={handleValidP}  className='CancelarFormButton'>Cancelar</button>
                                            <button onClick={handleValidacionCedula} className='GuardarFormButton'>Guardar</button>
                                            <ModalMensajes
                                                shown={showModalMensajes}
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
                                                <CheckCircleIcon className='DialogDatsGuardadsIcon' style={{ color: '#00BF15', marginRight: '2px', fontSize: '5rem', marginLeft: '-23px' }} />
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