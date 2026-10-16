import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import CreatePost from './CreatePost';
import PostCard from './PostCard';

export default function Feed({ posts, onAddPost, onPostClick, currentUser }) {
  const [tab, setTab] = useState('para_ti');

  const filteredPosts = posts.filter((p) => {
    if (tab === 'siguiendo') return p.handle !== '@utendencias';
    return true;
  });

  return (
    <main className="feed-container">
      {/* Feed Header */}
      <div className="feed-header">
        <div className="tab-switcher">
          <button
            className={`tab-btn ${tab === 'para_ti' ? 'active' : ''}`}
            onClick={() => setTab('para_ti')}
          >
            Para ti
          </button>
          <button
            className={`tab-btn ${tab === 'siguiendo' ? 'active' : ''}`}
            onClick={() => setTab('siguiendo')}
          >
            Siguiendo
          </button>
        </div>

        <button className="preferences-btn">
          <Settings size={18} />
          <span>Preferencias</span>
        </button>
      </div>

      {/* Post Creator Box */}
      <CreatePost onAddPost={onAddPost} currentUser={currentUser} />

      {/* Posts List */}
      <div className="posts-list">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} onPostClick={onPostClick} />
        ))}
      </div>
    </main>
  );
}
