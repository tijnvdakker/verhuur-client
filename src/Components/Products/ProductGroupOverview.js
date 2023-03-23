import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../Utils";
import ProductGroupTableRow from "./ProductGroupTableRow";

function ProductGroupOverview() {
    const [productGroups, setProductGroups] = useState([]);

    useEffect(() => {
        loadProductGroups();
    }, []);

    async function loadProductGroups() {
        let result = await getRequest('/product/groups');

        setProductGroups(result.data.productGroups);
    }

    async function addProductGroup() {
        await postRequest('/product/group/add');

        await loadProductGroups();
    }

    return (
        <>
        <h1>Productgroepen <a className="btn btn-success" onClick={e => addProductGroup()}>+</a></h1>
        <table className="table table-striped product-table">
            <thead>
                <tr>
                    <th>Naam (<i className="las la-pen"></i>)</th>
                    <th>Kleur (<i className="las la-pen"></i>)</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            {
                productGroups.map(productGroup => {
                    return <ProductGroupTableRow productGroup={productGroup} loadProductGroups={loadProductGroups} />
                })
            }
        </table>
        </>
    )
}

export default ProductGroupOverview;