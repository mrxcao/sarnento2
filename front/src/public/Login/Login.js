import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import { doLogin } from '../../services/AuthService';
function Login() {

    const history = useHistory();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function onChangeInput(event) {        
        if (event.target.id === 'login')
            setLogin(event.target.value);
        else
            setPassword(event.target.value);        
    }

    function onSubmit(event) {
        event.preventDefault();        
        doLogin(login, password)
            .then(isValid => {
                if (isValid) {
                    console.log("isValid", isValid);
                    localStorage.setItem('token', isValid.token)    
                    localStorage.setItem('user', isValid.user)  
                    history.push('/dashboard')
                }
            })
            .catch(err => {
                console.log('Login error',err);
                setError('Login ou senha inváldo')
                
            })
            
        /*
        doLogin(login, password)
            .then(response => {
                // localStorage.setItem('token', response.token);
                history.push('/settings');
            })
            .catch(err => {
                console.error(err);
                setError(`Invalid user and/or password!`);
            })
            */
    }

    return (
        <React.Fragment>
        <Menu />
        

        <main>
            <section className="vh-lg-100 mt-5 mt-lg-0 bg-soft d-flex align-items-center">
                <div className="container">                
                    <div className="col-12 d-flex align-items-center justify-content-center">
                         <div className="bg-white shadow border-100 rounded border-light p-4 p-lg-4 w-100 fmxw-500">
                            <div className="row">
                                <div className="col-md-4 loginLeft" >
                                    <div className="text-center">
                                        <img src="/img/favicon/favicon.png" alt="CryptoSniffer" width={64} />
                                    </div>                            
                                    <div className="text-center text-md-center mb-4 mt-md-0">
                                        <h1 className="mb-0 h3 alertTitle">LOGIN</h1>
                                    </div>
                                </div>
                                <div className="col-md-8">

                                    <form action="#" className="mt-4" onSubmit={onSubmit}>
                                        <div className="form-group mb-4">
                                            <label htmlFor="login">Login</label>
                                            <div className="input-group">                                         
                                                <input type="text" className="form-control" placeholder="" id="login" autoFocus required onChange={onChangeInput} />
                                            </div>

                                            <div className="form-group mb-4">
                                                <label htmlFor="password">Senha</label>
                                                <div className="input-group">
                                                    <input type="password" placeholder="" className="form-control" id="password" required onChange={onChangeInput} />
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-top mb-4">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="remember" />
                                                    <label className="form-check-label mb-0" htmlFor="remember">
                                                        Lembrar
                                                    </label>
                                                </div>
                                                <div><Link to="/forgot-password" className="small text-right">Perdeu?</Link></div>
                                            </div>
                                        </div>
                                        
                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-gray-800">LOGAR</button>
                                        </div>
                                        
                                            {
                                              //  console.log('error',error)
                                              error ?  <div className="alert alert-danger mt-2">{error}</div>                                                    : <React.Fragment></React.Fragment>
                                            }
                                        
                                        
                                    </form>


                                </div>

                            </div>
                            
                            
                        </div>                         
                    </div>
                    <p className="text-center">
                        <Link to="/" className="d-flex align-items-center justify-content-center"><svg className="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                            voltar para a home
                        </Link>
                    </p>
                </div>
            </section>
        </main>
        </React.Fragment>
    );
}

export default Login;