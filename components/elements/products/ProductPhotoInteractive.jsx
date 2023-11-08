import React, {useState} from "react";
import Link from "next/link";
import ModuleProductActions from "~/components/elements/products/modules/ModuleProductActions";
import useProductInteractive from "~/hooks/useProductInteractive";
import ModuleProductRating from "~/components/elements/products/modules/ModuleProductRating";
import ModuleProductImages from "~/components/elements/products/modules/ModuleProductImages";

const ProductPhotoInteractive = ({ product }) => {
    const { price, badges, pricephoto } = useProductInteractive();
    
    return (
        <div className="mr-2 mb-2">
            <div className="ps-product__thumbnail">
                <ModuleProductImages product={product} />
            </div>
        </div>
    );
};

export default ProductPhotoInteractive;
