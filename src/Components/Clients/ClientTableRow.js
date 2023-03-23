import EditableText from "../Helpers/EditableText";
import { postRequest } from "../../Utils";
import EditableNumber from "../Helpers/EditableNumber";
import Swal from "sweetalert2";

function ClientTableRow({client, loadClients}) {

    async function updateClientName(event) {
        let name = event.target.value;

        await postRequest('/client/update_name', {name, client_id: client.client_id});

        await loadClients();
    }

    async function updateClientEmail(event) {
        let email = event.target.value;

        await postRequest('/client/update_email', {email, client_id: client.client_id});

        await loadClients();
    }

    async function attemptDeleteClient() {
        let result = await Swal.fire({
            title: 'Bevestiging',
            text: "Weet je zeker dat je deze klant wilt verwijderen? Alle gekoppelde overeenkomsten zullen ook verwijderd worden!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Verwijderen'
        });

        if (result.isConfirmed) {
            await deleteClient();
        }
    }

    async function deleteClient() {
        await postRequest('/client/delete', {client_id: client.client_id});

        await loadClients();
    }

    async function updateClientPhone(event) {
        let phone = event.target.value;

        await postRequest('/client/update_phone', {client_id: client.client_id, phone});

        await loadClients();
    }

    async function updateClientAddress(event) {
        let address = event.target.value;

        await postRequest('/client/update_address', {client_id: client.client_id, address});

        await loadClients();
    }

    return (
        <tr>
            <td><EditableText update={updateClientName} defaultValue={client.name} /></td>
            <td><EditableText update={updateClientEmail} defaultValue={client.email} /></td>
            <td><EditableText update={updateClientPhone} defaultValue={client.phone} /></td>
            <td><EditableText update={updateClientAddress} defaultValue={client.address} /></td>
            <td><a onClick={e => attemptDeleteClient()} className="btn btn-danger"><i className="las la-trash"></i></a></td>
        </tr>
    )
}

export default ClientTableRow;