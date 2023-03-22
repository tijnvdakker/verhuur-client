import ProductTableRow from "./ProductTableRow";
import { useState, useEffect } from "react";
import { getRequest, postRequest } from '../../Utils';

function ProductOverview() {
    const [products, setProducts] = useState([]);
    const [productGroups, setProductGroups] = useState([]);

    useEffect(() => {
        loadProducts();
        loadProductGroups();
    }, []);

    async function loadProducts() {
        let result = await getRequest('/products');

        setProducts(result.data.products);
    }

    async function loadProductGroups() {
        let result = await getRequest('/product/groups');

        setProductGroups(result.data.productGroups);
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
                        <th>Naam (<i className="las la-pen"></i>)</th>
                        <th>Label (<i className="las la-pen"></i>)</th>
                        <th>Prijs (<i className="las la-pen"></i>)</th>
                        <th>Productgroep (<i className="las la-pen"></i>)</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                {
                    products.map(product => {
                        return <ProductTableRow productGroups={productGroups} product={product} loadProducts={loadProducts} />
                    })
                }
            </table>
        </>
    )
}

export default ProductOverview;