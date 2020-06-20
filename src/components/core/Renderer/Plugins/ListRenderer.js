import React from 'react';
import './ListRenderer.scss';
import PropTypes from 'prop-types';

/**
 * Renders the user data as a list
 */
export function ListRenderer(props) {
    return (
        <ul className="list-group">
            {
                props.componentsToRender.map(function(listItem, index) {
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
ListRenderer.propTypes = {
    componentsToRender: PropTypes.array,
};
