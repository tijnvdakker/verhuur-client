import AgreementDetails from "./AgreementDetails";
import { useState, useEffect } from "react";
import { getRequest, postRequest } from "../../Utils";
import Swal from "sweetalert2";
import Select from "react-select";

function AgreementOverview() {
    const [agreements, setAgreements] = useState([]);
    let [products, setProducts] = useState([]);
    let [clients, setClients]= useState([]);

    let [filterClient, setFilterClient] = useState({client_id: 0, name: '', current_stock: 0});
    let [filterProduct, setFilterProduct] = useState({product_id: 0, name: ''});

    useEffect(() => {
        loadAgreements();
        loadProducts();
        loadClients();
    }, [filterClient, filterProduct]);

    async function loadProducts() {
        let result = await getRequest('/products');

        setProducts(result.data.products);
    }

    async function loadAgreements() {
        let result = await getRequest(`/agreement/${filterClient.client_id}/${filterProduct.product_id}`);

        setAgreements(result.data.agreements);
    }

    async function loadClients() {
        let result = await getRequest('/clients');

        setClients(result.data.clients);
    }

    async function addAgreement() {
        await postRequest('/agreement/add');

        await loadAgreements();

        Swal.fire({
            icon: 'success',
            title: 'Gelukt!',
            text: 'Overeenkomt is aangemaakt!'
        });
    }

    
    clients = clients.map(client => {
        return {...client, value: client.client_id, label: client.name};
    });

    clients.unshift({label: "", value: 0, client_id: 0});

    products = products.map(product => {
        return {...product, value: product.product_id, label: product.name + ` (${product.current_stock})`};
    });

    products.unshift({label: "", value: 0, product_id: 0});

    return (
        <>
        <h1>Overeenkomsten <a className="btn btn-success" onClick={e => addAgreement()}>+</a></h1>
        <div className="form-group">
                <div style={{width: '800px', display: 'flex'}}>
                    <div style={{minWidth: '200px', marginRight: '25px'}}>
                        <b>Klant</b>
                        <Select options={clients} value={{value: filterClient.client_id, label: filterClient.name}} isSearchable onChange={client => setFilterClient(client)} />
                    </div>
                    <div style={{minWidth: '200px', marginRight: '25px'}}>
                        <b>Product</b>
                        <Select options={products} value={{value: filterProduct.product_id, label: filterProduct.name}} isSearchable onChange={product => setFilterProduct(product)} />
                    </div>
                </div>
                
            </div>
        <div className="agreements">
            {
                agreements.map(agreement => {
                    return <AgreementDetails clients={clients} loadProducts={loadProducts} key={agreement.agreement_id} products={products} agreement={agreement} loadAgreements={loadAgreements} />
                })
            }
        </div>
        </>
    )
}

export default AgreementOverview;