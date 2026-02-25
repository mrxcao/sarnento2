import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu';
import { getTopGuildsActions, getTopGuildsMessages, getTopUsersActions, getTopUsersMessages } from '../../services/DashboardService';
import { getStatus } from '../../services/SettingsService';

function Dashboard() {

    const [status, setStatus] = useState({
        STATUS: '',
        uptime: '',
        Users: 0,
        Servers: 0,
        lastUptime: 'null'
    })

    const [topGuildsMsgs, setTopGuildsMsgs] = useState([]);
    const [topUsersMsgs, setTopUsersMsgs] = useState([]);
    const [topGuildsActions, setTopGuildsActions] = useState([]);
    const [topUsersActions, setTopUsersActions] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        getStatus(token).then(resp => {
            setStatus(resp)
        }).catch(err => {
            console.error(err);
        });

        getTopGuildsMessages(token).then(setTopGuildsMsgs).catch(console.error);
        getTopUsersMessages(token).then(setTopUsersMsgs).catch(console.error);
        getTopGuildsActions(token).then(setTopGuildsActions).catch(console.error);
        getTopUsersActions(token).then(setTopUsersActions).catch(console.error);

    }, [])

    const TopList = ({ title, data, type }) => (
        <div className="col-12 col-xl-6 mb-4">
            <div className="card card-body border-0 shadow">
                <h2 className="h5 mb-4">{title}</h2>
                <div className="table-responsive">
                    <table className="table table-centered table-nowrap mb-0 rounded">
                        <thead className="thead-light">
                            <tr>
                                <th className="border-0 rounded-start">Nome</th>
                                <th className="border-0 rounded-end">Registros</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td className="border-0">
                                        {type === 'guild' ? (item.guild?.name || item.name || item._id) : (item.user?.username || item.name || item._id)}
                                    </td>
                                    <td className="border-0 font-weight-bold">
                                        {item.count}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    return (
        <React.Fragment>
            <Menu />
            <main className="content">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                        <h1 className="h4">Dashboard</h1>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-8">
                        <div className="card card-body border-0 shadow d-flex ">
                            <h4>API</h4>
                            <div className="row">
                                <div className="col-1 align-items-left">
                                    <span className={`status-indicator ${status.STATUS === 'ok' ? 'status-ok' : 'status-not-ok'
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

                <div className="row">
                    <TopList title="Top 10 Servidores (Mensagens - 7 dias)" data={topGuildsMsgs} type="guild" />
                    <TopList title="Top 10 Usuários (Mensagens - 7 dias)" data={topUsersMsgs} type="user" />
                </div>
                <div className="row">
                    <TopList title="Top 10 Servidores (Ações - 7 dias)" data={topGuildsActions} type="guild" />
                    <TopList title="Top 10 Usuários (Ações - 7 dias)" data={topUsersActions} type="user" />
                </div>
            </main>
        </React.Fragment>
    );
}

export default Dashboard;
