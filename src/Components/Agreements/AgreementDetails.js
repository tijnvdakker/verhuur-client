import EditableText from "../Helpers/EditableText";
import { objectArrayFromConcatenatedString, postRequest } from "../../Utils";
import { useState } from "react";
import AgreementProduct from "./AgreementProduct";
import EditableNumber from "../Helpers/EditableNumber";
import Select from 'react-select';
import Swal from "sweetalert2";

function AgreementDetails({ products, agreement, loadAgreements, loadProducts, clients }) {
    let [selectedProduct, setSelectedProduct] = useState({product_id: 0, name: ''});

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
        await postRequest('/agreement/add_product', { agreement_id: agreement.agreement_id, product_id: selectedProduct.product_id });

        await loadAgreements();

        await loadProducts();

        setSelectedProduct({product_id: 0, label: ''});
    }

    async function setLinkedClient(client_id) {
        await postRequest('/agreement/link_client', {client_id, agreement_id: agreement.agreement_id});

        await loadAgreements();
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
                    <div className="flex" style={{alignItems: 'center', marginTop: '20px'}}>
                        <span className="margin-right-50">Klant:</span>
                        <div style={{minWidth: '200px'}}>
                            <Select isSearchable options={clients} value={{value: agreement.client_id, label: agreement.client}} onChange={client => setLinkedClient(client.client_id)} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label><b>Product(en) toevoegen</b></label>
                    <div className="flex">
                        <div style={{minWidth: '200px', marginRight: '20px'}}>
                            <Select isSearchable options={products} isOptionDisabled={(product) => product.current_stock <= 0} defaultValue={{value: selectedProduct.product_id, label: selectedProduct.name}} onChange={product => setSelectedProduct(product)} />
                        </div>
                        <a onClick={e => addAgreementProduct()} className="btn btn-primary">+</a>
                    </div>
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