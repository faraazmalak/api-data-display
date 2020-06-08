# Demo URL
The app can be accessed at: http://faraazmalak.site/projects/api-data-display-app/build/index.html
# Application Component Architecture

## High Level Concept
The app is designed to work with any 3rd party API, not just https://reqres.in/api/users
For example, the app can be configured to fetch and display weather forecast data, with minimal configuration.
The app has been developed with Higher-Order components.

The app uses a DataProvider Component, to get 3rd party API data. 
This data is then processed and rendered by a Renderer Component.
Renderer Component uses a plugin system, where the data, processed by Renderer Component, is handed over to a plugin, for final rendering.
This plugin system offers powerful customization possibilities.
For example, a Renderer Component can have two  plugins: ListRenderer and GridRenderer.
If user chooses List View, we use ListRenderer plugin, else we use GridRenderer plugin for Grid View

## Below are details on the main components used in the App
### DataProvider Component
This component is all about DataProviders. 
A DataProvider is responsible for fetching API data and providing this data to the Renderer component, for rendering.
This component has 2 sub-components
 1. DataProviderManager - It exposes an API to work with Data Providers
 2. DataProviderUI - Responsible for displaying loading indicator and calling the Renderer component, once the data is available.

### User Component
This component contains all the required details/configuration, to render User's Data on the canvas.
For example, this component specifies, that user's email, full name, avatar have to be rendered.
This data is processed by Renderer Component.

### Renderer Component
Processes the User component, based on its configuration.
Renderer Component uses a plugin system, where the processed data is handed over to a plugin, for final rendering.
This app uses ListRenderer Plugin, which is used to render a list of User Data.

# Folder Structure
### src/components
Contains all the components/modules used by the App

### src/components/API
The folder contains components representing the 3rd party API data. 
For example, we have a User component, which specifies all the rendering configuration of user data

### src/components/core
This folder contains a set of components that can take any component from src/components/API and render it on the canvas.
