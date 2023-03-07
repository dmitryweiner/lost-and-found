import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {Toaster} from "react-hot-toast";
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import history from "./history";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import theme from "./theme";
import App from './App';
import './index.css';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <HistoryRouter history={history}>
      <QueryClientProvider client={queryClient}>
        <App/>
        <Toaster/>
      </QueryClientProvider>
    </HistoryRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
