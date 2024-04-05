// App.tsx

import React from 'react';
import CategoryListPage from "./components/categories/list/CategoryListPage.tsx";



const App: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">

            <CategoryListPage />
        </div>
    );
};

export default App;
