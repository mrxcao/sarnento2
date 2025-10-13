import React from 'react';
import Menu from '../../components/Menu/Menu';
function Comandos() {



      return (
      <React.Fragment>
        <Menu />
        <main className="content">

        <div className="container mt-5">

              
              
        <h1>Verify Your Role</h1>
    <p>To gain access to the role, please link your account with [Nome do Bot].</p>

    
    <a href="https://discord.com/oauth2/authorize?client_id=722913076344782858&scope=bot&permissions=549755289087">
        <button>Link Your Account</button>
    </a>

    <p>By linking your account, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.</p>


        </div>

            
        </main>
      </React.Fragment>
       
      );
};
    

export default Comandos;