import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import Layout from "./components/Layout";
import store from "./store";

import getStart from "../resources/getStart.json";
import getUser from "../resources/getUser.json";
import getReview from "../resources/getReview.json";

const app = document.getElementById("app");
ReactDOM.render(<Provider store={store}><Layout /></Provider>, app);

store.subscribe(() => {
    console.log("NEWSTATE",store.getState())
})
