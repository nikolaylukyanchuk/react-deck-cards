import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'react-bootstrap';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { fetchData } from './actions';
import * as reducers from './reducers';
import App from './components/App';
import VisibleCards from './components/VisibleCards';
import NewCardModel from './components/NewCardModel';
import EditCardModel from './components/EditCardModel';
import StudyModel from './components/StudyModel';


reducers.routing = routerReducer;

const store = createStore(combineReducers(reducers), applyMiddleware(thunkMiddleware));
const history = syncHistoryWithStore(browserHistory, store);
const routes = (
    <Route path='/' component={App}>
        <Route path='/deck/:deckId' component={VisibleCards}>
            <Route path='/deck/:deckId/new' component={NewCardModel}></Route>
            <Route path='/deck/:deckId/edit/:cardId' component={EditCardModel}></Route>
            <Route path='/deck/:deckId/study' component={StudyModel}></Route>
        </Route>
    </Route>
);


function run () {
    let state = store.getState();

    ReactDOM.render(
        <Provider store={store}>
            <Router history={history}>
                {routes}
            </Router>
        </Provider>, document.getElementById('root'));
}

function save() {
    let state = store.getState();
    fetch('/api/data', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            decks: state.decks,
            cards: state.cards
        })
    });
}

function init() {
    run();
    store.subscribe(run);
    store.subscribe(save);
    store.dispatch(fetchData());
}

init();


window.show = () => store.dispatch(showAddDeck());
window.hide = () => store.dispatch(hideAddDeck());
window.add = () => store.dispatch(addDeck(new Date().toString() ));