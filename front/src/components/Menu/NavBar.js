import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { doLogout } from '../../services/AuthService';
 


function NavBar() {
  const history = useHistory();

  function onLogoutClick(event) {
    doLogout()
    localStorage.removeItem('token')
    history.push('/login')
  //  alert(event)
  }

 let user ={}
 if (localStorage.getItem("token")) {
    try {
      const base64Payload = localStorage.getItem("token").split('.')[1]; // Parte do payload
      const payload = JSON.parse(atob(base64Payload)); // Decodifica e converte para objeto
      user = payload      
    } catch (error) {
      user= {}
    }
 }

return (
      
  <React.Fragment>   
  <header>
    <nav className="navbar">      
      <Link className="navbar-brand me-lg-5" to="/">
        <img className="navbar-brand-light" src="img/favicon/favicon.png" alt="CryptoDog" />
        <span className="appTitle">Sarnento</span>
      </Link>
      <div className="navbar-links">
        <Link className="navbar-brand" to="/comandos">Comandos</Link>
        <Link className="navbar-brand" to="/comofunciona">Como funciona?</Link>
        <Link className="navbar-brand" to="/sourcecode">Código Fonte</Link>
        <Link className="navbar-brand" to="/role">Role</Link>
        <Link className="navbar-brand" to="/privacypolicy">Privacy Policy</Link>
        <Link className="navbar-brand" to="/termsofservice">Terms Of Service</Link>
        
        
      </div>
      <div className="auth-buttons">
        {localStorage.getItem("token") ? (
          <span>            
            <img className="navbar-avatar" src={user.avatar} alt={user.username} />
            
          </span>
        ) : (
          <Link to="/login">        
            <button className="login-button">Login</button>        
          </Link>
        )}
      </div>
    </nav>  
  </header>         
</React.Fragment>
    );
}

export default NavBar;