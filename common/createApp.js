import React from 'react';
import dva from 'dva';
import { RouterContext } from 'dva/router';
import router from './router';
import createLoading from 'dva-loading';

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
              notices: false,
              chat: false,
              announcements: false,
          },
      }
  }));

  // 3. Model
  app.model(require('./models/auth'));
  app.model(require('./models/users'));
  app.model(require('./models/personal'));
  app.model(require('./models/notices'));
  app.model(require('./models/chat'));
  app.model(require('./models/announcements'));

  if (isServer) {
    app.router(({ history, renderProps}) => {
      return <RouterContext {...renderProps} />;
    });
  } else {
    app.router(router);
  }
  return app;
}
