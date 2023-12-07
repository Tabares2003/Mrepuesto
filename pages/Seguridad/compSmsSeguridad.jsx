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
import axios from "axios";

export default function compSmsSeguridad() {


    //Consts measured, 80% and in md 100%.
    const theme = useTheme();
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const [showContainer, setShowContainer] = useState(false);

    const router = useRouter();
    const { tipoInformacion, info } = router.query;


    let titulo;

    // Determinar el título según el tipo de informac ión
    switch (tipoInformacion) {
        case 'nombres':
            titulo = 'Editar nombres y apellidos';
            break;
        case 'email':
            titulo = 'Editar correo electrónico';
            break;
        case 'DocIdentificacion':
            titulo = 'Editar documento de identificación';
            break;
        case 'domicilio':
            titulo = 'Editar teléfono de contacto';
            break;
        case 'teléfono':
            titulo = 'Editar teléfono de contacto';
            break;
        default:
            titulo = 'editar Usuario';
    }

    const [codigo, setCodigo] = useState('');


    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const [input5, setInput5] = useState('');
    const [input6, setInput6] = useState('');


    const input1Ref = useRef(null);
    const input2Ref = useRef(null);
    const input3Ref = useRef(null);
    const input4Ref = useRef(null);
    const input5Ref = useRef(null);
    const input6Ref = useRef(null);

    const redirectToComponent = (nuevoTitulo) => {
        const nuevoCodigo = Math.floor(100000 + Math.random() * 900000);
        setCodigo(nuevoCodigo);
        console.log(nuevoCodigo);  // Imprimir el código en la consola

        // Mostrar el nuevo contenedor
        setShowContainer(true);
        setTituloSubcontainer(nuevoTitulo);
    };

    const [showModal, setShowModal] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState('');
    const [textoMensajes, setTextoMensajes] = useState('');


    const handleContinue = () => {
        const inputCodigo = input1 + input2 + input3 + input4 + input5 + input6;
        if (inputCodigo === codigo.toString()) {
            // Navegar a la nueva ruta
            switch (info) {
                case 'nombres':
                    router.push('/EditUsers/FormsEditUsers/FormNamesLastNames');
                    break;
                case 'domicilio':
                    router.push('/EditUsers/FormsEditUsers/FormDomicilio');
                    break;
                case 'email':
                    router.push('/EditUsers/FormsEditUsers/FormEmail');
                    break; 
                default:
                    router.push('./seguridadData.jsx');
            }
        } else {
            // Mostrar modal indicando que el código es incorrecto
            setShowModal(true);
            setTituloMensajes('Código Incorrecto');
            setTextoMensajes('El código ingresado es incorrecto.');
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };
    const handleClose = () => {
        // Cerrar el popup
        setOpen(false);
    };

    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    const [datosUsuario, setDatosUsuario] = useState("");
    const [nombres, setNombres] = useState("");
    const [nombresDos, setNombresDos] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [apellidosDos, setApellidosDos] = useState("");
    const [telefonoRecibeSeleccionado, setTelefonoRecibeSeleccionado] = useState("");
    const [correoElectronico, setCorreoElectronico] = useState("");

    useEffect(() => {
        const leerDatosUsuario = async () => {
            let params = {
                uid: datosusuarios.uid,
            };

            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "13",
                    params,
                });
 
                setDatosUsuario(res.data[0]);
                setNombres(res.data[0].primernombre);
                setNombresDos(res.data[0].segundonombre);
                setApellidos(res.data[0].primerapellido);
                setApellidosDos(res.data[0].segundoapellido);
                setTelefonoRecibeSeleccionado(res.data[0].celular);
                setCorreoElectronico(res.data[0].email); 

            } catch (error) {
                console.error("Error al leer los datos del usuario", error);
                // Maneja el error según tus necesidades
            }
        };

        leerDatosUsuario();
    }, [datosusuarios]);

    const [tituloSubcontainer, setTituloSubcontainer] = useState('Ingresa el código de verificación');


    const irA = useRef(null);

    useEffect(() => {
        irA.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);
    return (
        <>

        </>
    )
}