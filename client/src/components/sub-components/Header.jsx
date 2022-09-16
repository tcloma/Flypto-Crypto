import { Link } from "react-router-dom";

const Header = ({ user, setUser }) => {


  // const handleLogoutClick = () => {
  //   fetch('/logout', {
  //     method: 'DELETE',
  //   }).then(() => onLogout())
  //   console.log(onLogout())
  // }

  const handleLogoutClick = () => {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null)
      }
    });
  }

  console.log('Current User: ', { name: user?.name, email: user?.email, funds: user?.funds })

  return (
    <div className='header'>
      <Link to='/'>
        <div className="logo-container">
          <p style={{ fontSize: '1.5em' }}> 🪙Flypto </p>
        </div>
      </Link>
      <div className="nav-buttons">
        <Link to='/trade'>
          <p> Trade </p>
        </Link>
        <Link to='/crypto'>
          <p> Crypto </p>
        </Link>
        {user && <Link to='/profile'>
          <p> Profile </p>
        </Link>}


        {user ?
          <Link to='/'>
            <p onClick={handleLogoutClick}>Logout</p>
          </Link>
          :
          <Link to='/login'>
            <p> Login </p>
          </Link>}
      </div>
    </div>
  )
}
export default Header;