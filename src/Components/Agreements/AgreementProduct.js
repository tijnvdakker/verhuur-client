import { postRequest } from "../../Utils";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import EditableNumber from "../Helpers/EditableNumber";

function AgreementProduct({agreementProduct, loadAgreementProducts}) {

    async function updateAgreementProductDateStart(date) {
        let newDateStart = date.toISOString().split('T')[0];

        await postRequest('/agreement/product/update_date_start', { stock_id: agreementProduct.stock_id, date_start: newDateStart });

        await loadAgreementProducts();
    }


    async function updateAgreementProductDateEnd(date) {
        let newDateEnd = date.toISOString().split('T')[0];

        await postRequest('/agreement/product/update_date_end', { stock_id: agreementProduct.stock_id, date_end: newDateEnd });

        await loadAgreementProducts();
    }

    async function updateAgreementProductAmount(event) {
        let amount = event.target.value;

        await postRequest('/agreement/product/update_amount', {stock_id: agreementProduct.stock_id, amount});

        await loadAgreementProducts();
    }

    async function deleteAgreementProduct() {
        await postRequest('/agreement/product/delete', {stock_id: agreementProduct.stock_id});

        await loadAgreementProducts();
    }

    return <tr key={agreementProduct.stock_id}>
        <td>{agreementProduct.name}</td>
        <td>
            <EditableNumber update={updateAgreementProductAmount} defaultValue={agreementProduct.amount} />
        </td>
        <td>
            <DatePicker
                dateFormat="dd-MM-yyyy"
                showIcon
                selected={new Date(agreementProduct.date_start)}
                onChange={(date) => updateAgreementProductDateStart(date)}
            />
        </td>
        <td>
            <DatePicker
                dateFormat="dd-MM-yyyy"
                showIcon
                selected={new Date(agreementProduct.date_end)}
                onChange={(date) => updateAgreementProductDateEnd(date)}
            />
        </td>
        <td>
            <a onClick={e => deleteAgreementProduct()} className="btn btn-danger"><i className="las la-trash"></i></a>
        </td>
    </tr>
}

export default AgreementProduct;