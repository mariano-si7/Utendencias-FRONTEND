import React, { useState } from 'react';
import { Flame } from 'lucide-react';

export default function RightSidebar({ onFilterTopic }) {
  const [followingState, setFollowingState] = useState({});

  const trends = [
    { num: 1, tag: '#FeriaUT', count: '1.2k publicaciones · hoy' },
    { num: 2, tag: '#LecturaUT', count: '842 publicaciones · hoy' },
    { num: 3, tag: '#DeportesUT', count: '612 publicaciones · hoy' },
    { num: 4, tag: '#CaféUT', count: '481 publicaciones · hoy' },
  ];

  const suggestedUsers = [
    { id: 'club_literario', name: '@club_literario', sub: '12.4k seguidores', avatar: 'CL' },
    { id: 'deportes_ut', name: '@deportes_ut', sub: '8.9k seguidores', avatar: 'DR' },
    { id: 'museo_ut', name: '@museo_ut', sub: '5.1k seguidores', avatar: 'MU' },
  ];

  const mostViewed = [
    { title: 'Feria de proyectos', count: '2.4k menciones' },
    { title: 'Torneo interfacultades', count: '1.8k menciones' },
    { title: 'Libros universitarios', count: '1.2k menciones' },
  ];

  const toggleFollow = (id) => {
    setFollowingState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <aside className="right-sidebar">
      {/* Widget 1: Qué está pasando */}
      <div className="widget-card card">
        <div className="widget-header">
          <h3>Qué está pasando</h3>
          <button className="text-btn">Ver todo</button>
        </div>

        <div className="widget-list">
          {trends.map((t) => (
            <div
              key={t.tag}
              className="trend-item"
              onClick={() => onFilterTopic && onFilterTopic(t.tag)}
            >
              <div className="trend-num">{t.num}</div>
              <div className="trend-details">
                <span className="trend-tag">{t.tag}</span>
                <span className="trend-count">{t.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Widget 2: A quién seguir */}
      <div className="widget-card card">
        <div className="widget-header">
          <h3>A quién seguir</h3>
          <button className="text-btn">Ver todos</button>
        </div>

        <div className="widget-list">
          {suggestedUsers.map((u) => {
            const isFollowing = followingState[u.id];
            return (
              <div key={u.id} className="follow-item">
                <div className="avatar avatar-sm">{u.avatar}</div>
                <div className="follow-details">
                  <span className="follow-name">{u.name}</span>
                  <span className="follow-sub">{u.sub}</span>
                </div>
                <button
                  className={`pill-btn ${isFollowing ? 'pill-btn-solid' : ''} follow-btn`}
                  onClick={() => toggleFollow(u.id)}
                >
                  {isFollowing ? 'Siguiendo' : 'Seguir'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Widget 3: Lo más visto hoy */}
      <div className="widget-card card">
        <div className="widget-header">
          <h3>Lo más visto hoy</h3>
        </div>

        <div className="widget-list">
          {mostViewed.map((item, idx) => (
            <div key={idx} className="most-viewed-item">
              <div className="flame-icon">
                <Flame size={16} />
              </div>
              <div className="most-viewed-details">
                <span className="item-title">{item.title}</span>
                <span className="item-sub">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
