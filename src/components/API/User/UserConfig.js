
export const UserConfig = {
  id: 'user_data_provider',
  url: 'https://reqres.in/api/users',
  attributesToRender: ['avatar', 'first_name', 'last_name', 'email'],
  effects: (provider) => {
    if (provider && provider.isEmpty()) {
      /**
       * Effects to be performed, when the provider is registered
       */
      function fetchUserData() {
        const contentHeight = document.getElementById('user-app').clientHeight;
        if ((window.innerHeight + window.pageYOffset) >= (contentHeight - 50)) {
          if (!provider.isFetchingData() && !provider.isFull()) {
            provider.fetch().then(fetchUserData);
          }
        }
      }

      setTimeout(fetchUserData, 3000);


      window.addEventListener('scroll', fetchUserData);
      window.addEventListener('resize', fetchUserData);

      // Remove event listeners, when component is unmounted
      return function cleanup() {
        window.removeEventListener('scroll', fetchUserData);
        window.removeEventListener('resize', fetchUserData);
      };
    }
  },
};

