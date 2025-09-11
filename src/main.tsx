import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { ApolloProvider } from "@apollo/client/react";
import client from "./api/client.ts";
import GridPage from "./pages/GridPage/GridPage.tsx";
import DetailPage from "./pages/DetailPage/DetailPage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ApolloProvider client={client}>
          <BrowserRouter basename="/pokedex/">
              <Routes>
                  <Route path="/" element={<GridPage />} />
                  <Route path=":name" element={<DetailPage />} />
              </Routes>
          </BrowserRouter>
      </ApolloProvider>
  </StrictMode>
)
