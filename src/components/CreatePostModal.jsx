import React, { useState } from 'react';
import { X, Send, Tag, Calendar } from 'lucide-react';

export default function CreatePostModal({ isOpen, onClose, onAddPost }) {
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('#General');
  const [location, setLocation] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newPost = {
      id: Date.now(),
      author: 'Alumno UT',
      handle: '@alumno_ut',
      avatar: 'AL',
      time: 'Ahora',
      content: content,
      topic: topic.startsWith('#') ? topic : `#${topic}`,
      location: location || null,
      likes: 0,
      reposts: 0,
      comments: 0,
      shares: 0,
    };

    onAddPost(newPost);
    setContent('');
    setLocation('');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Publicar en UTendencias</h3>
          <button className="icon-btn-ghost" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-post-form">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="¿Qué duda o noticia deseas compartir con la comunidad universitaria?"
            className="post-textarea"
            rows={4}
            autoFocus
          />

          <div className="options-inputs">
            <div className="input-pill">
              <Tag size={16} />
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Tema (#Matemáticas)"
              />
            </div>
            <div className="input-pill">
              <Calendar size={16} />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Lugar / Aula (opcional)"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="pill-btn" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="pill-btn pill-btn-solid">
              <Send size={16} />
              <span>Publicar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
