import './RecentProducts.css';

import { useContext } from 'react';

import { DashboardContext } from '../../Context/DashboardContext';

const RecentProducts = () => {

    const { pedidos, mesSelecionado } = useContext(DashboardContext);

    // Pedidos mais recentes
    const pedidosRecentes = [...pedidos]
        .filter((pedido) =>
            mesSelecionado === 'Todos' ||
            pedido.mes === mesSelecionado
        )
        .sort((a, b) =>
            new Date(b.data) - new Date(a.data)
        )
        .slice(0, 5);

    return (

        <div className='TopSellingProducts-content'>

            <div className="TopSellingProducts-title">
                Pedidos mais recentes
            </div>

            <table className="products-table">

                <thead className="table-header">
                    <tr>
                        <th>ID Pedido</th>
                        <th>Cliente</th>
                        <th>Data</th>
                        <th className="order-total">Total</th>
                        <th className="order-status">Status</th>
                    </tr>
                </thead>

                <tbody>

                    {pedidosRecentes.map((pedido) => (

                        <tr key={pedido.id}>

                            <td>#{pedido.id}</td>

                            <td>{pedido.cliente}</td>

                            <td>
                                {new Date(pedido.data).toLocaleDateString('pt-BR')}
                            </td>

                            <td className="order-total">
                                R$ {pedido.total.toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2
                                })}
                            </td>

                            <td id="order-status">
                                <span className={`status-${pedido.status.toLowerCase()}`}>
                                    {pedido.status}
                                </span>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    )

}

export default RecentProducts