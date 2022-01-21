import "./css/App.css";
import Linktree from "./Linktree";

import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        // PROXY not working
        <BrowserRouter>
            <div className="App">
                <Linktree />
            </div>
        </BrowserRouter>
    );
}

export default App;
