import { useState, useEffect } from "react";
import StockGraph from "./StockGraph";
import { getRequest, postRequest } from "../../Utils";
import Select from "react-select";

function StockGraphOverview() {
    const [stockData, setStockData] = useState({
        labels: [],
        datasets: []
    });

    let [productGroups, setProductGroups] = useState([]);
    let [products, setProducts] = useState([]);

    const [filterProductGroupId, setFilterProductGroupId] = useState(0);
    const [filterProductId, setFilterProductId] = useState(0);

    productGroups = productGroups.map(productGroup => {
        return {...productGroup, value: productGroup.product_group_id, label: productGroup.name};
    });

    productGroups.unshift({label: "", value: 0, product_group_id: 0});

    products = products.map(product => {
        return {...product, value: product.product_id, label: product.name};
    });
    
    products.unshift({label: "", value: 0, product_id: 0});

    async function loadStock() {
        let result = await getRequest(`/stock/total/${filterProductGroupId}/${filterProductId}`);

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

    async function loadProducts() {
        let result = await getRequest('/products');

        setProducts(result.data.products);
    }

    useEffect(() => {
        loadStock();
        loadProductGroups();
        loadProducts();
    }, [filterProductGroupId, filterProductId]);

    return (
        <>
            <div className="form-group">
                <div style={{width: '800px', display: 'flex'}}>
                    <div style={{marginRight: '25px'}}>
                        <b>Productgroep</b>
                        <Select options={productGroups} isSearchable onChange={productGroup => setFilterProductGroupId(productGroup.product_group_id)} />
                    </div>
                    <div>
                        <b>Product</b>
                        <Select options={products} isSearchable onChange={product => setFilterProductId(product.product_id)} />
                    </div>
                </div>
                
            </div>
            <StockGraph stockData={stockData} />
        </>
    )
}

export default StockGraphOverview;