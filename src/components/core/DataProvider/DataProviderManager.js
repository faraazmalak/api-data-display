/**
 * Maintains a list of all the providers that the App uses
 */


const registry = {};


/**
 * Creates API object, which provides methods for accessing Data Store
 */
function createProvider(url, id, updateState) {
  const providerID = id;
  let effectsRegistered = false;
  const active = false;

  const store = {
    data: [],
    nextPage: 1,
    currentPage: null,
    totalPages: null,
    promise: null,
  };
  return {

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

    isActive: () => active,

    getID: () => providerID,

    isEffectRegistered: () => effectsRegistered,

    registerEffects: () => effectsRegistered = true,

  };
}


/**
 * Returns an API to interact with the ProviderRegistry
 */
export function getDataProviderManager() {
  return {

    // If the provider has already been registered, false is returned, else true is returned
    addNewProvider: (url, providerID, store, updateState) => {
      if (!registry[providerID]) {
        registry[providerID] = createProvider(url, providerID, store, updateState);
      }
      return registry[providerID];
    },

    isProviderRegistered: (providerID) => Boolean(registry[providerID]),
    getProvider: (providerID) => {
      return registry[providerID];
    },

  };
}
