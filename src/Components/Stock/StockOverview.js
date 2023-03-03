import { useState, useEffect } from "react";
import StockGraph from "./StockGraph";
import { getRequest, postRequest } from "../../Utils";

function StockOverview() {
    const [stockData, setStockData] = useState({
        labels: [],
        datasets: []
    });

    const [productGroups, setProductGroups] = useState([]);

    const [filterProductGroupId, setFilterProductGroupId] = useState(0);

    async function loadStock() {
        let result = await getRequest(`/stock/total/${filterProductGroupId}`);

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

    async function loadProductGroups() {
        let result = await getRequest('/product/groups');

        setProductGroups(result.data.productGroups);
    }

    useEffect(() => {
        loadStock();
        loadProductGroups();
    }, [filterProductGroupId]);

    return (
        <>
            <div className="form-group">
                <h3>Filter op productgroep</h3>
                <select onChange={e => setFilterProductGroupId(e.target.value)} className="form-control" value={filterProductGroupId}>
                    <option value="0"></option>
                    {
                        productGroups.map(productGroup => {
                            return <option value={productGroup.product_group_id}>{productGroup.name}</option>
                        })
                    }
                </select>
            </div>
            <StockGraph stockData={stockData} />
        </>
    )
}

export default StockOverview;