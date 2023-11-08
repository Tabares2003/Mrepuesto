import React from "react";
import { Button, Dropdown, Menu } from "antd";

const SortBySearchInteractive = () => {
    const sortByItems = [
        {
            id: 1,
            text: "De menor a mayor precio",
        },
        {
            id: 2,
            text: "De mayor a menor precio",
        },
    ];
    // <a href="#">{item.text}</a>
    const viewItems = sortByItems.map((item) => (
        <Menu.Item className="searchinteractiveselect" key={item.id}>
            <a className="textoordenarpor">{item.text}</a>
        </Menu.Item>
    ));
    const view = <Menu className="ml-90">{viewItems}</Menu>;
// textoordenarporrev
    return (
        <div className="mt-10 mb-10 ps-shop__sortby">
            <Dropdown
                overlay={view}
                placement="bottomLeft"
                className="ps-dropdown-toggle sinborder">
                <a className="flechaordenarpor">
                    <a className="textoordenarpor">Ordenar por </a>
                    <i className="ml-3  textocolorflecha icon-chevron-down"></i>
                </a>
            </Dropdown>
        </div>
    );
};

export default SortBySearchInteractive;
