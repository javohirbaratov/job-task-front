import { ToastContainer } from "react-toastify";
import Router from "./Router";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router />
      <ToastContainer position="top-center" closeOnClick />
    </>
  );
}

export default App;
