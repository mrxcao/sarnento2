import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import { getReacts } from '../../services/reactsService';
import ReactsItem from './ReactsItem';
import ReactsRow from './ReactsRow';

function reacts() {

    const [data, setData] = useState([])
    const [filterText, setFilterText] = useState('');
    const [debouncedFilterText, setDebouncedFilterText] = useState('');

    const history = useHistory();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [editingItem, setEditingItem] = useState(null);
 
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedFilterText(filterText);
        }, 300); // 300ms de delay
        return () => clearTimeout(handler); // limpa o timeout anterior
    }, [filterText]);

    useEffect(()=>{
        const token = localStorage.getItem('token');        
        getReacts(token)
          .then(data=> {
            setData(data)
            
          })
          .catch(err=> {
            if (err.response && err.response.status === 401) return history.push('/')
            console.error(err.message);
            setError(err.response ? err.response.data : err.message);
            setSuccess('')
          })
    }, [])

    const filteredData = data.filter(item =>
        item.name?.toLowerCase().includes(debouncedFilterText.toLowerCase())
    );

    const handleEdit = (item) => {
        setEditingItem(item);
      };
      
      const handleCancelEdit = () => {
        setEditingItem(null);
      };
      
      const handleSaveEdit = (updatedItem) => {
        const newData = data.map(d => d._id === updatedItem._id ? updatedItem : d);
        setData(newData);
        setEditingItem(null);
      };

    return (
        <React.Fragment>      
        <Menu />
            
            <main className="content">
                <div className="row">
                    <div className="col-12">
                        <div className="card card-body border-0 shadow mb-4">         

                            <div className="card-header">
                                <div className="row align-item-center ">
                                    <div className="col">
                                        <h2 className="fs-5 fw-bold mb-0">Reacts</h2>                
                                    </div>
                                </div>
                            </div>                            

                            <div className="row">
                                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap">
                                    {error && <div className="alert alert-danger mt-2 col-9 py-2">{error}</div>}
                                    {success && <div className="alert alert-success mt-2 col-9 py-2">{success}</div>}
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Filtrar por nome..."
                                        value={filterText}
                                        onChange={(e) => setFilterText(e.target.value)}
                                    />
                                </div>
                            </div>
                            
                            <div className="row align-item-left ">
                                <div className="col">                            

                                </div>
                            </div>
                                  
                            <div className="table-responsive">
                                <table className="table table-hover align-items-center table-flush">
                                    <thead className="thead-light" >
                                        <tr>
                                            <th scope="col"> Name</th>
                                            <th scope="col"> trigger</th>
                                            <th scope="col"> do</th>                                     
                                            <th scope="col">  </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map(item => (
                                            <ReactsRow key={item.id} data={item} rowClassName="py-1" 
                                                       onEdit={() => handleEdit(item)}/>
                                        ))}
                                    </tbody>                                      
                                    <tfoot>
                                        <tr>
                                            <td colSpan="4" className="text-end">
                                                <strong> {filteredData.length} registro(s)</strong>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                        </div>
                    </div>

                </div>

                {editingItem && (
                    <div className="modal d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h5 className="modal-title">Editar React</h5>
                            <button type="button" className="btn-close" onClick={handleCancelEdit}></button>
                            </div>
                            <div className="modal-body">
                            <ReactsItem
                                item={editingItem}
                                onCancel={handleCancelEdit}
                                onSave={handleSaveEdit}
                            />
                            </div>
                        </div>
                        </div>
                    </div>
                )}




            </main>
        </React.Fragment>
    );
}

export default reacts;