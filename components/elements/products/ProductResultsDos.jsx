import React from "react";
import Link from "next/link";
import useProduct from "~/hooks/useProduct";
import ModuleProductImagesResultsDos from "~/components/elements/products/modules/ModuleProductImagesResultsDos";

const ProductResultsDos = ({ product }) => {
    const { price, badges } = useProduct();

    return (
        <div className="ps-product ps-product--grid">
            <div className="cajaimagesresult">
                <div className="ps-product__thumbnail">
                    <Link href="/product/[id]" as={`/product/${product.id}`}>
                        <a className="ps-product__overlay"></a>
                    </Link>
                    <ModuleProductImagesResultsDos product={product} />
                    {badges(product)}
                </div>
            </div>
            <div className="ps-product__content mt-60">
                <div>
                    <Link href="/product/[id]" as={`/product/${product.id}`}>
                        <a className="textoimagenesresult">{product.name}</a>
                    </Link>
                </div>
                {price(product)}
                {
                    //<ModuleProductRating />
                }
            </div>
        </div>
    );
};

export default ProductResultsDos;
