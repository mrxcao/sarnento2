import React, { useEffect, useRef, useState } from 'react';
import Menu from '../../components/Menu/Menu';
import { getStatus } from '../../services/SettingsService';

function Dashboard() {

    const [status, setStatus] = useState({
        STATUS: '',
        uptime: '',
        Users: 0,
        Servers: 0,
        lastUptime: 'null'
    })

    const inputSTATUS = useRef('');

    useEffect(()=>{
        const token = localStorage.getItem('token');
       
        getStatus(token).then(resp=> {
            setStatus(resp)
           // document.getElementById('email').removeAttribute('readOnly');
          }).catch(err=> {
            if (err.response && err.response.status === 401)
                    return history.push('admin/')
            setError(err)
          })

    }, [])

    return (
        <React.Fragment>      
        <Menu />
            <main className="content">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                        <h1 className="h4">Dashboard</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <div className="card card-body border-0 shadow d-flex ">
                            <h4>API</h4> 
                            <div className="row">
                            <div className="col-1 align-items-left">                        
                                <span className={`status-indicator ${
                                        status.STATUS === 'ok' ? 'status-ok' : 'status-not-ok'
                                    }`} ></span>                    
                            </div>
                            <div className="col-11">                        
                                <span >{status.uptime}</span>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="card card-body border-0 shadow  d-flex justify-content-center align-items-center">
                            <div className="text-center">
                                <h4>Servers</h4> {status.Servers}
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="card card-body border-0 shadow d-flex justify-content-center align-items-center">
                            <div className="text-center">
                                <h4>Users</h4> {status.Users}
                            </div>
                        </div>
                    </div>                    
                </div>
            </main>
        </React.Fragment>
    );
}

export default Dashboard;