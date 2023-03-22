import ProductTableRow from "../Products/ProductTableRow";
import { useState, useEffect } from "react";
import { getRequest, postRequest } from '../../Utils';
import StockTableRow from "./StockTableRow";

function StockOverview() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        let result = await getRequest('/products');

        setProducts(result.data.products);
    }

    return (
        <>
            <h1>Voorraad</h1>
            <table className="table table-striped product-table">
                <thead>
                    <tr>
                        <th>Naam</th>
                        <th>Huidige voorraad</th>
                        <th>Totale voorraad</th>
                        <th>Toevoegen (Aantal en omschrijving)</th>
                        <th>Geschiedenis</th>
                    </tr>
                </thead>
                {
                    products.map(product => {
                        return <StockTableRow product={product} loadProducts={loadProducts} />
                    })
                }
            </table>
        </>
    )
}

export default StockOverview;