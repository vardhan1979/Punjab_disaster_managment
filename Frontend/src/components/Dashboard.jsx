import React, { useState } from 'react';
import ArticlesPage from './Article';  


const INITIAL_RESOURCES = [
  {
    id: 1,
    title: "Sutlej River Flood Drill",
    category: "Floods",
    content: "Official evacuation steps for schools in Firozpur and Fazilka districts. 1. Move to the second floor. 2. Disconnect electricity. 3. Follow the Village Sarpanch’s megaphone instructions.",
    videoUrl: "https://www.youtube.com/embed/43M5mZuzHF8", 
    date: "2026-04-01",
    author: "PSDMA"
  },
  {
    id: 2,
    title: "Earthquake: School Safety",
    category: "Earthquake",
    content: "Punjab is high-risk. During a tremor: Drop, Cover, Hold. Do not use elevators. Stay away from glass windows in the laboratory.",
    videoUrl: "https://www.youtube.com/embed/BLEPakj1YTY", 
    date: "2026-03-28",
    author: "NDMA India"
  },
  {
    id: 3,
    title: "Chemical Leak: Industrial Safety",
    category: "Industrial",
    content: "For students near Ludhiana industrial hubs. If you smell gas: 1. Cover face with wet cloth. 2. Move crosswind. 3. Seal the classroom doors.",
    videoUrl: "https://www.youtube.com/embed/Xqs8_jf1gzQ", 
    date: "2026-03-20",
    author: "Safety Board"
  },
  {
    id: 4,
    title: "Basic First Aid Training",
    category: "Health",
    content: "How to handle fractures and heavy bleeding until the ambulance arrives. Essential for every student volunteer.",
    videoUrl: "https://www.youtube.com/embed/5OKFljZ2GQE", 
    date: "2026-03-15",
    author: "Red Cross"
  },
  {
    id: 5,
    title: "Forest Fire Prevention",
    category: "Fire",
    content: "Guidelines for schools near the Shivalik foothills. Learn how to create fire-breaks and report small bushfires early.",
    videoUrl: "https://www.youtube.com/embed/DSD4j-gC34E", 
    date: "2026-03-10",
    author: "Forest Dept"
  }
];

