import './style/Clientes.css';

// icons
import { IconSearch } from '@tabler/icons-react';

import { useContext, useState } from 'react';
import { DashboardContext } from '../Context/DashboardContext';


const ClientesPage = () => {

    const { clientes, darkMode } = useContext(DashboardContext);

    const [search, setSearch] = useState('');

    const filteredClientes = clientes.filter((cliente) =>
        cliente.nome.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className={`clientes-content ${darkMode ? 'd' : 'light-theme'}`}>

            <div className="clientes-title">

                <h1>Clientes</h1>

                <div className="clientes-search">

                    <IconSearch stroke={1.5} />

                    <input
                        type="text"
                        placeholder='Buscar cliente'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

            </div>

            <table className="clientes-table">

                <thead className="clientes-table-header">

                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Pedidos</th>
                        <th>Total gasto</th>
                    </tr>

                </thead>

                <tbody>

                    {filteredClientes.map((cliente) => (

                        <tr className="clientes-table-row" key={cliente.id}>

                            <td>{cliente.nome}</td>

                            <td>{cliente.email}</td>

                            <td>{cliente.pedidos}</td>

                            <td>
                                R$ {cliente.totalGasto.toFixed(2)}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    )
}

export default ClientesPage