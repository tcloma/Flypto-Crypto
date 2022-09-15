import { Link } from "react-router-dom";

const Header = ({ user, handleLogoutClick }) => {


  // const handleLogoutClick = () => {
  //   fetch('/logout', {
  //     method: 'DELETE',
  //   }).then(() => onLogout())
  //   console.log(onLogout())
  // }

  console.log(user)

  return (
    <div className='header'>
      <Link to='/'>
        <div className="logo-container">
          <p style={{ fontSize: '2em' }}> 🪙 </p>
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

      {user ?
          <p onClick={handleLogoutClick}>Logout</p>
        :
        <Link to='/login'>
          <p> Login </p>
        </Link>}
    </div>
  )
}
export default Header;