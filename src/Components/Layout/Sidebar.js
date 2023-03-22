import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/products">Producten</Link>
                </li>
                <li>
                    <Link to="/products/groups">Productgroepen</Link>
                </li>
                <li>
                    <Link to="/stock">Voorraad</Link>
                </li>
                <li>
                    <Link to="/stock/graph">Grafiek</Link>
                </li>
                <li>
                    <Link to="/agreements">Overeenkomsten</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar;