import EditableText from "../Helpers/EditableText";
import { postRequest } from "../../Utils";

function ProductGroupTableRow({productGroup, loadProductGroups}) {

    async function updateProductGroupName(event) {
        let name = event.target.value;

        await postRequest('/product/group/update_name', {name, product_group_id: productGroup.product_group_id});

        await loadProductGroups();
    }

    async function deleteProductGroup() {
        await postRequest('/product/group/delete', {product_group_id: productGroup.product_group_id});

        await loadProductGroups();
    }

    async function updateProductColor(event) {
        let color = event.target.value;

        await postRequest('/product/group/update_color', {color, product_group_id: productGroup.product_group_id});

        await loadProductGroups();
    }

    return (
        <tr>
            <td><EditableText update={updateProductGroupName} defaultValue={productGroup.name} /></td>
            <td><input type='color' defaultValue={productGroup.color} onChange={e => updateProductColor(e)} /></td>
            <td><a onClick={e => deleteProductGroup()} className="btn btn-danger"><i className="las la-trash"></i></a></td>
        </tr>
    )
}

export default ProductGroupTableRow;