import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';


const NotFound = () => {
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
                                        <img className="img-fluid w-50" src="/img/404.svg" alt="404 not found" />
                                    </div>                            
                                    <div className="text-center text-md-center mb-4 mt-md-0">
                                        <h1 className="mb-0 h3 alertTitle">NOT FOUND</h1>                                        
                                    </div>
                                </div>
                                <div className="col-md-8 d-flex align-items-center">
                                    <p className="lead my-4">Este endereço não existe.</p>                                       
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
  };

  export default NotFound;