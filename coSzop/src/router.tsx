import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createHashRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

import { paths } from './config/path';

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

export const createAppRouter = (queryClient: QueryClient) =>
  createHashRouter([
    {
      path: paths.home.path,
      lazy: () => import('./paths/landing').then(convert(queryClient)),
    },
    {
      path: paths.register.path,
      lazy: () => import('./paths/register').then(convert(queryClient)),
  },
  {
      path: paths.login.path,
      lazy: () => import('./paths/login').then(convert(queryClient)),
  },
    {
      path: paths.app.root.path,
      children: [
        {
            path: paths.app.requests.path,
            lazy: () => import('./paths/app/requests').then(convert(queryClient)),
            // children: [
            //   {
            //     path: paths.app.requests.request.path, 
            //     lazy: () => import('./paths/app/singlerequest').then(convert(queryClient)), 
            //   },
            // ],
        },
        {
          path: paths.app.request.path,
          lazy: () => import('./paths/app/singlerequest').then(convert(queryClient)),
        },
        {
          path: paths.app.createrequest.path,
          lazy: () => import('./paths/app/createrequest').then(convert(queryClient)),
        },
        {
          path: paths.app.profile.path,
          lazy: () => import('./paths/app/profile').then(convert(queryClient)),
        },
        {
          path: paths.app.editprofile.path,
          lazy: () => import('./paths/app/editprofile').then(convert(queryClient)),
        },
        {
          path: paths.app.myRequests.path,
          lazy: () => import('./paths/app/myRequests').then(convert(queryClient))
        },
      ],
    },
    {
      path: '*',
      lazy: () => import('./paths/not-found').then(convert(queryClient)),
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
