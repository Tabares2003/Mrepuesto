import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { toggleDrawer } from "~/store/app/action";
import useEcomerce from "~/hooks/useEcomerce";
import axios from "axios";
import { Modal } from "antd";
import { Row, Col, Button, ButtonGroup } from "react-bootstrap";
import { Box, Grid } from "@mui/material";
import useProduct from "~/hooks/useProduct";
import ModalMensajesWishList from "../../../../pages/mensajes/ModalMensajesWishList";
import ModalMensajesWishListControl from "../../../../pages/mensajes/ModalMensajesWishListControl";
import ModalMensajesShoppingCart from "../../../../pages/mensajes/ModalMensajesShoppingCart";
//import RefreshWishlist from "../../../../pages/shop/refreshwishlist";
import { useRouter } from "next/router";
import Moment from "moment";

//Constantes
import { URL_BD_MR, URL_IMAGES_RESULTS } from "../../../../helpers/Constants";

const ModuleDetailShoppingActions = ({ product, cart, ecomerce }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const { brand } = useProduct();
    const { loading, addItem } = useEcomerce();
    const [masProductos, setMasProductos] = useState(true);

    const [unidadesSelect, setunidadesSelect] = useState(1);
    const [classUnd, setClassUnd] = useState(0);
    const [classUndMas, setClassUndMas] = useState(0);

    const [showModalMensajes, setShowModalMensajes] = useState(false);
    const [tituloMensajes, setTituloMensajes] = useState(false);
    const [textoMensajes, setTextoMensajes] = useState(false);

    const [showModalMensajesCtlr, setShowModalMensajesCtlr] = useState(false);
    const [tituloMensajesCtlr, setTituloMensajesCtlr] = useState(false);
    const [textoMensajesCtlr, setTextoMensajesCtlr] = useState(false);

    const [showModalMensajesShoppingCart, setShowModalMensajesShoppingCart] =
        useState(false);
    const [tituloMensajesShoppingCart, setTituloMensajesShoppingCart] =
        useState(false);
    const [textoMensajesShoppingCart, setTextoMensajesShoppingCart] =
        useState(false);

    const [soyNuevo, setSoyNuevo] = useState(false);
    const [TengoCuenta, setTengoCuenta] = useState(false);

    const [login, setLogin] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const fechaactual = Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const [direccionesUsuarios, setDireccionesUsuarios] = useState([]);

    // Asignamos Datos al arreglo de Usuarios desde el state
    const datosusuarios = useSelector((state) => state.userlogged.userlogged);

    useEffect(() => {
        if (quantity >= product.numerounidades) {
            setMasProductos(false);
        } else {
            setMasProductos(true);
        }

        const leerDirecciones = async () => {
            let params = {
                usuario: datosusuarios.uid,
            };

            await axios({
                method: "post",
                url: URL_BD_MR + "65",
                params,
            })
                .then((res) => {
                    if (res.data.listardireccionesusuario.length > 0) {
                        console.log(
                            "DIRECIONES : ",
                            res.data.listardireccionesusuario
                        );
                        setDireccionesUsuarios(
                            res.data.listardireccionesusuario[0]
                        );
                    }
                })
                .catch(function (error) {
                    console.log("Error leyendo direcciones");
                });
        };
        leerDirecciones();
    }, [quantity, datosusuarios]);

    useEffect(() => {
        if (unidadesSelect == 0) {
            setClassUnd("botonesunidadesselectmenos sinborder deshabilitar");
        } else {
            setClassUnd("botonesunidadesselectmenos sinborder");
        }

        if (unidadesSelect >= product.numerounidades) {
            setClassUndMas("botonesunidadesselect sinborder deshabilitar");
        } else {
            setClassUndMas("botonesunidadesselect sinborder");
        }
        //product.numerounidades
    }, [unidadesSelect]);

    const selCantidad = (cant) => {
        let cantidad = parseInt(unidadesSelect) + parseInt(cant);
        setunidadesSelect(cantidad);
        //product.numerounidades
    };

    const handleAddItemToCart = (e) => {
        e.preventDefault();

        const dat = [
            {
                id: product.id,
                quantity: unidadesSelect,
            },
        ];

        addItem({ id: product.id, quantity: unidadesSelect }, dat, "cart");
        dispatch(toggleDrawer(true));

        console.log("PRODUC : ", dat);
        return;
        console.log("AGREGAR ITEM AL CARRITO : ", ecomerce.cartItems);
        return;
    };

    const handleAddItemToCompare = (e) => {
        e.preventDefault();
        addItem({ id: product.id }, ecomerce.compareItems, "compare");
        const modal = Modal.success({
            centered: true,
            title: "Success!",
            content: `This product has been added to your compare listing!`,
        });
        modal.update;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (login) {
                router.push("/loginaccount");
                setLogin(false);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [login]);

    const validaPrdListWish = () => {
        const leerItem = async () => {
            const leerItems = async () => {
                let params = {
                    idproducto: product.id,
                    usuario: datosusuarios.uid,
                };

                console.log("PARAM : ", params);

                await axios({
                    method: "post",
                    url: URL_BD_MR + "57",
                    params,
                })
                    .then((res) => {
                        if (res.data.listaritemdeseos.length > 0) {
                            //console.log("LEER : ", res.data.listaritemdeseos[0].idproducto
                            setShowModalMensajes(true);
                            setTituloMensajes("Lista de deseos");
                            let texto = "Producto ya existe en lista de deseo";
                            setTextoMensajes(texto);
                            return;
                        } else agregarListaDeseo();
                    })
                    .catch(function (error) {
                        setShowModalMensajes(true);
                        setTituloMensajes("Lista de deseos");
                        let texto = "Error leyendo producto en lista de deseo";
                        setTextoMensajes(texto);
                        return;
                    });
            };
            leerItems();
        };
        leerItem();
    };

    const agregarListaDeseo = () => {
        if (!datosusuarios.uid || datosusuarios.uid == 0) {
            setShowModalMensajesCtlr(true);
            setTituloMensajesCtlr("Lista de deseos");
            let texto =
                "¡Bienvenido! Para agregar a lista de deseo debes ingresar a tu cuenta";
            setTextoMensajesCtlr(texto);
            //localStorage.setItem("ira",JSON.stringify(1));
            //setLogin(true);
            return;
        }

        const grabarItem = async () => {
            let params = {
                idproducto: product.id,
                compatible: product.compatible,
                usuario: datosusuarios.uid,
            };
            //console.log("PROD : ", params);

            await axios({
                method: "post",
                url: URL_BD_MR + "53",
                params,
            })
                .then((res) => {
                    //console.log("DAT: ", res.data);
                    setShowModalMensajes(true);
                    setTituloMensajes("Lista de deseos");
                    let texto = "Producto agregado a lista de deseo";
                    setTextoMensajes(texto);

                    const leerItems = async () => {
                        let params = {
                            usuario: datosusuarios.uid,
                        };

                        await axios({
                            method: "post",
                            url: URL_BD_MR + "54",
                            params,
                        })
                            .then((res) => {
                                //console.log("DAT WISH LIST: ", res.data.listaritemdeseos.length);
                                dispatch(
                                    getDataWishList(
                                        res.data.listaritemdeseos.length
                                    )
                                );
                            })
                            .catch(function (error) {
                                console.log(
                                    "Error leyendo preguntas al vendedor"
                                );
                            });
                    };
                    leerItems();
                })
                .catch(function (error) {
                    console.log("Error leyendo preguntas al vendedor");
                });
        };
        grabarItem();
    };

    const handleAddItemToWishlist = (e) => {
        e.preventDefault();
        const { product } = this.props;
        addItem({ id: product.id }, ecomerce.wishlistItems, "wishlist");
        const modal = Modal.success({
            centered: true,
            title: "Success!",
            content: `This item has been added to your wishlist`,
        });
        modal.update;
    };

    const handleIncreaseItemQty = (e) => {
        e.preventDefault();
        setQuantity(quantity + 1);
    };

    const handleDecreaseItemQty = (e) => {
        e.preventDefault();
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleChangeInput = (valor) => {
        //alert(valor)
        setunidadesSelect(valor);
    };

    const comprarAhora = () => {
        if (!datosusuarios.uid || datosusuarios.uid == 0) {
            /* Guarda datos del producto que se debe agregar al localstorage */
            let itemshoppingcartadd = {
                idproducto: product.id,
                compatible: product.compatible,
                cantidad: unidadesSelect,
            };
            localStorage.setItem(
                "itemshoppingcartadd",
                JSON.stringify(itemshoppingcartadd)
            );

            setShowModalMensajesShoppingCart(true);
            setTituloMensajesShoppingCart(
                "¡Bienvenido! Para comprar debes ingresar a tu cuenta"
            );
            let texto = "";
            setTextoMensajesShoppingCart(texto);
            //setLogin(true);
            return;
        }

        if (direccionesUsuarios.length == 0) {
            let item = [];

            let dat = {
                compatible: product.compatible,
                cantidad: unidadesSelect,
                fechacreacion: fechaactual,
                id: product.id,
                idproducto: product.id,
                nombreimagen1: product.thumbnail.name,
                numerodeunidades: product.numerounidades,
                precio: product.price,
                titulonombre: product.name,
                usuario: datosusuarios.uid,
            };

            item.push(dat);
            localStorage.setItem("itemcompraall", JSON.stringify(item));
            let ruta = "/shop/youraddresses/";
            router.push(ruta);
        } else {
            localStorage.setItem("undselcompraahora", JSON.stringify(unidadesSelect));
            //alert(unidadesSelect)
            //return
            const leeItemAgregadoCarrito = async () => {
                let params = {
                    usuario: datosusuarios.uid,
                    idproducto: product.id,
                };

                await axios({
                    method: "post",
                    url: URL_BD_MR + "62",
                    params,
                })
                    .then((res) => {
                        if (res.data.listaritemcarrito.length > 0) {
                            //console.log("Producto existe : ",res.data.listaritemcarrito);

                            let dat = res.data.listaritemcarrito[0];
                            let item = {
                                cantidad: dat.cantidad,
                                compatible: dat.compatible,
                                fechacreacion: dat.fechacreacion,
                                id: dat.id,
                                idproducto: dat.idproducto,
                                nombreimagen1: dat.nombreimagen1,
                                numerodeunidades: dat.numerodeunidades,
                                precio: dat.precio,
                                titulonombre: dat.titulonombre,
                                usuario: datosusuarios.uid,
                            };

                            let prd = [];
                            prd.push(item);
                            localStorage.setItem(
                                "itemcompraall",
                                JSON.stringify(prd)
                            );

                            localStorage.setItem("undselcompraahora", JSON.stringify(unidadesSelect));
                            
                            //console.log("DATOS : ", dat);
                            localStorage.setItem(
                                "itemcompra",
                                JSON.stringify(item)
                            );
                            let ruta = "/shop/checkout/";
                            router.push(ruta);
                        } else {
                            const grabarItemCarrito = async () => {
                                let params = {
                                    idproducto: product.id,
                                    compatible: product.compatible,
                                    usuario: datosusuarios.uid,
                                    cantidad: unidadesSelect,
                                };
                                //console.log("PROD : ", params);

                                await axios({
                                    method: "post",
                                    url: URL_BD_MR + "58",
                                    params,
                                })
                                    .then((res) => {
                                        const leeItemAgregadoCarrito =
                                            async () => {
                                                let params = {
                                                    usuario: datosusuarios.uid,
                                                    idproducto: product.id,
                                                };

                                                await axios({
                                                    method: "post",
                                                    url: URL_BD_MR + "62",
                                                    params,
                                                })
                                                    .then((res) => {
                                                        let item = {
                                                            idproducto:
                                                                res.data
                                                                    .listaritemcarrito[0]
                                                                    .idproducto,
                                                            nombreimagen1:
                                                                res.data
                                                                    .listaritemcarrito[0]
                                                                    .nombreimagen1,
                                                            titulonombre:
                                                                res.data
                                                                    .listaritemcarrito[0]
                                                                    .titulonombre,
                                                            cantidad:
                                                                res.data
                                                                    .listaritemcarrito[0]
                                                                    .cantidad,
                                                        };

                                                        dispatch(
                                                            getAddEdToCart(item)
                                                        );
                                                        localStorage.setItem(
                                                            "addedtocart",
                                                            JSON.stringify(item)
                                                        );
                                                        localStorage.setItem(
                                                            "itemshoppingcartadd",
                                                            JSON.stringify(null)
                                                        );
                                                        localStorage.setItem(
                                                            "contrview",
                                                            JSON.stringify(1)
                                                        );
                                                    })
                                                    .catch(function (error) {
                                                        console.log(
                                                            "Error leyendo items carrito de compra"
                                                        );
                                                    });
                                            };
                                        leeItemAgregadoCarrito();

                                        const leerItemsCarrito = async () => {
                                            let params = {
                                                usuario: datosusuarios.uid,
                                            };

                                            await axios({
                                                method: "post",
                                                url: URL_BD_MR + "59",
                                                params,
                                            })
                                                .then((res) => {
                                                    //console.log("DAT WISH LIST: ", res.data.listaritemdeseos.length);
                                                    dispatch(
                                                        getDataShoppingCart(
                                                            res.data
                                                                .listarcarritocompra
                                                                .length
                                                        )
                                                    );
                                                })
                                                .catch(function (error) {
                                                    console.log(
                                                        "Error leyendo items carrito de compra"
                                                    );
                                                });
                                        };
                                        leerItemsCarrito();
                                    })
                                    .catch(function (error) {
                                        console.log(
                                            "Error leyendo items carrito de compra"
                                        );
                                    });
                            };
                            grabarItemCarrito();

                            let dat = {
                                cantidad: unidadesSelect,
                                compatible: product.compatible,
                                fechacreacion: fechaactual,
                                id: product.id,
                                idproducto: product.id,
                                nombreimagen1: product.thumbnail.name,
                                numerodeunidades: product.numerounidades,
                                precio: product.price,
                                titulonombre: product.name,
                                usuario: datosusuarios.uid,
                            };

                            //console.log("DATOS : ", dat);
                            localStorage.setItem(
                                "itemcompra",
                                JSON.stringify(dat)
                            );
                            let ruta = "/shop/checkout/";
                            router.push(ruta);
                        }
                    })
                    .catch(function (error) {
                        console.log("Error leyendo items carrito de compra");
                    });
            };
            leeItemAgregadoCarrito();
        }
    };

    return (
        <div className="mtmenos20 mb-20">
            <ModalMensajesWishList
                shown={showModalMensajes}
                close={setShowModalMensajes}
                titulo={tituloMensajes}
                mensaje={textoMensajes}
                tipo="1"
            />

            <ModalMensajesWishListControl
                shown={showModalMensajesCtlr}
                close={setShowModalMensajesCtlr}
                titulo={tituloMensajesCtlr}
                mensaje={textoMensajesCtlr}
                setSoyNuevo={setSoyNuevo}
                setTengoCuenta={setTengoCuenta}
                tipo="1"
            />

            <ModalMensajesShoppingCart
                shown={showModalMensajesShoppingCart}
                close={setShowModalMensajesShoppingCart}
                titulo={tituloMensajesShoppingCart}
                mensaje={textoMensajesShoppingCart}
                setSoyNuevo={setSoyNuevo}
                setTengoCuenta={setTengoCuenta}
                tipo="1"
            />

            {
            //refresh ? <RefreshWishlist setRefresh={setRefresh} /> : null
        }

            <div className="ps-product__add-cart">
                <label className="ps-product__label">
                    Unidades disponibles: {product.numerounidades}
                </label>
                <div>
                    <Row className="cajaunidadeselect">
                        <Col xs={4} sm={4} md={4} lg={4}>
                            <button
                                className={classUnd}
                                onClick={() => selCantidad(-1)}>
                                _
                            </button>
                        </Col>
                        <Col xs={5} sm={5} md={5} lg={5}>
                            <input
                                className="cajaunidadeinput"
                                type="text"
                                defaultValue="1"
                                value={unidadesSelect}
                                //onChange={(e)=>handleChangeInput(e.target.value)}
                                placeholder="1"
                            />
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2}>
                            <button
                                className={classUndMas}
                                onClick={() => selCantidad(1)}>
                                +
                            </button>
                        </Col>
                    </Row>

                    <div className="mt-20">
                        <Grid container spacing={1}>
                            <Grid item xs={6} md={6} lg={6}>
                                <h1
                                    className="botoncomprarahora"
                                    onClick={() => comprarAhora()}>
                                    Comprar ahora
                                </h1>
                            </Grid>
                            <Grid item xs={6} md={6} lg={6}>
                                <Grid item xs={6} md={6} lg={6}>
                                    <h1
                                        className="botonagregarcarrito"
                                        onClick={(e) => handleAddItemToCart(e)}>
                                        Agregar al carrito
                                    </h1>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                    <Row className="subrayartextosingleview ">
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <a onClick={(e) => validaPrdListWish()}>
                                Agregar a lista de deseos{" "}
                                <i class="fa fa-heart-o" aria-hidden="true"></i>
                            </a>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};
export default connect((state) => state)(ModuleDetailShoppingActions);
