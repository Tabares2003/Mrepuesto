import React, { useState, useEffect, useRef } from "react";
import Container from "~/components/layouts/Container";
import { validateEmail } from "../utilities/Validations";
import useGetUsers from "~/hooks/useUsers";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import shortid from "shortid";
import UserRepository from "../repositories/UsersRepository";
import ReadUserEmail from "../repositories/ReadUserEmail";
import ActivateUserRepository from "../repositories/ActivateUserRepository";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { getTokenRegistro } from "../store/tokenregistro/action";
import Users from "~/repositories/Users";
import ReCAPTCHA from "react-google-recaptcha";
import NumberFormat from "react-number-format";
import Moment from "moment";
import IngresoFotosDocsNit from "./CreateUsers/ingresofotosdocsnit";

//Firebase
import firebase from "../utilities/firebase";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth";
import { format } from "prettier";
import TokenRegistroRepository from "../repositories/TokenRegistroRepository";
import { set } from "lodash";

const MyAccountScreen = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");

    const captcha = useRef(null);
    const router = useRouter();
    const [formData, setFormData] = useState(defaultValueForm());
    const [formError, setFormError] = useState({});
    const [loading, setLoading] = useState(false);
    const { getUsers } = useGetUsers();
    const [user, setUser] = useState(false);
    const [formDataToken, setFormDataToken] = useState(defaultValueToken());
    const [showModal, setShowModal] = useState(false);
    const [showModalDocsNit, setShowModalDocsNit] = useState(false);
    const [codigoToken, setCodigoToken] = useState("");
    const [idUid, setIdUid] = useState(0);
    const [tipoIdentificacion, setTipoIdentificacion] = useState(false);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const [createId, setCreateId] = useState(false);
    const [noSoyRobot, setNoSoyRobot] = useState(false);
    const [terminosCondiciones, setTerminosCondiciones] = useState(false);
    const [showModalFotos, setShowModalFotos] = useState(false);
    const [phone, setPhone] = useState(false);

    const [mensajePhone, setMensajePhone] = useState(false);
    const [activaMensajePhone, setActivaMensajePhone] = useState(false);
    const [activaMensajeNombre, setActivaMensajeNombre] = useState(false);
    const [mensajeNombre, setMensajeNombre] = useState(false);
    const [activaMensajeApellido, setActivaMensajeApellido] = useState(false);
    const [mensajeApellido, setMensajeApellido] = useState(false);
    const [activaMensajeIdentificacion, setActivaMensajeIdentificacion] =
        useState(false);
    const [mensajeIdentificacion, setMensajeIdentificacion] = useState(false);
    const [activaMensajeRazonSocial, setActivaMensajeRazonSocial] =
        useState(false);
    const [mensajeRazonSocial, setMensajeRazonSocial] = useState(false);
    const [activaMensajeEmail, setActivaMensajeEmail] = useState(false);
    const [mensajeEmail, setMensajeEmail] = useState(false);
    const [activaMensajeConfirmarEmail, setActivaMensajeConfirmarEmail] =
        useState(false);
    const [mensajeConfirmarEmail, setMensajeConfirmarEmail] = useState(false);
    const [activaMensajeContraseña, setActivaMensajeContraseña] =
        useState(false);
    const [mensajeContraseña, setMensajeContraseña] = useState(false);
    const [
        activaMensajeConfirmarContraseña,
        setActivaMensajeConfirmarContraseña,
    ] = useState(false);
    const [mensajeConfirmarContraseña, setMensajeConfirmarContraseña] =
        useState(false);

    const [showModalMedio, setShowModalMedio] = useState(false);
    const [subirDocsNit, setSubirDocsNit] = useState(false);
    const [inicio, setInicio] = useState(false);

    const [inputControlIdentificacion, setInputControlIdentificacion] =
        useState("form-control ps-form__input");
    const [inputControlTelefono, setInputControlTelefono] = useState(
        "form-control ps-form__input"
    );
    const [inputControlEmail, setInputControlEmail] = useState(
        "form-control ps-form__input"
    );
    const [inputControlConfirmarEmail, setInputControlConfirmarEmail] =
        useState("form-control ps-form__input");
    const [inputControlClave, setInputControlClave] = useState(
        "form-control ps-form__input"
    );
    const [inputControlConfirmeClave, setInputControlConfirmeClave] = useState(
        "form-control ps-form__input"
    );

    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    // Inicializamos el arrego de Tipos de Identificación
    const tiposidentificacion = useSelector(
        (state) => state.typesidentifications.typesidentifications
    );

    const onCloseModalActivarCuenta = () => {
        setShowModal(false);
    };

    const onCloseModalMedioToken = () => {
        setShowModalMedio(false);
    };

    const onCloseModalDocsJuridica = () => {
        setShowModalDocsNit(false);
    };

    useEffect(() => {
        setCodigoToken(datosusuarios.token);
        if (datosusuarios.activo === "N") {
            setShowModal(true);
        }
    }, [datosusuarios]);

    useEffect(() => {
        if (inicio) {
            router.push("/");
        }
    }, [inicio]);

    const registrarse = async () => {
        //e.preventDefault();
        //onsole.log("MEDIO : ", envio)


        if (!noSoyRobot) {
            swal({
                title: "Registro Usuarios",
                text: "Por favor confirma que no eres un Robot!",
                icon: "warning",
                button: "Aceptar",
            });
            return;
        }

        if (!terminosCondiciones) {
            swal({
                title: "Registro Usuarios",
                text: "Por favor, Debes aceptar terminos y condiciones!",
                icon: "warning",
                button: "Aceptar",
            });
            return;
        }

        setFormError({});
        let errors = {};
        let formOk = true;

        if (!validateEmail(formData.email)) {
            /*swal({
                title: "Registro Usuarios",
                text: "Ingresa un email valido!",
                icon: "warning",
                button: "Aceptar",
            });*/
            setActivaMensajeContraseña(true);
            setMensajeEmail("Ingresa un email valido!");
            errors.email = true;
            formOk = false;
        }
  
        if (formData.email != formData.emaildos) {
            /*swal({
                title: "Registro Usuarios",
                text: "Email y confirmación email deben ser iguales!",
                icon: "warning",
                button: "Aceptar",
            });*/
            setActivaMensajeConfirmarContraseña(true);
            setMensajeConfirmarEmail("Ingresa un email valido!");
            errors.email = true;
            formOk = false;
        }

        if (!formData.identificacion || !formData.telefono || !formData.email) {
            swal({
                title: "Registro Usuarios",
                text: "Hola, revisa la información ingresada!",
                icon: "warning",
                button: "Aceptar",
            });
            //return;
        }

        let indicativo = phone.substr(0, 3);
        let numtelefono = phone.substr(3, 20);
        let longitudtelefono = numtelefono.length;
        let cadena = phone.substr(1, 20);

        let validar;
        let haycaracter = false;
        for (var i = 0; i < cadena.length; i++) {
            validar = cadena.substr(i, 1);
            if (
                validar != 0 &&
                validar != 1 &&
                validar != 2 &&
                validar != 3 &&
                validar != 4 &&
                validar != 5 &&
                validar != 6 &&
                validar != 7 &&
                validar != 8 &&
                validar != 9
            )
                haycaracter = true;
            else console.log("ES UN NUMERO ", i, validar);
        }

        if (!phone) {
            setInputControlTelefono("form-control ps-form__input alertboton");
            /*swal({
                title: "Registro Usuarios",
                text: "Ingresa un número de teléfono!",
                icon: "warning",
                button: "Aceptar",
            });*/
            setActivaMensajePhone(true);
            setMensajePhone("Ingresa un número de teléfono valido!");
            errors.telefono = true;
            formOk = false;
            return;
        }

        if (indicativo != "+57") {
            errors.telefono = true;
            formOk = false;
            return;
        }

        if (haycaracter) {
            swal({
                title: "Registro Usuarios",
                text: "El número de telefono no puede contener letras!",
                icon: "warning",
                button: "Aceptar",
            });
            errors.telefono = true;
            formOk = false;
            return;
        }

        if (!formData.identificacion) {
            setInputControlIdentificacion(
                "form-control ps-form__input alertboton"
            );
            setActivaMensajeIdentificacion(true);
            setMensajeIdentificacion(
                "Ingresa tu número de identificación valido!"
            );
            /*swal({
                title: "Registro Usuarios",
                text: "Ingresa tu número de identificación!",
                icon: "warning",
                button: "Aceptar",
            });*/
            errors.identificacion = true;
            formOk = false;
            return;
        }

        if (
            formData.identificacion.length < 6 ||
            formData.identificacion.length > 10
        ) {
            /*swal({
                title: "Registro Usuarios",
                text: "Número de identificación es invalido!",
                icon: "warning",
                button: "Aceptar",
            });*/
            setInputControlIdentificacion(
                "form-control ps-form__input alertboton"
            );
            setActivaMensajeIdentificacion(true);
            setMensajeIdentificacion("Número de identificación es invalido!");
            errors.identificacion = true;
            formOk = false;
            return;
        }

        let validaidentificacion = formData.identificacion.substr(0, 20);

        let validarid;
        let haycaracterid = false;
        for (var i = 0; i < validaidentificacion.length; i++) {
            validarid = validaidentificacion.substr(i, 1);
            if (
                validarid != 0 &&
                validarid != 1 &&
                validarid != 2 &&
                validarid != 3 &&
                validarid != 4 &&
                validarid != 5 &&
                validarid != 6 &&
                validarid != 7 &&
                validarid != 8 &&
                validarid != 9
            ) {
                haycaracterid = true;
                console.log("CARACTER", i, validarid);
            } else console.log("ES UN NUMERO ", i, validarid);
        }

        if (haycaracterid) {
            setInputControlIdentificacion(
                "form-control ps-form__input alertboton"
            );
            setActivaMensajeIdentificacion(true);
            setMensajeIdentificacion(
                "La identificación ingresada no es valida!"
            );
            /*swal({
                title: "Registro Usuarios",
                text: "La identificación ingresada no es valida!",
                icon: "warning",
                button: "Aceptar",
            });*/

            errors.identificacion = true;
            formOk = false;
            return;
        }

        if (formData.password.length < 8) {
  
            setInputControlClave("form-control ps-form__input alertboton");
            setActivaMensajeContraseña(true);
            setMensajeContraseña(
                "Password debe ser mayor a siete (7) caracteres!"
            );
            /*
            swal({
                title: "Registro Usuarios",
                text: "Password debe ser mayor a siete (7) caracteres!",
                icon: "warning",
                button: "Aceptar",
            });*/
            errors.password = true;
            formOk = false;
            return;
        }

        if (formData.password != formData.passworddos) {
            /*swal({
                title: "Registro Usuarios",
                text: "Contraseña y confirmación contraseña deben ser iguales!",
                icon: "warning",
                button: "Aceptar",
            });*/
            setInputControlConfirmeClave(
                "form-control ps-form__input alertboton"
            );
            setActivaMensajeConfirmarContraseña(true);
            setMensajeConfirmarContraseña(
                "Contraseña y confirmación contraseña deben ser iguales!"
            );
            errors.password = true;
            formOk = false;
            return;
        }

        if (tipoIdentificacion === 6) {
            if (!formData.razonsocial) {
                swal({
                    title: "Registro Usuarios",
                    text: "Debes ingresar la razon social de la empresa!",
                    icon: "warning",
                    button: "Aceptar",
                });
                errors.razonsocial = true;
                formOk = false;
            }
        } else {
            if (tipoIdentificacion < 6) {
                if (!formData.primernombre) {
                    swal({
                        title: "Registro Usuarios",
                        text: "Por favor ingresa el nombre de la persona!",
                        icon: "warning",
                        button: "Aceptar",
                    });
                    errors.primernombre = true;
                    formOk = false;
                }

                if (!formData.primerapellido) {
                    swal({
                        title: "Registro Usuarios",
                        text: "Por favor ingresa el apellido!",
                        icon: "warning",
                        button: "Aceptar",
                    });
                    errors.primerapellido = true;
                    formOk = false;
                }
            }
        }

        if (tipoIdentificacion < 6) {
            let regex = new RegExp("^[a-zA-Z ]+$");

            if (formData.primernombre) {
                if (!regex.test(formData.primernombre)) {
                    setActivaMensajeNombre(true);
                    setMensajeNombre(
                        "Recuerda, Los nombres solo incluyen letras!"
                    );
                }

                if (activaMensajeNombre) {
                    swal({
                        title: "Registro Usuarios",
                        text: "Recuerda, El nombre solo incluye letras !",
                        icon: "warning",
                        button: "Aceptar",
                    });
                    errors.identificacion = true;
                    formOk = false;
                    return;
                }
            }

            let regexApellido = new RegExp("^[a-zA-Z ]+$");

            if (formData.primerapellido) {
                if (!regexApellido.test(formData.primerapellido)) {
                    setActivaMensajeApellido(true);
                    setMensajeApellido(
                        "Recuerda, Los apellido solo incluyen letras!"
                    );
                }

                if (activaMensajeApellido) {
                    swal({
                        title: "Registro Usuarios",
                        text: "Recuerda, El apellido solo incluye letras !",
                        icon: "warning",
                        button: "Aceptar",
                    });
                    errors.identificacion = true;
                    formOk = false;
                    return;
                }
            }
        }

        if (!formOk) {
            swal({
                title: "Registro Usuarios",
                text: "Hola, revisa la información ingresada!",
                icon: "warning",
                button: "Aceptar",
            });
            return;
        }

        //console.log("VALOR FORMDATA : ", formOk);
        //Consulta en la BD de MR para ver si el email esta asociado a una cuenta
        const emailusuario = {
            email: formData.email,
        };

        const respuestauser = await ReadUserEmail.getReadUsersEmail(
            emailusuario
        );
        ///console.log("SI USUARIO EXISTE : ", respuestauser);

        if (respuestauser.length > 0) {
            swal({
                title: "Registro Usuarios",
                text: "Por favor revisa el email, ya esta asignado a otra cuenta!",
                icon: "warning",
                button: "Aceptar",
            });
            return;
        }
        setFormError(errors);
        console.log("DATOS CREAR USUARIO : ", formData);

        if (formOk) {
            setLoading(true);
            //console.log("DATOS USAURIO : ", formData);
            //console.log(formData.password);

            const grabaUsuario = async () => {
                const auth = getAuth(firebase);
                createUserWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                )
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        //console.log("USER CREDENTIAL : ", user);
                        if (tipoIdentificacion < 6) {
                            /*
                            swal({
                                title: "Registro Usuarios",
                                text: "Selecciona medio para enviar el Token!",
                                icon: "success",
                                button: "Aceptar",
                            });*/
                        } else {
                            swal({
                                title: "Registro Usuarios",
                                text: "Cuenta creada de forma correcta!",
                                icon: "success",
                                button: "Aceptar",
                            });
                            swal({
                                title: "Registro Usuarios",
                                text: "Hemos enviado un código de validación a tu correo!",
                                icon: "success",
                                button: "Aceptar",
                            });
                        }

                        const auth = getAuth(firebase);

                        onAuthStateChanged(auth, (user) => {
                            if (user) {
                                //alert("ENTRE")

                                const datos = {
                                    uid: user.metadata.createdAt,
                                    medio: "",
                                };

                                setIdUid(user.metadata.createdAt);

                                setUser(true);
                                updateProfile(auth.currentUser, {
                                    displayName: formData.nombre,
                                    photoURL: "",
                                })
                                    .then(() => {
                                        /*
                                        swal({
                                            title: "Actualizar Usuarios",
                                            text: "Nombre Usuario Actualizado de forma correcta!",
                                            icon: "success",
                                            button: "Aceptar",
                                        });*/
                                        createUser(user.metadata.createdAt);
                                        setCreateId(true);
                                    })
                                    .catch((error) => {
                                        swal({
                                            title: "Actualizar Usuarios",
                                            text: "Error Actualizando nombre de Usuario!",
                                            icon: "error",
                                            button: "Aceptar",
                                        });
                                    });
                            } else {
                                setUser(false);
                            }
                        });
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        swal({
                            title: "Registro Usuarios",
                            text: "Error al crear la cuenta!",
                            icon: "error",
                            button: "Aceptar",
                        });
                    });
            };
            grabaUsuario();
        }
        return;
    };

    useEffect(() => {
        if (createId) {
            activaModal();
        }
    }, [createId]);

    const createUser = async (iDUser) => {
        //console.log("ID USUARIO CREATE : ", idUid);
        var caracteres = "012346789";
        var codigoid = "";
        for (var i = 0; i < 4; i++)
            codigoid += caracteres.charAt(
                Math.floor(Math.random() * caracteres.length)
            );
        //let cadena = codigoid; //shortid();
        let tokenid = codigoid; //cadena.substring(0, 6);
        //console.log("ID TOKEN : ", tokenid);
        setCodigoToken(tokenid);

        // Lee Web Service para enviar el token al usuario
        const datos = {
            token: tokenid,
            medio: "email",
        };

        let identificacionsinseparadores = formData.identificacion.replace(
            /,/g,
            ""
        );
        //console.log("IDENTIFICACION SIN ESPACIOS : ", identificacionsinseparadores);

        const usuario = {
            id: 0,
            uid: iDUser,
            primernombre: formData.primernombre,
            segundonombre: formData.segundonombre,
            primerapellido: formData.primerapellido,
            segundoapellido: formData.segundoapellido,
            razonsocial: formData.razonsocial,
            tipoidentificacion: tipoIdentificacion,
            identificacion: identificacionsinseparadores,
            teléfono: phone,
            email: formData.email,
            token: tokenid,
            activo: "N",
            direccion: formData.direccion,
            fechacreacion: fechaactual,
            fechatoken: fechaactual,
        };

        //console.log("DATOS USUARIO : ", usuario);

        const respuesta = await UserRepository.createUser(usuario).then(
            (response) => {
                if (response) {
                    //console.log("RESPUESTA CREACION USUARIO : ", response);
                    console.log("IDENTFICACION : ", tipoIdentificacion);
                    if (tipoIdentificacion < 6) {
                        if (response.type === 1) {
                            /*
                            swal({
                                title: "Registro Usuarios",
                                text: "Selecciona medio para enviar el Token!",
                                icon: "success",
                                button: "Aceptar",
                            });*/
                            setLoading(false);
                            //setShowModal(false);
                            //actualizaDatosUsuarioState(IdToken);
                            //router.push("/");
                        } else {
                            swal(
                                "Mercado Repuesto",
                                "No hemos podido grabar el usuario, Intenta nuevamente!",
                                "warning",
                                { button: "Aceptar" }
                            );
                            setLoading(false);
                            //router.push("/");
                        }
                    } else {
                        console.log(
                            "Respuesta API Creación Usuario : ",
                            response
                        );
                        token(datos);
                    }
                } else {
                    setSubirDocsNit(true);
                    setShowModalFotos(true);
                }
            }
        );
    };

    const token = async (datos) => {
        console.log("TOKEN : ", datos.token);

        let telefono = phone.replace("+", "");
        async function enviartoken(dat) {
            // Lee Web Service para enviar el token al usuario
            const datosToken = {
                token: dat.token,
                email_cliente: formData.email,
                nro_ws: telefono,
                medio: dat.medio,
            };

            console.log("DATOS TOKEN : ", dat.token);

            const TokenUsuario = await TokenRegistroRepository.getTokenRegistro(
                datosToken
            )
                .then(() => {
                    swal({
                        title: "Activar cuenta",
                        text: "Token enviado al correo, Recuerda revisar en correos no deseados!",
                        icon: "success",
                        button: "Aceptar",
                    });
                    setShowModal(true);
                })
                .catch((error) => {
                    swal({
                        title: "Activar cuenta",
                        text: "Error enviando token al medio seleccionado!",
                        icon: "error",
                        button: "Aceptar",
                    });
                });

            //console.log("TOKEN USUARIO : ", TokenUsuario);

            //setCarrocerias(BodiesVehicles);
            // Coloca los datos en state arreglo de modelos de vehiculos segun marca
            //dispatch(getBodiesVehicles(BodiesVehicles));
        }
        enviartoken(datos);
    };

    const onChangeDatoTelefono = (e) => {
        //console.log("VALOR TELEFONO : ", e.target.value)
        setActivaMensajePhone(false);
        setPhone("+57" + e.target.value);
    };

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onChangeToken = (e) => {
        setFormDataToken({
            ...formDataToken,
            [e.target.name]: e.target.value,
        });
    };

    const handleChangeTipoIdentificacion = (selectedOptions) => {
        //console.log("TIPO IDENTIFICACIÓN : ", selectedOptions);
        //alert("GENERICO");
        setTipoIdentificacion(selectedOptions);
    };

    const onChangeNoSoyRobot = () => {
        if (captcha.current.getValue()) {
            console.log("El usuario no es un robot");
            setNoSoyRobot(true);
        }
    };

    const validarToken = () => {
        //console.log("VALIDAR TOKEN : ", formDataToken.token);
        //console.log("CODIGO TOKEN : ", codigoToken);
        //console.log("ID USUARIO : ", idUid);

        const dat = {
            id: idUid,
        };

        const activarToken = async () => {
            const respuesta = await ActivateUserRepository.getActivateUser(
                dat
            ).then((response) => {
                if (response) {
                    if (response.type === 1) {
                        console.log(
                            "TIPO DE IDENTIFICACION : ",
                            tipoIdentificacion
                        );

                        if (tipoIdentificacion < 6) {
                            swal(
                                "Mercado Repuesto",
                                "Ya puedes disfrutar de una experiencia diferente MR!",
                                "success",
                                { button: "Aceptar" }
                            );
                            setShowModal(false);
                            location.reload();
                            setInicio(true);
                        } else {
                            swal(
                                "Mercado Repuesto",
                                "Tu cuenta de correo ya fue validada!",
                                "success",
                                { button: "Aceptar" }
                            );
                            Swal.fire({
                                //title: "Mercado Repuesto",
                                title: "Para continuar con el ingreso de documentos, Oprime Aceptar",
                                html: "<hr />",
                                width: 600,
                                color: "#2D2E83",
                                padding: "3em",
                                showCancelButton: true,
                                confirmButtonText: "Aceptar",
                                cancelButtonText: "Cancelar",
                            }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                    setShowModalDocsNit(true);
                                } else if (result.isDenied) {
                                    Swal.fire(
                                        "Cancelaste el ingreso de documentos",
                                        "",
                                        "warning"
                                    );
                                }
                            });
                            setShowModal(false);
                        }
                    } else {
                        swal(
                            "Mercado Repuesto",
                            "Algo salio mal, si deseas puedes reenviar tu token de activación!",
                            "success",
                            { button: "Aceptar" }
                        );
                        router.push("/");
                    }
                } else {
                    console.log("ENVIAR TOKEN : ", response);
                    //return null;
                }
            });
        };
        activarToken();
        //console.log("RESPUESTA : ", respuesta);
    };

    const activaModal = () => {
        if (tipoIdentificacion < 6) {
            //setShowModalMedio(true);
            tokenemail();
        } else {
            //setShowModalDocsNit(true);
        }
    };

    const mostrarModalDocsNit = () => {
        setSubirDocsNit(true);
        setShowModalFotos(true);
    };

    const tokenmensajetexto = () => {
        let medio = "sms";
        setShowModalMedio(false);
        token(medio);
    };

    const tokenemail = () => {
        let medio = "email";
        setShowModalMedio(false);
        token(medio);
    };

    const tokenwhatsapp = () => {
        let medio = "whatsapp";
        setShowModalMedio(false);
        token(medio);
    };

    const aceptarTerminos = () => {
        setTerminosCondiciones(true);
    };

    const validaIdentificacion = (identificacion) => {
        //console.log("DATO IDENTIFICACION : ", formData.identificacion);
        setInputControlTelefono("form-control ps-form__input");
        setActivaMensajePhone(false);
        setFormError({});
        let errors = {};
        let formOk = true;

        if (formData.identificacion) {
            if (!formData.identificacion) {
                setMensajeIdentificacion(
                    "Ingresa tu número de identificación!"
                );
                setActivaMensajeIdentificacion(true);
                setInputControlIdentificacion(
                    "form-control ps-form__input alertboton"
                );
                errors.identificacion = true;
                formOk = false;
                return;
            }

            if (
                formData.identificacion.length < 6 ||
                formData.identificacion.length > 10
            ) {
                setInputControlIdentificacion(
                    "form-control ps-form__input alertboton"
                );
                setMensajeIdentificacion(
                    "Recuerda, El nit debe contener solo números, longitud minima de 6 y maximo de 10"
                );
                setActivaMensajeIdentificacion(true);
                errors.identificacion = true;
                formOk = false;
                return;
            }

            let validaidentificacion = formData.identificacion.substr(0, 20);

            let validarid;
            let haycaracterid = false;
            for (var i = 0; i < validaidentificacion.length; i++) {
                validarid = validaidentificacion.substr(i, 1);
                if (
                    validarid != 0 &&
                    validarid != 1 &&
                    validarid != 2 &&
                    validarid != 3 &&
                    validarid != 4 &&
                    validarid != 5 &&
                    validarid != 6 &&
                    validarid != 7 &&
                    validarid != 8 &&
                    validarid != 9
                ) {
                    haycaracterid = true;
                    console.log("CARACTER", i, validarid);
                } else console.log("ES UN NUMERO ", i, validarid);
            }

            if (haycaracterid) {
                setActivaMensajeIdentificacion(true);
                setMensajeIdentificacion(
                    "Recuerda, La identificación solo debe contener números!"
                );
                setInputControlIdentificacion(
                    "form-control ps-form__input alertboton"
                );
                errors.identificacion = true;
                formOk = false;
                return;
            }

            if (formOk) {
                setInputControlIdentificacion("form-control ps-form__input");
            }
        }
    };

    const resetTelefono = () => {
        setInputControlTelefono("form-control ps-form__input");
        setActivaMensajePhone(false);
    };

    const validaTelefono = (tel) => {
        setActivaMensajeNombre(false);
        setFormError({});
        let errors = {};
        let formOk = true;
        let indicativo = "+57";
        let numtelefono = 0;
        let longitudtelefono = 0;
        let cadena = "";

        if (phone) {
            let indicativo = phone.substr(0, 3);
            let numtelefono = phone.substr(3, 20);
            let longitudtelefono = numtelefono.length;
            let cadena = phone.substr(1, 20);

            for (var i = 0; i < cadena.length; i++) {
                validar = cadena.substr(i, 1);
                if (
                    validar != 0 &&
                    validar != 1 &&
                    validar != 2 &&
                    validar != 3 &&
                    validar != 4 &&
                    validar != 5 &&
                    validar != 6 &&
                    validar != 7 &&
                    validar != 8 &&
                    validar != 9
                )
                    haycaracter = true;
                else console.log("ES UN NUMERO ", i, validar);
            }

            let validar;
            let haycaracter = false;
            let longitud = false;

            if (haycaracter) {
                setActivaMensajePhone(true);
                setMensajePhone("* Recuerda, solo números en el teléfono");
            }

            if (!phone) {
                setMensajePhone("Ingresa un número de teléfono!");
                setActivaMensajePhone(true);
                setInputControlTelefono(
                    "form-control ps-form__input alertboton"
                );
                errors.telefono = true;
                formOk = false;
                return;
            }

            if (indicativo != "+57") {
                swal({
                    title: "Registro Usuarios",
                    text: "El número de telefono debe incluir el prefijo +57!",
                    icon: "warning",
                    button: "Aceptar",
                });
                setInputControlTelefono(
                    "form-control ps-form__input alertboton"
                );
                errors.telefono = true;
                formOk = false;
                return;
            }

            if (
                (indicativo = "+57" && longitudtelefono != 10 && !haycaracter)
            ) {
                setInputControlTelefono(
                    "form-control ps-form__input alertboton"
                );
                setActivaMensajePhone(true);
                setMensajePhone(
                    "* Revisemos, El teléfono debe contener 10 caracteres númericos"
                );
                errors.telefono = true;
                formOk = false;
                return;
            }

            if (haycaracter) {
                setInputControlTelefono(
                    "form-control ps-form__input alertboton"
                );
                setActivaMensajePhone(true);
                setMensajePhone(
                    "* Revisemos, El teléfono solo debe contener números"
                );
            }
        } else {
            indicativo = "+57";
            numtelefono = 0;
            longitudtelefono = 0;
            cadena = "";
        }

        if (formOk) {
            setInputControlTelefono("form-control ps-form__input");
        }
    };

    const validaEmail = (email) => {
        console.log("DATO EMAIL : ", formData.email);
        setInputControlEmail("form-control ps-form__input");
        setActivaMensajeEmail(false);
        setInputControlConfirmarEmail("form-control ps-form__input");
        setActivaMensajeConfirmarEmail(false);

        setFormError({});
        let errors = {};
        let formOk = true;

        if (formData.email) {
            if (!validateEmail(formData.email)) {
                setInputControlEmail("form-control ps-form__input  alertboton");
                setMensajeEmail("Recuerda, Ingresa un email valido");
                setActivaMensajeEmail(true);
                errors.email = true;
                formOk = false;
                return;
            }

            if (formData.email && formData.emaildos) {
                if (formData.email != formData.emaildos) {
                    setInputControlConfirmarEmail(
                        "form-control ps-form__input  alertboton"
                    );
                    setMensajeConfirmarEmail(
                        "Email y confirmación email deben ser iguales!"
                    );
                    setActivaMensajeConfirmarEmail(true);
                    setInputControlEmail(
                        "form-control ps-form__input  alertboton"
                    );
                    setMensajeEmail(
                        "Email y confirmación email deben ser iguales!"
                    );
                    setActivaMensajeEmail(true);
                    errors.email = true;
                    formOk = false;
                    return;
                }
            }
        }

        if (formOk) {
            setInputControlEmail("form-control ps-form__input");
        }
    };

    const validaConfirmaEmail = (email) => {
        console.log("DATO CONFIRMA EMAIL : ", formData.emaildos);
        setInputControlConfirmarEmail("form-control ps-form__input");
        setActivaMensajeConfirmarEmail(false);
        setInputControlEmail("form-control ps-form__input");
        setActivaMensajeEmail(false);

        setFormError({});
        let errors = {};
        let formOk = true;

        if (formData.emaildos) {
            if (!validateEmail(formData.emaildos)) {
                setMensajeConfirmarEmail("Recuerda, Ingresa un email valido");
                setActivaMensajeConfirmarEmail(true);
                setInputControlConfirmarEmail(
                    "form-control ps-form__input alertboton"
                );
                errors.email = true;
                formOk = false;
                return;
            }

            if (formData.email && formData.emaildos) {
                if (formData.email != formData.emaildos) {
                    setInputControlConfirmarEmail(
                        "form-control ps-form__input  alertboton"
                    );
                    setMensajeConfirmarEmail(
                        "Email y confirmación email deben ser iguales!"
                    );
                    setActivaMensajeConfirmarEmail(true);
                    setInputControlEmail(
                        "form-control ps-form__input  alertboton"
                    );
                    setMensajeEmail(
                        "Email y confirmación email deben ser iguales!"
                    );
                    setActivaMensajeEmail(true);
                    errors.email = true;
                    formOk = false;
                    return;
                }
            }
        }

        if (formOk) {
            setInputControlConfirmarEmail("form-control ps-form__input");
        }
    };

    const resetNumeroIdentificacion = () => {
        setInputControlIdentificacion("form-control ps-form__input");
        setActivaMensajeIdentificacion(false);
    };

    const validaNombre = (nombre) => {
        //console.log("NOMBRE : ", formData.primernombre);
        setActivaMensajeApellido(false);
        let regex = new RegExp("^[a-zA-Z ]+$");

        if (formData.primernombre) {
            if (!regex.test(formData.primernombre)) {
                setActivaMensajeNombre(true);
                setMensajeNombre("Recuerda, Los nombres solo incluyen letras!");
                return false;
            }
        }
    };

    const validaApellido = (apellido) => {
        let regex = new RegExp("^[a-zA-Z ]+$");

        if (formData.primerapellido) {
            if (!regex.test(formData.primerapellido)) {
                setActivaMensajeApellido(true);
                setMensajeApellido(
                    "Recuerda, Los apellido solo incluyen letras!"
                );
                return false;
            }
        }
    };

    const validaRazonSocial = (razonsocial) => {
        let regex = new RegExp("^[a-zA-Z0-9]+$");

        if (formData.razonsocial) {
            if (!regex.test(formData.razonsocial)) {
                setActivaMensajeRazonSocial(true);
                setMensajeRazonSocial(
                    "Recuerda, La Razón Social solo incluyen letras y números!"
                );
                return false;
            }
        }
    };

    const validaClave = (clave) => {
        console.log("DATO CONTRASEÑA : ", formData.password);

        setFormError({});
        let errors = {};
        let formOk = true;

        if (formData.password.length < 8) {
            setActivaMensajeContraseña(true);
            setMensajeContraseña(
                "Password debe ser mayor a siete (7) caracteres!"
            );
            setInputControlClave("form-control ps-form__input  alertboton");
            setInputControlConfirmeClave(
                "form-control ps-form__input  alertboton"
            );

            errors.password = true;
            formOk = false;
            return;
        }

        if (formData.passworddos)
            if (formData.password != formData.passworddos) {
                setActivaMensajeContraseña(true);
                setMensajeContraseña(
                    "Contraseña y confirmación contraseña deben ser iguales!"
                );
                setInputControlClave("form-control ps-form__input  alertboton");
                setInputControlConfirmeClave(
                    "form-control ps-form__input  alertboton"
                );

                errors.password = true;
                formOk = false;
                return;
            }

        if (formOk) {
            setInputControlClave("form-control ps-form__input");
            setInputControlConfirmeClave("form-control ps-form__input");
        }
    };

    const validaConfirmarClave = (clave) => {
        console.log("DATO CONTRASEÑA : ", formData.passworddos);

        setFormError({});
        let errors = {};
        let formOk = true;

        if (formData.passworddos) {
            if (formData.passworddos.length < 8) {
                setActivaMensajeConfirmarContraseña(true);
                setMensajeConfirmarContraseña(
                    "Password debe ser mayor a siete (7) caracteres!"
                );
                setInputControlClave("form-control ps-form__input  alertboton");
                setInputControlConfirmeClave(
                    "form-control ps-form__input  alertboton"
                );

                errors.password = true;
                formOk = false;
                return;
            }
        }

        if (formData.passworddos && formData.password)
            if (formData.password != formData.passworddos) {
                setActivaMensajeConfirmarContraseña(true);
                setMensajeConfirmarContraseña(
                    "Contraseña y confirmación contraseña deben ser iguales!"
                );
                setInputControlClave("form-control ps-form__input  alertboton");
                setInputControlConfirmeClave(
                    "form-control ps-form__input  alertboton"
                );

                errors.password = true;
                formOk = false;
                return;
            }

        if (formOk) {
            setInputControlClave("form-control ps-form__input");
            setInputControlConfirmeClave("form-control ps-form__input");
        }
    };

    const onFocusContraseña = () => {
        setActivaMensajeConfirmarContraseña(false);
        setActivaMensajeContraseña(false);
        setInputControlClave("form-control ps-form__input");
        setInputControlConfirmeClave("form-control ps-form__input");
    };

    const onFocusConfirmarContraseña = () => {
        setActivaMensajeConfirmarContraseña(false);
        setActivaMensajeContraseña(false);
        setInputControlClave("form-control ps-form__input");
        setInputControlConfirmeClave("form-control ps-form__input");
    };

    return (
        <Container title="Mi Cuenta">
            <div className="ps-page ps-page--inner ">
                <div className="container">
                    <div className="ps-page__header"></div>
                    <div className="ps-page__content ps-account">
                        <div className="row">
                            {!datosusuarios.logged ? (
                                <div className="col-12 col-md-8">
                                    <form onChange={onChange}>
                                        <div className="ps-form--review">
                                            <h2 className="ps-form__title">
                                                Registrarse
                                            </h2>
                                            <Row>
                                                <Col xs lg={6}>
                                                    <label className="ps-form__label">
                                                        Tipo Identificación
                                                    </label>
                                                    <div className="form-control ps-form__input">
                                                        <select
                                                            className="custom-select ps-form__labelselect"
                                                            onChange={(e) =>
                                                                handleChangeTipoIdentificacion(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }>
                                                            <option
                                                                selected
                                                                className="select-fontsize ps-form__label">
                                                                Seleccione tipo
                                                                de
                                                                identificación
                                                            </option>
                                                            {tiposidentificacion &&
                                                                tiposidentificacion.map(
                                                                    (
                                                                        itemselect
                                                                    ) => {
                                                                        return (
                                                                            <option
                                                                                value={
                                                                                    itemselect.id
                                                                                }>
                                                                                {itemselect.tipoidentificacion +
                                                                                    " - " +
                                                                                    itemselect.descripcion}
                                                                            </option>
                                                                        );
                                                                    }
                                                                )}
                                                        </select>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <br />
                                            {tipoIdentificacion == 6 ? (
                                                <div>
                                                    <Row>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Número de
                                                                    Identificación
                                                                </label>
                                                                <input
                                                                    className={
                                                                        inputControlIdentificacion
                                                                    }
                                                                    type="numeric"
                                                                    value={
                                                                        inputValue
                                                                    }
                                                                    name="identificacion"
                                                                    onClick={
                                                                        resetNumeroIdentificacion
                                                                    }
                                                                />
                                                            </div>
                                                            {activaMensajeIdentificacion ? (
                                                                <h4 className="mensajeerrornombreusuario">
                                                                    {
                                                                        mensajeIdentificacion
                                                                    }
                                                                </h4>
                                                            ) : null}
                                                        </Col>
                                                        <Col xs lg={2}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label ps-btn--warning">
                                                                    Prefijo *
                                                                </label>
                                                                <input
                                                                    className={
                                                                        inputControlTelefono
                                                                    }
                                                                    defaultValue={
                                                                        "+57"
                                                                    }
                                                                    name="prefijo"
                                                                    type="text"
                                                                    disabled
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={4}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label ps-btn--warning">
                                                                    Número
                                                                    telefónico *
                                                                </label>
                                                                <input
                                                                    className={
                                                                        inputControlTelefono
                                                                    }
                                                                    onChange={
                                                                        onChangeDatoTelefono
                                                                    }
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        validaIdentificacion(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    name="telefono"
                                                                    type="text"
                                                                />
                                                            </div>
                                                        </Col>
                                                        {activaMensajePhone ? (
                                                            <h4 className="mensajeerroringresophone">
                                                                {mensajePhone}
                                                            </h4>
                                                        ) : null}
                                                    </Row>
                                                    <Row>
                                                        <Col xs lg={12}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Razon Social
                                                                </label>
                                                                <input
                                                                    className="form-control ps-form__input"
                                                                    placeholder="Ej: Mercado Repuesto S.A.S."
                                                                    name="razonsocial"
                                                                    type="text"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        validaTelefono(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Dirección de
                                                                    correo *
                                                                </label>
                                                                <input
                                                                    className={
                                                                        inputControlEmail
                                                                    }
                                                                    name="email"
                                                                    type="email"
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        validaRazonSocial(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Confirme
                                                                    dirección de
                                                                    correo *
                                                                </label>
                                                                <input
                                                                    className={
                                                                        inputControlConfirmarEmail
                                                                    }
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        validaEmail(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    name="emaildos"
                                                                    type="email"
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Contraseña *
                                                                </label>
                                                                <div className="input-group">
                                                                    <input
                                                                        className={
                                                                            inputControlClave
                                                                        }
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            validaConfirmaEmail(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        type="password"
                                                                        name="password"
                                                                    />
                                                                    <div className="input-group-append">
                                                                        <a
                                                                            className="fa fa-eye-slash toogle-password"
                                                                            href="#"></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Confirme
                                                                    contraseña *
                                                                </label>
                                                                <div className="input-group">
                                                                    <input
                                                                        className={
                                                                            inputControlConfirmeClave
                                                                        }
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            validaClave(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        type="password"
                                                                        name="passworddos"
                                                                    />
                                                                    <div className="input-group-append">
                                                                        <a
                                                                            className="fa fa-eye-slash toogle-password"
                                                                            href="#"></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            ) : tipoIdentificacion ? (
                                                <div>
                                                    <Row>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Número de
                                                                    identificación
                                                                </label>
                                                                <input
                                                                    className={
                                                                        inputControlIdentificacion
                                                                    }
                                                                    type="numeric"
                                                                    name="identificacion"
                                                                    //onFocus={unFocus}
                                                                    onBlur={(
                                                                        e
                                                                    ) =>
                                                                        validaIdentificacion(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    onClick={
                                                                        resetNumeroIdentificacion
                                                                    }
                                                                />
                                                            </div>
                                                            {activaMensajeIdentificacion ? (
                                                                <h4 className="mensajeerrornombreusuario">
                                                                    {
                                                                        mensajeIdentificacion
                                                                    }
                                                                </h4>
                                                            ) : null}
                                                        </Col>
                                                        <Col xs lg={2}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label ps-btn--warning">
                                                                    Prefijo *
                                                                </label>
                                                                <input
                                                                    className={
                                                                        inputControlTelefono
                                                                    }
                                                                    defaultValue={
                                                                        "+57"
                                                                    }
                                                                    name="prefijo"
                                                                    type="text"
                                                                    disabled
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={4}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label ps-btn--warning">
                                                                    Número
                                                                    telefónico *
                                                                </label>
                                                                <input
                                                                    className={
                                                                        inputControlTelefono
                                                                    }
                                                                    onChange={
                                                                        onChangeDatoTelefono
                                                                    }
                                                                    onClick={
                                                                        resetTelefono
                                                                    }
                                                                    onBlur={(
                                                                        e
                                                                    ) =>
                                                                        validaTelefono(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    name="telefono"
                                                                    type="text"
                                                                />
                                                            </div>
                                                        </Col>
                                                        {activaMensajePhone ? (
                                                            <h4 className="mensajeerroringresophone">
                                                                {mensajePhone}
                                                            </h4>
                                                        ) : null}
                                                    </Row>
                                                    <Row>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Nombre
                                                                </label>
                                                                <input
                                                                    className="form-control ps-form__input"
                                                                    placeholder="Ej: Juan"
                                                                    name="primernombre"
                                                                    type="text"
                                                                    onBlur={(
                                                                        e
                                                                    ) =>
                                                                        validaNombre(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        validaTelefono(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                {activaMensajeNombre ? (
                                                                    <h4 className="mensajeerrornombreusuario">
                                                                        {
                                                                            mensajeNombre
                                                                        }
                                                                    </h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Apellidos
                                                                </label>
                                                                <input
                                                                    className="form-control ps-form__input"
                                                                    placeholder="Ej: López Álvarez"
                                                                    name="primerapellido"
                                                                    type="text"
                                                                    onBlur={(
                                                                        e
                                                                    ) =>
                                                                        validaApellido(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        validaNombre(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                {activaMensajeApellido ? (
                                                                    <h4 className="mensajeerrornombreusuario">
                                                                        {
                                                                            mensajeApellido
                                                                        }
                                                                    </h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Dirección de
                                                                    correo *
                                                                </label>
                                                                <input
                                                                    className={
                                                                        inputControlEmail
                                                                    }
                                                                    name="email"
                                                                    type="email"
                                                                    onBlur={(
                                                                        e
                                                                    ) =>
                                                                        validaEmail(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        validaApellido(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                {activaMensajeEmail ? (
                                                                    <h4 className="mensajeerrornombreusuario">
                                                                        {
                                                                            mensajeEmail
                                                                        }
                                                                    </h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Confirme
                                                                    dirección de
                                                                    correo *
                                                                </label>
                                                                <input
                                                                    className={
                                                                        inputControlConfirmarEmail
                                                                    }
                                                                    onBlur={(
                                                                        e
                                                                    ) =>
                                                                        validaConfirmaEmail(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        validaEmail(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    name="emaildos"
                                                                    type="email"
                                                                />
                                                                {activaMensajeConfirmarEmail ? (
                                                                    <h4 className="mensajeerrornombreusuario">
                                                                        {
                                                                            mensajeConfirmarEmail
                                                                        }
                                                                    </h4>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Contraseña *
                                                                </label>
                                                                <div className="input-group">
                                                                    <input
                                                                        className={
                                                                            inputControlClave
                                                                        }
                                                                        onBlur={(
                                                                            e
                                                                        ) =>
                                                                            validaClave(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            validaConfirmaEmail(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        onFocus={
                                                                            onFocusContraseña
                                                                        }
                                                                        type="password"
                                                                        name="password"
                                                                    />
                                                                </div>
                                                                {activaMensajeContraseña ? (
                                                                    <h4 className="mensajeerrornombreusuario">
                                                                        {
                                                                            mensajeContraseña
                                                                        }
                                                                    </h4>
                                                                ) : null}
                                                                {/*
                                                                    <div className="input-group-append">
                                                                        <a
                                                                            className="fa fa-eye-slash toogle-password"
                                                                            href="#"></a>
                                                                    </div>*/}
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={6}>
                                                            <div className="ps-form__group">
                                                                <label className="ps-form__label">
                                                                    Confirme
                                                                    contraseña *
                                                                </label>
                                                                <div className="input-group">
                                                                    <input
                                                                        className={
                                                                            inputControlConfirmeClave
                                                                        }
                                                                        onBlur={(
                                                                            e
                                                                        ) =>
                                                                            validaConfirmarClave(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        onClick={(
                                                                            e
                                                                        ) =>
                                                                            validaClave(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        onFocus={
                                                                            onFocusConfirmarContraseña
                                                                        }
                                                                        type="password"
                                                                        name="passworddos"
                                                                    />
                                                                </div>
                                                                {activaMensajeConfirmarContraseña ? (
                                                                    <h4 className="mensajeerrornombreusuario">
                                                                        {
                                                                            mensajeConfirmarContraseña
                                                                        }
                                                                    </h4>
                                                                ) : null}
                                                                {/*
                                                                    <div className="input-group-append">
                                                                        <a
                                                                            className="fa fa-eye-slash toogle-password"
                                                                            href="#"></a>
                                                                    </div>*/}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            ) : null}

                                            {tipoIdentificacion ? (
                                                <div>
                                                    <Row>
                                                        <Col xs lg={6}>
                                                            <br />
                                                            <div className="App">
                                                                <ReCAPTCHA
                                                                    ref={
                                                                        captcha
                                                                    }
                                                                    sitekey="6Ld9HvkdAAAAAO7MeibRy8PNVMApQu5xC2vzqGF6"
                                                                    onChange={
                                                                        onChangeNoSoyRobot
                                                                    }
                                                                />
                                                            </div>
                                                        </Col>
                                                        <Col xs lg={6}>
                                                            <p className="ps-form__text">
                                                                Sugerencia: La
                                                                contraseña debe
                                                                tener ocho
                                                                caracteres como
                                                                mínimo. Para
                                                                mayor seguridad,
                                                                debe incluir
                                                                letras
                                                                minúsculas,
                                                                mayusculas,
                                                                números y
                                                                símbolos como !
                                                                " ? $ % ^ &amp;
                                                                ).
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                    <br />
                                                    <div className="ps-form__submit">
                                                        <Row>
                                                            <Col xs lg={2}>
                                                                <div
                                                                    className="ps-btn"
                                                                    onClick={
                                                                        registrarse
                                                                    }>
                                                                    Registrarse
                                                                </div>
                                                            </Col>
                                                            <Col xs lg={5}>
                                                                <div className="form-check">
                                                                    <input
                                                                        className="form-check-input"
                                                                        type="checkbox"
                                                                        id="remember"
                                                                        onClick={
                                                                            aceptarTerminos
                                                                        }
                                                                    />
                                                                    <label
                                                                        className="form-check-label"
                                                                        htmlFor="remember">
                                                                        Acepto
                                                                        términos
                                                                        y
                                                                        condiciones
                                                                    </label>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </div>
                                            ) : null}
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                console.log("FALSO")
                            )}
                        </div>
                    </div>
                </div>
                {subirDocsNit ? (
                    <IngresoFotosDocsNit
                        setShowModalFotos={setShowModalFotos}
                        showModalFotos={showModalFotos}
                        idUid={idUid}
                        email={formData.email}
                    />
                ) : (
                    console.log("MOSTRAR MODAL DOCS NIT : FALSE")
                )}
            </div>
            <Modal dialogClassName="modaldocsnit" show={showModalDocsNit}>
                <Modal.Header>
                    <h2 className="centrartextomodaldocs">
                        DOCUMENTOS PERSONA JURIDICA
                    </h2>
                    <button
                        type="button"
                        className="cerrarmodal"
                        data-dismiss="modal"
                        onClick={onCloseModalDocsJuridica}>
                        {" "}
                        X{" "}
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <p className="textomodaldocsnit">
                        Tu cuenta ya está creada, puedes comprar productos, pero
                        no puedes vender hasta no ingresar los siguientes
                        documentos:
                        <p className="textomodaldocsnitdos">
                            Cámara de Comercio.
                            <br />
                            RUT.
                            <br />
                            Cedula de ciudadanía del Representante legal.
                            <br />
                        </p>
                        Por favor sube los documentos solicitados, si no
                        dispones de estos archivos en este momento, tienes un
                        enlace en tus datos de usuario para ingresarlos y
                        continuar con el proceso de activación de la cuenta. Al
                        recibir los documentos, el área Jurídica de Mercado
                        Repuesto realizara la revisión, inmediatamente tengamos
                        la confirmación habilitaremos la opción para la
                        activación de tu cuenta..
                    </p>
                </Modal.Body>
                <div className="botongrabarproducto">
                    <Row>
                        <Col xs lg={2}></Col>
                        <Col xs lg={5}>
                            <div
                                className="ps-btn"
                                onClick={mostrarModalDocsNit}>
                                Subir Documentos
                            </div>
                        </Col>
                        <Col xs lg={2}>
                            <Button
                                className="ps-btn"
                                onClick={() => setShowModalDocsNit(false)}>
                                {" "}
                                Cancelar{" "}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
            <Modal dialogClassName="modalmediotoken" show={showModal}>
                <Modal.Header>
                    <h2>ACTIVAR CUENTA</h2>
                    <button
                        type="button"
                        className="cerrarmodal"
                        data-dismiss="modal"
                        onClick={onCloseModalActivarCuenta}>
                        {" "}
                        X{" "}
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <br />
                    <form onChange={onChangeToken}>
                        <div className="ps-form__group">
                            <label className="ps-form__label">
                                Ingresar Codigo :
                            </label>
                            <input
                                className="form-control ps-form__input"
                                name="token"
                                type="text"
                            />
                        </div>
                    </form>
                </Modal.Body>
                <div className="botongrabarproducto">
                    <Row>
                        <Col xs lg={2}></Col>
                        <Col xs lg={5}>
                            <div className="ps-btn" onClick={validarToken}>
                                Activar Cuenta
                            </div>
                        </Col>
                        <Col xs lg={3}>
                            <Button
                                className="ps-btn"
                                onClick={() => setShowModal(false)}>
                                {" "}
                                Cancelar{" "}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
            <Modal dialogClassName="modalmedioenvio" show={showModalMedio}>
                <Modal.Header>
                    <h2>POR QUE MEDIO DESEA RECIBIR EL TOKEN</h2>
                    <button
                        type="button"
                        className="cerrarmodal"
                        data-dismiss="modal"
                        onClick={onCloseModalMedioToken}>
                        {" "}
                        X{" "}
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <Row>
                            <Col xs lg={3}></Col>
                            <Col xs lg={3}>
                                <div
                                    className="ps-btn botonmediotoken"
                                    onClick={tokenemail}>
                                    {" Email "}
                                </div>
                            </Col>
                            {/*    
                            <Col xs lg={4}>
                                <Button
                                    className="ps-btn ps-btn--warning"
                                    onClick={tokenwhatsapp}>
                                    WhatsApp
                                </Button>
                            </Col>
                            <Col xs lg={4}>
                                <Button
                                    className="ps-btn ps-btn--warning"
                                    onClick={tokenmensajetexto}>
                                    Mensaje de Texto
                                </Button>
                            </Col>*/}
                        </Row>
                    </form>
                </Modal.Body>
                <div className="botongrabarproducto">
                    <hr />
                    <Row>
                        <Col xs lg={4}></Col>
                        <Col xs lg={3}>
                            <Button
                                className="ps-btn"
                                onClick={() => setShowModalMedio(false)}>
                                {" "}
                                Cancelar{" "}
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </Container>
    );
};

function defaultValueForm() {
    return {
        uid: "",
        primernombre: "",
        segundonombre: "",
        primerapellido: "",
        segundoapellido: "",
        razonsocial: "",
        tipoidentificacion: "",
        identificacion: "",
        telefono: "",
        email: "",
        token: "",
        activo: "N",
        direccion: "",
        fechacreacion: "",
    };
}

function defaultValueToken() {
    return {
        token: "",
    };
}

export default MyAccountScreen;
