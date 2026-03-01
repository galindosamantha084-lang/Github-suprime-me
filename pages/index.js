import React, { useState, useEffect } from 'react';
import ChatBar from '../components/ChatBar';
import Logo from '../components/Logo';
import Link from 'next/link';

export default function Home() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth/user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          fetchProjects(userData.id);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const fetchProjects = async (userId) => {
    try {
      const response = await fetch(`/api/projects?userId=${userId}`);
      if (response.ok) {
        const projectsData = await response.json();
        setProjects(projectsData);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <Logo />
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/workspace">Workspace</Link>
          <Link href="/dashboard">Dashboard</Link>
          {user && <span className="user-info">{user.name}</span>}
        </nav>
      </header>

      <main className="main-content">
        <section className="hero">
          <h1>Build Anything with AI</h1>
          <p>Create, code, and deploy with Poppy Play AI powered by GitHub Copilot</p>
          <div className="cta-buttons">
            <Link href="/workspace" className="btn btn-primary">
              Start Building
            </Link>
            <Link href="/dashboard" className="btn btn-secondary">
              View Projects
            </Link>
          </div>
        </section>

        <section className="features">
          <h2>Why Choose Poppy Play AI?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🤖 AI-Powered</h3>
              <p>GitHub Copilot integration for instant code generation</p>
            </div>
            <div className="feature-card">
              <h3>💬 Smart Chat</h3>
              <p>Ask Anything, Say Anything - AI understands your requests</p>
            </div>
            <div className="feature-card">
              <h3>📁 Repository Ready</h3>
              <p>Create and manage GitHub repositories directly</p>
            </div>
            <div className="feature-card">
              <h3>🎨 Live Preview</h3>
              <p>See your code in action instantly</p>
            </div>
            <div className="feature-card">
              <h3>⬇️ Download & Deploy</h3>
              <p>Download projects or publish to App Store</p>
            </div>
            <div className="feature-card">
              <h3>🔐 Secure & Fast</h3>
              <p>Enterprise-grade security with blazing fast performance</p>
            </div>
          </div>
        </section>

        {user && (
          <section className="recent-projects">
            <h2>Your Recent Projects</h2>
            {projects.length > 0 ? (
              <div className="projects-grid">
                {projects.map((project) => (
                  <Link key={project.id} href={`/workspace?projectId=${project.id}`}> 
                    <div className="project-card">
                      <h3>{project.name}</h3>
                      <p>{project.description}</p>
                      <span className="project-date">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="no-projects">No projects yet. Start by creating a new project!</p>
            )}
          </section>
        )}
      </main>

      <style jsx>{`
        .home-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          background: rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
        }
        .nav {
          display: flex;
          gap: 30px;
          align-items: center;
        }
        .nav a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.3s;
        }
        .nav a:hover {
          opacity: 0.8;
        }
        .main-content {
          padding: 60px 40px;
        }
        .hero {
          text-align: center;
          color: white;
          margin-bottom: 80px;
        }
        .hero h1 {
          font-size: 3.5em;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }
        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 30px;
        }
        .btn {
          padding: 12px 30px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s;
        }
        .btn:hover {
          transform: translateY(-2px);
        }
        .btn-primary {
          background: white;
          color: #667eea;
        }
        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }
        .features {
          margin: 60px 0;
        }
        .features h2 {
          color: white;
          text-align: center;
          font-size: 2.5em;
          margin-bottom: 40px;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        .feature-card {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        .feature-card h3 {
          color: #667eea;
          margin-bottom: 10px;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }
        .project-card {
          background: white;
          padding: 20px;
          border-radius: 10px;
          cursor: pointer;
          transition: transform 0.3s;
        }
        .project-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        }
      `}
      </style>
    </div>
  );
}