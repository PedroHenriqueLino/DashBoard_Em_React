import './TopSellingProducts.css';


import { useContext } from 'react';

import { DashboardContext } from '../../Context/DashboardContext';

const TopSellingProducts = () => {

    const { produtos, mesSelecionado } = useContext(DashboardContext);

    //Produtos mais vendidos
    const topProducts = [...produtos]
        .sort((a, b) => {

            const vendasA = mesSelecionado === 'Todos'
                ? a.vendidos
                : a.vendasMensais[mesSelecionado];

            const vendasB = mesSelecionado === 'Todos'
                ? b.vendidos
                : b.vendasMensais[mesSelecionado];

            return vendasB - vendasA;
        })
        .slice(0, 5)
        .sort((a, b) => b.preco - a.preco);

    return (
        <div className='TopSellingProducts-content'>
            <div className="TopSellingProducts-title">
                Produtos mais vendidos
            </div>

            <table className="products-table">
                <thead className="table-header">
                    <tr>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Preço</th>
                        <th>Vendas</th>
                    </tr>
                </thead>

                <tbody>
                    {topProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.nome}</td>
                            <td>{product.categoria}</td>
                            <td>R$ {product.preco}</td>
                            <td>
                                {mesSelecionado === 'Todos'
                                    ? product.vendidos
                                    : product.vendasMensais[mesSelecionado]
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TopSellingProducts