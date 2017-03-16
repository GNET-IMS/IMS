import dva from 'dva';
import './index.css';
import { browserHistory } from 'dva/router';

// 1. Initialize
const app = dva({
    history: browserHistory
});

// 2. Plugins


// 3. Model
app.model(require('./models/auth'));
app.model(require('./models/users'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
