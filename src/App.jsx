import './App.css'
import { useState } from 'react';
//Components
import NavBar from './Components/NavBar/NavBar'
import Header from './Components/Header/Header'
import Loading from './Components/Loadding/Loading';

//img
import background from '/backgroundImg.jpg';
import { Outlet } from 'react-router-dom';

//Context
import { useContext } from 'react';
import { DashboardContext } from './Context/DashboardContext';

function App() {
  const [showNavBar, setShowNavBar] = useState(false);

  function toggleNavBar() {
    setShowNavBar(!showNavBar);
  }

  //Loading
  const { loading } = useContext(DashboardContext);

  return (
    <>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div
          className="dashboard-layout"

        >
          <div className={`navbar-wrapper ${showNavBar ? "" : "hidden"}`}>
            <NavBar />
          </div>

          <div className="dashboard-main">
            <Header onToggleNavBar={toggleNavBar} />

            <main>
              <Outlet />
            </main>
          </div>
        </div>
      )}
    </>
  )
}

export default App
