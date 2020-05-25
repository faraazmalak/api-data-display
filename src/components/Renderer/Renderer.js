import React from 'react';
import {LoaderIcon} from '../LoaderIcon/LoaderIcon';
import './Renderer.scss';
import PropTypes from 'prop-types';


/**
 * Processes the User component, based on its configuration.
 * Renderer Component uses a plugin system, where the processed data is handed over to a plugin, for final rendering.
 * This app uses ListRenderer Plugin, which is used to render a list of User Data.
 */
export function Renderer(props) {
  const ComponentToRender = props.componentToRender;
  const RenderPlugin = props.plugin;
  let key = 0;

  const provider = props.provider;


  if (provider && provider.getData()) {
    // Prepare list of props.componentToRender, based on props.componentAttributes
    const componentsToRender = provider.getData().map((jsonObject) => {
      const componentProps = {};
      key++;
      props.componentAttributes.forEach((attribute) => {
        if (jsonObject[attribute] !== undefined) {
          componentProps[attribute] = jsonObject[attribute];
        }
      });
      return <ComponentToRender key={key} {...componentProps} />;
    });
    return (
      <div className="component-renderer">
        {/* If RenderPlugin is specified, use it*/}
        {RenderPlugin && <RenderPlugin componentsToRender={componentsToRender} />}
        {!RenderPlugin && componentsToRender}

        <div className="status-information">
          <LoaderIcon isVisible={!provider.isFull()} />
          {provider.isFull() && <div className="label no-data-available">No more data available</div> }
        </div>

      </div>

    );
  }

  return null;
}
Renderer.propTypes={
  provider: PropTypes.object,
  componentToRender: PropTypes.function,
  plugin: PropTypes.function,
  componentAttributes: PropTypes.object,
};
