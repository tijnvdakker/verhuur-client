import { useState, useEffect } from "react";
import StockGraph from "./StockGraph";
import { getRequest, postRequest } from "../../Utils";

function StockOverview() {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(1);
    const [mutation, setMutation] = useState(0);

    const [stockData, setStockData] = useState({
        labels: [],
        datasets: []
    });

    async function loadProducts() {
        let result = await getRequest('/products');

        setProducts(result.data.products);
    }

    async function addStock() {
        await postRequest('/stock/add_mutation', {product_id: selectedProductId, mutation: mutation});

        await loadStock();
    }

    async function loadStock() {
        let result = await getRequest('/stock/total');

        let stockData = result.data.stockData;

        setStockData({
            labels: stockData.map((item) => item.stock_date),
            datasets: [
                {
                    label: "Voorraad",
                    data: stockData.map((item) => item.total_stock)
                }
            ]
        })
    }

    useEffect(() => {
        loadProducts();
        loadStock();
    }, []);

    return (
        <>
            <StockGraph stockData={stockData} />
            <div className="form-group">
                <select value={selectedProductId} onChange={e => setSelectedProductId(e.target.value)} className="form-control product-select">
                    {
                        products.map(product => {
                            return <option value={product.product_id}>{product.name}</option>
                        })
                    }
                </select>
                <input value={mutation} onChange={e => setMutation(e.target.value)} className="form-control" type="number" step="1" />
                <a onClick={e => addStock()} className="btn btn-primary">+</a>
            </div>
        </>
    )
}

export default StockOverview;