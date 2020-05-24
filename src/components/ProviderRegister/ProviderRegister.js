
//Maintains a list of all the providers that the App uses
export function createProviderRegister() {
    let register = {};

    return {
        /*Register a new provider.
         *If the provider has already been registered, false is returned, else true is returned
        */
        addNewProvider: function (provider) {
            console.log(register)
            if (!register[provider.id]) {
                register[provider.id] = provider
                return true;
            }
            return false;
        },
        isProviderRegistered: (providerID) => Boolean(register[providerID]),
        getProvider: (providerID) => {
            console.log(register[providerID])
            return register[providerID]
        }

    }
}