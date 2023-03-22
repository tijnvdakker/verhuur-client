import AgreementDetails from "./AgreementDetails";
import { useState, useEffect } from "react";
import { getRequest, postRequest } from "../../Utils";
import Swal from "sweetalert2";

function AgreementOverview() {
    const [agreements, setAgreements] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadAgreements();
        loadProducts()
    }, []);

    async function loadProducts() {
        let result = await getRequest('/products');

        setProducts(result.data.products);
    }

    async function loadAgreements() {
        let result = await getRequest('/agreement');

        setAgreements(result.data.agreements);
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

    return (
        <>
        <h1>Overeenkomsten <a className="btn btn-success" onClick={e => addAgreement()}>+</a></h1>
        <div className="agreements">
            {
                agreements.map(agreement => {
                    return <AgreementDetails loadProducts={loadProducts} key={agreement.agreement_id} products={products} agreement={agreement} loadAgreements={loadAgreements} />
                })
            }
        </div>
        </>
    )
}

export default AgreementOverview;