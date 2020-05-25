/**
 * Maintains a list of all the providers that the App uses
 */
export function createProviderRegister() {
  const register = {};

  return {

    // If the provider has already been registered, false is returned, else true is returned
    addNewProvider: function(provider) {
      if (!register[provider.id]) {
        register[provider.id] = provider;
        return true;
      }
      return false;
    },
    isProviderRegistered: (providerID) => Boolean(register[providerID]),
    getProvider: (providerID) => {
      return register[providerID];
    },

  };
}
