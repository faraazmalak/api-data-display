export function ConfigurationTemplate() {
    return Object.seal({
        providerID: null,
        apiUrl: null,
        attributesToRender: [],
        effects: null,
        processAPIResponse: null,
        componentToRender: null,
        itemsPerPage: null,
    });
}