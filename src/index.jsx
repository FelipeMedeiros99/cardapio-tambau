import { createRoot } from "react-dom/client";
import { useState } from "react";

import Header from "./Components/Header";
import Body from "./Components/Body";

import "./style/reset.css"
import "./style/index.css"

function App(){
    const [modalAtivo, setModalAtivo] = useState(false)
    return(
        <>  
            <Header />
            <Body setModalAtivo={setModalAtivo} modalAtivo={modalAtivo}/>
            <img className="imagem-fundo" src="./imagens/logo-tambau.png"/>
        </>
    )
}

createRoot(document.querySelector(".root")).render(<App />)