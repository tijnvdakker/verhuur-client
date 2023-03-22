import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Components/Layout/Layout';
import ProductOverview from './Components/Products/ProductOverview';
import AgreementOverview from './Components/Agreements/AgreementOverview';
import DashboardOverview from './Components/Dashboard/DashboardOverview';
import StockGraphOverview from './Components/Stock/StockGraphOverview';
import ProductGroupOverview from './Components/Products/ProductGroupOverview';
import StockOverview from './Components/Stock/StockOverview';

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductOverview />} />
          <Route path="products" element={<ProductOverview />} />
          <Route path="products/groups" element={<ProductGroupOverview />} />
          <Route path="stock" element={<StockOverview />} />
          <Route path="stock/graph" element={<StockGraphOverview />} />
          <Route path="agreements" element={<AgreementOverview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
