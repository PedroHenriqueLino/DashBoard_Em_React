import './style/Home.css';

// icons
import {
    IconChartLine,
    IconShoppingCart,
    IconPackage,
    IconUsers
} from '@tabler/icons-react';

// Componentes
import SalesChart from '../Components/SalesChart/SalesChart';
import SalesCategoryChart from '../Components/SalesCategoryChart/SalesCategoryChart';
import TopSellingProducts from '../Components/TopSellingProducts/TopSellingProducts';
import RecentProducts from '../Components/RecentProducts/RecentProducts';
// Context
import { useContext } from 'react';
import { DashboardContext } from '../Context/DashboardContext';

const HomePage = () => {

    const {
        vendas,
        indicadores,
        mesSelecionado,
        setMesSelecionado,
        darkMode
    } = useContext(DashboardContext);

    //fazer option funcionar
    const meses = [
        'Todos',
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ];

    // VENDAS / FATURAMENTO


    const vendasDoMes =
        mesSelecionado === 'Todos'
            ? vendas
            : vendas.filter(
                item => item.mes === mesSelecionado
            );

    const totalVendas = vendasDoMes.reduce(
        (total, item) => total + item.vendas,
        0
    );

    const totalFaturamento = vendasDoMes.reduce(
        (total, item) => total + item.faturamento,
        0
    );


    // INDICADORES

    const indicadoresDoMes =
        mesSelecionado === 'Todos'
            ? indicadores
            : indicadores.filter(
                item => item.mes === mesSelecionado
            );

    const totalPedidos = indicadoresDoMes.reduce(
        (total, item) => total + item.pedidos,
        0
    );

    const totalClientes = indicadoresDoMes.reduce(
        (total, item) => total + item.clientes,
        0
    );

    return (

        <div className={`home-content ${darkMode ? 'd' : 'light-theme'}`}>

            <div className="home-title">

                <div className="title-info">

                    <h1>Visão geral</h1>

                    <p>
                        Acompanhe o desempenho e os principais indicadores em um só lugar.
                    </p>

                </div>

                <div className="month-selector">

                    <label htmlFor="mes">
                        Período
                    </label>

                    <select
                        id="mes"
                        value={mesSelecionado}
                        onChange={(e) =>
                            setMesSelecionado(e.target.value)
                        }
                    >

                        {meses.map((mes) => (

                            <option
                                key={mes}
                                value={mes}
                            >
                                {mes}
                            </option>

                        ))}

                    </select>

                </div>

            </div>

            <div className="dashboard-cards">

                {/* FATURAMENTO */}

                <div className="stat-card">

                    <div className="card-icon">
                        <IconChartLine stroke={1.2} />
                    </div>

                    <div className="card-info">

                        <p>Faturamento</p>

                        <h2>
                            {totalFaturamento.toLocaleString(
                                'pt-BR',
                                {
                                    style: 'currency',
                                    currency: 'BRL'
                                }
                            )}
                        </h2>

                    </div>

                </div>

                {/* VENDAS */}

                <div className="stat-card">

                    <div className="card-icon">
                        <IconShoppingCart stroke={1.2} />
                    </div>

                    <div className="card-info">

                        <p>Vendas</p>

                        <h2>
                            {totalVendas.toLocaleString('pt-BR')}
                        </h2>

                    </div>

                </div>

                {/* PEDIDOS */}

                <div className="stat-card">

                    <div className="card-icon">
                        <IconPackage stroke={1.2} />
                    </div>

                    <div className="card-info">

                        <p>Pedidos</p>

                        <h2>
                            {totalPedidos.toLocaleString('pt-BR')}
                        </h2>

                    </div>

                </div>

                {/* CLIENTES */}

                <div className="stat-card">

                    <div className="card-icon">
                        <IconUsers stroke={1.2} />
                    </div>

                    <div className="card-info">

                        <p>Clientes</p>

                        <h2>
                            {totalClientes.toLocaleString('pt-BR')}
                        </h2>

                    </div>

                </div>

                {/* GRÁFICOS */}

                <div className="charts-row">

                    <div className="saleschart-card">
                        <SalesChart />
                    </div>

                    <div className="salescategory-card">
                        <SalesCategoryChart />
                    </div>

                </div>

                {/*Cards */}

                <div className='products-row'>
                    <div className="products-card">
                        <TopSellingProducts />
                    </div>

                    <div className="products-card">
                        <RecentProducts />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HomePage;