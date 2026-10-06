import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Heart, Send, CheckCircle } from 'lucide-react';
import PostCard from './PostCard';

export default function PostDetailView({ post, onBack }) {
  const [comments, setComments] = useState([
    {
      id: 101,
      author: 'Brandon Montoya',
      handle: '@brandon_m',
      avatar: 'BM',
      time: 'Hace 10 min',
      text: '¡Hola! Para resolver ese tipo de derivadas te sugiero revisar la fórmula de la cadena. En el repositorio de recursos subí unos apuntes explicados paso a paso.',
      isSolution: true,
      likes: 12,
    },
    {
      id: 102,
      author: 'Yaretzi Hernández',
      handle: '@yaretzi_h',
      avatar: 'YH',
      time: 'Hace 5 min',
      text: 'Totalmente de acuerdo. También nos vamos a reunir en la biblioteca a las 3:00 pm para repasar antes del examen por si te quieres sumar.',
      isSolution: false,
      likes: 5,
    },
  ]);

  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentObj = {
      id: Date.now(),
      author: 'Alumno UT',
      handle: '@alumno_ut',
      avatar: 'AL',
      time: 'Ahora',
      text: newComment,
      isSolution: false,
      likes: 0,
    };

    setComments([...comments, commentObj]);
    setNewComment('');
  };

  return (
    <main className="feed-container">
      {/* Back Button Bar */}
      <div className="post-detail-bar card">
        <button className="pill-btn back-btn" onClick={onBack}>
          <ArrowLeft size={18} />
          <span>Volver al Feed</span>
        </button>
        <h3>Publicación de la comunidad</h3>
      </div>

      {/* Main Post Card */}
      <PostCard post={post} />

      {/* Thread Responses Section */}
      <div className="comments-section card">
        <h3 className="section-title">Respuestas de compañeros ({comments.length})</h3>

        {/* Comment Form */}
        <form onSubmit={handleAddComment} className="add-comment-form">
          <div className="avatar">AL</div>
          <input
            type="text"
            placeholder="Escribe una explicación o consejo de alumno a alumno..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" className="pill-btn pill-btn-solid">
            <Send size={16} />
            <span>Responder</span>
          </button>
        </form>

        {/* Comments List */}
        <div className="comments-list">
          {comments.map((c) => (
            <div key={c.id} className={`comment-card ${c.isSolution ? 'solution-card' : ''}`}>
              <div className="comment-header">
                <div className="avatar avatar-sm">{c.avatar}</div>
                <div className="author-meta">
                  <span className="author-name">{c.author} ({c.handle})</span>
                  <span className="comment-time">{c.time}</span>
                </div>
                {c.isSolution && (
                  <span className="solution-badge">
                    <CheckCircle size={14} /> Explicación Resuelta
                  </span>
                )}
              </div>

              <p className="comment-text">{c.text}</p>

              <div className="comment-actions">
                <button className="action-btn">
                  <Heart size={14} />
                  <span>{c.likes} útil</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
