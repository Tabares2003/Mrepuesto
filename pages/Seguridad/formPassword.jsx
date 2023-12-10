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








    const [emailSeleccionado, setEmailSeleccionado] = useState("");

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [datosUsuario, setDatosUsuario] = useState([]);
    useEffect(() => {
        const leerDatosUsuario = async () => {
            let params = {
                uid: datosusuarios.uid,
            };
            await axios({
                method: "post",
                url: URL_BD_MR + "13",
                params,
            })
                .then((res) => {
                    setEmail(res.data[0].email);
                })
                .catch(function (error) {
                    console.error("Error al leer los datos del usuario", error);
                });
        };
        leerDatosUsuario();
    }, [datosusuarios]);










    const [email, setEmail] = useState('');
    const [contraseñaActual, setContraseñaActual] = useState('');
    const [nuevaContraseña, setNuevaContraseña] = useState('');

    useEffect(() => {
        setEmail(datosusuarios.email);
    }, [datosusuarios]);

     const manejarEnvío = async (event) => {
    event.preventDefault();
    const auth = getAuth(firebase);

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
                                                        type={showPassword3 ? 'text' : 'password'} />
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
                                                        type={showPassword ? 'text' : 'password'} />
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
                                                    />
                                                    <div onClick={handleClickShowPassword2}>
                                                        {showPassword2 ? <FiEye /> : < FiEyeOff />}
                                                    </div>
                                                </div>
                                            </div>
                                            <Box display="flex" justifyContent="space-between" marginTop={15}>
                                                <button className='CancelarFormButton' onClick={rutaBack}>Cancelar</button>
                                                <button className='GuardarFormButton'>Guardar</button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <form onSubmit={manejarEnvío}>
                                        <label>
                                            <input 
                                                type="email"
                                                value={email}
                                                onChange={(event) => setEmail(event.target.value)}
                                            />
                                        </label>
                                        <label>
                                            Contraseña actual:
                                            <input
                                                type="password"
                                                value={contraseñaActual}
                                                onChange={(event) => setContraseñaActual(event.target.value)}
                                            />
                                        </label>
                                        <label>
                                            Nueva contraseña:
                                            <input
                                                type="password"
                                                value={nuevaContraseña}
                                                onChange={(event) => setNuevaContraseña(event.target.value)}
                                            />
                                        </label>
                                        <button type="submit">Cambiar contraseña</button>
                                    </form>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}