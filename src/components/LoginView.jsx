import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, GraduationCap, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export default function LoginView({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Form states
  const [emailOrId, setEmailOrId] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [handle, setHandle] = useState('');
  const [career, setCareer] = useState('Ingeniería en Tecnologías de la Información');
  const [group, setGroup] = useState('7ITIID - G3');
  const [rememberMe, setRememberMe] = useState(true);

  const careersList = [
    'Ingeniería en Tecnologías de la Información',
    'Ingeniería Mecatrónica',
    'Ingeniería en Mantenimiento Industrial',
    'Ingeniería en Procesos Industriales',
    'Ingeniería en Energías Renovables',
    'Licenciatura en Innovación de Negocios y Mercadotecnia',
  ];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!emailOrId.trim() || !password.trim()) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }

    // Generate user profile from login
    const isEmail = emailOrId.includes('@');
    const computedHandle = isEmail ? `@${emailOrId.split('@')[0].toLowerCase()}` : `@${emailOrId.toLowerCase()}`;
    const initials = (emailOrId.slice(0, 2) || 'UT').toUpperCase();

    const userData = {
      name: emailOrId.includes('mariano') ? 'Mariano Calzadilla Alvarez' : (emailOrId.split('@')[0] || 'Estudiante UTTT'),
      handle: computedHandle,
      email: isEmail ? emailOrId : `${emailOrId}@uttt.edu.mx`,
      avatar: initials,
      career: 'Ingeniería en Tecnologías de la Información',
      group: '7ITIID - G3',
      points: 480,
      reputation: 'Estudiante Colaborador 🌟',
      joined: 'Octubre 2026',
      rememberMe,
    };

    onLogin(userData);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !emailOrId.trim() || !password.trim()) {
      setError('Por favor llena los campos obligatorios para registrarte.');
      return;
    }

    const initials = fullName
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'UT';

    const cleanHandle = handle.trim()
      ? (handle.startsWith('@') ? handle : `@${handle}`)
      : `@${emailOrId.split('@')[0].toLowerCase()}`;

    const newUserData = {
      name: fullName,
      handle: cleanHandle,
      email: emailOrId.includes('@') ? emailOrId : `${emailOrId}@uttt.edu.mx`,
      avatar: initials,
      career: career,
      group: group || '7ITIID - G3',
      points: 50, // Puntos de bienvenida por registrarse
      reputation: 'Nuevo Colaborador 🌱',
      joined: 'Octubre 2026',
      rememberMe,
    };

    onLogin(newUserData);
  };

  // Quick Demo Access for evaluation
  const handleQuickDemo = (demoType) => {
    if (demoType === 'mariano') {
      onLogin({
        name: 'Mariano Calzadilla Alvarez',
        handle: '@alumno_ut',
        email: 'mariano.calzadilla@uttt.edu.mx',
        avatar: 'AL',
        career: 'Ingeniería en Tecnologías de la Información',
        group: '7ITIID - G3',
        points: 480,
        reputation: 'Tutor Destacado 🌟',
        joined: 'Septiembre 2026',
        rememberMe: true,
      });
    } else if (demoType === 'brandon') {
      onLogin({
        name: 'Brandon Daniel Montoya Aldana',
        handle: '@brandon_m',
        email: 'brandon.montoya@uttt.edu.mx',
        avatar: 'BM',
        career: 'Ingeniería en Tecnologías de la Información',
        group: '7ITIID - G3',
        points: 390,
        reputation: 'Colaborador Experto 💡',
        joined: 'Septiembre 2026',
        rememberMe: true,
      });
    }
  };

  return (
    <div className="login-page">
      {/* Background Decorative Blobs */}
      <div className="login-bg-blob login-bg-blob-1"></div>
      <div className="login-bg-blob login-bg-blob-2"></div>

      <div className="login-container">
        {/* Left Side: Branding / Presentation */}
        <div className="login-hero-card">
          <div className="login-hero-header">
            <div className="brand-logo login-logo">
              <svg viewBox="0 0 100 60" className="ut-logo-svg">
                <path d="M10,15 L35,15 L30,45 L15,45 Z" fill="#1C5D3F" />
                <path d="M38,15 L90,15 L85,45 L43,45 Z" fill="#237A53" />
              </svg>
            </div>
            <h1 className="login-hero-title">
              <span>UT</span>endencias
            </h1>
          </div>

          <p className="login-hero-subtitle">
            Plataforma colaborativa exclusiva de alumno a alumno para la comunidad de la <strong>Universidad Tecnológica de Tula-Tepeji</strong>.
          </p>

          <div className="login-features-list">
            <div className="login-feature-item">
              <div className="login-feat-icon">
                <CheckCircle2 size={18} />
              </div>
              <div className="login-feat-text">
                <strong>Resuelve dudas académicas</strong>
                <span>Pregunta y recibe explicaciones claras de compañeros de materias críticas.</span>
              </div>
            </div>

            <div className="login-feature-item">
              <div className="login-feat-icon">
                <GraduationCap size={18} />
              </div>
              <div className="login-feat-text">
                <strong>Repositorio Centralizado</strong>
                <span>Accede a guías, apuntes y formularios para evitar perder material en chats de WhatsApp.</span>
              </div>
            </div>

            <div className="login-feature-item">
              <div className="login-feat-icon">
                <Sparkles size={18} />
              </div>
              <div className="login-feat-text">
                <strong>Guarda y Colecciona</strong>
                <span>Crea carpetas organizadas por parciales y asignaturas con tus temas favoritos.</span>
              </div>
            </div>
          </div>

          <div className="login-institution-badge">
            <ShieldCheck size={20} />
            <span>Materia: Formulación de Proyectos · Grupo 7ITIID - G3</span>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="login-form-card card">
          {/* Tabs */}
          <div className="login-tabs">
            <button
              type="button"
              className={`login-tab-btn ${!isRegister ? 'active' : ''}`}
              onClick={() => {
                setIsRegister(false);
                setError('');
              }}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              className={`login-tab-btn ${isRegister ? 'active' : ''}`}
              onClick={() => {
                setIsRegister(true);
                setError('');
              }}
            >
              Registrarse
            </button>
          </div>

          {/* Form Header */}
          <div className="login-form-header">
            <h2>{isRegister ? 'Crea tu cuenta institucional' : '¡Bienvenido de vuelta!'}</h2>
            <p>
              {isRegister
                ? 'Ingresa tus datos universitarios para unirte a la red.'
                : 'Ingresa con tu correo institucional o matrícula UTTT.'}
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="login-error-banner">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {/* Form Content */}
          <form onSubmit={isRegister ? handleRegisterSubmit : handleLoginSubmit} className="login-actual-form">
            {isRegister && (
              <>
                <div className="login-input-group">
                  <label>Nombre Completo</label>
                  <div className="login-input-wrapper">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      placeholder="Ej. Alan Cruz Reyes"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={isRegister}
                    />
                  </div>
                </div>

                <div className="login-input-group">
                  <label>Usuario (@handle)</label>
                  <div className="login-input-wrapper">
                    <span className="input-prefix">@</span>
                    <input
                      type="text"
                      placeholder="alancruz"
                      value={handle.replace('@', '')}
                      onChange={(e) => setHandle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="login-input-row">
                  <div className="login-input-group">
                    <label>Carrera</label>
                    <select
                      value={career}
                      onChange={(e) => setCareer(e.target.value)}
                      className="login-select"
                    >
                      {careersList.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="login-input-group login-group-small">
                    <label>Grupo</label>
                    <input
                      type="text"
                      placeholder="7ITIID - G3"
                      value={group}
                      onChange={(e) => setGroup(e.target.value)}
                      className="login-input-text"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="login-input-group">
              <label>Correo Institucional o Matrícula</label>
              <div className="login-input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="text"
                  placeholder="ejemplo@uttt.edu.mx o 20261234"
                  value={emailOrId}
                  onChange={(e) => setEmailOrId(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-input-group">
              <div className="label-with-link">
                <label>Contraseña</label>
                {!isRegister && (
                  <button type="button" className="forgot-password-link" onClick={() => alert('Para fines de demostración académica, puedes usar cualquier contraseña o hacer clic en "Acceso Rápido Demo".')}>
                    ¿Olvidaste tu contraseña?
                  </button>
                )}
              </div>
              <div className="login-input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="login-checkbox-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Recordar sesión en este equipo</span>
              </label>
            </div>

            <button type="submit" className="pill-btn pill-btn-solid login-submit-btn">
              <span>{isRegister ? 'Registrarme e Ingresar' : 'Iniciar Sesión'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Quick Demo Access Divider */}
          <div className="login-divider">
            <span>O ingresa rápido para evaluación</span>
          </div>

          <div className="quick-demo-buttons">
            <button
              type="button"
              className="demo-account-btn"
              onClick={() => handleQuickDemo('mariano')}
            >
              <div className="avatar avatar-sm">AL</div>
              <div className="demo-info">
                <strong>@alumno_ut (Mariano Calzadilla)</strong>
                <span>Tutor Destacado · 7ITIID - G3</span>
              </div>
              <span className="demo-badge">Probar</span>
            </button>

            <button
              type="button"
              className="demo-account-btn"
              onClick={() => handleQuickDemo('brandon')}
            >
              <div className="avatar avatar-sm">BM</div>
              <div className="demo-info">
                <strong>@brandon_m (Brandon Montoya)</strong>
                <span>Colaborador · 7ITIID - G3</span>
              </div>
              <span className="demo-badge">Probar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
