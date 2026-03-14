import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement === null) {
  throw new Error("root element is not defined");
}

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
