import React, { useState } from 'react';
import { Home, Compass, Bell, Bookmark, Plus, BookOpen, User, LogOut, ChevronDown } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onOpenModal, currentUser, onLogout }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'explorar', label: 'Explorar', icon: Compass },
    { id: 'recursos', label: 'Recursos Académicos', icon: BookOpen },
    { id: 'guardados', label: 'Guardados / Colecciones', icon: Bookmark },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
    { id: 'perfil', label: 'Mi Perfil', icon: User },
  ];

  const user = currentUser || {
    name: 'Mariano Calzadilla Alvarez',
    handle: '@alumno_ut',
    avatar: 'AL',
    group: '7ITIID - G3',
  };

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
      <div className="sidebar-user-container">
        {showUserMenu && (
          <div className="sidebar-user-popup card">
            <div className="user-popup-header">
              <strong>{user.name}</strong>
              <span>{user.handle}</span>
            </div>
            <button
              className="user-popup-action"
              onClick={() => {
                setActiveTab('perfil');
                setShowUserMenu(false);
              }}
            >
              <User size={16} />
              <span>Ver Perfil</span>
            </button>
            <button
              className="user-popup-action text-danger"
              onClick={() => {
                setShowUserMenu(false);
                if (onLogout) onLogout();
              }}
            >
              <LogOut size={16} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        )}

        <div className="sidebar-user-card" onClick={() => setShowUserMenu(!showUserMenu)}>
          <div className="avatar">{user.avatar || 'UT'}</div>
          <div className="user-info">
            <span className="username">{user.handle}</span>
            <span className="user-role">{user.group || 'Estudiante'}</span>
          </div>
          <button
            className="sidebar-logout-quick"
            onClick={(e) => {
              e.stopPropagation();
              if (onLogout) onLogout();
            }}
            title="Cerrar Sesión"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}

