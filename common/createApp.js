import React from 'react';
import dva from 'dva';
import { RouterContext } from 'dva/router';
import router from './router';
import createLoading from 'dva-loading';

import user from './models/user';


import auth from './models/auth';
import users from './models/users';
import personal from './models/personal';
import message from './models/message';

export default function createApp(opts, isServer) {
  const app = dva(opts);
  app.model(user);
    // 2. Plugins
  app.use(createLoading({
      loading: {
          global: false,
          models: {
              users: false,
              auth: false,
              personal: false,
          },
      }
  }));

  // 3. Model
  app.model(auth);
  app.model(users);
  app.model(personal);
  app.model(message);

  if (isServer) {
    app.router(({ history, renderProps}) => {
      return <RouterContext {...renderProps} />;
    });
  } else {
    app.router(router);
  }
  return app;
}
