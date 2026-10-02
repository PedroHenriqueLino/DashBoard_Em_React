import './SalesChart.css';

// icons
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Area
} from 'recharts';

import { useContext } from 'react';

import { DashboardContext } from '../../Context/DashboardContext';

const SalesChart = () => {

    const { vendas, darkMode } = useContext(DashboardContext);
    console.log('VENDAS:', vendas);
    return (

        <div className={`saleschart-content${darkMode ? '' : 'light-theme'}`}>

            <div className="saleschart-title">
                Vendas ao longo do tempo

                <div className={`time${darkMode ? '' : ' light-theme'}`}>
                    Jan - Dez 2026
                </div>

            </div>

            <div className="saleschart">

                <ResponsiveContainer width="100%" height={280}>

                    <LineChart
                        data={vendas}
                        margin={{
                            top: 20,
                            right: 20,
                            left: 10,
                            bottom: 10
                        }}
                    >

                        <CartesianGrid
                            stroke="rgba(255, 255, 255, 0.06)"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="mes"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#8b95a7', fontSize: 12 }}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#8b95a7', fontSize: 12 }}
                            tickFormatter={(value) => `R$ ${value / 1000}k`}
                        />



                        <Tooltip
                            contentStyle={{
                                background: '#111827',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '10px',
                                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)'
                            }}
                            labelStyle={{
                                color: '#fff',
                                marginBottom: '5px'
                            }}
                            formatter={(value) => [
                                `R$ ${Number(value).toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2
                                })}`,
                                'Faturamento'
                            ]}
                        />

                        <Line
                            type="monotone"
                            dataKey="faturamento"
                            stroke="#03e0fa"
                            strokeWidth={3}
                            dot={{
                                r: 4,
                                fill: '#03e0fa',
                                stroke: '#0b0e15',
                                strokeWidth: 2
                            }}
                            activeDot={{
                                r: 7,
                                fill: '#03e0fa',
                                stroke: '#fff',
                                strokeWidth: 2
                            }}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
};

export default SalesChart;