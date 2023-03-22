import EditableText from "../Helpers/EditableText";
import { objectArrayFromConcatenatedString, postRequest } from "../../Utils";
import { useState } from "react";
import AgreementProduct from "./AgreementProduct";
import EditableNumber from "../Helpers/EditableNumber";
import Select from 'react-select';
import Swal from "sweetalert2";

function AgreementDetails({ products, agreement, loadAgreements, loadProducts }) {
    let [selectedProductId, setSelectedProductId] = useState(1);

    let agreementProducts = objectArrayFromConcatenatedString(agreement.agreement_products);

    products = products.map(product => {
        return {...product, value: product.product_id, label: product.name + ` (${product.current_stock})`};
    });

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

        await loadProducts();

        setSelectedProductId(1);
    }

    async function attemptDeleteAgreement() {
        let result = await Swal.fire({
            title: 'Bevestiging',
            text: "Weet je zeker dat je deze overeenkomst wilt verwijderen?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Verwijderen'
        });

        if (result.isConfirmed) {
            await deleteAgreement();
        }
    }

    async function deleteAgreement() {
        await postRequest('/agreement/delete', {agreement_id: agreement.agreement_id});

        await loadAgreements();
    }

    return (
        <div className="card">
            <div className="card-header">
                <div>
                    <h4 className="agreement-header">
                        <EditableText update={updateAgreementDescription} defaultValue={agreement.description} /> &nbsp; (<i className="las la-pen"></i>) 
                        <a onClick={e => attemptDeleteAgreement()} className="btn btn-danger"><i className="las la-trash"></i></a>
                    </h4>
                    <div className="flex">
                        <span className="margin-right-50">Borg (€) (<i className="las la-pen"></i>)</span>
                        <EditableNumber update={updateAgreementDeposit} defaultValue={agreement.deposit} />
                    </div>
                </div>
                <div className="form-group">
                    <label><b>Product(en) toevoegen</b></label>
                    <Select isSearchable options={products} isOptionDisabled={(product) => product.current_stock <= 0} defaultValue={selectedProductId} onChange={product => setSelectedProductId(product.product_id)} />
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
                                return <AgreementProduct loadProducts={loadProducts} key={agreementProduct.stock_id} agreementProduct={agreementProduct} loadAgreements={loadAgreements} />
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