import { Link } from "react-router-dom";

const Header = ({ user, setUser}) => {
  //   function handleLogoutClick() {
  //   fetch("/logout", { method: "DELETE" }).then((r) => {
  //     if (r.ok) {
  //       setUser(null);
  //     }
  //   });
  // }
  return (
    <div className='header'>
      <Link to='/'>
        <div className="logo-container">
          <p style={{fontSize: '2em'}}> 🪙 </p>
        </div>
      </Link>
      <div className="nav-buttons">
        <Link to='/trade'>
          <p> Trade </p>
        </Link>
        <Link to='/crypto'>
          <p> Crypto </p>
        </Link>
        <Link to='/profile'>
          <p> Profile </p>
        </Link>
      </div>

      {/* <p> 
        {
          !user :
           <Link to='/logout' onClick={handleLogoutClick}> Logout </Link> 
           ? <Link to='/login'> Login </Link>
        }
      </p> */}
      {/* // <Link to='/login'>
      //   <p> Login  </p>
      // </Link> */}
    </div>
  )
}
export default Header;