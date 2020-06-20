import React, {useEffect} from 'react';
import './App.scss';

import {Renderer} from './components/core/Renderer/Renderer';
import UserProviderConfig from './components/API/User/DataProviderConfig';
import ShipmentProviderConfig from './components/API/Shipment/DataProviderConfig';
import {ListRenderer} from './components/core/Renderer/Plugins/ListRenderer';
import {getDataProviderRegistry} from "./components/core/DataProvider/Registry";

/**
 * Entry point into the application
 */
function App() {
    const dataProviderRegistry = getDataProviderRegistry();

    dataProviderRegistry.addNewProvider(UserProviderConfig).activate();
    dataProviderRegistry.addNewProvider(ShipmentProviderConfig);

    useEffect(function () {
        const activeDataProvider = dataProviderRegistry.getActiveProvider();
        const activeDataProviderConfig = activeDataProvider.getProviderConfig();
        if (activeDataProviderConfig.effects && !activeDataProvider.isEffectRegistered()) {
            activeDataProviderConfig.effects(activeDataProvider);
            activeDataProvider.registerEffects();
        }
    });
    return (
        <div id="user-app">
            <h1 id="app-title">API Data Display App</h1>
            <Renderer
                dataProvider={dataProviderRegistry.getActiveProvider()}
                plugin={ListRenderer}
            />
        </div>
    );
}

export default App;
