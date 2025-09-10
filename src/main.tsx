import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { ApolloProvider } from "@apollo/client/react";
// import App from './App.tsx'
import PokemonListPage from "./PokemonListPage.tsx";
import client from "./api/client.ts";
import PokemonDetailPage from "./PokemonDetailPage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ApolloProvider client={client}>
          <BrowserRouter basename="/pokedex/">
              {/*<App />*/}
              <Routes>
                  <Route path="/" element={<PokemonListPage />} />
                  <Route path=":name" element={<PokemonDetailPage />} />
              </Routes>
          </BrowserRouter>
      </ApolloProvider>
  </StrictMode>
)
