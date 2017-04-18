import React from 'react';
import dva from 'dva';
import { RouterContext } from 'dva/router';
import router from './router';
import createLoading from 'dva-loading';

import auth from './models/auth';
import users from './models/users';
import personal from './models/personal';
import messages from './models/messages';

export default function createApp(opts, isServer) {
  const app = dva(opts);
    // 2. Plugins
  app.use(createLoading({
      loading: {
          global: false,
          models: {
              users: false,
              auth: false,
              personal: false,
              messages: false,
          },
      }
  }));

  // 3. Model
  app.model(auth);
  app.model(users);
  app.model(personal);
  app.model(messages);

  if (isServer) {
    app.router(({ history, renderProps}) => {
      return <RouterContext {...renderProps} />;
    });
  } else {
    app.router(router);
  }
  return app;
}
