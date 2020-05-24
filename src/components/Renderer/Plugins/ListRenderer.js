import React from 'react';
import  "./ListRenderer.scss";

export function ListRenderer(props) {

    return (
        <ul className="list-group">
            {
                props.componentsToRender.map(function (listItem, index) {
                    return (
                        <li className="list-item" key={index}>
                            {listItem}
                        </li>
                    );
                })
            }
        </ul>
    );
}