import React, { useState } from 'react';
import { BookOpen, FileText, Download, Bookmark, PlusCircle, CheckCircle2 } from 'lucide-react';

export default function ResourcesView({ savedResources, onToggleSaveResource }) {
  const [selectedSubject, setSelectedSubject] = useState('Todas');

  const resources = [
    {
      id: 1,
      title: 'Guía Completa de Cálculo Diferencial e Integral',
      subject: 'Matemáticas',
      author: 'Brandon Montoya',
      type: 'PDF / Apunte',
      downloads: 342,
      date: '15 Sep 2026',
      description: 'Resumen de derivadas, integrales por partes y ejemplos resueltos paso a paso.',
    },
    {
      id: 2,
      title: 'Formulario de Física I - Mecánica Clásica',
      subject: 'Física',
      author: 'Alan Cruz',
      type: 'Formulario',
      downloads: 512,
      date: '20 Sep 2026',
      description: 'Leyes de Newton, cinemática y vectores con esquemas explicativos.',
    },
    {
      id: 3,
      title: 'Ejercicios de Programación Orientada a Objetos en Java',
      subject: 'Programación',
      author: 'Mariano Calzadilla',
      type: 'Código / Ejercicios',
      downloads: 289,
      date: '28 Sep 2026',
      description: 'Casos prácticos de clases, herencia, polimorfismo y patrones de diseño.',
    },
    {
      id: 4,
      title: 'Guía para Formulación de Proyectos de TI',
      subject: 'Formulación de Proyectos',
      author: 'Yaretzi Hernández',
      type: 'Documento / Guía',
      downloads: 198,
      date: '01 Oct 2026',
      description: 'Plantilla de justificación, análisis FODA y estudio de factibilidad técnica.',
    },
  ];

  const subjects = ['Todas', 'Matemáticas', 'Física', 'Programación', 'Formulación de Proyectos'];

  const filtered = selectedSubject === 'Todas' ? resources : resources.filter((r) => r.subject === selectedSubject);

  return (
    <main className="feed-container">
      <div className="resources-header card">
        <div className="header-top">
          <div>
            <h2 className="view-title">Repositorio de Recursos Académicos</h2>
            <p className="view-subtitle">Apuntes, guías, formularios y videos compartidos por estudiantes de la UTTT.</p>
          </div>
          <button className="pill-btn pill-btn-solid">
            <PlusCircle size={18} />
            <span>Subir Recurso</span>
          </button>
        </div>

        <div className="subject-filters">
          {subjects.map((sub) => (
            <button
              key={sub}
              className={`filter-chip ${selectedSubject === sub ? 'active' : ''}`}
              onClick={() => setSelectedSubject(sub)}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      <div className="resources-grid">
        {filtered.map((res) => {
          const isSaved = savedResources?.some((sr) => sr.id === res.id);
          return (
            <div key={res.id} className="resource-card card">
              <div className="resource-badge-row">
                <span className="badge badge-green">{res.subject}</span>
                <span className="resource-type">{res.type}</span>
              </div>

              <h3 className="resource-title">{res.title}</h3>
              <p className="resource-desc">{res.description}</p>

              <div className="resource-meta">
                <span>Por <strong>{res.author}</strong></span>
                <span>{res.date}</span>
              </div>

              <div className="resource-footer">
                <span className="download-count">
                  <Download size={16} /> {res.downloads} descargas
                </span>
                <div className="resource-actions">
                  <button
                    className={`pill-btn ${isSaved ? 'pill-btn-solid' : ''}`}
                    onClick={() => onToggleSaveResource && onToggleSaveResource(res)}
                    title={isSaved ? 'Guardado en Colección' : 'Guardar en Colección'}
                  >
                    <Bookmark size={16} fill={isSaved ? '#ffffff' : 'none'} />
                    <span>{isSaved ? 'Guardado' : 'Guardar'}</span>
                  </button>
                  <button className="pill-btn">
                    <span>Descargar PDF</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
