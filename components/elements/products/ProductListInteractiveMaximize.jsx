import React from "react";
import Link from "next/link";
import useProductInteractive from "~/hooks/useProductInteractive";
import { myNumber } from "../../../utilities/ArrayFunctions";
import { Box, Grid, Button } from "@mui/material";

const ProductListInteractiveMaximize = ({ product }) => {
    const { price, badges, iditem } = useProductInteractive();

    return (
        <div className="row pl-20 bordeproductlistinteractivemaximize">
            <Grid container alignItems="center" spacing={1}>
                <Grid item xs={9} md={9} lg={9}>
                    <Link href="/product/[id]" as={`/product/${product.id}`}>
                        <div className="textoproductlistinteractivemaximize">
                            {product.name}
                        </div>
                    </Link>
                </Grid>
                <Grid item xs={1} md={1} lg={1}>
                    <a className="ml-20 colorbase"> $ </a>
                </Grid>
                <Grid item xs={2} md={2} lg={2}>
                    <div className="formatoprecioproductlistmaximize">
                        {myNumber(1, product.price, 2)}
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

export default ProductListInteractiveMaximize;
