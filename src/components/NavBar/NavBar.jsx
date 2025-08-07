import { Link } from 'react-router'

const NavBar = (props) => {



  return (
    <nav>
      {props.user ? (
        <ul>
          <li><Link to="/"> Home </Link></li>
          <li><Link to="/hoots">Hoots</Link></li>
          <li><Link to="/hoots/new">NEW HOOT</Link></li>
          <li>Welcome {props.user.username}</li>
          <li><Link to='/' onClick={props.handleSignOut}>Sign Out</Link></li>
        </ul>
        ) : (
          <ul>
            <li><Link to="/sign-up">Sign Up</Link></li>
            <li><Link to="/sign-in">Sign In</Link></li>
          </ul>
          ) }
    </nav>
  )
}

export default NavBar 