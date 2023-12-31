import React, { useEffect, useState } from "react";
import FormSearchHeader from "~/components/shared/forms/FormSearchHeader";
//import ModuleHeaderActions from "~/components/shared/headers/modules/ModuleHeaderActions";
import ModuleHeaderNotice from "~/components/shared/headers/modules/ModuleHeaderNotice";
import NavigationPrimary from "~/components/shared/navigations/NavigationPrimary";
import Logo from "~/components/elements/basic/Logo";
import ModuleHeaderContactNumber from "~/components/shared/headers/modules/ModuleHeaderContactNumber";
//import ModuleHeaderSwichers from "~/components/shared/headers/modules/ModuleHeaderSwitcher";
import Header from '../../elements/header/Header';

function HeaderDefault(props) {
    const [showNav, setShowNav] = useState(true);
    const [classes, setClasses] = useState(true);
    const [categorias, setCategorias] = useState(false);

    useEffect(() => {
        //console.log("CATEGORIA HEADER : ", categorias);
        //alert("CAMBIO categorias")
    }, [categorias]);

    function handleShownav(e) {
        e.preventDefault();
        if (showNav) {
            setShowNav(false);
        } else {
            setShowNav(true);
        }
    }

    function handleStickyHeader() {
        let number =
            window.pageXOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0;
        const header = document.getElementById("header-sticky");
        if (header !== null) {
            if (number >= 300) {
                header.classList.add("header--sticky");
                setShowNav(false);
            } else {
                header.classList.remove("header--sticky");
                setShowNav(true);
            }
        }
    }

    useEffect(() => {
        if (process.browser) {
            window.addEventListener("scroll", handleStickyHeader);
        }
    }, []);

    return (
        <header
            className={`header--desktop header--one ${classes}`}
            id="header-sticky">
            {
                //<ModuleHeaderNotice />
            }
            <div className="header__top">
                {/* <div className="container">
                    <div className="header__left">
                        <Logo />
                        <a
                            href="#"
                            className="header__top-toggle"
                            onClick={(e) => handleShownav(e)}>
                            <i className="fa fa-bars"></i>
                        </a>
                    </div>
                    <div className="header__center">
                        <div className="ps-header__search">
                            <br />
                            <FormSearchHeader />
                        </div>
                    </div>
                    <div className="contactnumber">
                        <ModuleHeaderContactNumber />
                    </div>
                    {
                        //<div className="header__left">
                        //    <ModuleHeaderSwichers />
                        //    <ModuleHeaderActions />
                        //</div>
                    }
                </div> */}
                <Header />
            </div>
            {categorias ? (
                <div
                    className={`header__bottom ${
                        showNav ? "active" : ""
                    }`}>
                    <NavigationPrimary
                        categorias={categorias}
                        setCategorias={setCategorias}
                    />
                </div>




            ) : (
                <div
                    className={`header__bottom ${
                        showNav ? "active" : ""
                    }`}>
                    <NavigationPrimary
                        categorias={categorias}
                        setCategorias={setCategorias}
                    />
                </div>
            )}
        </header>
    );
}

export default HeaderDefault;