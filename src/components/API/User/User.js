import React from 'react';
import './User.scss';
import PropTypes from 'prop-types';

/**
 * User component to render
 */
export function User(props) {
    const full_name = props.first_name + ' ' + props.last_name;
    return (
        <div className="user">
            <div className="column-container">
                <div className="left column">
                    <img width="128" height="128" className="user-avatar" src={props.avatar} title={full_name}
                        alt={full_name}/>
                </div>
                <div className="right column row-container">
                    <span className="user-name row">{full_name}</span>
                    <span className="user-email row">{props.email}</span>
                </div>
            </div>
        </div>
    );
}

// Prop Validation
User.propTypes = {
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    avatar: PropTypes.string,
    email: PropTypes.string,
};

