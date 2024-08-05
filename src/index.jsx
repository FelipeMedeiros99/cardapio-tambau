import { createRoot } from "react-dom/client";

function App(){
    return(
        <>
            hello
        </>
    )
}

createRoot(document.querySelector(".root")).render(<App />)