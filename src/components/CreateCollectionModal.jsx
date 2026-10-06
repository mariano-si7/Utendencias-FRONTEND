import React, { useState } from 'react';
import { X, FolderPlus, Bookmark } from 'lucide-react';

export default function CreateCollectionModal({ isOpen, onClose, onCreateCollection }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('📘');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreateCollection({
      id: Date.now(),
      title,
      description,
      icon,
      itemCount: 0,
    });

    setTitle('');
    setDescription('');
    onClose();
  };

  const icons = ['📘', '📐', '💻', '📝', '⚡', '🏆', '⭐'];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Crear Nueva Colección</h3>
          <button className="icon-btn-ghost" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-collection-form">
          <div className="form-group">
            <label>Icono de la Colección</label>
            <div className="icon-selector">
              {icons.map((ic) => (
                <button
                  type="button"
                  key={ic}
                  className={`icon-chip ${icon === ic ? 'selected' : ''}`}
                  onClick={() => setIcon(ic)}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Nombre de la Colección</label>
            <input
              type="text"
              placeholder="Ej. Exámenes de Cálculo, Guías de Física, Proyectos TI..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="modal-input"
              autoFocus
              required
            />
          </div>

          <div className="form-group">
            <label>Descripción (Opcional)</label>
            <textarea
              placeholder="Describe el propósito de esta carpeta para organizar tus materiales..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="modal-input"
              rows={3}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="pill-btn" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="pill-btn pill-btn-solid">
              <FolderPlus size={18} />
              <span>Crear Colección</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
