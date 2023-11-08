import React from "react";
import Link from "next/link";
import ModuleProductActions from "~/components/elements/products/modules/ModuleProductActions";
import useProduct from "~/hooks/useProduct";
import ModuleProductRating from "~/components/elements/products/modules/ModuleProductRating";
import ModuleProductImagesResults from "~/components/elements/products/modules/ModuleProductImagesResults";

const ProductResults = ({ product }) => {
    const { price, badges } = useProduct();

    return (
        <div className="ps-product ps-product--grid">
            <div className="cajaimagesresult">
                <div className="ps-product__thumbnail">
                    <Link href="/product/[id]" as={`/product/${product.id}`}>
                        <a className="ps-product__overlay"></a>
                    </Link>
                    <ModuleProductImagesResults product={product} />
                    {
                        //<ModuleProductActions product={product} />
                    }
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

export default ProductResults;
