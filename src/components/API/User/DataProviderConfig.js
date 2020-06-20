import {ConfigurationTemplate} from "../../core/DataProvider/ConfigurationTemplate";
import {User} from "./User";
import React from 'react';
import {UserProviderConfig} from "../Shipment/DataProviderConfig";


let DataProviderConfig = new ConfigurationTemplate();
const baseApiUrl = 'https://reqres.in/api/users';
DataProviderConfig['providerID'] = 'user-data-provider';
DataProviderConfig['apiUrl'] = `${baseApiUrl}/?page=1`;
DataProviderConfig['attributesToRender'] = ['avatar', 'first_name', 'last_name', 'email'];
DataProviderConfig['componentToRender'] = User;

DataProviderConfig['effects'] = (provider) => {
    if (provider && provider.isEmpty()) {
        /**
         * Effects to be performed, when the provider is registered
         */
        function fetchUserData() {

            const contentHeight = document.getElementById('user-app').clientHeight;
          
            if ((window.innerHeight + window.pageYOffset) >= (contentHeight - 50)) {
                const nextPage = provider.getNextPageNumber();
                const nextPageUrl = nextPage ? `${baseApiUrl}/?page=${nextPage}` : baseApiUrl;
                if (provider.isEmpty() || provider.isMoreDataAvailable()){
                    unsubscribeFromEvents();
                    provider.fetch(nextPageUrl).then(subscribeToEvents);
                }
                
            }
        }
        
        function subscribeToEvents() {
            window.addEventListener('scroll', fetchUserData);
            window.addEventListener('resize', fetchUserData);
        }
        
        function unsubscribeFromEvents() {
            window.removeEventListener('scroll', fetchUserData);
            window.removeEventListener('resize', fetchUserData);
        }
        

        //setTimeout(fetchUserData, 3000);
        fetchUserData();
        

        // Remove event listeners, when component is unmounted
        return unsubscribeFromEvents;
    }
};

DataProviderConfig['processAPIResponse'] = function (apiResponse, store) {
    console.log('PROCESSOR')
    store.currentPage = apiResponse.page;
    store.totalPages = apiResponse.total_pages;
   
    store.data = store.data.concat(apiResponse.data);
};


export default Object.freeze(DataProviderConfig);
