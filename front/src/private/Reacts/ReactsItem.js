import { useEffect, useState } from 'react';
import TagsInput from '../../components/TagsInput';
import { getDoTypes, getTriggerTypes } from '../../services/reactsService';

function ReactsItem({ item, onCancel, onSave, onDelete }) {
  const [formData, setFormData] = useState(JSON.parse(JSON.stringify(item))); // Deep copy
  const [triggerTypes, setTriggerTypes] = useState([]);
  const [doTypes, setDoTypes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    getTriggerTypes(token).then(setTriggerTypes).catch(console.error);
    getDoTypes(token).then(setDoTypes).catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (e, kind) => {
    const typeId = parseInt(e.target.value);
    if (!typeId) return;

    if (kind === 'trigger') {
      const selected = triggerTypes.find(t => t.id === typeId);
      // Reset data when type changes
      setFormData(prev => ({ 
        ...prev, 
        trigger: { ...selected, data: {} } 
      }));
    } else if (kind === 'do') {
      const selected = doTypes.find(t => t.id === typeId);
      setFormData(prev => ({ 
        ...prev, 
        do: { ...selected, data: {} } 
      }));
    }
  };

  const handleDataChange = (kind, key, value) => {
    setFormData(prev => ({
      ...prev,
      [kind]: {
        ...prev[kind],
        data: {
          ...prev[kind].data,
          [key]: value
        }
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDeleteClick = () => {
      if (window.confirm('Tem certeza que deseja excluir este item?')) {
          onDelete(formData._id);
      }
  }

  const renderDynamicInputs = (kind, typeObj) => {
    if (!typeObj || !typeObj.expectedData) return null;

    return Object.keys(typeObj.expectedData).map(key => {
      const expectedType = typeObj.expectedData[key];
      const value = typeObj.data ? typeObj.data[key] : (expectedType === 'Array' ? [] : '');

      return (
        <div key={key} className="mb-2">
            {expectedType === 'String' ? (
                 <TagsInput
                 label={`${key} (${expectedType})`}
                 value={Array.isArray(value) ? value : (value ? [value] : [])} 
                 onChange={(newTags) => handleDataChange(kind, key, newTags)}
                 labelClass="text-white"
               />
            ) : (
                <TagsInput
                label={`${key} (${expectedType})`}
                value={Array.isArray(value) ? value : []}
                onChange={(newTags) => handleDataChange(kind, key, newTags)}
                labelClass="text-white"
              />
            )}
         
        </div>
      );
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label text-white">Nome</label>
          <input
            className="form-control"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
          />
        </div>

        <div className="card card-body bg-secondary border-0 mb-3 text-white">
            <h6 className="card-title text-white">Trigger</h6>
            <div className="mb-2">
            <label className="form-label text-white">Tipo</label>
            <select
                className="form-control"
                value={formData.trigger?.id || ''}
                onChange={(e) => handleTypeChange(e, 'trigger')}
            >
                <option value="">Selecione...</option>
                {triggerTypes.map(t => (
                <option key={t._id} value={t.id}>{t.name}</option>
                ))}
            </select>
            </div>
            {renderDynamicInputs('trigger', formData.trigger)}
        </div>

        <div className="card card-body bg-secondary border-0 mb-3 text-white">
            <h6 className="card-title text-white">Do (Ação)</h6>
            <div className="mb-2">
            <label className="form-label text-white">Tipo</label>
            <select
                className="form-control"
                value={formData.do?.id || ''}
                onChange={(e) => handleTypeChange(e, 'do')}
            >
                <option value="">Selecione...</option>
                {doTypes.map(d => (
                <option key={d._id} value={d.id}>{d.name}</option>
                ))}
            </select>
            </div>
            {renderDynamicInputs('do', formData.do)}
        </div>

        <div className="d-flex justify-content-between mt-4">
            <div className="d-flex gap-2">
                <button type="submit" className="btn btn-success">Salvar</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
            </div>
            {formData._id && (
                <button type="button" className="btn btn-danger" onClick={handleDeleteClick}>Excluir</button>
            )}
        </div>
      </form>
    </div>
  );
}

export default ReactsItem;