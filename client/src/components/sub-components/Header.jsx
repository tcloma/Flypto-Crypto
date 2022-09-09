import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className='header'>
      <Link to='/'>
        <p> Nav1 </p>
      </Link>
      <Link to='/'>
        <p> Nav2 </p>
      </Link>
      <Link to='/'>
        <p> Nav3 </p>
      </Link>
      <Link to='/'>
        <p> Nav4 </p>
      </Link>
    </div>
  )
}
export default Header;