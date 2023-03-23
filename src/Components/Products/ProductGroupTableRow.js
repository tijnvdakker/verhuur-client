import EditableText from "../Helpers/EditableText";
import { postRequest } from "../../Utils";
import Swal from "sweetalert2";

function ProductGroupTableRow({productGroup, loadProductGroups}) {

    async function updateProductGroupName(event) {
        let name = event.target.value;

        await postRequest('/product/group/update_name', {name, product_group_id: productGroup.product_group_id});

        await loadProductGroups();
    }

    async function attemptDeleteProductGroup() {
        let result = await Swal.fire({
            title: 'Bevestiging',
            text: "Weet je zeker dat je deze productgroep wilt verwijderen? Alle gekoppelde producten zullen hierbij verwijderd worden!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Verwijderen'
        });

        if (result.isConfirmed) {
            await deleteProductGroup();
        }
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
            <td><a onClick={e => attemptDeleteProductGroup()} className="btn btn-danger"><i className="las la-trash"></i></a></td>
        </tr>
    )
}

export default ProductGroupTableRow;