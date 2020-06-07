import React, {useEffect} from 'react';
import {LoaderIcon} from '../LoaderIcon/LoaderIcon';
import {getDataProviderManager} from './DataProviderManager';

/**
 * DataProvider Component
 */
export function DataProviderUI(props) {
  const providerManager = getDataProviderManager();

  useEffect(() => {
    const provider = providerManager.addNewProvider(props.url, props.id, props.updateState);
    if (props.effects && !provider.isEffectRegistered()) {
      props.effects(provider);
    }
    provider.registerEffects();
  });

  if (providerManager.isProviderRegistered(props.id)) {
    return props.children;
  } else {
    return <LoaderIcon isVisible={true} />;
  }
}
