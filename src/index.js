import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './store';
import Routes from './routes'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  // shadows: [
  //   '0px 11px 15px -7px red,0px 24px 38px 3px red,0px 9px 46px 8px red',
  // ],
  shadows: Array(25).fill('none')
});

const RootComponent = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Routes/>
    </ThemeProvider>
  </Provider>
)

ReactDOM.render(<RootComponent />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
