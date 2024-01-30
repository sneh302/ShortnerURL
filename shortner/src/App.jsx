import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home.jsx";
import Navigate from "./Navigate.jsx";
import TrackUrl from "./TrackUrl.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tract-url" element={<TrackUrl />} />
                <Route path="/:id" element={<Navigate />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
