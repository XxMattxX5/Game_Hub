import React from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./HomePage"
import navBar from "./NavBar"


export default function App() {
    return (
        <HomePage />
            
    )
    
}


const appDiv = createRoot( document.getElementById('app') )
appDiv.render(<App />)




