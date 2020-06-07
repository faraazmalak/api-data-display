import React, {useState} from 'react';
import './App.scss';

import {Renderer} from './components/core/Renderer/Renderer';
import {User} from './components/API/User/User';
import {UserConfig} from './components/API/User/UserConfig';
import {ListRenderer} from './components/core/Renderer/Plugins/ListRenderer';
import {DataProviderUI} from './components/core/DataProvider/DataProviderUI';

/**
 * Entry point into the application
 */
function App() {
  const [, updateState] = useState(new Date().getTime());

  return (
    <div id="user-app">
      <h1 id="app-title">API Data Display App</h1>

      <DataProviderUI
        id={UserConfig.id}
        url={UserConfig.url}
        effects={UserConfig.effects}
        updateState={updateState}>

        <Renderer
          providerID ={UserConfig.id}
          componentToRender={User}
          componentAttributes={UserConfig.attributesToRender}
          plugin={ListRenderer}/>

      </DataProviderUI>
    </div>
  );
}

export default App;
