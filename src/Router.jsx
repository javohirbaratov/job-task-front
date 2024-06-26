import { Route, Routes } from "react-router-dom";
import { main_routes } from "./constants/path";
import { Documents, DocumentsCreate, DocumentsShow } from "./pages";
import MainLayout from "./layout/MainLayout";

const Router = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={main_routes.documents} element={<Documents />} />
        <Route path={main_routes.documentShow} element={<DocumentsShow />} />
        <Route path={main_routes.documentCreate} element={<DocumentsCreate />} />
      </Route>

    </Routes>
  );
};

export default Router;
