import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DashboardContext = createContext();

const API_URL = "https://dashboard-em-react.onrender.com";

export const DashboardContextProvider = ({ children }) => {

    const [vendas, setVendas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [pedidos, setPedidos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [estoque, setEstoque] = useState([]);
    const [indicadores, setIndicadores] = useState([]);

    const [mesSelecionado, setMesSelecionado] = useState("Todos");

    const [loading, setLoading] = useState(true);
    const [loaded, setLoaded] = useState(0);

    // GET VENDAS
    useEffect(() => {
        const getVendas = async () => {
            try {
                const res = await axios.get(`${API_URL}/vendas`);
                setVendas(res.data);
                setLoaded((prev) => prev + 1);
            } catch (error) {
                console.log(error);
            }
        };

        getVendas();
    }, []);

    // GET CATEGORIAS
    useEffect(() => {
        const getCategorias = async () => {
            try {
                const res = await axios.get(`${API_URL}/categorias`);
                setCategorias(res.data);
                setLoaded((prev) => prev + 1);
            } catch (error) {
                console.log(error);
            }
        };

        getCategorias();
    }, []);

    // GET PRODUTOS
    useEffect(() => {
        const getProdutos = async () => {
            try {
                const res = await axios.get(`${API_URL}/produtos`);
                setProdutos(res.data);
                setLoaded((prev) => prev + 1);
            } catch (error) {
                console.log(error);
            }
        };

        getProdutos();
    }, []);

    // GET PEDIDOS
    useEffect(() => {
        const getPedidos = async () => {
            try {
                const res = await axios.get(`${API_URL}/pedidos`);
                setPedidos(res.data);
                setLoaded((prev) => prev + 1);
            } catch (error) {
                console.log(error);
            }
        };

        getPedidos();
    }, []);

    // GET CLIENTES
    useEffect(() => {
        const getClientes = async () => {
            try {
                const res = await axios.get(`${API_URL}/clientes`);
                setClientes(res.data);
                setLoaded((prev) => prev + 1);
            } catch (error) {
                console.log(error);
            }
        };

        getClientes();
    }, []);

    // GET ESTOQUE
    useEffect(() => {
        const getEstoque = async () => {
            try {
                const res = await axios.get(`${API_URL}/estoque`);
                setEstoque(res.data);
                setLoaded((prev) => prev + 1);
            } catch (error) {
                console.log(error);
            }
        };

        getEstoque();
    }, []);

    // GET INDICADORES
    useEffect(() => {
        const getIndicadores = async () => {
            try {
                const res = await axios.get(`${API_URL}/indicadores`);
                setIndicadores(res.data);
                setLoaded((prev) => prev + 1);
            } catch (error) {
                console.log(error);
            }
        };

        getIndicadores();
    }, []);

    // LOADING
    useEffect(() => {
        if (loaded >= 7) {
            setLoading(false);
        }
    }, [loaded]);

    // Tema dark e light
    const [darkMode, setDarkMode] = useState(true);

    return (
        <DashboardContext.Provider
            value={{
                vendas,
                categorias,
                produtos,
                pedidos,
                clientes,
                estoque,
                indicadores,
                loading,
                mesSelecionado,
                setMesSelecionado,
                darkMode,
                setDarkMode
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};