import React, { useEffect, useState } from "react";
import WidgetShopFilterByPriceRange from "~/components/shared/widgets/WidgetShopFilterByPriceRange";
import WidgetShopByRating from "~/components/shared/widgets/WidgetShopByRating";
import WidgetShopFilterByConditionsSearch from "~/components/shared/widgets/WidgetShopFilterByConditionsSearch";
import WidgetShopRelatedProductsSearch from "~/components/shared/widgets/WidgetShopRelatedProductsSearch";
import WidgetShopByLocationSearch from "~/components/shared/widgets/WidgetShopByLocationSearch";
import WidgetFilterByPriceRangeSearch from "~/components/shared/widgets/WidgetFilterByPriceRangeSearch";
import { getCitySelect } from "../../../store/cityselect/action";
import { getSelectCondition } from "../../../store/selectcondition/action";
import { useSelector, useDispatch } from "react-redux";

let ciudadesselAlt = [];

const SidebarShopInteractiveSearch = (props) => {
    const dispatch = useDispatch();
    const [menorprecio, setMenorPrecio] = useState(0);
    const [mayorprecio, setMayorPrecio] = useState(0);
    const [precioFiltroMinimo, setPrecioFiltroMinimo] = useState(1);
    const [precioFiltroMaximo, setPrecioFiltroMaximo] = useState(10000000);
    const [condicionPrd, setCondicionPrd] = useState(0);
    const [filtroPrecio, setFiltroPrecio] = useState(false);

    const leerciudadesSel = () => {
        let cityselect = JSON.parse(localStorage.getItem("cityselect"));
        dispatch(getCitySelect(cityselect));
        console.log("CIUDAD : ", cityselect)
    };

    return (
        <div className="ps-sidebar--shop sizesidebarinteractive">
            <div className="mb-4">
                <a className="tamañotextonombrefiltro textocolor">Filtros</a>
            </div>
            <hr />
            <div>
                <WidgetFilterByPriceRangeSearch
                    menorprecio={menorprecio}
                    mayorprecio={mayorprecio}
                    setMenorPrecio={setMenorPrecio}
                    setMayorPrecio={setMayorPrecio}
                    precioFiltroMinimo={precioFiltroMinimo}
                    setPrecioFiltroMinimo={setPrecioFiltroMinimo}
                    precioFiltroMaximo={precioFiltroMaximo}
                    setPrecioFiltroMaximo={setPrecioFiltroMaximo}
                    setFiltroPrecio={setFiltroPrecio}
                />
                <div className="pt-140">
                    <hr />
                    <br />
                   
                        <WidgetShopFilterByConditionsSearch
                            condicionPrd={condicionPrd}
                            setCondicionPrd={setCondicionPrd}
                        />
                  
                    <hr />
                    <br />
                    <div onClick={() => leerciudadesSel()}>
                        <WidgetShopByLocationSearch />
                    </div>
                    <hr />

                    <WidgetShopRelatedProductsSearch />
                </div>
            </div>
        </div>
    );
};

export default SidebarShopInteractiveSearch;
