import ProductTableRow from "./ProductTableRow";
import { useState, useEffect } from "react";
import { getRequest, postRequest } from '../../Utils';

function ProductOverview() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts() {
        let result = await getRequest('/products');

        setProducts(result.data.products);
    }

    async function addProduct() {
        await postRequest('/product/add');

        await loadProducts();
    }

    return (
        <>
        <h1>Producten <a className="btn btn-success" onClick={e => addProduct()}>+</a></h1>
        <table className="table table-striped product-table">
            <thead>
                <tr>
                    <th>Naam</th>
                    <th>Label</th>
                    <th>Prijs</th>
                    <th>Huidige voorraad</th>
                </tr>
            </thead>
            {
                products.map(product => {
                    return <ProductTableRow product={product} loadProducts={loadProducts} />
                })
            }
        </table>
        </>
    )
}

export default ProductOverview;