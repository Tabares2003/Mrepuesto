import React from "react";
import Link from "next/link";
import useProductInteractive from "~/hooks/useProductInteractive";
import { Box, Grid, Button } from "@mui/material";
import { myNumber, nameMonth } from "../../../utilities/ArrayFunctions";

const ProductListSearchInteractive = ({ product }) => {
    const { price, badges } = useProductInteractive();

    /*
<div className="row pl-20 tamañosearchlistaprdoductos">
                <div className="col-8 lineasdivbuscador lineasdivbuscadordos">
                    <h4 className="pt-2">
                        <Link
                            href="/product/[id]"
                            as={`/product/${product.id}`}>
                            <div className="textoproductlistinteractive">{product.name}</div>
                        </Link>
                    </h4>
                </div>
                <div className="col-1 pt-2 valoresitembuscar lineasdivbuscadordos">$</div>
                <div className="col-2 lineasdivbuscadordos  lineasdivbuscadortres">
                    <div className="pt-2 ps-product__right valoresitembuscar">
                        {myNumber(1, product.price, 2)}
                    </div>
                </div>
        </div>
    */

    return (
        <div className="row pl-20 bordeproductlistinteractive">
            <Grid container alignItems="center" spacing={1}>
                <Grid item xs={9} md={9} lg={9}>
                    <Link href="/product/[id]" as={`/product/${product.id}`}>
                        <div className="textoproductlistinteractive apuntador">
                            {product.name}
                        </div>
                    </Link>
                </Grid>
                <Grid item xs={1} md={1} lg={1}>
                    <a className="ml-3 colorbase"> $ </a>
                </Grid>
                <Grid item xs={2} md={2} lg={2}>
                    <div className="formatoprecioproductlist">{myNumber(1, product.price, 2)}</div>
                </Grid>
            </Grid>
        </div>
    );
};
//myNumber(1, product.price, 2)
export default ProductListSearchInteractive;
