# Demo URL
The app can be accessed at: http://faraazmalak.site/projects/api-data-display-app/build/index.html
# Application Component Architecture

## High Level Concept
The app is designed to work with any 3rd party API, not just https://reqres.in/api/users
For example, the app can be configured to fetch and display weather forecast data, with minimal configuration.

The app uses a Provider Component, to get 3rd party API data. 
This data is then processed and rendered by a Renderer Component.
Renderer Component uses a plugin system, where the data, processed by Renderer Component, is handed over to a plugin, for final rendering.

This plugin system offers powerful customization possibilities.
For example, a Renderer Component can have two  plugins: ListRenderer and GridRenderer.
If user chooses List View, we use ListRenderer plugin, else we use GridRenderer plugin for Grid View

## Below are details on the main components used in the App
### Provider Component
Provider component fetches 3rd party API data and stores it in a Data Store object.
Provider component then returns an API object, which has methods to operate on this Data Store.

### User Component
This component contains all the required details/configuration, to render User's Data on the canvas.
For example, this component specifies, that user's email, full name, avatar have to be rendered.
This data is processed by Renderer Component.

### Renderer Component
Processes the User component, based on its configuration.
Renderer Component uses a plugin system, where the processed data is handed over to a plugin, for final rendering.

This app uses ListRenderer Plugin, which is used to render a list of User Data.
