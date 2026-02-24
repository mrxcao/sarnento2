import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import { getGuilds } from '../../services/guildsService';

function Guilds() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const loadData = () => {
        const token = localStorage.getItem('token');
        const filters = {};
        if (search) {
             if (/^\d+$/.test(search)) {
                 filters.id = search;
             } else {
                 filters.name = search;
             }
        }

        getGuilds(filters, token)
            .then(data => setData(data))
            .catch(err => {
                if (err.response && err.response.status === 401) return history.push('/');
                console.error(err);
                setError('Erro ao carregar servidores.');
            });
    };

    useEffect(() => {
        // loadData();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        loadData();
    }

    return (
        <React.Fragment>      
        <Menu />
            <main className="content">
                <div className="row">
                    <div className="col-12">
                        <div className="card card-body border-0 shadow mb-4">         
                            <div className="card-header">
                                <h2 className="fs-5 fw-bold mb-0">Servidores</h2>                
                            </div>                            

                            <div className="row">
                                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap">
                                    {error && <div className="alert alert-danger mt-2 col-9 py-2">{error}</div>}
                                </div>
                            </div>

                            <form onSubmit={handleSearch} className="row mb-3">
                                <div className="col-md-10">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Filtrar por nome ou ID..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <button type="submit" className="btn btn-primary w-100">Buscar</button>
                                </div>
                            </form>
                                  
                            <div className="table-responsive">
                                <table className="table table-hover align-items-center table-flush">
                                    <thead className="thead-light" >
                                        <tr>
                                            <th scope="col">Ícone</th>
                                            <th scope="col">Nome</th>
                                            <th scope="col">ID</th>
                                            <th scope="col">Membros</th>
                                            <th scope="col">Criado em</th>
                                            <th scope="col">Atualizado em</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map(item => (
                                            <tr key={item._id || item.id}>
                                                <td>
                                                    {item.icon && <img src={`https://cdn.discordapp.com/icons/${item.id}/${item.icon}.png`} alt="icon" style={{width: 32, height: 32, borderRadius: '50%'}} onError={(e)=>{e.target.style.display='none'}}/>}
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.id}</td>
                                                <td>{item.memberCount}</td>
                                                <td>{item.criado ? new Date(item.criado).toLocaleString() : '-'}</td>
                                                <td>{item.atualizado ? new Date(item.atualizado).toLocaleString() : '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>                                      
                                    <tfoot>
                                        <tr>
                                            <td colSpan="6" className="text-end">
                                                <strong> {data.length} registro(s)</strong>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </React.Fragment>
    );
}

export default Guilds;
