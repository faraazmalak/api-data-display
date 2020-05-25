import React, {useEffect} from 'react';
import {LoaderIcon} from '../LoaderIcon/LoaderIcon';
import {createDataStore} from './DataStore';


/**
 * Creates API object, which provides methods for accessing Data Store
 */
function createProviderAPI(url, id, store, updateState) {
  const provider = {
    id: id,
    effectsRegistered: false,
    fetch: function() {
      store.promise = window.fetch(url + '?page=' + store.nextPage).then((response) => response.json()).then((data) => {
        store.currentPage = data.page;
        store.totalPages = data.total_pages;

        if (store.currentPage < store.totalPages) {
          store.nextPage++;
        }
        store.data = store.data.concat(data.data);
        store.promise = null;

        updateState(new Date().getTime());

        return data;
      });

      return store.promise;
    },

    isFetchingData: () => Boolean(store.promise),

    isEmpty: () => !Boolean(store.data.length),

    isFull: () => store.currentPage === store.totalPages && store.totalPages != null,

    getData: () => store.data,

  };
  return provider;
}

/**
 * Provider Component
 */
export function Provider(props) {
  const providerRegister = props.providerRegister;

  useEffect(() => {
    const provider = createProviderAPI(props.url, props.id, createDataStore(), props.updateState);
    if (!props.effects) {
      provider.effectsRegistered = true;
    }

    // Register the provider, if not already registered
    if ( providerRegister.addNewProvider(provider) && !provider.effectsRegistered) {
      props.effects(provider);
      provider.effectsRegistered = true;
    }
  });

  if (providerRegister.isProviderRegistered(props.id)) {
    return props.children;
  } else {
    return <LoaderIcon isVisible={true} />;
  }
}
