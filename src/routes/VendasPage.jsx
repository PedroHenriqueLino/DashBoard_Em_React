import './style/Vendas.css';

import { IconSearch } from '@tabler/icons-react';

import { useContext, useState } from 'react';

import { DashboardContext } from '../Context/DashboardContext';

const VendasPage = () => {

    const { pedidos, darkMode } = useContext(DashboardContext);

    const [search, setSearch] = useState('');

    const filteredPedidos = pedidos.filter((pedido) =>
        pedido.cliente.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={`vendas-content ${darkMode ? 'd' : 'light-theme'}`}>

            <div className="vendas-title">

                <h1>Vendas</h1>

                <div className="vendas-search">

                    <IconSearch stroke={1.5} />

                    <input
                        type="text"
                        placeholder='Buscar venda'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

            </div>

            <table className="vendas-table">

                <thead className="vendas-table-header">

                    <tr>
                        <th>Cliente</th>
                        <th>Data</th>
                        <th>Produtos</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    {filteredPedidos.map((pedido) => (

                        <tr
                            className="vendas-table-row"
                            key={pedido.id}
                        >

                            <td>{pedido.cliente}</td>

                            <td>
                                {new Date(pedido.data).toLocaleDateString('pt-BR')}
                            </td>

                            <td>{pedido.produtos}</td>

                            <td>
                                R$ {pedido.total.toFixed(2)}
                            </td>

                            <td>{pedido.status}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default VendasPage;