const Dashboard = ({ user, onLogout }) => {
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [selectedArt, setSelectedArt] = useState(null);
  const [filter, setFilter] = useState("All");
  const [currentView, setCurrentView] = useState('home');  
  const [newArt, setNewArt] = useState({ title: '', content: '', videoUrl: '', category: 'General' });

  const activeUser = user || { name: "Vardhan Reddy", role: "admin" };

  const formatYT = (url) => {
    if (url.includes("watch?v=")) return url.replace("watch?v=", "embed/").split("&")[0];
    if (url.includes("youtu.be/")) return url.replace("youtu.be/", "youtube.com/embed/");
    return url;
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const article = { ...newArt, id: Date.now(), videoUrl: formatYT(newArt.videoUrl), date: "Today" };
    setResources([article, ...resources]);
    setNewArt({ title: '', content: '', videoUrl: '', category: 'General' });
  };

const styles = {
    wrapper: { display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Segoe UI, sans-serif' },
    sidebar: { width: '260px', backgroundColor: '#002e5d', color: 'white', padding: '20px', z_index: 10 },
    
 
    main: { 
      flex: 1, 
      padding: '40px', 
      overflowY: 'auto',
      backgroundImage: `linear-gradient(rgba(248, 250, 252, 0.8), rgba(248, 250, 252, 0.8)), url('./assests/images.jpeg')`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat'
    },


    navLink: (active) => ({ 
      padding: '12px', 
      borderRadius: '8px', 
      cursor: 'pointer', 
      backgroundColor: active ? '#ffffff22' : 'transparent', 
      marginBottom: '10px',
      transition: '0.3s'
    }),
    statCard: { backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', flex: 1 },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '25px', marginTop: '20px' },
    card: { backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', border: '1px solid #eee' },
    badge: { padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', backgroundColor: '#e0f2fe', color: '#0369a1' }
  };


  const renderContent = () => {

    if (selectedArt) {
      return (
        <div>
          <button onClick={() => setSelectedArt(null)} style={{ marginBottom: '20px', cursor: 'pointer' }}>← Back to Dashboard</button>
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '20px' }}>
            <span style={styles.badge}>{selectedArt.category}</span>
            <h1 style={{ color: '#002e5d', margin: '15px 0' }}>{selectedArt.title}</h1>
            <iframe width="100%" height="500" src={selectedArt.videoUrl} title="Video" frameBorder="0" allowFullScreen style={{ borderRadius: '15px', marginBottom: '30px' }}></iframe>
            <p style={{ lineHeight: '1.8', fontSize: '1.2rem', whiteSpace: 'pre-wrap' }}>{selectedArt.content}</p>
          </div>
        </div>
      );
    }

 
    if (currentView === 'articles') {
      return <ArticlesPage onBack={() => setCurrentView('home')} />;
    }

  
    return (
      <>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ color: '#0f172a', margin: 0 }}>Portal Overview</h1>
            <p style={{ color: '#64748b' }}>Welcome back, {activeUser.name}</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {["All", "Floods", "Earthquake", "Fire", "Health"].map(cat => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)} 
                style={{ 
                  padding: '8px 15px', borderRadius: '20px', border: '1px solid #ddd', cursor: 'pointer', 
                  backgroundColor: filter === cat ? '#ff9933' : 'white', 
                  color: filter === cat ? 'white' : 'black' 
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
          <div style={styles.statCard}><h3>{resources.length}</h3><p>Total Modules</p></div>
          <div style={styles.statCard}><h3>1,240</h3><p>Students Trained</p></div>
          <div style={styles.statCard}><h3>94%</h3><p>Drill Success</p></div>
        </div>

        {(activeUser.role === 'educator' || activeUser.role === 'admin') && (
          <section style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '15px', marginBottom: '40px' }}>
            <h3 style={{ marginTop: 0 }}>Publish New Training Video</h3>
            <form onSubmit={handleUpload} style={{ display: 'flex', gap: '15px' }}>
              <input style={{ flex: 1, padding: '12px' }} placeholder="Title" value={newArt.title} onChange={e => setNewArt({...newArt, title: e.target.value})} required />
              <input style={{ flex: 1, padding: '12px' }} placeholder="YouTube Link" value={newArt.videoUrl} onChange={e => setNewArt({...newArt, videoUrl: e.target.value})} required />
              <button type="submit" style={{ padding: '12px 30px', backgroundColor: '#002e5d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Publish Now</button>
            </form>
          </section>
        )}

        <div style={styles.grid}>
          {resources.filter(r => filter === "All" || r.category === filter).map(res => (
            <div key={res.id} style={styles.card}>
              <iframe width="100%" height="200" src={res.videoUrl} title="T" frameBorder="0"></iframe>
              <div style={{ padding: '20px' }}>
                <span style={styles.badge}>{res.category}</span>
                <h3 style={{ color: '#1e293b', margin: '12px 0' }}>{res.title}</h3>
                <p style={{ fontSize: '14px', color: '#64748b' }}>{res.content.substring(0, 90)}...</p>
                <button onClick={() => setSelectedArt(res)} style={{ width: '100%', marginTop: '15px', padding: '10px', background: '#f1f5f9', border: 'none', fontWeight: 'bold', cursor: 'pointer', borderRadius: '8px' }}>View Full Lesson</button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div style={styles.wrapper}>
      {/* SIDEBAR NAVIGATION */}
      <aside style={styles.sidebar}>
        <h2 style={{ borderBottom: '1px solid #ffffff33', paddingBottom: '15px' }}>Punjab Safety</h2>
        <nav style={{ marginTop: '30px' }}>
          <div 
            onClick={() => { setSelectedArt(null); setCurrentView('home'); }} 
            style={styles.navLink(currentView === 'home' && !selectedArt)}
          >
            🏠 Dashboard Home
          </div>
          
          {/* NEW ARTICLES TAB */}
          <div 
            onClick={() => { setSelectedArt(null); setCurrentView('articles'); }} 
            style={styles.navLink(currentView === 'articles')}
          >
            📄 Training Articles
          </div>

          
         
        </nav>
      </aside>

      <main style={styles.main}>
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;