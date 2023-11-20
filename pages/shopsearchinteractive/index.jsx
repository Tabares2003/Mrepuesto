import React, { useEffect, useState } from "react";
import ShopSearchInterative from "~/components/partials/shop/ShopSearchInterative";
import PromotionSecureInformation from "~/components/shared/sections/PromotionSecureInformation";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroupInteractive from "~/hooks/useProductGroupInteractive";
//import ShopInteractivoHeader from "../search/shopinteractivoheader";
import { getUbicarProducto } from "../../store/ubicarproducto/action";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Row, Col, Button } from "react-bootstrap";

const breadcrumb = [
    {
        id: 1,
        text: "Home",
        url: "/",
    },

    {
        id: 2,
        text: "Shop",
    },
];

const ShopScreen = (props) => {
    const {
        setOptionSelect,
        optionSelect,
        maximizarOption,
        setMaximizarOption,
        zoom,
        setZoom,
    } = props;
    //console.log("TIPO DISPLAY : ", optionSelect);
    //console.log("DISPLAY MAXIMIZAR: ", maximizarOption);

    const { loading, productItems, getProducts } = useGetProducts();
    const [mostrarZoom, setMostrarZoom] = useState("mt-15 col-md-5");
    const [ajustarCaja, setAjustarCaja] = useState("ml-0");
    const [datos, setDatos] = useState([]);
    const [actualiza, setActualiza] = useState(false);
    const [palabra, setPalabra] = useState("a");

    const { withGrid, withList } = useProductGroupInteractive();
    const dispatch = useDispatch();
    const Router = useRouter();
    const { query } = Router;
    let products = "";

    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );

    useEffect(() => {
        if (optionSelect == 1) setAjustarCaja("ml-2 ps-layout__right");
        else setAjustarCaja("ml-8 ps-layout__right");

        const queries = {
            _limit: 24,
        };
        getProducts(queries);
    }, [optionSelect]);

    useEffect(() => {
        dispatch(getUbicarProducto(maximizarOption));

        if (maximizarOption != 0)
            setMostrarZoom("maximizarbusquedaitems mt-15 col-md-5");
        else setMostrarZoom("mt-15 col-md-5");
    }, [optionSelect, maximizarOption]);

    if (productItems && productItems.length > 0) {
        if (query) {
            if (datos.length > 0) {
                products = withList(datos, loading, 4);
                //console.log("DATOS : ", datos);
            } else {
                if (query.layout === "list") {
                    products = withList(productItems, loading, 4);
                } else if (query.layout === "grid") {
                    products = withGrid(productItems, loading, 4);
                    switch (query.columns) {
                        case "2":
                            products = withGrid(productItems, loading, 2);
                            break;
                        case "3":
                            products = withGrid(productItems, loading, 3);
                            break;
                        default:
                            products = withGrid(productItems, loading, 4);
                            break;
                    }
                } else {
                    if (optionSelect === 1) {
                        products = withList(productItems, loading, 4);
                    } else if (optionSelect === 2) {
                        products = withGrid(productItems, loading, 4);
                    } else {
                        products = withList(productItems, loading, 4);
                    }
                }
            }
        }
    } else {
        products = withGrid(productItems, loading, 4);
    }

    const contactanos = () => {
        alert("Formulario en desarrollo");
    };

    useEffect(() => {
        if (actualiza) {
            setActualiza(false);
            setDatos([]);
            //alert(palabra);
            //let palabra = "Alternador CX5";
            let nvoprod = [];
            productItems &&
                productItems.map((row, index) => {
                    let nombre = row.name.toLowerCase();
                    let item = {
                        minusculas: nombre,
                        normal: row.name,
                    };
                    nvoprod.push(item);
                });

            let palabraminuscula = palabra.toLowerCase();

            let arr = [];
            if (palabra != "a") {
                arr = palabraminuscula.split(" ");
            } else {
                arr.push("a");
                arr.push("A");
            }

            //console.log("ITEMS : ", arr);
            //return;
            
            let datosselect = [];
            arr &&
                arr.map((row, index) => {
                    nvoprod &&
                        nvoprod
                            .filter((item) => item.minusculas.includes(row))
                            .map((filtered) => datosselect.push(filtered));
                });
            //console.log("DATOS : ", datosselect);
            //return;
            /*
minusculas: "alternador chevrolet corsa"
normal: "Alternador Chevrolet Cors
            */

            //let mayusculas = palabra; //.toUpperCase();
            let fitrodatos = [];
            let primerapalabra = "";
            let long = productItems.length;

            datosselect &&
                datosselect.map((row, index) => {
                    for (var i = 0; i < long; i++) {
                        if (productItems[i].name == row.normal) {
                            fitrodatos.push(productItems[i]);
                            break;
                        }
                    }
                    /*
                    productItems &&
                        productItems.map((item, index) => {
                            if (row.normal == item.name) {
                                fitrodatos.push(item);
                            }
                        });
                        */
                });
            /*
            datosselect &&
                datosselect.map((row, index) => {
                    if (index == 0) primerapalabra = row;//Tomar la primera palabra para Ordenar Arreglo

                    productItems &&
                        productItems
                            .filter((item) => item.name.includes(row.normal))
                            .map((filtered) => fitrodatos.push(filtered));
                });
                */

            console.log("FILTRADO : ", fitrodatos);
            setDatos(fitrodatos);
            //return
            /*
        fitrodatos &&
            fitrodatos.sort((a, b) => {
                if (a.name > b.name) {
                    return -1;
                }
                if (a.name < b.name) {
                    return 1;
                }
                return 0;
            });
*/
            setActualiza(false);
        }
    }, [actualiza]);

    //  <div className="container"> OJO LA CLASS CONTAINER SE RETIRO
    return (
        <div>
            {/*console.log("PRODUCT : ", productItems)  */}

            {maximizarOption != 0 ? (
                <div className="row mt-2 mbmenos10 botonresultadobusqueda">
                    <div className="col-md-10">
                        <h1 className="titulocantidadproductossearchlist ">
                            (
                            {productItems && productItems.length > 0
                                ? productItems.length
                                : 0}
                            ) Productos resultado de tu busqueda:{" "}
                            {datosbuscadorinteractivo.nombrecarroceria}
                            {";"}
                            {datosbuscadorinteractivo.nombremarca}
                            {" - "}
                            <a className="textocolorgris">
                                Si no encuentras lo que buscas:
                            </a>
                        </h1>
                    </div>
                    <div
                        className="mt-2 mlmenos15 botoncontactanos col-md-2"
                        onClick={() => contactanos()}>
                        Contáctanos
                    </div>
                </div>
            ) : null}
            <div className={mostrarZoom}>
                <div className="ml-10">
                    {/* 
                    <ShopInteractivoHeader
                        optionSelect={optionSelect}
                        setOptionSelect={setOptionSelect}
                        maximizarOption={maximizarOption}
                        setMaximizarOption={setMaximizarOption}
                        zoom={zoom}
                        setZoom={setZoom}
                        setActualiza={setActualiza}
                        setPalabra={setPalabra}
                    />*/}
                </div>
            </div>
            <div className="ps-page__content">
                <Row>
                    <Col xs={3} sm={3} md={9} lg={12}>
                        <div className={ajustarCaja}>
                            <ShopSearchInterative classes="ps-shop--grid">
                                {products}
                            </ShopSearchInterative>
                            <PromotionSecureInformation />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default ShopScreen;
