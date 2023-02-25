import EditableText from "../Helpers/EditableText";
import { postRequest } from "../../Utils";

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

    return (
        <tr>
            <td><EditableText update={updateProductName} defaultValue={product.name}></EditableText></td>
            <td><EditableText update={updateProductLabel} defaultValue={product.label}></EditableText></td>
            <td>{product.price}</td>
            <td><span className="badge bg-primary">{product.total_stock}</span></td>
        </tr>
    )
}

export default ProductTableRow;