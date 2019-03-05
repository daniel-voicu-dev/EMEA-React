import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom'
import Layout from "./components/Layout";
import store from "./store";
import history from './history';

const app = document.getElementById("app");
ReactDOM.render(<Provider store={store}><Router history={history}><Layout /></Router></Provider>, app);

