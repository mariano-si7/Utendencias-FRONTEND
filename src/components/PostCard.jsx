import React, { useState } from 'react';
import { MessageCircle, Repeat2, Heart, Bookmark, Share2, MoreHorizontal } from 'lucide-react';

export default function PostCard({ post, onPostClick, onToggleSave }) {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(post.userLiked || false);

  const [reposts, setReposts] = useState(post.reposts);
  const [reposted, setReposted] = useState(post.userReposted || false);

  const [saved, setSaved] = useState(post.isSaved || false);

  const handleLike = (e) => {
    e.stopPropagation();
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  const handleRepost = (e) => {
    e.stopPropagation();
    if (reposted) {
      setReposts(reposts - 1);
      setReposted(false);
    } else {
      setReposts(reposts + 1);
      setReposted(true);
    }
  };

  const handleSave = (e) => {
    e.stopPropagation();
    const newSaved = !saved;
    setSaved(newSaved);
    if (onToggleSave) {
      onToggleSave(post, newSaved);
    }
  };

  return (
    <div className="post-card card" onClick={() => onPostClick && onPostClick(post)}>
      {/* Post Top Header */}
      <div className="post-card-header">
        <div className="author-info">
          <div className="avatar">{post.avatar}</div>
          <div className="author-details">
            <span className="author-name">{post.handle}</span>
            <span className="author-sub">{post.handle} · {post.time}</span>
          </div>
        </div>
        <button className="icon-btn-ghost" onClick={(e) => e.stopPropagation()}>
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Post Content */}
      <div className="post-content">
        <p className="post-text">{post.content}</p>

        {/* Tags / Location Badges Grid */}
        {(post.topic || post.location || post.category) && (
          <div className="post-badges-grid">
            {post.topic && (
              <div className="badge-box">
                <span className="badge-title">Tema</span>
                <span className="badge-val">{post.topic}</span>
              </div>
            )}
            {post.location && (
              <div className="badge-box">
                <span className="badge-title">Lugar</span>
                <span className="badge-val">{post.location}</span>
              </div>
            )}
            {post.category && (
              <div className="badge-box">
                <span className="badge-title">Etiqueta</span>
                <span className="badge-val">{post.category}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Interaction Bar */}
      <div className="post-footer">
        <div className="interaction-buttons">
          <button className="action-btn" onClick={(e) => e.stopPropagation()}>
            <MessageCircle size={18} />
            <span>{post.comments}</span>
          </button>

          <button className={`action-btn ${reposted ? 'reposted' : ''}`} onClick={handleRepost}>
            <Repeat2 size={18} />
            <span>{reposts}</span>
          </button>

          <button className={`action-btn ${liked ? 'liked' : ''}`} onClick={handleLike}>
            <Heart size={18} fill={liked ? '#e63946' : 'none'} color={liked ? '#e63946' : 'currentColor'} />
            <span>{likes}</span>
          </button>

          <button className={`action-btn ${saved ? 'saved' : ''}`} onClick={handleSave} title={saved ? 'Guardado en Colección' : 'Guardar en Colección'}>
            <Bookmark size={18} fill={saved ? '#1C5D3F' : 'none'} color={saved ? '#1C5D3F' : 'currentColor'} />
            <span>{saved ? 'Guardado' : 'Guardar'}</span>
          </button>

          <button className="action-btn" onClick={(e) => e.stopPropagation()}>
            <Share2 size={18} />
            <span>{post.shares || 0}</span>
          </button>
        </div>

        <span className="post-footer-time">{post.time}</span>
      </div>
    </div>
  );
}
