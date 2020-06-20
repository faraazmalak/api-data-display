import React, {useState} from 'react';
import './App.scss';

import {Renderer} from './components/core/Renderer/Renderer';
import {ListRenderer} from './components/core/Renderer/Plugins/ListRenderer';
import {DataProviderUI} from './components/core/DataProvider/DataProviderUI';

import {User} from './components/API/User/User';
import {UserConfig} from './components/API/User/UserProviderConfig';

import {Shipment} from './components/API/Shipment/Shipment';
import {ShipmentConfig} from './components/API/Shipment/ShipmentConfig';


/**
 * Entry point into the application
 */
function App() {
    const [, updateState] = useState(new Date().getTime());

    return (
        <div id="user-app">
            <h1 id="app-title">API Data Display App</h1>

            <DataProviderUI
                id={ShipmentConfig.id}
                url={ShipmentConfig.url}
                effects={ShipmentConfig.effects}
                updateState={updateState}>

                <Renderer
                    providerID ={ShipmentConfig.id}
                    componentToRender={User}
                    componentAttributes={ShipmentConfig.attributesToRender}
                    plugin={ListRenderer}/>

            </DataProviderUI>
        </div>
    );
}

export default App;
