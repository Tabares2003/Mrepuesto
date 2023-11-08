import React, { useState, useEffect } from "react";
import Container from "~/components/layouts/Container";
import { Row, Col, Modal, Button, ButtonGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//import VideoPlayer from "react-video-js-player";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getEditData } from "../../store/editdata/action";

let anosselect = ";";

const selectedvehicle = (props) => {
    const router = useRouter();
    //const videoSCR = Car;
    const [tipos, setTipos] = useState(false);
    const dispatch = useDispatch();
    const [anosSeleccionado, setAnosSeleccionado] = useState([]);

    // Asignamos Datos seleccionado en el buscador interactivo
    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );

    let dataselectsearch = []; 

    dataselectsearch = useSelector(
        (state) => state.dataselectsearch.dataselectsearch
    );
    
    let datasearchinteractive = [];

    datasearchinteractive = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );

    const regresarAlBuscador = () => {
        let editdata = {
            editar: true,
        };

        dispatch(getEditData(editdata));
        router.push("/searchinteractive/searchinteractive");
        //location.reload();
    };

    useEffect(() => {
        let long = 0;
        console.log("SEACRH : ", datasearchinteractive);
        if (datasearchinteractive.length > 0 || datasearchinteractive.idvehiculo > 0) {
            long = datasearchinteractive.codigoaño.length;
            if (long > 0) {
                long = datasearchinteractive.codigoaño.length;
                //console.log("AÑOS : ", long);
                if (long == 0) anosselect = "";
                else anosselect = ";";

                if (datasearchinteractive.codigoaño.length == 1) {
                    datasearchinteractive.codigoaño &&
                        datasearchinteractive.codigoaño.map((row, index) => {
                            index == 0
                                ? (anosselect = anosselect + "" + row.label)
                                : null;
                        });
                } else if (datasearchinteractive.codigoaño.length == 2) {
                    datasearchinteractive.codigoaño &&
                        datasearchinteractive.codigoaño.map((row, index) => {
                            index == 0
                                ? (anosselect = anosselect + "" + row.label)
                                : index == 1
                                ? (anosselect = anosselect + ";" + row.label)
                                : null;
                        });
                } else if (datasearchinteractive.codigoaño.length > 2) {
                    datasearchinteractive.codigoaño &&
                        datasearchinteractive.codigoaño.map((row, index) => {
                            index == 0
                                ? (anosselect = anosselect + "" + row.label)
                                : index == 1
                                ? (anosselect = anosselect + ";" + row.label)
                                : index == 2
                                ? (anosselect =
                                      anosselect + ";" + row.label + "...")
                                : null;
                        });
                }
            }
        } else anosselect = "";
    }, [datasearchinteractive]);

    return (
        <div className="ml-15">
            <div className="row">
                <div className="col-md-10">
                    <div className="mt-15 box textoselectedvehicle">
                        {dataselectsearch.nombretipovehiculo}
                        {dataselectsearch.nombrecarroceria}
                        {dataselectsearch.nombremarca}
                        {dataselectsearch.nombremodelo}
                        {anosselect != ";" ?
                        anosselect :
                         null}
                        {dataselectsearch.nombretipocombustible}
                        {dataselectsearch.nombrecilindraje}
                        {datasearchinteractive.idvehiculo != 3 
                            ? dataselectsearch.nombretransmision
                            : null}
                        {datasearchinteractive.idvehiculo != 3 &&
                         datasearchinteractive.idvehiculo != 6 &&
                         datasearchinteractive.idvehiculo != 1
                            ? dataselectsearch.nombretraccion
                            : null}
                    </div>
                </div>
                <div className="col-md-1">
                    <div
                        className="posicionbotoneditar botonheaderinteractivoderecha"
                        onClick={() => regresarAlBuscador()}>
                        <i
                            className="tamañoiconoeditar fa fa-edit d-flex justify-content-center"
                            data-tip
                            data-for="registerEdit"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default selectedvehicle;
