import React from 'react';
import logo from './logo.svg';
import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import Candidates from './components/Candidates';
import { Container,Grid } from "@mui/material";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Provider store={store}>
      <ToastContainer position="top-center" />
    <Container>
      <Grid container justifyContent="center" alignItems="center"> 
          <Candidates />
      </Grid>
    </Container>


    </Provider>
  );
}

export default App;