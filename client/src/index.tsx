import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import history from "./history";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import theme from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <HistoryRouter history={history}>
        <QueryClientProvider client={queryClient}>
          <App/>
        </QueryClientProvider>
      </HistoryRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
