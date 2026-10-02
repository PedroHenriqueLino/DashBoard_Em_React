import './NavBar.css';
//icons
import {
    IconLayoutDashboard,
    IconShoppingCart,
    IconClipboardList,
    IconPackage,
    IconUsers,
    IconPackages,
    IconReportAnalytics,
    IconSettings
} from "@tabler/icons-react";

//React route dom
import { NavLink } from 'react-router-dom';

//Context
import { useContext } from 'react';
import { DashboardContext } from '../../Context/DashboardContext'

const NavBar = () => {

    //Tema dark e light
    const { darkMode } = useContext(DashboardContext)

    return (
        <div className={`nav-content ${darkMode ? '' : 'light-theme'}`}>

            <div className="nav-title">
                <h1>Nexora</h1>
                <h2>Analytics</h2>
            </div>

            <div className="nav-menu">
                <ul>
                    <NavLink to="/"
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        <li className="active">
                            <IconLayoutDashboard stroke={1.5} />
                            Dashboard
                        </li>
                    </NavLink>
                    <NavLink to="/vendas"
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        <li>
                            <IconShoppingCart stroke={1.5} />
                            Vendas
                        </li>
                    </NavLink>
                    <li>
                        <IconClipboardList stroke={1.5} />
                        Pedidos
                    </li>
                    <li>
                        <IconPackage stroke={1.5} />
                        Produtos
                    </li>
                    <NavLink to="/clientes"
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        <li>
                            <IconUsers stroke={1.5} />
                            Clientes

                        </li>
                    </NavLink>
                    <li>
                        <IconPackages stroke={1.5} />
                        Estoque
                    </li>

                </ul>
            </div >

        </div >

    )
}

export default NavBar