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
    landing: {
      path: 'landing',
      getHref: () => '/landing'
    },
    app: {
      root: {
        path: '/app',
        getHref: () => '/app',
      },
      requests: {
        path: 'requests',
        getHref: () => '/app/requests',
      },
      request: {
        path: 'requests/:requestId',
        getHref: (id: string) => `/app/requests/${id}`,
      },
      createrequest: {
        path:'createrequest',
        getHref: () => '/app/createrequest',
      },
      profile: {
        path: 'profile',
        getHref: () => '/app/profile',
      },
      editprofile: {
        path: 'editprofile',
        getHref: () => '/app/editprofile',
      },
      myRequests: {
        path: 'myRequests',
        getHref: () => '/app/myRequests'
      }
    },

  } as const;
  