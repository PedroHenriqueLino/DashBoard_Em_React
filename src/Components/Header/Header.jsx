import './Header.css';
import { useState } from 'react';
//icons
import {
    IconMenu2,
    IconBell,
    IconMoonStars, IconMoonOff,
    IconDownload
} from '@tabler/icons-react';

//Context
import { useContext } from 'react';
import { DashboardContext } from '../../Context/DashboardContext'

//PDF
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Header = ({ onToggleNavBar }) => {

    //Tema dark e light
    const {
        darkMode,
        setDarkMode,
        vendas,
        categorias,
        produtos,
        clientes,
        pedidos
    } = useContext(DashboardContext)

    function alterarTema() {
        setDarkMode(!darkMode);
    }
    //Export
    function exportarPDF() {
        const doc = new jsPDF();

        const dataAtual = new Date();

        const data = dataAtual.toLocaleDateString('pt-BR');
        const hora = dataAtual.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });

        // =========================
        // DADOS DO DASHBOARD
        // =========================

        const faturamento = vendas.reduce(
            (total, venda) => total + venda.faturamento,
            0
        );

        const totalVendas = vendas.reduce(
            (total, venda) => total + venda.vendas,
            0
        );

        // =========================
        // CABEÇALHO
        // =========================

        doc.setFillColor(23, 26, 33);
        doc.rect(0, 0, 210, 38, 'F');

        // Logo
        doc.setTextColor(3, 224, 250);
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text('DASHBOARD', 15, 17);

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Relatório de desempenho', 15, 25);

        doc.setTextColor(180, 180, 180);
        doc.setFontSize(9);
        doc.text(`Gerado em ${data} às ${hora}`, 195, 18, {
            align: 'right'
        });

        // Linha decorativa
        doc.setDrawColor(3, 224, 250);
        doc.setLineWidth(0.8);
        doc.line(15, 32, 195, 32);

        // =========================
        // TÍTULO
        // =========================

        doc.setTextColor(20, 25, 35);
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('Visão geral', 15, 52);

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 110, 120);
        doc.text(
            'Resumo geral dos principais indicadores do dashboard.',
            15,
            59
        );

        // =========================
        // CARDS DE RESUMO
        // =========================

        const cards = [
            {
                titulo: 'Faturamento',
                valor: `R$ ${faturamento.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2
                })}`
            },
            {
                titulo: 'Vendas',
                valor: totalVendas.toLocaleString('pt-BR')
            },
            {
                titulo: 'Produtos',
                valor: produtos.length.toString()
            },
            {
                titulo: 'Clientes',
                valor: clientes.length.toString()
            }
        ];

        let x = 15;

        cards.forEach((card) => {
            doc.setFillColor(248, 250, 252);
            doc.setDrawColor(225, 230, 235);
            doc.roundedRect(x, 68, 42, 25, 3, 3, 'FD');

            doc.setFontSize(8);
            doc.setTextColor(100, 110, 120);
            doc.text(card.titulo, x + 5, 76);

            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(20, 25, 35);
            doc.text(card.valor, x + 5, 86);

            x += 45;
        });

        // =========================
        // VENDAS POR MÊS
        // =========================

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(20, 25, 35);
        doc.text('Vendas ao longo do tempo', 15, 108);

        autoTable(doc, {
            startY: 114,
            head: [['Mês', 'Vendas', 'Faturamento']],
            body: vendas.map((venda) => [
                venda.mes,
                venda.vendas,
                `R$ ${venda.faturamento.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2
                })}`
            ]),
            theme: 'grid',
            headStyles: {
                fillColor: [23, 26, 33],
                textColor: [255, 255, 255],
                fontStyle: 'bold'
            },
            bodyStyles: {
                textColor: [60, 70, 80]
            },
            alternateRowStyles: {
                fillColor: [248, 250, 252]
            },
            styles: {
                fontSize: 9,
                cellPadding: 4
            }
        });

        // =========================
        // CATEGORIAS
        // =========================

        let posY = doc.lastAutoTable.finalY + 15;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(20, 25, 35);
        doc.text('Vendas por categoria', 15, posY);

        autoTable(doc, {
            startY: posY + 6,
            head: [['Categoria', 'Vendas', 'Participação']],
            body: categorias.map((categoria) => {
                const total = categorias.reduce(
                    (acc, item) => acc + item.vendas,
                    0
                );

                const porcentagem =
                    total > 0
                        ? ((categoria.vendas / total) * 100).toFixed(1)
                        : 0;

                return [
                    categoria.nome,
                    categoria.vendas,
                    `${porcentagem}%`
                ];
            }),
            theme: 'grid',
            headStyles: {
                fillColor: [139, 92, 246],
                textColor: [255, 255, 255]
            },
            styles: {
                fontSize: 9,
                cellPadding: 4
            },
            alternateRowStyles: {
                fillColor: [248, 250, 252]
            }
        });

        // =========================
        // NOVA PÁGINA
        // =========================

        doc.addPage();

        doc.setFillColor(23, 26, 33);
        doc.rect(0, 0, 210, 25, 'F');

        doc.setTextColor(3, 224, 250);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('RELATÓRIO DE PRODUTOS', 15, 16);

        // =========================
        // PRODUTOS
        // =========================

        doc.setTextColor(20, 25, 35);
        doc.setFontSize(14);
        doc.text('Produtos', 15, 38);

        autoTable(doc, {
            startY: 44,
            head: [['Produto', 'Categoria', 'Preço', 'Vendas']],
            body: produtos.map((produto) => [
                produto.nome || produto.title || '-',
                produto.categoria || produto.category || '-',
                `R$ ${Number(
                    produto.preco ?? produto.price ?? 0
                ).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2
                })}`,
                produto.vendas ?? 0
            ]),
            theme: 'grid',
            headStyles: {
                fillColor: [23, 26, 33],
                textColor: [255, 255, 255]
            },
            styles: {
                fontSize: 8,
                cellPadding: 4
            },
            alternateRowStyles: {
                fillColor: [248, 250, 252]
            }
        });

        // =========================
        // CLIENTES
        // =========================

        posY = doc.lastAutoTable.finalY + 15;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(20, 25, 35);
        doc.text('Clientes', 15, posY);

        autoTable(doc, {
            startY: posY + 6,
            head: [['Nome', 'E-mail', 'Pedidos', 'Total gasto']],
            body: clientes.map((cliente) => [
                cliente.nome,
                cliente.email,
                cliente.pedidos,
                `R$ ${Number(cliente.totalGasto).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2
                })}`
            ]),
            theme: 'grid',
            headStyles: {
                fillColor: [3, 224, 250],
                textColor: [20, 25, 35]
            },
            styles: {
                fontSize: 8,
                cellPadding: 4
            },
            alternateRowStyles: {
                fillColor: [248, 250, 252]
            }
        });

        // =========================
        // PEDIDOS
        // =========================

        doc.addPage();

        doc.setFillColor(23, 26, 33);
        doc.rect(0, 0, 210, 25, 'F');

        doc.setTextColor(3, 224, 250);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('RELATÓRIO DE PEDIDOS', 15, 16);

        autoTable(doc, {
            startY: 35,
            head: [
                ['Cliente', 'Data', 'Produtos', 'Total', 'Status']
            ],
            body: pedidos.map((pedido) => [
                pedido.cliente,
                new Date(pedido.data).toLocaleDateString('pt-BR'),
                pedido.produtos?.length ?? 0,
                `R$ ${Number(pedido.total).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2
                })}`,
                pedido.status
            ]),
            theme: 'grid',
            headStyles: {
                fillColor: [23, 26, 33],
                textColor: [255, 255, 255]
            },
            styles: {
                fontSize: 8,
                cellPadding: 4
            },
            alternateRowStyles: {
                fillColor: [248, 250, 252]
            }
        });

        // =========================
        // RODAPÉ
        // =========================

        const totalPaginas = doc.internal.getNumberOfPages();

        for (let pagina = 1; pagina <= totalPaginas; pagina++) {
            doc.setPage(pagina);

            doc.setDrawColor(225, 230, 235);
            doc.line(15, 285, 195, 285);

            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(120, 130, 140);

            doc.text(
                'Dashboard • Relatório gerado automaticamente',
                15,
                292
            );

            doc.text(
                `Página ${pagina} de ${totalPaginas}`,
                195,
                292,
                { align: 'right' }
            );
        }

        // =========================
        // DOWNLOAD
        // =========================

        doc.save('relatorio-dashboard-2026.pdf');
    }

    return (
        <div className={`header-content ${darkMode ? '' : 'light-theme'}`}>
            <div className="header-title">
                < IconMenu2 onClick={onToggleNavBar} />
                <h2>Dashboard</h2>
            </div>

            <div className="header-menu">
                <button id="export-btn" onClick={exportarPDF}>
                    <IconDownload />
                    <span>Exporta</span>
                </button>

                <div className="menu-icon">
                    <  IconBell stroke={1} />
                    <span></span>
                </div>

                <button className="btn-theme" onClick={alterarTema}>
                    {darkMode ? <IconMoonStars stroke={1} className="theme-icon" /> : <IconMoonOff stroke={1} className="theme-icon" />}
                </button>

                <div className="menu-user">
                    <img
                        src={`${import.meta.env.BASE_URL}user.jpg`}
                        style={{ width: '40px' }}
                        alt="Usuário"
                    />
                    <p>Pedro</p>
                </div>

            </div>
        </div>
    )
}

export default Header