import EditableText from "../Helpers/EditableText";
import { objectArrayFromConcatenatedString, postRequest } from "../../Utils";
import { useState } from "react";
import AgreementProduct from "./AgreementProduct";
import EditableNumber from "../Helpers/EditableNumber";

function AgreementDetails({ products, agreement, loadAgreements }) {
    let [selectedProductId, setSelectedProductId] = useState(1);

    let agreementProducts = objectArrayFromConcatenatedString(agreement.agreement_products);

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

    async function addAgreementProduct() {
        await postRequest('/agreement/add_product', { agreement_id: agreement.agreement_id, product_id: selectedProductId });

        await loadAgreements();
    }

    async function deleteAgreement() {
        await postRequest('/agreement/delete', {agreement_id: agreement.agreement_id});

        await loadAgreements();
    }

    return (
        <div className="card bg-dark">
            <div className="card-header">
                <div>
                    <h4 className="agreement-header">
                        <EditableText update={updateAgreementDescription} defaultValue={agreement.description} /> &nbsp; (<i className="las la-pen"></i>) 
                        <a onClick={e => deleteAgreement()} className="btn btn-danger"><i className="las la-trash"></i></a>
                    </h4>
                    <div className="flex">
                        <span className="margin-right-50">Borg (€) (<i className="las la-pen"></i>)</span>
                        <EditableNumber update={updateAgreementDeposit} defaultValue={agreement.deposit} />
                    </div>
                </div>
                <div className="form-group">
                    <label><b>Selecteer product</b></label>
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
                            <th>Prijs</th>
                            <th>Aantal (<i className="las la-pen"></i>)</th>
                            <th>Subtotaal</th>
                            <th>Startdatum (<i className="las la-pen"></i>)</th>
                            <th>Einddatum (<i className="las la-pen"></i>)</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            agreementProducts.map(agreementProduct => {
                                return <AgreementProduct key={agreementProduct.stock_id} agreementProduct={agreementProduct} loadAgreements={loadAgreements} />
                            })
                        }
                    </tbody>
                </table>
                <div>
                    <h3><span className="badge bg-info">Totaalprijs: € {agreement.price}</span></h3>
                </div>
            </div>
        </div>
    )
}

export default AgreementDetails;