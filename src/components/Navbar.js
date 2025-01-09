import dropdown from '../assets/dropdown.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Navbar = ()=>{
  const MozatoButton = ()=>(
    <button type="button" className="oval-button-1" style={{ fontWeight: "bold" }}>
      Mozato Com...
      <img src={dropdown} alt="image" className='dropd'/>
    </button>
  );
  const NotificationIcon = () => (
    <div className="notification-container">
      <div className="circle"> 
        <FontAwesomeIcon icon={faBell} className="bell-icon" />
      </div>
      <span className="notification-badge">3</span>
    </div>
  );

  return (
    <>
    <header className="nav-header">
        <h1 className="title">Products</h1>
        <div className="user-profile">
          <MozatoButton />
          <div style={{ margin: "0 -0.5rem" }} ></div>
          <NotificationIcon />
          <button type="button" className="oval-button">
            <span className="user-initial">J</span>
            <span className="user-name">
              Jeevan Ku...
              <img src={dropdown} className="dropd" alt="" />
            </span>
          </button>
        </div>
      </header>
   <header >
  <div className="nav-section">
    <h3 style={{ marginLeft: "1rem" }}>Products</h3>
    </div>
    <div>
        <hr id="uline" />
    </div>  
   </header>
    </>
  );
};
export default Navbar;