import React, { useState } from 'react';
import { Image, Calendar, Tag, BookOpen, Send } from 'lucide-react';

export default function CreatePost({ onAddPost, currentUser }) {
  const [content, setContent] = useState('');
  const [topic, setTopic] = useState('#General');
  const [location, setLocation] = useState('');
  const [postType, setPostType] = useState('duda'); // duda, evento, recurso

  const authorName = currentUser?.name || 'Alumno UT';
  const authorHandle = currentUser?.handle || '@alumno_ut';
  const authorAvatar = currentUser?.avatar || 'AL';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newPost = {
      id: Date.now(),
      author: authorName,
      handle: authorHandle,
      avatar: authorAvatar,
      time: 'Ahora',
      content: content,
      topic: topic.startsWith('#') ? topic : `#${topic}`,
      location: location || null,
      type: postType,
      likes: 0,
      reposts: 0,
      comments: 0,
      shares: 0,
      userLiked: false,
      userReposted: false,
    };

    onAddPost(newPost);
    setContent('');
    setLocation('');
  };

  return (
    <div className="create-post-card card">
      <div className="create-post-header">
        <div className="avatar">{authorAvatar}</div>
        <div className="author-meta">
          <span className="author-handle">{authorHandle}</span>
          <span className="timestamp">ahora</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="create-post-form">
        <h3 className="prompt-title">¿Qué está pasando?</h3>
        <p className="prompt-sub">
          Comparte una noticia, un evento, una pregunta o una idea para que la comunidad universitaria la vea.
        </p>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Escribe tu duda, pregunta de examen o recurso aquí..."
          className="post-textarea"
          rows={3}
        />

        <div className="create-post-options">
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

          <div className="action-row">
            <div className="media-buttons">
              <button
                type="button"
                className={`media-btn ${postType === 'foto' ? 'active' : ''}`}
                onClick={() => setPostType('foto')}
              >
                <Image size={18} />
                <span>Foto</span>
              </button>
              <button
                type="button"
                className={`media-btn ${postType === 'evento' ? 'active' : ''}`}
                onClick={() => setPostType('evento')}
              >
                <Calendar size={18} />
                <span>Evento</span>
              </button>
              <button
                type="button"
                className={`media-btn ${postType === 'recurso' ? 'active' : ''}`}
                onClick={() => setPostType('recurso')}
              >
                <BookOpen size={18} />
                <span>Apunte / PDF</span>
              </button>
            </div>

            <button type="submit" className="pill-btn pill-btn-solid submit-btn">
              <Send size={16} />
              <span>Publicar</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
