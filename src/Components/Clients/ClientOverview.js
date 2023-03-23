import ClientTableRow from "./ClientTableRow";
import { useState, useEffect } from "react";
import { getRequest, postRequest } from '../../Utils';

function ClientOverview() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        loadClients();
    }, []);

    async function loadClients() {
        let result = await getRequest('/clients');

        setClients(result.data.clients);
    }

    async function addClient() {
        await postRequest('/client/add');

        await loadClients();
    }

    return (
        <>
            <h1>Klanten <a className="btn btn-success" onClick={e => addClient()}>+</a></h1>
            <table className="table table-striped product-table">
                <thead>
                    <tr>
                        <th>Naam (<i className="las la-pen"></i>)</th>
                        <th>Email (<i className="las la-pen"></i>)</th>
                        <th>Telefoonnummer (<i className="las la-pen"></i>)</th>
                        <th>Adres (<i className="las la-pen"></i>)</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                {
                    clients.map(client => {
                        return <ClientTableRow client={client} loadClients={loadClients} />
                    })
                }
            </table>
        </>
    )
}

export default ClientOverview;