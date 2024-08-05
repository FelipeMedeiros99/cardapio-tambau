import { createRoot } from "react-dom/client";

import Header from "./Components/Header";

import "./style/reset.css"
import "./style/index.css"

function App(){
    return(
        <>
            <Header />
        </>
    )
}

createRoot(document.querySelector(".root")).render(<App />)