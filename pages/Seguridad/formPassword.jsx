import { validateEmail } from "../../utilities/Validations"
//import MUI media
import {
    Box,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Button,
} from "@mui/material";
import Container from "../../components/layouts/Container";
import ModalMensajes from "../mensajes/ModalMensajes";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { URL_BD_MR } from "../../helpers/Constants";
import { useDispatch, connect, useSelector } from "react-redux";
import { FiEye, FiEyeOff } from 'react-icons/fi';


import firebase from "../../utilities/firebase";


import { getAuth, signInWithEmailAndPassword, updatePassword } from "firebase/auth";

export default function formPassword() {

    const router = useRouter();
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    // Inicializa el estado para el correo electrónico, la contraseña actual y la nueva contraseña
    const [email, setEmail] = useState('');
    const [contraseñaActual, setContraseñaActual] = useState('');
    const [nuevaContraseña, setNuevaContraseña] = useState('');

    // Obtiene los datos del usuario autenticado desde el estado de Redux
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [confirmarNuevaContraseña, setConfirmarNuevaContraseña] = useState('');


    const [showModalMensajes, setShowModalMensajes] = useState(false);


    const [tituloMensajes, setTituloMensajes] = useState("");
    const [textoMensajes, setTextoMensajes] = useState("");
    const [showModalCodigo, setShowModalCodigo] = useState(false);

    const handleModalClose = () => {
        setShowModalMensajes(false);
    };



    // Define un efecto de React que se ejecuta después de que el componente se monta y cada vez que 'datosusuarios' cambia
    useEffect(() => {
        // Define una función asíncrona para obtener los datos del usuario
        const leerDatosUsuario = async () => {
            // Define los parámetros para la solicitud
            let params = {
                uid: datosusuarios.uid,
            };

            // Realiza una solicitud POST a tu endpoint
            await axios({
                method: "post",
                url: URL_BD_MR + "13",
                params,
            })
                .then((res) => {
                    // Si la solicitud es exitosa, actualiza el estado del correo electrónico con el correo electrónico obtenido del endpoint
                    setEmail(res.data[0].email);
                })
                .catch(function (error) {
                    // Si ocurre un error, registra el error en la consola
                    console.error("Error al leer los datos del usuario", error);
                });
        };

        // Llama a la función para obtener los datos del usuario
        leerDatosUsuario();
    }, [datosusuarios]);  // Dependencias del efecto

    // Define una función asíncrona para manejar el envío del formulario
    const manejarEnvío = async (event) => {
        event.preventDefault();
        const auth = getAuth(firebase);

        // Validación de que las contraseñas coincidan
        if (nuevaContraseña !== confirmarNuevaContraseña) {
            console.error('Las contraseñas ingresadas no coinciden. Por favor, asegúrate de que ambas sean iguales.');
            setShowModalMensajes(true);
            setTituloMensajes("Contraseña incorrecta");
            setTextoMensajes("Las contraseñas ingresadas no coinciden. Por favor, asegúrate de que ambas sean iguales.");
            return;
        }

        // Validación de que la contraseña no incluya caracteres especiales
        if (/[^a-zA-Z0-9]/.test(nuevaContraseña)) {
            console.error('La contraseña no debe incluir caracteres especiales.');
            setShowModalMensajes(true);
            setTituloMensajes("Contraseña incorrecta");
            setTextoMensajes("La contraseña no debe incluir caracteres especiales.");
            return;
        }

        // Validación de la longitud de la contraseña
        if (nuevaContraseña.length < 8) {
            console.error('La contraseña debe contener mínimo 8 caracteres.');
            setShowModalMensajes(true);
            setTituloMensajes("Contraseña incorrecta");
            setTextoMensajes("La contraseña debe contener mínimo 8 caracteres.");
            return;
        }

        // Validación de que la contraseña incluya números, letras minúsculas y mayúsculas
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(nuevaContraseña)) {
            console.error('La contraseña debe incluir números, letras minúsculas y mayúsculas.');
            setShowModalMensajes(true);
            setTituloMensajes("Contraseña incorrecta");
            setTextoMensajes("La contraseña debe incluir números, letras minúsculas y mayúsculas.");
            return;
        }

        try {
            // Reautenticar al usuario
            await signInWithEmailAndPassword(auth, email, contraseñaActual);

            // Cambiar la contraseña
            const user = auth.currentUser;
            if (user) {
                await updatePassword(user, nuevaContraseña);
                console.log('La contraseña se actualizó correctamente');
            } else {
                console.log('El usuario no está autenticado');
            }
        } catch (error) {
            console.error('Ocurrió un error', error);
        }
    };














    //Función ver o no password1
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const [showPassword2, setShowPassword2] = useState(false);

    const handleClickShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    const [showPassword3, setShowPassword3] = useState(false);

    const handleClickShowPassword3 = () => {
        setShowPassword3(!showPassword3);
    };
    //Top screen
    const irA = useRef(null);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);


    //Ruta ir atrás
    const rutaBack = (e) => {
        e.preventDefault()
        router.push('./seguridadData')
    }


    return (
        <>
            <div ref={irA}>
                <Container title="Mi Cuenta">
                    <div className="ps-page ps-page--inner" id="myaccount">
                        <div className="container">
                            <div className="ps-page__header"> </div>
                            <div className="ps-page__content ps-account">

                                <div className='titlesformsUsers'>
                                    <p>Editar contraseña</p>
                                </div>


                                <Grid className="contDataUsers" container style={{ width: isMdDown ? '100%' : '65%' }}>
                                    <Grid container spacing={2} mb={5}>
                                        <Grid item xs={12} md={6}>
                                            <div>
                                                <p className='titlesFormsUsers2'>Pon tu contraseña actual:</p>
                                                <div className="inpustEyes">
                                                    <input
                                                        type={showPassword3 ? 'text' : 'password'}
                                                        value={contraseñaActual}
                                                        onChange={(event) => setContraseñaActual(event.target.value)}
                                                    />
                                                    <div onClick={handleClickShowPassword3}>
                                                        {showPassword3 ? <FiEye /> : < FiEyeOff />}
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <div>
                                                <p className='titlesFormsUsers2'>Nueva contraseña</p>
                                                <div className="inpustEyes">
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={nuevaContraseña}
                                                        onChange={(event) => setNuevaContraseña(event.target.value)}
                                                    />
                                                    <div onClick={handleClickShowPassword}>
                                                        {showPassword ? <FiEye /> : < FiEyeOff />}
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <div>
                                                <p className='titlesFormsUsers2'>Confirmar nueva contraseña</p>
                                                <div className="inpustEyes">
                                                    <input
                                                        type={showPassword2 ? 'text' : 'password'}
                                                        value={confirmarNuevaContraseña}
                                                        onChange={(event) => setConfirmarNuevaContraseña(event.target.value)}
                                                    />
                                                    <div onClick={handleClickShowPassword2}>
                                                        {showPassword2 ? <FiEye /> : < FiEyeOff />}
                                                    </div>
                                                </div>
                                                <Box display="flex" justifyContent="space-between" marginTop={15}>
                                                    <button className='CancelarFormButton' onClick={rutaBack}>Cancelar</button>
                                                    <button className='GuardarFormButton' onClick={manejarEnvío}>Guardar</button>
                                                    <ModalMensajes
                                                        shown={showModalMensajes}
                                                        close={handleModalClose}
                                                        titulo={tituloMensajes}
                                                        mensaje={textoMensajes}
                                                        tipo="error"
                                                    />
                                                </Box>
                                            </div>
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