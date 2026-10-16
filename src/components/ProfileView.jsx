import React, { useState } from 'react';
import { Award, BookOpen, MessageSquare, ShieldCheck, MapPin, Calendar, Edit3, LogOut } from 'lucide-react';
import PostCard from './PostCard';

export default function ProfileView({ userPosts, onPostClick, currentUser, onLogout }) {
  const [activeTab, setActiveTab] = useState('publicaciones');

  const studentInfo = {
    name: currentUser?.name || 'Mariano Calzadilla Alvarez',
    handle: currentUser?.handle || '@alumno_ut',
    avatar: currentUser?.avatar || 'AL',
    group: currentUser?.group ? `Grupo: ${currentUser.group}` : 'Grupo: 7ITIID - G3',
    career: currentUser?.career || 'Ingeniería en Tecnologías de la Información',
    university: 'Universidad Tecnológica de Tula-Tepeji',
    points: currentUser?.points || 480,
    reputation: currentUser?.reputation || 'Tutor Destacado 🌟',
    joined: currentUser?.joined || 'Septiembre 2026',
    team: ['Alan Cruz Reyes', 'Brandon Daniel Montoya Aldana', 'Mariano Calzadilla Alvarez', 'Yaretzi Hernández Alonso'],
  };

  return (
    <main className="feed-container">
      {/* Profile Header Card */}
      <div className="profile-card card">
        <div className="profile-cover"></div>
        <div className="profile-content">
          <div className="profile-top-row">
            <div className="avatar avatar-xl">{studentInfo.avatar}</div>
            <div className="profile-actions-row">
              <button className="pill-btn edit-profile-btn">
                <Edit3 size={16} />
                <span>Editar Perfil</span>
              </button>
              {onLogout && (
                <button className="pill-btn logout-profile-btn" onClick={onLogout} title="Cerrar sesión">
                  <LogOut size={16} />
                  <span>Salir</span>
                </button>
              )}
            </div>
          </div>

          <div className="profile-names">
            <h2>{studentInfo.name} <ShieldCheck size={20} className="verified-icon" /></h2>
            <span className="profile-handle">{studentInfo.handle}</span>
          </div>

          <p className="profile-bio">
            Estudiante de {studentInfo.career} en la {studentInfo.university}. Apasionado por la formulación de proyectos y la colaboración alumno a alumno en UTendencias.
          </p>

          <div className="profile-details-grid">
            <div className="detail-item">
              <BookOpen size={16} />
              <span>{studentInfo.group}</span>
            </div>
            <div className="detail-item">
              <MapPin size={16} />
              <span>UTTT - Edificio TICs</span>
            </div>
            <div className="detail-item">
              <Calendar size={16} />
              <span>Miembro desde {studentInfo.joined}</span>
            </div>
            <div className="detail-item badge-green-text">
              <Award size={16} />
              <span>{studentInfo.points} Puntos de Ayuda · {studentInfo.reputation}</span>
            </div>
          </div>

          {/* Team Project Note */}
          <div className="team-note card-white">
            <h4>Equipo de Desarrollo (Formulación de Proyectos):</h4>
            <ul className="team-list">
              <li>Alan Cruz Reyes</li>
              <li>Brandon Daniel Montoya Aldana</li>
              <li>Mariano Calzadilla Alvarez</li>
              <li>Yaretzi Hernández Alonso</li>
            </ul>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="profile-tabs">
          <button
            className={`profile-tab ${activeTab === 'publicaciones' ? 'active' : ''}`}
            onClick={() => setActiveTab('publicaciones')}
          >
            Publicaciones
          </button>
          <button
            className={`profile-tab ${activeTab === 'respuestas' ? 'active' : ''}`}
            onClick={() => setActiveTab('respuestas')}
          >
            Respuestas / Dudas Resueltas
          </button>
          <button
            className={`profile-tab ${activeTab === 'recursos' ? 'active' : ''}`}
            onClick={() => setActiveTab('recursos')}
          >
            Materiales Subidos
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="posts-list">
        {userPosts.map((post) => (
          <PostCard key={post.id} post={post} onPostClick={onPostClick} />
        ))}
      </div>
    </main>
  );
}
