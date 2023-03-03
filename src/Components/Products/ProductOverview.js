import ProductTableRow from "./ProductTableRow";
import { useState, useEffect } from "react";
import { getRequest, postRequest } from '../../Utils';

function ProductOverview() {
    const [products, setProducts] = useState([]);
    const [productGroups, setProductGroups] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(0);
    const [mutation, setMutation] = useState(0);

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

    async function addStock() {
        await postRequest('/stock/add_mutation', {product_id: selectedProductId, mutation: mutation});

        await loadProducts()
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
                        <th>Huidige voorraad</th>
                        <th>Totale voorraad</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                {
                    products.map(product => {
                        return <ProductTableRow productGroups={productGroups} product={product} loadProducts={loadProducts} />
                    })
                }
            </table>
            <h1>Voorraad toevoegen</h1>
            <div className="form-group">
                <select value={selectedProductId} onChange={e => setSelectedProductId(e.target.value)} className="form-control product-select">
                    <option value="0"></option>
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

export default ProductOverview;