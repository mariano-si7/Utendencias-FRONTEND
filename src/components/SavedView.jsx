import React, { useState } from 'react';
import { Bookmark, FolderPlus, Folder, BookOpen, Download, Trash2, HelpCircle } from 'lucide-react';
import PostCard from './PostCard';

export default function SavedView({
  savedPosts,
  savedResources,
  collections,
  onOpenCreateCollectionModal,
  onPostClick,
  onToggleSavePost,
  onToggleSaveResource,
}) {
  const [selectedCollectionId, setSelectedCollectionId] = useState('all');
  const [activeSubTab, setActiveSubTab] = useState('todos');

  const selectedCollection = collections.find((c) => c.id === selectedCollectionId);

  return (
    <main className="feed-container">
      {/* Header */}
      <div className="saved-header card">
        <div className="header-top">
          <div>
            <h2 className="view-title">Guardados y Colecciones</h2>
            <p className="view-subtitle">Organiza tus dudas favoritas, soluciones y recursos académicos por carpetas.</p>
          </div>
          <button className="pill-btn pill-btn-solid" onClick={onOpenCreateCollectionModal}>
            <FolderPlus size={18} />
            <span>Nueva Colección</span>
          </button>
        </div>

        {/* Collections Grid / Row */}
        <div className="collections-row">
          <button
            className={`collection-card-chip ${selectedCollectionId === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCollectionId('all')}
          >
            <span className="collection-icon">🔖</span>
            <div className="collection-info">
              <span className="col-title">Todos los Guardados</span>
              <span className="col-count">{savedPosts.length + savedResources.length} elementos</span>
            </div>
          </button>

          {collections.map((col) => (
            <button
              key={col.id}
              className={`collection-card-chip ${selectedCollectionId === col.id ? 'active' : ''}`}
              onClick={() => setSelectedCollectionId(col.id)}
            >
              <span className="collection-icon">{col.icon || '📁'}</span>
              <div className="collection-info">
                <span className="col-title">{col.title}</span>
                <span className="col-count">{col.description || 'Colección personalizada'}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Subtabs for content type */}
      <div className="saved-subtabs-row">
        <button
          className={`tab-btn ${activeSubTab === 'todos' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('todos')}
        >
          Todos ({savedPosts.length + savedResources.length})
        </button>
        <button
          className={`tab-btn ${activeSubTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('posts')}
        >
          Publicaciones ({savedPosts.length})
        </button>
        <button
          className={`tab-btn ${activeSubTab === 'recursos' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('recursos')}
        >
          Recursos Académicos ({savedResources.length})
        </button>
      </div>

      {/* Content */}
      <div className="saved-content-list">
        {(activeSubTab === 'todos' || activeSubTab === 'posts') && (
          <>
            {savedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={{ ...post, isSaved: true }}
                onPostClick={onPostClick}
                onToggleSave={onToggleSavePost}
              />
            ))}
          </>
        )}

        {(activeSubTab === 'todos' || activeSubTab === 'recursos') && (
          <>
            {savedResources.map((res) => (
              <div key={res.id} className="resource-card card">
                <div className="resource-badge-row">
                  <span className="badge badge-green">{res.subject}</span>
                  <span className="resource-type">{res.type}</span>
                </div>

                <h3 className="resource-title">{res.title}</h3>
                <p className="resource-desc">{res.description}</p>

                <div className="resource-footer">
                  <span className="download-count">
                    <Download size={16} /> {res.downloads} descargas
                  </span>
                  <div className="resource-actions">
                    <button
                      className="pill-btn pill-btn-solid"
                      onClick={() => onToggleSaveResource(res)}
                    >
                      <Trash2 size={16} />
                      <span>Quitar de Guardados</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {savedPosts.length === 0 && savedResources.length === 0 && (
          <div className="empty-state card">
            <Bookmark size={40} className="empty-icon" />
            <h3>Aún no tienes elementos guardados</h3>
            <p>Guarda publicaciones o recursos haciendo clic en el icono de marcador en cualquier post o guía académica.</p>
          </div>
        )}
      </div>
    </main>
  );
}
