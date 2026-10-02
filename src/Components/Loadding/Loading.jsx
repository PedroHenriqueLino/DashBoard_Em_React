import './Loading.css';

function Loading() {
    return (
        <div className="loading-page">
            <div className="loading-content">

                <div className="loading-circle">
                    <div className="loading-circle-inner"></div>
                </div>

                <h1>Dashboard</h1>

                <p>Carregando dados...</p>

                <div className="loading-bar">
                    <span></span>
                </div>

            </div>
        </div>
    );
}

export default Loading;