import React from 'react';
import './style/style.css';
import { createRoot } from 'react-dom/client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { SongList } from './components/songlist';
import { Route, Routes, HashRouter } from 'react-router-dom';
import { Container } from './components/Container';
import { SongCreate } from './components/SongCreate';
import { SongDetails } from './components/SongDetails';

const defaultOptions = {
  // watchQuery: {
  //   fetchPolicy: 'no-cache',
  //   errorPolicy: 'ignore',
  // },
  // query: {
  //   fetchPolicy: 'no-cache',
  //   errorPolicy: 'all',
  // },
};

const client = new ApolloClient({
  dataIdFromObject: (o) => o.id,
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/graphql',
  defaultOptions,
});

const Root = createRoot(document.querySelector('#root'));
Root.render(
  <ApolloProvider client={client}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Container />}>
          <Route index path="/songs" element={<SongList />} />
          <Route path="/songs/new" element={<SongCreate />} />
          <Route path="/songs/:id" element={<SongDetails />} />
        </Route>
      </Routes>
    </HashRouter>
  </ApolloProvider>
);
