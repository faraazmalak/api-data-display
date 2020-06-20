/**
 * Creates API object, which provides methods for accessing API Data
 */
export function DataProvider(config) {
    const providerID = config.providerID;
    let effectsRegistered = false;
    let active = false;
    let rendererStateUpdater = null;

    const providerConfig = config;

    const store = Object.seal({
        data: [],
        currentPage: null,
        totalPages: null,
        promise: null,
        itemsPerPage: config['itemsPerPage'] ? config['itemsPerPage'] : null
    });


    function processHooks(apiResponse) {

        providerConfig.processAPIResponse(apiResponse, store);
        if (store.itemsPerPage) {
            let paginatedData = [];
            for (let i = 0; i < store.itemsPerPage; i++) {
                if (store.data.length >= store.itemsPerPage) {
                    paginatedData.push(store.data.splice(0, 20));
                } else {
                    paginatedData.push(store.data.splice(0));
                    break;
                }
            }
            store.data = paginatedData;

        }


    }


    return {
        fetch: function (url) {
            console.log(url)
            store.promise = window.fetch(url)
                .then((response) => response.json())
                .then((apiResponse) => {
                    console.log(providerID)
                    if (apiResponse) {
                        processHooks(apiResponse);
                    }
                    store.promise = null;
                    if (rendererStateUpdater) {
                        rendererStateUpdater(new Date().getTime());
                    } else {
                        console.log("Renderer has not registered any function to update its state");
                    }

                });
            return store.promise;
        },
        getData: function () {

            if (store.itemsPerPage) {
                return store.data[store.currentPage];
            } else {
                return store.data;
            }

        }
        ,

        isFetchingData: function () {
            return Boolean(store.promise);
        }
        ,

        isEmpty: function () {
            return !Boolean(store.data.length);
        }
        ,

        isMoreDataAvailable: function () {
            return store.currentPage < store.totalPages && store.totalPages != null;
        }
        ,

        getNextPageNumber: function () {
            if (store.currentPage < store.totalPages) {
                return store.currentPage + 1;
            }
            return null;
        }
        ,

        isActive: function () {
            return active;
        }
        ,

        getID: function () {
            return providerID
        }
        ,

        isEffectRegistered: function () {
            return effectsRegistered;
        }
        ,

        registerEffects: function () {
            return effectsRegistered = true;
        }
        ,

        activate: () => {
            console.log('ACTIVATING ' + providerID)
            active = true;
        },
        getProviderConfig
:

    function () {
        return providerConfig;
    }

,
    addRendererStateUpdater: function (stateUpdater) {
        rendererStateUpdater = stateUpdater;
    }

}
    ;
}