import { Link, useLocation } from "react-router-dom";

const Header = ({ user, setUser }) => {
   const location = useLocation()

   const checkPage = (btnName) => {
      if (location.pathname === btnName) {
         return 'clicked'
      } else {
         return 'not-clicked'
      }
   }

   const handleLogoutClick = () => {
      fetch("/logout", { method: "DELETE" }).then((r) => {
         if (r.ok) {
            setUser({})
         }
      });
   }

   return (
      <div className='header'>
         <Link to='/'>
            <div className="logo-container">
               <p className={checkPage('/')} style={{ fontSize: '1.5em' }}> 🪙Flypto </p>
            </div>
         </Link>
         <div className="nav-buttons">
            <Link to='/trade'>
               <p className={checkPage('/trade')}> Trade </p>
            </Link>
            <Link to='/crypto'>
               <p className={checkPage('/crypto')}> Crypto </p>
            </Link>
            {user.email && <Link to='/profile'>
               <p className={checkPage('/profile')}> Profile </p>
            </Link>}

            {user.email ?
               <Link to='/'>
                  <p onClick={handleLogoutClick}>Logout</p>
               </Link>
               :
               <Link to='/login'>
                  <p className={checkPage('/login')}> Login </p>
               </Link>}
         </div>
      </div>
   )
}
export default Header;