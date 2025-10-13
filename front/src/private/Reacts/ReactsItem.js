import React, { useEffect, useState } from 'react';
import TagsInput from '../../components/TagsInput';
import { getDoTypes, getTriggerTypes } from '../../services/reactsService';

function ReactsItem({ item, onCancel, onSave }) {
  const [formData, setFormData] = React.useState(item);
  const [triggerTypes, setTriggerTypes] = useState([]);
  const [doTypes, setDoTypes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    getTriggerTypes(token).then(setTriggerTypes).catch(console.error);
    getDoTypes(token).then(setDoTypes).catch(console.error);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'trigger') {
      const selected = triggerTypes.find(t => t._id === value);
      setFormData(prev => ({ ...prev, trigger: selected }));
    } else if (name === 'do') {
      const selected = doTypes.find(t => t._id === value);
      setFormData(prev => ({ ...prev, do: selected }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="card p-3 mt-3 shadow">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">Nome</label>
          <input
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Trigger</label>
          <select
            className="form-control"
            name="trigger"
            value={formData.trigger?._id || ''}
            onChange={handleChange}
          >
            {triggerTypes.map(t => (
              <option key={t._id} value={t._id}>{t.name}</option>
            ))}
          </select>
        </div>

        <TagsInput
          label="Trigger Data"
          value={formData.trigger?.data || []}
          onChange={(newTags) =>
            setFormData(prev => ({ ...prev, triggerData: newTags }))
          }
/>

        <div className="mb-2">
          <label className="form-label">Do</label>
          <select
            className="form-control"
            name="do"
            value={formData.do?._id || ''}
            onChange={handleChange}
          >
            {doTypes.map(d => (
              <option key={d._id} value={d._id}>{d.name}</option>
            ))}
          </select>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">Salvar</button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default ReactsItem;