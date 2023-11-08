import React, { useEffect } from "react";
import useGetProducts from "~/hooks/useGetProducts";
import useProductGroupInteractive from "~/hooks/useProductGroupInteractive";
import { useRouter } from "next/router";
import ModuleShopActionsInteractivo from "~/components/partials/shop/modules/ModuleShopActionsInteractivo";
import { useSelector, useDispatch } from "react-redux";
import { cond } from "lodash";
import { getDataCityPrd } from "../../store/datacityprd/action";

const breadcrumb = [
    {
        id: 1,
        text: "Inicio",
        url: "/",
    },
    {
        id: 2,
        text: "Tienda",
        url: "/shop",
    },
    {
        id: 3,
        text: "Resultado de la búsqueda",
    },
];

let productosfiltrados = [];
let productosfiltradoscity = [];
let arrayciud = [];

const SearchItemsMaximize = (props) => {
    const {
        optionSelect,
        setOptionSelect,
        setMaximizarOption,
        maximizarOption,
        zoom,
        setZoom,
        menorprecio,
        setMenorPrecio,
        mayorprecio,
        setMayorPrecio,
        precioFiltroMinimo,
        setPrecioFiltroMinimo,
        precioFiltroMaximo,
        setPrecioFiltroMaximo,
        filtroPrecio,
        setFiltroPrecio,
        condicionPrd,
        ciudadesPrd,
        dataCitySelect,
        dataPrdItem,
        database,
        precioMin,
        precioMax,
    } = props;

    const datosbuscadorinteractivo = useSelector(
        (state) => state.datasearchinteractive.datasearchinteractive
    );

    const Router = useRouter();
    const dispatch = useDispatch();
    const { keyword } = Router.query;
    //console.log("QUE BUSCA : ", keyword);
    const { loading, productItems, getProducts } = useGetProducts();
    //console.log("PRODUCT ITEMS : ", dataPrdItem);
    const { withListMaximize } = useProductGroupInteractive();
    let ubicacion;

    useEffect(() => {
        ubicacion = JSON.parse(localStorage.getItem("ubicacionproducto"));
    }, []);

    useEffect(() => {
        const queries = {
            name_contains: "mazda",
        };
        getProducts(queries);
    }, [keyword]);

    const RangoPrecios = (data) => {
        if (data) {
            let precios = [];
            data &&
                data.map((row, index) => {
                    precios.push(row.price);
                });

            let menorAmayor = precios.sort(function (a, b) {
                return a - b;
            });
            let long = menorAmayor.length;

            let item = {
                menorprecio: menorAmayor[0],
                mayorprecio: menorAmayor[long - 1],
            };
            localStorage.setItem("rangoprecios", JSON.stringify(item));
        }
    };

    let products;
    if (dataPrdItem && dataPrdItem.length > 0) {
        arrayciud = [];
        let prdciudaduno = [];
        let prdciudaddos = [];

        let allprdciud = [];
        let itemciud = [];

        dataPrdItem &&
            dataPrdItem.map((row, index) => {
                let validar;
                validar = prdciudaduno.includes(row.ciudad);
                if (!validar) {
                    prdciudaduno.push(row.ciudad);
                }
            });

        prdciudaduno &&
            prdciudaduno.map((item) => {
                let numciudades = 0;
                let nombre = "";
                let ind = 0;
                dataPrdItem &&
                    dataPrdItem.map((row, index) => {
                        if (item == row.ciudad) {
                            numciudades = parseInt(numciudades) + 1;
                            nombre = row.nombreciudad;
                            ind = index;
                        }
                    });

                let reg = {
                    id: ind,
                    ciudad: item,
                    nombre_ciu: nombre,
                    cantidad: numciudades,
                };
                arrayciud.push(reg);
            });

        // Coloca los datos en state arreglo de años de los vehiculos
        dispatch(getDataCityPrd(arrayciud));
        //console.log("CIUDADES : ", arrayciud)
        productosfiltrados = [];
        productosfiltradoscity = [];

        if (condicionPrd > 0) {
            dataPrdItem &&
                dataPrdItem.map((item) => {
                    if (condicionPrd == item.condition) {
                        productosfiltrados.push(item);
                    }
                });
        } else productosfiltrados = dataPrdItem;

        console.log("PRD FILT : ", productosfiltrados);

        if (dataCitySelect) {
            if (dataCitySelect.length > 0) {
                let idciudad = [];
                dataCitySelect &&
                    dataCitySelect.map((reg) => {
                        let validar;
                        validar = idciudad.includes(reg.idciu);
                        if (!validar) {
                            idciudad.push(reg.idciu);
                        }
                    });

                productosfiltrados &&
                    productosfiltrados.map((item) => {
                        if (idciudad.includes(item.ciudad)) {
                            productosfiltradoscity.push(item);
                        }
                    });

                //console.log("XXXXX : ", productosfiltradoscity);
                //console.log("CIUDXXX : ", dataCitySelect);
            } else productosfiltradoscity = productosfiltrados;
        } else productosfiltradoscity = productosfiltrados;

        RangoPrecios(productosfiltradoscity);

        let prdrangprecio = [];
        productosfiltradoscity &&
            productosfiltradoscity.map((item) => {
               if(item.price >= precioMin && item.price <= precioMax){
                prdrangprecio.push(item)
               }
            });

        //console.log("RAN PRECCC : ", prdrangprecio);
        products = withListMaximize(prdrangprecio, loading, 4);
    } else {
        products = <p>Producto no encontrado.</p>;
    }

    const encontrar = () => {
        localStorage.setItem("placeholdersearch", JSON.stringify(""));
        localStorage.setItem("eraseplaceholder", JSON.stringify(0));
        Router.push("/Contactanos/");
    };

    return (
        <div className="tamañoresultadodatossearchinteractive">
            <div className="mt-10 mlmenos185 mb-10">
                <h1 className="titulocantidadproductossearchlist ">
                    (
                    {productItems && productItems.length > 0
                        ? productItems.length
                        : 0}
                    ) Productos resultado de tu busqueda {ubicacion} del
                    vehículo
                    {", "}
                    {datosbuscadorinteractivo.nombrecarroceria}
                    {", "}
                    {datosbuscadorinteractivo.nombremarca}
                    {", "}
                    {datosbuscadorinteractivo.nombremodelo}
                </h1>
            </div>
            <div className="ml-2">
                <div className="ml-30 mt-20 ps-page ps-page--shopping">
                    <div className="redondearborde ps-layout__right">
                        <ModuleShopActionsInteractivo
                            optionSelect={optionSelect}
                            setOptionSelect={setOptionSelect}
                            maximizarOption={maximizarOption}
                            setMaximizarOption={setMaximizarOption}
                            zoom={zoom}
                            setZoom={setZoom}
                            menorprecio={menorprecio}
                            setMenorPrecio={setMenorPrecio}
                            mayorprecio={mayorprecio}
                            setMayorPrecio={setMayorPrecio}
                            precioFiltroMinimo={precioFiltroMinimo}
                            setPrecioFiltroMinimo={setPrecioFiltroMinimo}
                            precioFiltroMaximo={precioFiltroMaximo}
                            setPrecioFiltroMaximo={setPrecioFiltroMaximo}
                            filtroPrecio={filtroPrecio}
                            setFiltroPrecio={setFiltroPrecio}
                        />
                       
                        <div>{products}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchItemsMaximize;
