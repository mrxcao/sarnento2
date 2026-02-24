import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Menu from '../../components/Menu/Menu';
import TagsInput from '../../components/TagsInput';
import { getSettings, updateSettings } from '../../services/SettingsService';

function Settings() {
    const history = useHistory();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);

    const [settings, setSettings] = useState({
        sinopseForAI: '',
        tempoGuardaDias: 90,
        lastUpTime: '',
        avisarCalls: [],
        ai: {
            usrBlackList: [],
            guildBlackList: []
        },
        notLog: {
            usersId: [],
            guildsId: []
        }
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        getSettings(token).then(resp => {
            if (resp && resp.length > 0) {
                setSettings({
                    ...settings,
                    ...resp[0],
                    // Ensure sub-objects exist
                    ai: resp[0].ai || { usrBlackList: [], guildBlackList: [] },
                    notLog: resp[0].notLog || { usersId: [], guildsId: [] },
                    avisarCalls: resp[0].avisarCalls || []
                });
            }
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            if (err.response && err.response.status === 401)
                return history.push('admin/')
            setError('Erro ao carregar configurações.');
        })
    }, [history]);

    function handleInputChange(event) {
        const { id, value } = event.target;
        setSettings(prev => ({ ...prev, [id]: value }));
    }

    function handleListChange(field, subField, array) {
        setSettings(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                [subField]: array
            }
        }));
    }

    function handleAvisarCallChange(index, field, value) {
        const newAvisarCalls = [...settings.avisarCalls];
        newAvisarCalls[index][field] = value;
        setSettings(prev => ({ ...prev, avisarCalls: newAvisarCalls }));
    }

    function addAvisarCall() {
        setSettings(prev => ({
            ...prev,
            avisarCalls: [...prev.avisarCalls, { guidlId: '', name: '', channelId: '' }]
        }));
    }

    function removeAvisarCall(index) {
        const newAvisarCalls = settings.avisarCalls.filter((_, i) => i !== index);
        setSettings(prev => ({ ...prev, avisarCalls: newAvisarCalls }));
    }

    function onFormSubmit(event) {
        event.preventDefault();

        if (settings.tempoGuardaDias <= 0)
            return setError(`Tempo de guarda deve ser maior que 0`);

        const token = localStorage.getItem("token");
        updateSettings(settings, token)
            .then(result => {
                if (result) {
                    setError('');
                    return setSuccess(`Salvo!`);
                }
                else {
                    setSuccess('');
                    return setError(`Não foi possível atualizar as configurações.`);
                }
            })
            .catch(err => {
                console.error(err.response ? err.response.data : err.message);
                return setError(`Algo deu errado ao salvar.`);
            })
    }

    if (loading) return (
        <React.Fragment>
            <Menu />
            <main className="content">
                <div className="py-4">Carregando...</div>
            </main>
        </React.Fragment>
    );

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
                            <form onSubmit={onFormSubmit}>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="sinopseForAI" className="form-label">Sinopse para AI</label>
                                        <textarea
                                            className="form-control"
                                            id="sinopseForAI"
                                            rows="3"
                                            value={settings.sinopseForAI || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Última atualização (Uptime)</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            value={settings.lastUpTime ? new Date(settings.lastUpTime).toLocaleString() : ''}
                                            readOnly
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="tempoGuardaDias" className="form-label">
                                            Tempo em dias para expurgo do banco de dados
                                        </label>
                                        <input
                                            className="form-control"
                                            id="tempoGuardaDias"
                                            type="number"
                                            value={settings.tempoGuardaDias || ''}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <hr />
                                <h5>Avisar Calls</h5>
                                {settings.avisarCalls.map((call, index) => (
                                    <div key={index} className="row mb-2 border-bottom pb-2">
                                        <div className="col-md-3">
                                            <input
                                                className="form-control form-control-sm"
                                                placeholder="Guild ID"
                                                value={call.guidlId || ''}
                                                onChange={(e) => handleAvisarCallChange(index, 'guidlId', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <input
                                                className="form-control form-control-sm"
                                                placeholder="Nome"
                                                value={call.name || ''}
                                                onChange={(e) => handleAvisarCallChange(index, 'name', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <input
                                                className="form-control form-control-sm"
                                                placeholder="Channel ID"
                                                value={call.channelId || ''}
                                                onChange={(e) => handleAvisarCallChange(index, 'channelId', e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-2">
                                            <button type="button" className="btn btn-danger btn-sm" onClick={() => removeAvisarCall(index)}>Remover</button>
                                        </div>
                                    </div>
                                ))}
                                <button type="button" className="btn btn-secondary btn-sm mb-3" onClick={addAvisarCall}>+ Adicionar Call</button>

                                <hr />
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <TagsInput
                                            label="AI User Blacklist"
                                            value={settings.ai.usrBlackList}
                                            onChange={(newTags) => handleListChange('ai', 'usrBlackList', newTags)}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <TagsInput
                                            label="AI Guild Blacklist"
                                            value={settings.ai.guildBlackList}
                                            onChange={(newTags) => handleListChange('ai', 'guildBlackList', newTags)}
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <TagsInput
                                            label="Not Log Users"
                                            value={settings.notLog.usersId}
                                            onChange={(newTags) => handleListChange('notLog', 'usersId', newTags)}
                                        />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <TagsInput
                                            label="Not Log Guilds"
                                            value={settings.notLog.guildsId}
                                            onChange={(newTags) => handleListChange('notLog', 'guildsId', newTags)}
                                        />
                                    </div>
                                </div>

                                <div className="row align-items-center">
                                    <div className="col-sm-3">
                                        <button className="btn btn-gray-800 mt-2 animate-up-2" type="submit">
                                            Salvar
                                        </button>
                                    </div>
                                    <div className="col-sm-9">
                                        {error && <div className="alert alert-danger mt-2 py-2">{error}</div>}
                                        {success && <div className="alert alert-success mt-2 py-2">{success}</div>}
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
