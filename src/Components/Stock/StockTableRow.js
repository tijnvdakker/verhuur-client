import React, { useEffect } from "react";
import { useState } from "react";
import { getRequest, postRequest } from "../../Utils";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function StockTableRow({ product, loadProducts }) {
    let [amount, setAmount] = useState(0);
    let [description, setDescription] = useState("");
    let [history, setHistory] = useState([]);

    useEffect(() => { getProductHistory() }, [history]);

    async function addStock() {
        await postRequest('/stock/add_mutation', {product_id: product.product_id, mutation: amount, description});

        await loadProducts()

        await getProductHistory();

        setDescription("");
    }

    async function getProductHistory() {
        let result = await getRequest(`/stock/history/${product.product_id}`);

        setHistory(result.data.history);
    }

    return (
        <tr>
            <td><span className="badge" style={{ backgroundColor: product.color }}>{product.name}</span></td>
            <td><span className="badge bg-primary">{product.current_stock}</span></td>
            <td><span className="badge bg-info">{product.total_stock}</span></td>
            <td>
                <div style={{display: 'flex', alignItems: 'center'}} className="form-group">
                    <input value={amount} onChange={e => setAmount(e.target.value)} style={{width: '150px'}} type='number' className="form-control" />
                    <input value={description} onChange={e => setDescription(e.target.value)} style={{width: '150px'}} type='text' className="form-control" />
                    <a onClick={e => addStock()} style={{marginLeft: '30px'}} className='btn btn-success'>+</a>
                </div>
            </td>
            <td>
                <Popup trigger={<a className="btn btn-primary">Bekijk</a>} modal>
                    <h3>Voorraad geschiedenis van het product: {product.name}</h3>
                    <table className="table table-striped">
                        <tr>
                            <th>Omschrijving</th>
                            <th>Aantal</th>
                            <th>Startdatum</th>
                            <th>Einddatum</th>
                        </tr>
                    {
                        history.map((stock) => {
                            return <tr>
                                    <td>{stock.description}</td>
                                    <td>{stock.mutation}</td>
                                    <td>{stock.date_start ? new Date(stock.date_start).toISOString().split('T')[0] : '-'}</td>
                                    <td>{stock.date_end ? new Date(stock.date_end).toISOString().split('T')[0] : '-'}</td>
                                </tr>
                        })
                    }
                    </table>
                </Popup>
            </td>
        </tr>
    )
}

export default StockTableRow;