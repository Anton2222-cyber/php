// App.tsx


import {BrowserRouter, Route, Routes} from "react-router-dom";
import CategoryListPage from "./components/categories/list/CategoryListPage.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route  path="/" element={<CategoryListPage/>} />


            </Routes>
        </BrowserRouter>
    );
}

export default App;
