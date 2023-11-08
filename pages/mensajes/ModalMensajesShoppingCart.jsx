import React, { useState, useEffect, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Row, Col, Modal, Form } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import { useRouter } from "next/router";

function ModalMensajesWishListControl(props) {
    const router = useRouter();
    const { shown, close, titulo, mensaje, tipo, setSoyNuevo, setTengoCuenta } =
        props;

    const creaTuCuenta = () => {
        router.push("/my-account#myaccount");
        localStorage.setItem("ira",JSON.stringify(2));
    };

    const tengocuenta = () => {
        router.push("/loginaccount#login");
        localStorage.setItem("ira",JSON.stringify(2));
    };

    return shown ? (
        <div
            className="modal-fondo-city mtmenos15"
            onClick={() => {
                close(false);
            }}>
            <div
                className="modal-shopping-cart redondearventamensajes "
                onClick={(e) => {
                    // do not close modal if anything inside modal content is clicked
                    e.stopPropagation();
                }}>
                <div>
                    <Row>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <div className="iconoventanamensajes mtmenos14">
                                <InfoIcon style={{ fontSize: 45 }} />
                            </div>
                        </Col>
                        <Col xl={9} lg={9} md={9} sm={9}>
                            <div className="ml-20 titulolistadeseos">
                                {titulo}
                            </div>
                        </Col>
                        <Col xl={1} lg={1} md={1} sm={1}>
                            <button
                                type="button"
                                className="cerrarmodal ml-40 sinborder colorbase"
                                data-dismiss="modal"
                                onClick={() => close(false)}>
                                {" "}
                                X{" "}
                            </button>
                        </Col>
                    </Row>
                </div>
                <div
                    className="btncreacuentashoppingcart"
                    onClick={() => creaTuCuenta()}>
                    Crea tu cuenta
                </div>
                <div
                    className="btningresacuentashoppingcart"
                    onClick={() => tengocuenta()}>
                    Ingresa a tu cuenta
                </div> 
            </div>
        </div>
    ) : null;
}

export default ModalMensajesWishListControl;
