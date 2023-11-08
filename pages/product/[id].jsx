import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import ProductRepository from "~/repositories/ProductRepository";
import SkeletonProductDetail from "~/components/elements/skeletons/SkeletonProductDetail";
import BreadCrumb from "~/components/elements/BreadCrumb";
import Container from "~/components/layouts/Container";

import InfoViewPrdSingle from "~/components/shared/widgets/InfoViewPrdSingle";
import SingleProductView from "~/components/elements/detail/SingleProductView";
import WidgetShopRelatedProducts from "~/components/shared/widgets/WidgetShopRelatedProducts";
import WidgetShopPromotion from "~/components/shared/widgets/WidgetShopPromotion";
import CustomerBought from "~/components/partials/products/CustomerBought";
import useGetProducts from "~/hooks/useGetProducts";

const ProductDetailPage = () => {
    const Router = useRouter();
    const { id } = Router.query;
    const { loading, product, getProductById, getPublicatById } =
        useGetProducts();
    //console.log("DATOS PRODUCTO : ", product);
    const [nombreProducto, setNombreProducto] = useState("Productos");
    const [irInicio, setIrInicio] = useState(false);

    useEffect(() => {
        if (id) {
            if (id > 0) getProductById(id);
            else getPublicatById(id);
        }
    }, [id]);

    useEffect(() => {
        if (product) setNombreProducto(product.name);
        setIrInicio(true);
    }, [product]);

    // View area
    let productView;

    if (loading || product === null) {
        productView = (
            <div className="container">
                <SkeletonProductDetail />
            </div>
        );
    } else {
        productView = <SingleProductView product={product} />;
    }

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
            text: nombreProducto,
        },
    ];

    const handleClickScroll = () => {
        const element = document.getElementById("section-1");
        if (element) {
            // 👇 Will scroll smoothly to the top of the next section
            element.scrollIntoView({ behavior: "smooth" });
        }
        setIrInicio(false);
    };

    useEffect(() => {
        if (irInicio) {
            handleClickScroll();
        }
    }, [irInicio]);

    return (
        <Container title="Product">
            <div className="ps-page ps-page--product" id="section-1">
                <div className="container">
                    <div className="ps-page__header ml-51">
                        <BreadCrumb breacrumb={breadcrumb} />
                    </div>
                    <div className="ps-layout--with-sidebar ps-reverse">
                        <div className="ps-layout__left">
                            <InfoViewPrdSingle />
                            <div className="ml-40">
                            <WidgetShopRelatedProducts />
                            </div>
                            <WidgetShopPromotion />
                        </div>
                        <div className="ps-layout__right">
                            {productView}
                        </div>
                    </div>
                </div>
                <CustomerBought />
            </div>
        </Container>
    );
};

export default ProductDetailPage;
