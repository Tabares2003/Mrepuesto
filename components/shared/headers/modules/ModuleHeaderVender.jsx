import React, { useEffect, useState } from "react";
import header_supplies from "~/public/static/data/header_supplies.json";
import VehiclesTypesRepository from "~/repositories/VehicleTypesRepository";
import Users from "~/repositories/Users";
import { getUsers } from "~/store/users/action";
import useGetProducts from "~/hooks/useGetProducts";
import { useRouter } from "next/router";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getEditData } from "../../../../store/editdata/action";

const ModuleHeaderVender = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { product, getProductById } = useGetProducts();
    const [loading, setLoading] = useState(true);
    const [datosUsuario, setDatosUsuario] = useState([]);

    const [classVender, setClassVender] = useState(
        "header__categories-toggle sinborder"
    );

    const onSelecciono = () => {
        setClassVender("header__categories-toggle subrayartexto sinborder");
    };

    const outSelecciono = () => {
        setClassVender("header__categories-toggle sinborder");
    };

    // Seteamos la variable para iniciar o reiniciar el UseEffect
    const [stateInf, setStateInf] = useState(Math.random());
    // Declaramos el Setter para los tipos de Vehiculos
    const [TiposVehiculos, setTiposVehiculos] = useState(
        header_supplies.header_supplies
    );
    const userlogged = useSelector((state) => state.userlogged.userlogged);
    //console.log("DATOS USUARIO LOGUEADO : ", userlogged);

    const datoscrearproductos = useSelector(
        //(state) => state.datafindproducts.datafindproducts
        (state) => state.datosgenerales.datosgenerales
    );
    //console.log("DATOS CREAR PRODUCTOS : ", datoscrearproductos);

    const enviadatoslocalstorage = () => {
        localStorage.setItem(
            "datostiposvehiculos",
            JSON.stringify(datoscrearproductos.vgl_tiposvehiculos)
        );
        localStorage.setItem(
            "datosmarcasvehiculos",
            JSON.stringify(datoscrearproductos.vgl_marcasvehiculos)
        );
        localStorage.setItem(
            "datoscarroceriasvehiculos",
            JSON.stringify(datoscrearproductos.vgl_carroceriasvehiculos)
        );
        localStorage.setItem(
            "datosannosvehiculos",
            JSON.stringify(datoscrearproductos.vgl_annosvehiculos)
        );
        //localStorage.setItem('datosmodelosvehiculos', JSON.stringify(datoscrearproductos.vgl_modelosvehiculos));
        //localStorage.setItem('datoscilindrajevehiculos', JSON.stringify(datoscrearproductos.vgl_cilindrajesvehiculos));
        crearProductos();
    };
    /*
    useEffect(() => {
        localStorage.setItem('datostiposvehiculos', JSON.stringify(datoscrearproductos.vgl_tiposvehiculos));
        localStorage.setItem('datosmarcasvehiculos', JSON.stringify(datoscrearproductos.vgl_marcasvehiculos));
        localStorage.setItem('datoscarroceriasvehiculos', JSON.stringify(datoscrearproductos.vgl_carroceriasvehiculos));
        localStorage.setItem('datosannosvehiculos', JSON.stringify(datoscrearproductos.vgl_annosvehiculos));
    }, []);
*/
    //datoscrearproductos

    const crearProductos = () => {
        router.push("/CreateProduct/createproduct");
    };

    useEffect(() => {
        getProductById(2);
    }, []);

    //Valida si el usuario esta logueado o debe Registrarse
    const vender = () => {
        if (userlogged.idinterno === 0 && userlogged.activo === "S") {
            swal(
                "Mercado Repuesto",
                "Primero debes ingresar datos del vendedor!",
                "warning",
                { button: "Aceptar" }
            );
            router.push("/my-additionaldata");
        } else {
            if (userlogged.logged) {
                enviadatoslocalstorage();
            } else {
                Swal.fire({
                    showCancelButton: false,
                    showConfirmButton: false,
                    html: `<h2>Mercado Repuesto</h2>
                <hr/>
                <br />
                <h4>Vive una experiencia diferente en la compra o venta de tu repuesto</h4>
                <hr/>
                <h4>Por favor ingresa a tu cuenta</h4>
                <hr/>
                <a href="/my-account">
                    <h4 style="color:#FAB900">Soy nuevo</h4>
                </a>
                <hr/>
                <a href="/loginaccount">
                    <h4 style="color:#2D2E83">Ya tengo una cuenta</h4>
                </a>
                <hr/>
                `,
                });
            }
        }

        let editdata = {
            editar: false
        }
        dispatch(getEditData(editdata));

        if (router.pathname != "/CreateProduct/createproduct") {
            router.replace("/CreateProduct/createproduct");
            router.push("/CreateProduct/createproduct");
        } else {
            location.reload();
        }
    };

    // Lee de la base de datos de los tipos de Vehiculos desde la Base de Datos
    useEffect(() => {
        let queries;
        async function getTiposVehiculos(dat) {
            const TiposVehi = await VehiclesTypesRepository.getVehicleTypes(0);
            //console.log("TIPOS VEHICULOS : ", TiposVehi[0].header_supplies)
            //console.log("SUPLIES : ", header_supplies.header_supplies)
            setTiposVehiculos(TiposVehi[0].header_supplies);
            setTimeout(function () {
                setLoading(false);
            }, 200);
        }
        getTiposVehiculos(queries);
    }, [stateInf]);

    return (
        <div className="header__supplies ps-dropdown--fullscreen">
            <button
                className={classVender}
                onMouseOver={onSelecciono}
                onMouseOut={outSelecciono}>
                <span onClick={() => vender()}>Vender</span>
            </button>
        </div>
    );
};

export default ModuleHeaderVender;
