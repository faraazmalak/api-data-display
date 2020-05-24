import React from 'react';
import "./User.scss"

export function User(props){
    return(
        <div className="user">
            <div className="column-container">
                <div className="left column">
                    <img  width="128px" height="128px" className="user-avatar" src={props.avatar} alt="avatar"/>
                </div>
                <div className="right column row-container">
                    <span className="user-name row">{props.first_name + ' ' + props.last_name}</span>
                    <span className="user-email row">{props.email}</span>
                </div>
            </div>
        </div>
    )
}

//User data, to be rendered
export const userAttributes = ['avatar','first_name','last_name','email'];

//Effects to be performed, when the provider is registered
export  function userProviderEffect(provider) {
    if (provider && provider.isEmpty()) {

        function fetchUserData() {
            const clientHeight = (document.compatMode === "CSS1Compat") ?
                document.documentElement.clientHeight :
                document.body.clientHeight;
            const contentHeight = document.getElementById('user-app').clientHeight;
            const loaderIcon = document.querySelector('.status-information .loader-icon-container .loader-icon');
            let loaderIconHeight = 0;
            if (loaderIcon) {
                loaderIconHeight = loaderIcon.clientHeight;
            }
            if ((clientHeight + window.pageYOffset) >= contentHeight + loaderIconHeight / 4) {
                if (!provider.isFetchingData() && !provider.isFull()) {

                    provider.fetch().then(fetchUserData)
                }

            }
        }

        setTimeout(fetchUserData, 3000)


        window.addEventListener('scroll', fetchUserData)
        window.addEventListener('resize', fetchUserData)


    }
}

export const userProviderConfig = {
    url: "https://reqres.in/api/users",
    id: "user_data_provider"
}

