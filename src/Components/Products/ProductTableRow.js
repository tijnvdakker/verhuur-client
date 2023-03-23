import EditableText from "../Helpers/EditableText";
import { postRequest } from "../../Utils";
import EditableNumber from "../Helpers/EditableNumber";
import Swal from "sweetalert2";

function ProductTableRow({product, productGroups, loadProducts}) {

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

    async function attemptDeleteProduct() {
        let result = await Swal.fire({
            title: 'Bevestiging',
            text: "Weet je zeker dat je dit product wilt verwijderen?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Verwijderen'
        });

        if (result.isConfirmed) {
            await deleteProduct();
        }
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

    async function updateLinkedProductGroup(event) {
        let product_group_id = event.target.value;

        await postRequest('/product/update_linked_product_group', {product_id: product.product_id, product_group_id});

        await loadProducts();
    }

    return (
        <tr>
            <td><span className="badge" style={{backgroundColor: product.color}}><EditableText update={updateProductName} defaultValue={product.name} /></span></td>
            <td><EditableText update={updateProductLabel} defaultValue={product.label} /></td>
            <td><EditableNumber update={updateProductPrice} defaultValue={product.price} /></td>
            <td>
                <div className="form-group">
                    <select onChange={e => updateLinkedProductGroup(e)} className="form-control" value={product.product_group_id ?? 0}>
                        <option value="0"></option>
                        {
                            productGroups.map(productGroup => {
                                return <option value={productGroup.product_group_id}>{productGroup.name}</option>
                            })
                        }
                    </select>
                </div>
            </td>
            <td><a onClick={e => attemptDeleteProduct()} className="btn btn-danger"><i className="las la-trash"></i></a></td>
        </tr>
    )
}

export default ProductTableRow;