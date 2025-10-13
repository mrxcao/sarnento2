import React, { useEffect, useRef, useState } from 'react';
// import Menu from '../../components/Menu/Menu';
// import { getSettings, updateSettings } from '../../services/SettingsService';
// import Symbols from '../Settings/Symbols';
import { useHistory } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import { getSettings, updateSettings } from '../../services/SettingsService';

function Settings() {

    const inputLastUpTime = useRef('');
    const inputTempoGuardaDias = useRef('');
    

    useEffect(()=>{
        const token = localStorage.getItem('token');
        
        getSettings(token).then(resp=> {
            // setSettings(resp)
            //console.log('resp',esp[0].lastUpTime);
            inputTempoGuardaDias.current.value = resp[0].tempoGuardaDias;
            inputLastUpTime.current.value = resp[0].lastUpTime;
            //lastUpTime = resp[0].lastUpTime;
          }).catch(err=> {
            if (err.response && err.response.status === 401)
                    return history.push('admin/')
            setError(err)
          })
    }, [])

    
/*
	name: String,
	prefix: String,
	sinopseForAI:String,
	lastUpTime:Date,
	tempoGuardaDias: Number,
*/
    const history = useHistory();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

   

    function onFormSubmit(event) {
        event.preventDefault();

        if ((inputTempoGuardaDias.current.value )
            && inputTempoGuardaDias <= 0)
            return setError(`Erro nos campos`);


        const token = localStorage.getItem("token");
        updateSettings({
            tempoGuardaDias : inputTempoGuardaDias.current.value,            
        }, token)
            .then(result => {
                if (result) {
                    setError('');
                    //inputTempoGuardaDias.current.value = '';
                    return setSuccess(`Salvo!`);
                }
                else {
                    setSuccess('');
                    return setError(`Can't update the settings.`);
                }
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                return setError(`Algo deu errado.`);
            })
            
    }

    return (
        <React.Fragment>      
        <Menu />
        <main className="content">
  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
    <div className="d-block mb-4 mb-md-0">
      <h1 className="h4">Settings</h1>
    </div>
  </div>

  <div className="row">
    <div className="col-12">
      <div className="card card-body border-0 shadow mb-4">
        <form>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="lastUpTime_" className="form-label">lastUpTime</label>
              <input
                ref={inputLastUpTime}
                className="form-control"
                id="lastUpTime_"
                type="text"
                autoComplete="off"
                readOnly="true"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="tempoGuardaDias_" className="form-label">
                Tempo em dias para expurgo do banco de dados
              </label>
              <input
                ref={inputTempoGuardaDias}
                className="form-control"
                id="tempoGuardaDias_"
                type="number"
                placeholder="90"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-sm-3">
              <button
                className="btn btn-gray-800 mt-2 animate-up-2"
                type="submit"
                onClick={onFormSubmit}
              >
                Salvar
              </button>
            </div>

            <div className="col-sm-9">
              {error && (
                <div className="alert alert-danger mt-2 py-2">{error}</div>
              )}
              {success && (
                <div className="alert alert-success mt-2 py-2">{success}</div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</main>            
        </React.Fragment>
    );
}

export default Settings;