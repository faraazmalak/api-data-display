import React, {useState} from 'react';
import {LoaderIcon} from '../../core/LoaderIcon/LoaderIcon';
import './Renderer.scss';
import PropTypes from 'prop-types';

/**
 * Processes the User component, based on its configuration.
 * Renderer Component uses a plugin system, where the processed data is handed over to a plugin, for final rendering.
 * This app uses ListRenderer Plugin, which is used to render a list of User Data.
 */
export function Renderer(props) {
    const dataProvider = props.dataProvider;
    const providerConfig = dataProvider.getProviderConfig();

    const [,rendererStateUpdater] = useState(new Date().getTime());
    dataProvider.addRendererStateUpdater(rendererStateUpdater);

    const ComponentToRender = providerConfig.componentToRender;
    const RenderPlugin = props.plugin;
    let key = 0;

    if (dataProvider && dataProvider.getData()) {
    // Prepare list of props.componentToRender, based on props.componentAttributes

        const componentsToRender = dataProvider.getData().map((jsonObject) => {
            const componentProps = {};

            key++;
            providerConfig.attributesToRender.forEach((attribute) => {
                if (jsonObject[attribute] !== undefined) {
                    componentProps[attribute] = jsonObject[attribute];
                }
            });
            return <ComponentToRender key={key} {...componentProps} />;
        });
        return (
            <div className="component-renderer">
                {/* If RenderPlugin is specified, use it*/}
                {RenderPlugin && <RenderPlugin componentsToRender={componentsToRender}/>}
                {!RenderPlugin && componentsToRender}

                <div className="status-information">
                    <LoaderIcon isVisible={!dataProvider.isMoreDataAvailable()}/>
                    {!dataProvider.isMoreDataAvailable() && <div className="label no-data-available">No more data available</div>}
                </div>

            </div>

        );
    }

    return <LoaderIcon isVisible={true} />;
}

Renderer.propTypes = {
    provider: PropTypes.object,
    componentToRender: PropTypes.func,
    plugin: PropTypes.func,
    componentAttributes: PropTypes.array,
    providerID: PropTypes.string,
};
