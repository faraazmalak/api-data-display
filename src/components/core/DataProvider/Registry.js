import {DataProvider} from "./DataProvider";

// Maintains a list of all the providers that the App uses
const registry = {};

/**
 * Returns an API to interact with the ProviderRegistry
 */
export function getDataProviderRegistry() {
    return {

        // If the provider has already been registered, false is returned, else true is returned
        addNewProvider: function(providerConfig){
            if (!registry[providerConfig.providerID]) {
                registry[providerConfig.providerID] = new DataProvider(providerConfig);
            }
            return registry[providerConfig.providerID];
        },

        isProviderRegistered: function(providerID) {
            Boolean(registry[providerID])
        },
        getProvider: function(providerID){
            return registry[providerID];
        },
        getActiveProvider: function(){
            let activeProvider = null;
            Object.keys(registry).forEach((providerID) => {
                const provider = this.getProvider(providerID);
                if(provider.isActive()){
                    activeProvider = provider;
                }
            });
           return activeProvider;
        }
    };
}
