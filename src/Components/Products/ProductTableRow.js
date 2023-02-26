import EditableText from "../Helpers/EditableText";
import { postRequest } from "../../Utils";
import EditableNumber from "../Helpers/EditableNumber";

function ProductTableRow({product, loadProducts}) {

    async function updateProductName(event) {
        let name = event.target.value;

        await postRequest('/product/update_name', {name, product_id: product.product_id});

        await loadProducts();
    }

    async function updateProductLabel(event) {
        let label = event.target.value;

        await postRequest('/product/update_label', {label, product_id: product.product_id});

        await loadProducts();
    }

    async function deleteProduct() {
        await postRequest('/product/delete', {product_id: product.product_id});

        await loadProducts();
    }

    async function updateProductPrice(event) {
        let price = event.target.value;

        await postRequest('/product/update_price', {product_id: product.product_id, price});

        await loadProducts();
    }

    return (
        <tr>
            <td><EditableText update={updateProductName} defaultValue={product.name} /></td>
            <td><EditableText update={updateProductLabel} defaultValue={product.label} /></td>
            <td><EditableNumber update={updateProductPrice} defaultValue={product.price} /></td>
            <td><span className="badge bg-primary">{product.total_stock}</span></td>
            <td><a onClick={e => deleteProduct()} className="btn btn-danger"><i className="las la-trash"></i></a></td>
        </tr>
    )
}

export default ProductTableRow;