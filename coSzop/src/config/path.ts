export const paths = {
    home: {
      path: '/',
      getHref: () => '/',
    },
    register: {
      path: 'register',
      getHref: () => '/register'
    },
    login: {
      path: 'login',
      getHref: () => '/login'
    },
    app: {
      root: {
        path: '/app',
        getHref: () => '/app',
      },
      requests: {
        path: 'requests',
        getHref: () => '/app/requests'
      }
    },
  } as const;
  