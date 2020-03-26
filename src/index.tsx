import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import {Provider} from 'react-redux'
import {Store} from 'redux'
import configureStore, {IStoreState} from './Store'
import Routes from './Routes'
import './index.css';

interface IProps {
    store: Store<IStoreState>
}

const Root : React.FC<IProps> = props => (
    <Provider store={props.store}>
        <Router><Routes /></Router>
    </Provider>
);

const store = configureStore();
ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
