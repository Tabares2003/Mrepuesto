import Container from '../../../components/layouts/Container';
import { Box, Grid, Typography, useMediaQuery, useTheme, Dialog, DialogTitle, DialogActions, DialogContent, } from '@mui/material';
import React, { useState, useEffect, useRef } from "react";
import { MdOutlineHorizontalRule } from "react-icons/md";
import ModalMensajes from '../../mensajes/ModalMensajes';
import { IoSquareOutline } from "react-icons/io5";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa6";
import { useRouter } from "next/router";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ValidDocsPjuridica = () => {


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

    const items = ['Certificado de Camara de comercio (No menor a 30 días)', 'RUT (No menor a 30 días)', 'Cedula de ciudadanía Representante legal'];

    const [fileData1, setFileData1] = useState(null);
    const [fileData2, setFileData2] = useState(null);
    const [fileData3, setFileData3] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState('');
    const [textoMensajes, setTextoMensajes] = useState('');

    const handleFileChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const allowedFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];

            if (allowedFileTypes.includes(file.type)) {
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
                    default:
                        break;
                }
            } else {
                setShowModal(true);
                setTituloMensajes('Archivo incorrecto');
                setTextoMensajes('Solo se permiten archivos JPG, PNG y PDF.');
            }

        }
    };



    const handleSquareClick = (index) => {
        document.getElementById(`fileInput${index}`).click();
    };



    const handleValidacion = () => {
        const requiredFiles = [fileData1, fileData2, fileData3];

        // Check if all required files are present
        const allFilesPresent = requiredFiles.every((fileData) => fileData !== null);

        if (!allFilesPresent) {
            setTituloMensajes('Validación de Archivos');
            setTextoMensajes('Debes subir todos los archivos requeridos.');
            setShowModal(true);
            return;
        }

        handleConfirmationOpen();
    };

    const handleModalClose = () => {
        setShowModal(false);
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
                            <div className="ps-page__header"></div>
                            <div className="ps-page__content ps-account">
                                <div className='titlesformsUsers'>
                                    <p>Validación documentos</p>
                                </div>
                                <Grid sx={{ width: isMdDown ? '100%' : '80%' }}>


                                    <Grid item xs={12} md={12}>
                                        <p style={{ fontSize: '20px', fontWeight: '600', color: '#2C2E82' }} >Adjunta los siguientes archivos para enviar la solicitud de cambio de cuenta a persona juridica</p>
                                    </Grid>
                                    <Grid container mt={5} sx={{ display: 'flex', flexDirection: 'column' }}>
                                        {items.map((item, index) => (
                                            <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '20px', fontWeight: '400', color: '#2C2E82' }}>
                                                <MdOutlineHorizontalRule style={{ marginRight: '5px' }} size={15} />
                                                {item}
                                            </Box>
                                        ))}
                                    </Grid>
                                    <Grid container mt={5} sx={{ display: 'flex' }}>


                                        {/* Primer div */}
                                        <div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    position: 'relative',
                                                    marginBottom: '20px',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => handleSquareClick(1)}
                                            >
                                                <input
                                                    type="file"
                                                    id="fileInput1"
                                                    onChange={(event) => handleFileChange(1, event)}
                                                    style={{ display: 'none' }}
                                                    accept=".jpg, .jpeg, .png, .pdf"
                                                />
                                                <IoSquareOutline size={115} style={{ color: '#2D2E83' }} />
                                                <HiOutlineDocumentArrowUp size={65} style={{ position: 'absolute', color: '#2D2E83' }} />
                                            </div>
                                            {fileData1 && (
                                                <div style={{ textAlign: 'center', marginTop: '-20px', display: 'flex', justifyContent: 'center' }}>
                                                    <FaCheck size={20} style={{ color: '#2D2E83' }} />
                                                </div>
                                            )}
                                        </div>


                                        {/* Segundo div */}
                                        <div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    position: 'relative',
                                                    marginBottom: '20px',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => handleSquareClick(2)}
                                            >
                                                <input
                                                    type="file"
                                                    id="fileInput2"
                                                    onChange={(event) => handleFileChange(2, event)}
                                                    style={{ display: 'none' }}
                                                    accept=".jpg, .jpeg, .png, .pdf"
                                                />
                                                <IoSquareOutline size={115} style={{ color: '#2D2E83' }} />
                                                <HiOutlineDocumentArrowUp size={65} style={{ position: 'absolute', color: '#2D2E83' }} />
                                            </div>
                                            {fileData2 && (
                                                <div style={{ textAlign: 'center', marginTop: '-20px', display: 'flex', justifyContent: 'center' }}>
                                                    <FaCheck size={20} style={{ color: '#2D2E83' }} />
                                                </div>
                                            )}
                                        </div>



                                        {/* Tercer div */}
                                        <div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    position: 'relative',
                                                    marginBottom: '20px',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => handleSquareClick(3)}
                                            >
                                                <input
                                                    type="file"
                                                    id="fileInput3"
                                                    onChange={(event) => handleFileChange(3, event)}
                                                    style={{ display: 'none' }}
                                                    accept=".jpg, .jpeg, .png, .pdf"
                                                />
                                                <IoSquareOutline size={115} style={{ color: '#2D2E83' }} />
                                                <HiOutlineDocumentArrowUp size={65} style={{ position: 'absolute', color: '#2D2E83' }} />
                                            </div>
                                            {fileData3 && (
                                                <div style={{ textAlign: 'center', marginTop: '-20px', display: 'flex', justifyContent: 'center' }}>
                                                    <FaCheck size={20} style={{ color: '#2D2E83' }} />
                                                </div>
                                            )}
                                        </div>

                                    </Grid>
                                    <Grid container mt={3} sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <p style={{ color: '#2C2E82', fontSize: '20px' }}>Ten en cuenta que:</p>
                                        <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '18px', fontWeight: '400', color: '#2C2E82' }}>
                                            <MdOutlineHorizontalRule style={{ marginRight: '5px' }} size={15} /> Los archivos no deben pesar mas de ---KB
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '18px', fontWeight: '400', color: '#2C2E82' }}>
                                            <MdOutlineHorizontalRule style={{ marginRight: '5px' }} size={15} /> Los archivos deben ser en formato PNG, JPG, PDF
                                        </Box>
                                    </Grid>
                                    <Grid container item xs={12} md={12}>
                                        <Grid item xs={12} md={7}></Grid>
                                        <Grid item xs={12} md={5}>
                                            <Box display="flex" justifyContent="space-between" mt={8} mb={8}>
                                                <button onClick={handleValidP} className='CancelarFormButton'>Cancelar</button>
                                                <button onClick={handleValidacion} className='GuardarFormButton'>Guardar</button>
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
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    );
};

export default ValidDocsPjuridica;