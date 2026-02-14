import { useState } from 'react';

function TagsInput({ label, value, onChange, labelClass }) {
    const [input, setInput] = useState('');
  
    const handleKeyDown = (e) => {
      if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
        e.preventDefault();
        if (!value.includes(input.trim())) {
          onChange([...value, input.trim()]);
        }
        setInput('');
      } else if (e.key === 'Backspace' && !input && value.length) {
        // remove o último item ao apagar tudo
        onChange(value.slice(0, -1));
      }
    };
  
    const removeTag = (tag) => {
      onChange(value.filter(t => t !== tag));
    };
  
    return (
      <div className="mb-2">
        <label className={`form-label ${labelClass || ''}`}>{label}</label>
        <div className="form-control d-flex flex-wrap gap-1" style={{ minHeight: '38px' }}>
          
          {value.map((tag, idx) => (
            <span key={idx} className="badge bg-primary d-flex align-items-center">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="btn-close btn-close-white ms-2"
                style={{ fontSize: '0.6rem' }}
              />
            </span>
          ))}
          
          <input
            className="border-0 flex-grow-1"
            style={{ minWidth: '100px' }}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite e aperte Enter"
          />
        </div>
      </div>
    );
  }

  export default TagsInput;