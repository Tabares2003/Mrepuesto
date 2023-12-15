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
import { AiOutlineRight } from 'react-icons/ai';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";



export default function dispVinculados() {

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [UidUser, setUidUser] = useState("");
    const [DatosUser, setDatosUser] = useState([]);

    //Función para obtener el UID del Usuario que nos sirve para mapear sus historial
    useEffect(() => {
        const obtenerUidUsuario = async () => {
            let params = {
                uid: datosusuarios.uid,
            };
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "13",
                    params,
                });
                setDatosUser(res.data[0]);
                setUidUser(res.data[0].uid)
            } catch (error) {
                console.error("Error al leer los datos del usuario", error);
                // Maneja el error según tus necesidades
            }
        };
        obtenerUidUsuario();
    }, [datosusuarios]);



    const [dispositivosVinculados, setDispositivosVinculados] = useState([]);

    useEffect(() => {
        const leerDispositivosVinculados = async () => {
            let params = {
                usuario: UidUser,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "93",
                params,
            })
                .then((res) => {
                    if (res.data && res.data.listLinkedDevices) {
                        const dispositivos = res.data.listLinkedDevices.map((dispositivo) => {
                            return {
                                id: dispositivo.id,
                                iddispositivo: dispositivo.iddispositivo,
                                usuario: dispositivo.usuario,
                                localizacion: dispositivo.localizacion,
                                fechacreacion: dispositivo.fechacreacion,
                            };
                        });
                        // Almacena los dispositivos vinculados en el estado de tu componente
                        setDispositivosVinculados(dispositivos);
                    } else {
                        console.error("Error: res.data o res.data.listLinkedDevices es undefined");
                    }
                })
                .catch(function (error) {
                    console.error("Error al leer los datos del usuario", error);
                });
        };
        leerDispositivosVinculados();
    }, [UidUser]);







    const borrarDispositivo = async (id) => {
        let params = {
            usuario: UidUser,
            id: id,
        };

        await axios({
            method: "post",
            url: URL_BD_MR + "96",
            params,
        })
            .then((res) => {
                if (res.data && res.data.success) {
                    console.log("Dispositivo borrado con éxito");
                    // Actualiza la lista de dispositivos vinculados
                    setDispositivosVinculados(prevDispositivos => prevDispositivos.filter(dispositivo => dispositivo.id !== id));
                } else {
                    console.error("Error: no se pudo borrar el dispositivo");
                }
            })
            .catch(function (error) {
                console.error("Error al borrar el dispositivo", error);
            });
    };









    const router = useRouter();
    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
    //Posición top Pagina
    const irA = useRef(null);





    const handleroute = (route) => () => {
        router.push(route);
    };



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

                                <div className="ContDatosDocs" style={{ padding: '.5rem', justifyContent: 'center', display: 'flex' }}>
                                    <Grid sx={{ width: isMdDown ? '100%' : '65%' }}>
                                        <div>
                                            <p className="titlemisD">Dispositivos vinculados</p>
                                            <div>
                                                {/*  {dispositivosVinculados.map((dispositivo, index) => (
                                                    <div key={index}>
                                                        <h3>Dispositivo {index + 1}</h3>
                                                        <p><strong>ID:</strong> {dispositivo.id}</p>
                                                        <p><strong>ID del dispositivo:</strong> {dispositivo.iddispositivo}</p>
                                                        <p><strong>Usuario:</strong> {dispositivo.usuario}</p>
                                                        <p><strong>Localización:</strong> {dispositivo.localizacion}</p>
                                                        <p><strong>Fecha de creación:</strong> {dispositivo.fechacreacion}</p>
                                                    </div>
                                                ))}*/}
                                            </div>
                                        </div>

                                        <div className="contDispVincSubTitle">
                                            <p className="subtitdispvinc">Actualmente hay {dispositivosVinculados.length} dispositivos vinculados a tu cuenta</p>
                                        </div>

                                        {dispositivosVinculados.map((dispositivo, index) => (
                                            <div className="mainDispVinculados" key={index}>
                                                <div className="SubcontainerMisDatos">
                                                    <div>
                                                        <p className="titleSubContMisD">{dispositivo.iddispositivo}</p>
                                                        <p className="subtitleSubContMisD">
                                                            {dispositivo.localizacion && dispositivo.localizacion.split(', ').slice(-3).join(', ')}
                                                            -
                                                            {dispositivo.fechacreacion && dispositivo.fechacreacion.split(' ')[0]}
                                                        </p>
                                                    </div>
                                                    <div className="CloseSesionDispVinc">
                                                        <button className='ButtonCloseSession' onClick={() => borrarDispositivo(dispositivo.id)}>Cerrar sesión</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}





                                        <Grid container style={{ width: '100%' }}>
                                            <Grid item xs={12} md={6}></Grid>
                                            <Grid item xs={12} md={6}>
                                                <Box display="flex" justifyContent="space-between" marginTop={15}>
                                                    <button className='CancelarFormButton' onClick={handleroute('./seguridadData')}>Ir a seguridad</button>
                                                    <button className='GuardarFormButton' onClick={handleroute('/')}>Ir al inicio</button>
                                                </Box>
                                            </Grid>
                                        </Grid>



                                    </Grid>

                                </div>

                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}