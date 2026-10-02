import './ErrorPage.css';

import { IconAlertTriangle, IconArrowLeft } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

//Context
import { useContext } from 'react';
import { DashboardContext } from '../../Context/DashboardContext'
function ErrorPage() {

    //Tema dark e light
    const { darkMode } = useContext(DashboardContext)

    return (

        <div className={`error-page ${darkMode ? 'light-theme' : ''}`}>

            <div className="error-content">

                <IconAlertTriangle className="error-icon" />

                <span className="error-code">
                    404
                </span>

                <h1>
                    Página não encontrada
                </h1>

                <p>
                    A página que você está procurando não existe
                    ou foi movida para outro endereço.
                </p>

                <Link to="/" className="error-button">
                    <IconArrowLeft stroke={1.5} />
                    Voltar ao Dashboard
                </Link>

            </div>

        </div>

    );
}

export default ErrorPage;