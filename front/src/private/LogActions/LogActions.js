import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu';
import { getLogActions } from '../../services/LogService';

function LogActions() {

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    const [logs, setLogs] = useState([]);
    const [filters, setFilters] = useState({
        guildId: '',
        userId: '',
        startDate: '',
        endDate: ''
    });
    const [status, setStatus] = useState({ type: '', mensagem: '' });

    useEffect(() => {
        const today = new Date();
        const start = new Date(today);
        start.setHours(0, 0, 0, 0);
        const end = new Date(today);
        end.setHours(23, 59, 59, 999);

        setFilters(prev => ({
            ...prev,
            startDate: formatDate(start),
            endDate: formatDate(end)
        }));
    }, []);

    const handleChange = (event) => {
        setFilters({ ...filters, [event.target.name]: event.target.value });
    }

    const searchLogs = () => {
        if (!filters.startDate || !filters.endDate) {
            setStatus({ type: 'warning', mensagem: 'Selecione um período (Data Início e Fim) para buscar.' });
            return;
        }

        const token = localStorage.getItem('token');
        setStatus({ type: '', mensagem: 'Carregando...' });

        getLogActions(token, filters)
            .then(data => {
                setLogs(data);
                setStatus({ type: '', mensagem: '' });
                if (data.length === 0) setStatus({ type: 'warning', mensagem: 'Nenhum log encontrado.' });
            })
            .catch(err => {
                setStatus({ type: 'error', mensagem: err.response ? err.response.data : err.message });
            });
    }

    return (
        <React.Fragment>
            <Menu />
            <main className="content">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
                    <div className="d-block mb-4 mb-md-0">
                        <h1 className="h4">Log de Ações</h1>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-12">
                        <div className="card card-body border-0 shadow mb-4">
                            <h2 className="h5 mb-4">Filtros</h2>
                            <div className="row">
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="guildId">Guild ID</label>
                                    <input className="form-control" id="guildId" name="guildId" type="text" placeholder="Guild ID" value={filters.guildId} onChange={handleChange} />
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="userId">User ID</label>
                                    <input className="form-control" id="userId" name="userId" type="text" placeholder="User ID" value={filters.userId} onChange={handleChange} />
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="startDate">Data Início</label>
                                    <input className="form-control" id="startDate" name="startDate" type="datetime-local" value={filters.startDate} onChange={handleChange} />
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="endDate">Data Fim</label>
                                    <input className="form-control" id="endDate" name="endDate" type="datetime-local" value={filters.endDate} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="mt-3">
                                <button className="btn btn-primary" type="button" onClick={searchLogs}>Filtrar</button>
                            </div>
                            {status.mensagem && <div className={`alert alert-${status.type === 'error' ? 'danger' : 'info'} mt-3`}>{status.mensagem}</div>}
                        </div>
                    </div>
                </div>

                <div className="card card-body border-0 shadow table-wrapper table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th className="border-gray-200">Data</th>
                                <th className="border-gray-200">Guild</th>
                                <th className="border-gray-200">User</th>
                                <th className="border-gray-200">Prompt</th>
                                <th className="border-gray-200">Resposta</th>
                                {/* <th className="border-gray-200">AI</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map(log => (
                                <tr key={log._id}>
                                    <td>{new Date(log.data).toLocaleString()}</td>
                                    <td>{log.guild ? log.guild.name : ''} <br/><small className="text-muted">{log.guild ? log.guild.id : ''}</small></td>
                                    <td>{log.user ? log.user.username : ''} <br/><small className="text-muted">{log.user ? log.user.id : ''}</small></td>
                                    <td style={{whiteSpace: 'pre-wrap', maxHeight: '100px', overflowY: 'auto', display: 'block'}}>{log.prompt}</td>
                                    <td style={{whiteSpace: 'pre-wrap', maxHeight: '100px', overflowY: 'auto', display: 'block'}}>{log.resposta}</td>
                                    {/* <td>{log.ai}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </React.Fragment>
    );
}

export default LogActions;
