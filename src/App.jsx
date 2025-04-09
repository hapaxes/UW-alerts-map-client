import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { MapProvider } from "./contexts/MapContext";

import Sorter from "./components/Sorter/Sorter";
import AlertList from "./components/AlertList/AlertList";
import AlertPost from "./components/AlertPost/AlertPost";
import AppLayout from "./pages/AppLayout/AppLayout";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import About from "./pages/About/About";

function App() {
  return (
    <BrowserRouter>
      <MapProvider>
        <Routes>
          <Route path="/" element={<Navigate replace to="list" />} />
          <Route path="list" element={<AppLayout />}>
            <Route
              index
              element={
                <>
                  <Sorter />
                  <AlertList />
                </>
              }
            />
            <Route path=":post_id" element={<AlertPost />} />
          </Route>
          <Route path="/About" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </MapProvider>
    </BrowserRouter>
  );
}

export default App;
