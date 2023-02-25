import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
    return (
        <div className="app">
            <Sidebar />
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;