import {Routes, Route, Navigate} from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import React from "react";
import CategoryListPage from "./components/myComponents/categories/list/CategoryListPage";


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<CategoryListPage/>}/>
            <Route path="auth/*" element={<AuthLayout/>}/>
            <Route path="admin/*" element={<AdminLayout/>}/>
            <Route path="rtl/*" element={<RtlLayout/>}/>
            <Route path="admin/" element={<Navigate to="/admin/categories" replace/>}/>

        </Routes>
    );
};

export default App;
