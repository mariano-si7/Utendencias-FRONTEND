import React, { useState } from 'react';
import { Search, Filter, Hash, BookOpen, HelpCircle, Calendar } from 'lucide-react';
import PostCard from './PostCard';

export default function ExploreView({ posts, onPostClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Matemáticas', 'Física', 'Programación', 'Dudas de Examen', 'Eventos'];

  const filtered = posts.filter((p) => {
    const matchesSearch =
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.topic && p.topic.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedCategory === 'Todos') return matchesSearch;
    return matchesSearch && (p.topic?.includes(selectedCategory) || p.content.includes(selectedCategory));
  });

  return (
    <main className="feed-container">
      <div className="explore-header card">
        <h2 className="view-title">Explorar UTendencias</h2>
        <p className="view-subtitle">Encuentra preguntas resueltas, materiales de estudio y temas relevantes en la universidad.</p>

        {/* Search Bar */}
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por materia, profesor, hashtag (#FeriaUT)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Pills */}
        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`pill-btn ${selectedCategory === cat ? 'pill-btn-solid' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="posts-list">
        {filtered.length > 0 ? (
          filtered.map((post) => <PostCard key={post.id} post={post} onPostClick={onPostClick} />)
        ) : (
          <div className="empty-state card">
            <HelpCircle size={40} className="empty-icon" />
            <h3>No se encontraron publicaciones</h3>
            <p>Intenta con otra palabra clave o busca en la sección de Recursos Académicos.</p>
          </div>
        )}
      </div>
    </main>
  );
}
