import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import Feed from './components/Feed';
import ExploreView from './components/ExploreView';
import ResourcesView from './components/ResourcesView';
import NotificationsView from './components/NotificationsView';
import ProfileView from './components/ProfileView';
import PostDetailView from './components/PostDetailView';
import SavedView from './components/SavedView';
import CreatePostModal from './components/CreatePostModal';
import CreateCollectionModal from './components/CreateCollectionModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Seed Data matching screenshot
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'UTendencias Oficial',
      handle: '@utendencias',
      avatar: 'UT',
      time: 'hace 2 min',
      content: 'La feria de proyectos de fin de carrera ya tiene fecha: 18 de mayo en el patio central.',
      topic: '#FeriaUT',
      location: 'Patio central',
      comments: 18,
      reposts: 7,
      likes: 124,
      shares: 32,
      isSaved: false,
    },
    {
      id: 2,
      author: 'Club Literario UTTT',
      handle: '@club_literario',
      avatar: 'CL',
      time: 'hace 14 min',
      content: '¿Qué libro universitario te marcó este semestre? Comparte una recomendación y etiqueta a un compañero.',
      topic: '#LecturaUT',
      category: '#LibrosUT',
      comments: 42,
      reposts: 12,
      likes: 86,
      shares: 19,
      isSaved: true, // Example pre-saved item
    },
    {
      id: 3,
      author: 'Deportes UTTT',
      handle: '@deportes_ut',
      avatar: 'DR',
      time: 'hace 31 min',
      content: 'El equipo de baloncesto universitario busca refuerzos para el próximo torneo interfacultades.',
      topic: '#DeportesUT',
      location: 'Gimnasio central',
      comments: 11,
      reposts: 4,
      likes: 67,
      shares: 14,
      isSaved: false,
    },
  ]);

  // Saved Items State
  const [savedResources, setSavedResources] = useState([
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
  ]);

  // Custom Collections State
  const [collections, setCollections] = useState([
    {
      id: 101,
      title: 'Exámenes de Cálculo',
      description: 'Guías y ejercicios resueltos para parciales',
      icon: '📘',
    },
    {
      id: 102,
      title: 'Proyectos TI',
      description: 'Documentos de formulación y prototipos',
      icon: '💻',
    },
  ]);

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleToggleSavePost = (targetPost, isSaved) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === targetPost.id ? { ...p, isSaved } : p))
    );
  };

  const handleToggleSaveResource = (targetResource) => {
    const exists = savedResources.some((r) => r.id === targetResource.id);
    if (exists) {
      setSavedResources(savedResources.filter((r) => r.id !== targetResource.id));
    } else {
      setSavedResources([...savedResources, targetResource]);
    }
  };

  const handleCreateCollection = (newCollection) => {
    setCollections([...collections, newCollection]);
  };

  const savedPosts = posts.filter((p) => p.isSaved);

  return (
    <div className="app-container">
      <div className="main-content-layout">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSelectedPost(null);
          }}
          onOpenModal={() => setIsModalOpen(true)}
        />

        {/* Center Main View */}
        {selectedPost ? (
          <PostDetailView post={selectedPost} onBack={() => setSelectedPost(null)} />
        ) : (
          <>
            {activeTab === 'inicio' && (
              <Feed
                posts={posts}
                onAddPost={handleAddPost}
                onPostClick={handlePostClick}
              />
            )}
            {activeTab === 'explorar' && (
              <ExploreView posts={posts} onPostClick={handlePostClick} />
            )}
            {activeTab === 'recursos' && (
              <ResourcesView
                savedResources={savedResources}
                onToggleSaveResource={handleToggleSaveResource}
              />
            )}
            {activeTab === 'guardados' && (
              <SavedView
                savedPosts={savedPosts}
                savedResources={savedResources}
                collections={collections}
                onOpenCreateCollectionModal={() => setIsCollectionModalOpen(true)}
                onPostClick={handlePostClick}
                onToggleSavePost={handleToggleSavePost}
                onToggleSaveResource={handleToggleSaveResource}
              />
            )}
            {activeTab === 'notificaciones' && <NotificationsView />}
            {activeTab === 'perfil' && (
              <ProfileView
                userPosts={posts.filter((p) => p.handle === '@alumno_ut')}
                onPostClick={handlePostClick}
              />
            )}
          </>
        )}

        {/* Right Sidebar */}
        <RightSidebar onFilterTopic={() => setActiveTab('explorar')} />
      </div>

      {/* Floating Create Post Modal */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddPost={handleAddPost}
      />

      {/* Floating Create Collection Modal */}
      <CreateCollectionModal
        isOpen={isCollectionModalOpen}
        onClose={() => setIsCollectionModalOpen(false)}
        onCreateCollection={handleCreateCollection}
      />
    </div>
  );
}
