import React from 'react';
import { Home, Compass, Bell, Bookmark, Plus, BookOpen, User, ChevronDown } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onOpenModal }) {
  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'explorar', label: 'Explorar', icon: Compass },
    { id: 'recursos', label: 'Recursos Académicos', icon: BookOpen },
    { id: 'guardados', label: 'Guardados / Colecciones', icon: Bookmark },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
    { id: 'perfil', label: 'Mi Perfil', icon: User },
  ];

  return (
    <aside className="left-sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="brand-logo">
          <svg viewBox="0 0 100 60" className="ut-logo-svg">
            <path d="M10,15 L35,15 L30,45 L15,45 Z" fill="#1C5D3F" />
            <path d="M38,15 L90,15 L85,45 L43,45 Z" fill="#237A53" />
          </svg>
        </div>
        <div className="brand-title">
          <span>UT</span>endencias
        </div>
      </div>

      {/* Navigation List */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={22} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Publicar Button */}
      <button className="publish-btn" onClick={onOpenModal}>
        <Plus size={20} />
        <span className="btn-label">Publicar</span>
      </button>

      {/* User Card at Bottom */}
      <div className="sidebar-user-card" onClick={() => setActiveTab('perfil')}>
        <div className="avatar">AL</div>
        <div className="user-info">
          <span className="username">@alumno_ut</span>
          <span className="user-role">Estudiante activo</span>
        </div>
        <ChevronDown size={18} className="chevron" />
      </div>
    </aside>
  );
}
