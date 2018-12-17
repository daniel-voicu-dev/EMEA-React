import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
// import bootstrapJS from  "~bootstrap/js/src/index.js";

import Layout from "./components/Layout";
import store from "./store";

import getStart from "../resources/getStart.json";
import getUser from "../resources/getUser.json";
import getReview from "../resources/getReview.json";
import getEvent from "../resources/getEvent.json";
import getCompany from "../resources/getCompany.json";
import getCountries from "../resources/getCountries.json";

const app = document.getElementById("app");
ReactDOM.render(<Provider store={store}><Layout /></Provider>, app);

// store.subscribe(() => {
//     console.log("NEWSTATE",store.getState())
// })
