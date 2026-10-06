import React from 'react';
import { Bell, MessageSquare, Heart, Award, CheckCircle2 } from 'lucide-react';

export default function NotificationsView() {
  const notifications = [
    {
      id: 1,
      icon: CheckCircle2,
      color: '#1C5D3F',
      text: 'Brandon Montoya marcó tu explicación como la "Respuesta más útil" en Cálculo Integral.',
      time: 'Hace 15 min',
    },
    {
      id: 2,
      icon: Heart,
      color: '#e63946',
      text: 'A Yaretzi Hernández y a 14 compañeros más les gustó tu recurso "Formulario de Física".',
      time: 'Hace 1 hora',
    },
    {
      id: 3,
      icon: MessageSquare,
      color: '#2a9d8f',
      text: 'Alan Cruz comentó en tu publicación: "¿Alguien tiene la guía del Examen Diagnóstico?"',
      time: 'Hace 3 horas',
    },
    {
      id: 4,
      icon: Award,
      color: '#f4a261',
      text: '¡Felicidades! Has alcanzado 480 puntos de reputación como Tutor Destacado en UTendencias.',
      time: 'Ayer',
    },
  ];

  return (
    <main className="feed-container">
      <div className="notifications-header card">
        <h2 className="view-title">Notificaciones</h2>
        <p className="view-subtitle">Mantente al tanto de la actividad de tus compañeros y tus dudas publicadas.</p>
      </div>

      <div className="notifications-list">
        {notifications.map((n) => {
          const Icon = n.icon;
          return (
            <div key={n.id} className="notification-card card">
              <div className="notif-icon-box" style={{ backgroundColor: `${n.color}15`, color: n.color }}>
                <Icon size={22} />
              </div>
              <div className="notif-details">
                <p className="notif-text">{n.text}</p>
                <span className="notif-time">{n.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
