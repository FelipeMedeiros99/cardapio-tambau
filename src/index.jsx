import { createRoot } from "react-dom/client";

import Header from "./Components/Header";
import Body from "./Components/Body";

import "./style/reset.css"
import "./style/index.css"

function App(){
    return(
        <>
            <Header />
            <Body/>
        </>
    )
}

createRoot(document.querySelector(".root")).render(<App />)