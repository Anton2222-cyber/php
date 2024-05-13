// import './App.css'
import CategoryListPage from "./components/categories/list/CategoryListPage.tsx";
import {Route, Routes} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import AdminLayout from "./components/containers/admin/AdminLayout.tsx";
import News from "./components/news/News.tsx";
import Login from "./pages/login";


const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<AdminLayout/>}>
                    <Route index element={<CategoryListPage/>}/>
                    <Route path="login" element={<Login />} />
                    {/*<Route path="/add-category" element={<AddCategoryPage />} />*/}

                    {/*<Route path="tasks" element={<TasksPage />} />*/}
                </Route>

                <Route path="*" element={<NotFoundPage/>}/>
                <Route path="/news" element={<News/>}/>
            </Routes>
        </>
    )
}

export default App
