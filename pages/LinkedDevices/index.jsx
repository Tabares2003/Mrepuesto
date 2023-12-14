import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { URL_BD_MR } from "../../helpers/Constants";



function index(props) {



    const [device, setDevice] = useState("");
    const [deviceLink, setDeviceLink] = useState("");


    const datosusuarios = useSelector((state) => state.userlogged.userlogged);
    console.log("DAT USER : ", datosusuarios);
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


    //FunciónParaIdentificar el dispositivo
    useEffect(() => {
        const handleDeviceDetection = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            let array = userAgent.split(" ");
            console.log("XXXXXXX : ", array);

            setDevice(userAgent);
            const isMobile =
                /iphone|ipad|ipod|android|blackberry|windows phone/g.test(
                    userAgent
                );
            const isTablet =
                /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(
                    userAgent
                );
            //validacaracteres = preguntaVendedor.substr(i, 1);
            if (isMobile) {
                console.log("ID Dispositivo : ", "Mobile" + array[1] + " ");
                setDevice(
                    "Mobile" +
                    " " +
                    array[1] +
                    " " +
                    array[2] +
                    array[3] +
                    array[4] +
                    array[5]
                );
            } else if (isTablet) {
                console.log("ID Dispositivo : ", "Tablet" + array[1] + " ");
                setDevice(
                    "Tablet" +
                    " " +
                    array[1] +
                    " " +
                    array[2] +
                    array[3] +
                    array[4] +
                    array[5]
                );
            } else {
                let id = "Desktop" + array[1].substr(1, 10);
                let row = {
                    iddispositivo: id,
                    usuario: datosusuarios.uid,
                    locate: 0,
                    fecha: 0
                }

                console.log("ID Dispositivo : ", row);
                setDevice(
                    "Desktop" +
                    " " +
                    array[1] +
                    " " +
                    array[2] +
                    array[3] +
                    array[4] +
                    array[5]
                );
            }
        };

        handleDeviceDetection();
        window.addEventListener("resize", handleDeviceDetection);

        return () => {
            window.removeEventListener("resize", handleDeviceDetection);
        };
    }, [datosusuarios]);

    console.log("DISPOSITIVOS : ", deviceLink);
    //Función para identificar la localizacion
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
        address: null,
        error: null,
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            const { latitude, longitude } = position.coords;
                            console.log("Latitude:", latitude);
                            console.log("Longitude:", longitude);

                            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBzRDJgroRrXsY8A-UAfyc7j-3kowwe250`;
                            console.log("Geocode URL:", geocodeUrl);

                            try {
                                const response = await axios.get(geocodeUrl);

                                if (response.data.results[0]) {
                                    const formattedAddress = response.data.results[0].formatted_address;
                                    console.log("Formatted Address:", formattedAddress);

                                    setLocation({
                                        latitude,
                                        longitude,
                                        address: formattedAddress,
                                        error: null,
                                    });

                                    console.log("Location state updated successfully");
                                } else {
                                    console.error("No results found in geocoding response");
                                    setLocation({ error: "No results found" });
                                }
                            } catch (error) {
                                console.error("Error in geocoding request:", error);
                                setLocation({ error: `Error in geocoding request: ${error.message}` });
                            }
                        },
                        (error) => {
                            console.error("Error getting geolocation:", error);
                            setLocation({
                                latitude: null,
                                longitude: null,
                                error: `Error getting geolocation: ${error.message}`,
                            });
                        }
                    );
                } else {
                    console.log("Geolocation not available");
                    setLocation({
                        latitude: null,
                        longitude: null,
                        error: "Geolocation not available",
                    });
                }
            } catch (error) {
                console.error("Unexpected error:", error);
                setLocation({
                    latitude: null,
                    longitude: null,
                    error: `Unexpected error: ${error.message}`,
                });
            }
        };

        fetchData();
    }, []);







    useEffect(() => {
        const enviarDatos = async () => {
            let params = {
                iddispositivo: device, // Aquí usamos el estado 'device' que ya tienes definido
                usuario: UidUser, // Aquí puedes reemplazarlo con el valor que necesites
                localizacion: location.address, // Aquí usamos el estado 'location' que ya tienes definido
            };
            try {
                const res = await axios({
                    method: "post",
                    url: URL_BD_MR + "92", // Aquí cambiamos el endpoint al que quieres hacer la petición
                    params,
                });
                // Aquí puedes manejar la respuesta como necesites
            } catch (error) {
                console.error("Error al enviar los datos", error);
                // Maneja el error según tus necesidades
            }
        };
        enviarDatos();
    }, [device, location]); // Aquí incluimos 'device' y 'location' en las dependencias del efecto

















    return (
        <div>
            <h4>Información de Ubicación:</h4>
            {location.error && <p>Error: {location.error}</p>}
            {location.address && <p>Formatted Address: {location.address}</p>}
            <h4>Dispositivos Vinculados:</h4>
            {device && <p>{device}</p>}
        </div>
    );
}

export default index;