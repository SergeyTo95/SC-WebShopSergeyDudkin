import React from 'react';
import './index.css';
import {createRoot} from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { 
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
} from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
  );

  




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();