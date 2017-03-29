import dva from 'dva';
import './index.css';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';

import router from './router';

import auth from './models/auth';
import users from './models/users';
import personal from './models/personal';
import message from './models/message';

// 1. Initialize
const app = dva({
    history: browserHistory
});

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

// 4. Router
app.router(router);

// 5. Start
app.start('#root');
