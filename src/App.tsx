import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Landingpage from "./pages/landingpage";
import Header from "./components/Header";
import Layout from "./components/Layout";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const DetailsPage = React.lazy(() => import("./pages/detailspage"));
const CategoryPage = React.lazy(() => import("./pages/catergorypage"));

function App() {
  return (
    <Layout diplayClass="">
      <Header></Header>
      <Suspense
        fallback={
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Box>
        }
      >
        <Layout diplayClass="body-content">
          <Routes>
            <Route path="/" element={<Landingpage></Landingpage>}></Route>
            <Route
              path="navigate/:type"
              element={
                <Layout diplayClass="box-content">
                  <CategoryPage></CategoryPage>
                </Layout>
              }
            ></Route>
            <Route
              path="navigate/:type/:page"
              element={
                <Layout diplayClass="box-content form_container">
                  <DetailsPage></DetailsPage>
                </Layout>
              }
            ></Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
      </Suspense>
    </Layout>
  );
}

export default App;
