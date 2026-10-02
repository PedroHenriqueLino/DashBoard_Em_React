import './SalesCategoryChart.css';

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip
} from 'recharts';

import { useContext } from 'react';

import { DashboardContext } from '../../Context/DashboardContext';

const COLORS = [
    '#03e0fa',
    '#8B5CF6',
    '#22c55e',
    '#f59e0b',
    '#ef4444'
];

const SalesCategoryChart = () => {

    const {
        categorias,
        mesSelecionado,
        darkMode
    } = useContext(DashboardContext);

    // Dados das categorias conforme o período selecionado
    const categoriasDoMes = categorias.map((categoria) => {

        if (mesSelecionado === 'Todos') {

            return {
                ...categoria,
                vendas: categoria.vendas
            };

        }

        return {
            ...categoria,
            vendas: categoria.vendasMensais?.[mesSelecionado]?.vendas ?? 0
        };

    });

    // Total de vendas das categorias
    const totalVendas = categoriasDoMes.reduce(
        (total, categoria) => total + categoria.vendas,
        0
    );

    return (
        <div className={`sales-category-card ${darkMode ? '' : 'light-theme'}`}>

            Vendas por categoria

            <div className="sales-category-content">

                <div className="sales-category-chart">

                    <ResponsiveContainer width="100%" height={280}>

                        <PieChart>

                            <defs>

                                {COLORS.map((color, index) => (

                                    <filter
                                        key={index}
                                        id={`category-glow-${index}`}
                                        x="-100%"
                                        y="-100%"
                                        width="300%"
                                        height="300%"
                                    >

                                        <feDropShadow
                                            dx="0"
                                            dy="0"
                                            stdDeviation="5"
                                            floodColor={color}
                                            floodOpacity="0.75"
                                        />

                                    </filter>

                                ))}

                            </defs>

                            <Pie
                                data={categoriasDoMes}
                                dataKey="vendas"
                                nameKey="nome"
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={105}
                                paddingAngle={3}
                                cornerRadius={6}
                                stroke="none"
                            >

                                {categoriasDoMes.map((categoria, index) => {

                                    const color =
                                        COLORS[index % COLORS.length];

                                    return (

                                        <Cell
                                            key={categoria.id}
                                            fill={color}
                                            filter={`url(#category-glow-${index % COLORS.length})`}
                                        />

                                    );

                                })}

                            </Pie>

                            <Tooltip
                                contentStyle={{
                                    background: '#111827',
                                    border: '1px solid rgba(255, 255, 255, 0.08)',
                                    borderRadius: '10px',
                                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)'
                                }}
                                labelStyle={{
                                    color: '#ffffff'
                                }}
                                formatter={(value, name) => [
                                    `${value} vendas`,
                                    name
                                ]}
                            />

                        </PieChart>

                    </ResponsiveContainer>

                    <div className="sales-category-center">

                        <strong>
                            {totalVendas.toLocaleString('pt-BR')}
                        </strong>

                        <span>Vendas</span>

                    </div>

                </div>

                <div className="sales-category-list">

                    {categoriasDoMes.map((categoria, index) => {

                        const porcentagem =
                            totalVendas > 0
                                ? (
                                    (categoria.vendas / totalVendas) * 100
                                ).toFixed(0)
                                : 0;

                        const color =
                            COLORS[index % COLORS.length];

                        return (

                            <div
                                className="sales-category-item"
                                key={categoria.id}
                            >

                                <div className="sales-category-name">

                                    <span
                                        className="category-dot"
                                        style={{
                                            backgroundColor: color,
                                            borderColor: color,
                                            boxShadow: `0 0 8px ${color}`
                                        }}
                                    />

                                    <span>
                                        {categoria.nome}
                                    </span>

                                </div>

                                <strong>
                                    {porcentagem}%
                                </strong>

                            </div>

                        );

                    })}

                </div>

            </div>

        </div>
    );
};

export default SalesCategoryChart;