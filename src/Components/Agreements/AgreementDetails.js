import EditableText from "../Helpers/EditableText";
import { getRequest, postRequest } from "../../Utils";
import { useEffect, useState } from "react";
import AgreementProduct from "./AgreementProduct";
import EditableNumber from "../Helpers/EditableNumber";

function AgreementDetails({ products, agreement, loadAgreements }) {
    let [agreementProducts, setAgreementProducts] = useState([]);
    let [selectedProductId, setSelectedProductId] = useState(1);

    useEffect(() => {
        loadAgreementProducts()
    }, []);

    async function updateAgreementDescription(event) {
        let description = event.target.value;

        await postRequest('/agreement/update_description', {agreement_id: agreement.agreement_id, description});

        await loadAgreements();
    }

    async function updateAgreementDeposit(event) {
        let deposit = event.target.value;

        await postRequest('/agreement/update_deposit', { deposit, agreement_id: agreement.agreement_id });

        await loadAgreements();
    }

    async function loadAgreementProducts() {
        let result = await getRequest('/agreement/products/' + agreement.agreement_id) || [];

        setAgreementProducts(result.data.agreement_products);
    }

    async function addAgreementProduct() {
        await postRequest('/agreement/add_product', { agreement_id: agreement.agreement_id, product_id: selectedProductId });

        await loadAgreementProducts();
    }

    async function deleteAgreement() {
        await postRequest('/agreement/delete', {agreement_id: agreement.agreement_id});

        await loadAgreements();
    }

    return (
        <div className="card bg-dark">
            <div className="card-header">
                <div>
                    <h4><EditableText update={updateAgreementDescription} defaultValue={agreement.description} /></h4>
                    <EditableNumber update={updateAgreementDeposit} defaultValue={agreement.deposit} />
                    <a onClick={e => deleteAgreement()} className="btn btn-danger"><i className="las la-trash"></i></a>
                </div>
                <div className="form-group">
                    <select value={selectedProductId} onChange={e => setSelectedProductId(e.target.value)} className="form-control product-select">
                        {
                            products.map(product => {
                                return <option key={product.product_id} value={product.product_id}>{product.name}</option>
                            })
                        }
                    </select>
                    <a onClick={e => addAgreementProduct()} className="btn btn-primary">+</a>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-striped agreement-product-table">
                    <thead>
                        <tr>
                            <th>Naam</th>
                            <th>Aantal</th>
                            <th>Startdatum</th>
                            <th>Einddatum</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            agreementProducts.map(agreementProduct => {
                                return <AgreementProduct agreementProduct={agreementProduct} loadAgreementProducts={loadAgreementProducts} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AgreementDetails;