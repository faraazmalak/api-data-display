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
          <img width="128" height="128" className="user-avatar" src={props.avatar} title={full_name} alt={full_name}/>
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
User.propTypes={
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  avatar: PropTypes.string,
  email: PropTypes.string,
};


// User data, to be rendered
export const userAttributes = ['avatar', 'first_name', 'last_name', 'email'];

/**
 * Effects to be performed, when the provider is registered
 */
export function userProviderEffect(provider) {
  if (provider && provider.isEmpty()) {
    /**
     * Effects to be performed, when the provider is registered
     */
    function fetchUserData() {
      const contentHeight = document.getElementById('user-app').clientHeight;
      if ((window.innerHeight + window.pageYOffset) >= (contentHeight - 50)) {
        if (!provider.isFetchingData() && !provider.isFull()) {
          provider.fetch().then(fetchUserData);
        }
      }
    }

    setTimeout(fetchUserData, 3000);


    window.addEventListener('scroll', fetchUserData);
    window.addEventListener('resize', fetchUserData);

    // Remove event listeners, when component is unmounted
    return function cleanup() {
      window.removeEventListener('scroll', fetchUserData);
      window.removeEventListener('resize', fetchUserData);
    };
  }
}

export const userProviderConfig = {
  url: 'https://reqres.in/api/users',
  id: 'user_data_provider',
};

