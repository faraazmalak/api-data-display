import {ConfigurationTemplate} from "../../core/DataProvider/ConfigurationTemplate";
import React from 'react';
import {UserProviderConfig} from "../Shipment/DataProviderConfig";
import {Shipment} from "./Shipment";


let DataProviderConfig = new ConfigurationTemplate();

const itemsPerPage = 20;

DataProviderConfig['providerID'] = 'shipment-data-provider';
DataProviderConfig['apiUrl'] = ' http://localhost:3000/shipments';
DataProviderConfig['attributesToRender'] = ['id', 'name', 'cargo', 'mode', 'type', 'destination', 'origin', 'services', 'total', 'status', 'userId'];
DataProviderConfig['componentToRender'] = Shipment;
DataProviderConfig['itemsPerPage'] = itemsPerPage;

DataProviderConfig['effects'] = (provider) => {
    console.log(provider.isEmpty())
    if (provider && provider.isEmpty()) {
        provider.fetch();
    }
};

DataProviderConfig['processAPIResponse'] = function (apiResponse, store) {
    store.currentPage = store.currentPage ? store.currentPage++ : 1;
    store.totalPages = apiResponse.length / itemsPerPage;

    if (store.currentPage < store.totalPages) {
        store.nextPage++;
    }
    store.data = apiResponse;


};


export default Object.freeze(DataProviderConfig);
