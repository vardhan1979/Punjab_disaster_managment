import React, { useState } from 'react';

// RAW DATA: Punjab-Specific Disaster Management Articles
const RAW_ARTICLES = [
  {
    id: 1,
    title: "Stubble Burning: Respiratory Safety",
    category: "Health",
    description: "Essential guide for students during the stubble burning season in Punjab.",
    content: "During October-November, air quality indexes (AQI) in Punjab often cross 400. 1. Wear N95 masks when traveling to school. 2. Keep classroom windows closed. 3. Avoid outdoor physical education during high smog hours. 4. Identify students with asthma for special care.",
    videoUrl: "https://www.youtube.com/embed/S2p_7f-t7Lg",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Chemical Leak Protocol - Industrial Zones",
    category: "Industrial",
    description: "Safety measures for schools near Ludhiana and Mandi Gobindgarh industrial hubs.",
    content: "In case of a chemical gas leak: 1. Move upwind (opposite to the wind direction). 2. Seal doors and vents with wet towels. 3. Cover your nose with a damp cloth. 4. Wait for official clearance from the District Magistrate before evacuating.",
    videoUrl: "https://www.youtube.com/embed/vX_S0X_G_No",
    readTime: "8 min"
  },
  {
    id: 3,
    title: "Heatwave Management in Malwa",
    category: "Weather",
    description: "How to stay safe during the intense summer heat in the Malwa belt.",
    content: "Heatstroke is common in districts like Bathinda and Mansa. - Schools must ensure ORS availability. - Class timings should be shifted to early morning. - Students must carry cotton umbrellas and water bottles. - Look for signs of fainting or dizziness.",
    videoUrl: "https://www.youtube.com/embed/nUeJ3Gv_7wE",
    readTime: "4 min"
  }
];

const ArticlesPage = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [reading, setReading] = useState(null);

  const filteredArticles = RAW_ARTICLES.filter(art => 
    (filter === "All" || art.category === filter) &&
    art.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const styles = {
    container: { padding: '30px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' },
    searchBar: { padding: '12px', width: '300px', borderRadius: '8px', border: '1px solid #ccc', marginRight: '10px' },
    filterBtn: (active) => ({
      padding: '8px 15px', borderRadius: '20px', border: '1px solid #002e5d', 
      backgroundColor: active ? '#002e5d' : 'white', color: active ? 'white' : '#002e5d',
      cursor: 'pointer', marginRight: '10px', fontSize: '14px'
    }),
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' },
    articleCard: { backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', cursor: 'pointer' },
    readView: { backgroundColor: 'white', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }
  };

  // IF USER IS READING A SPECIFIC ARTICLE
  if (reading) {
    return (
      <div style={styles.container}>
        <button onClick={() => setReading(null)} style={{ marginBottom: '20px', cursor: 'pointer' }}>← Back to Library</button>
        <div style={styles.readView}>
          <span style={{ color: '#ff9933', fontWeight: 'bold' }}>{reading.category.toUpperCase()}</span>
          <h1 style={{ fontSize: '2.5rem', color: '#002e5d', marginTop: '10px' }}>{reading.title}</h1>
          <div style={{ display: 'flex', gap: '20px', color: '#666', marginBottom: '30px' }}>
             <span>⏱ {reading.readTime} read</span>
             <span>📅 Updated: April 2026</span>
          </div>
          <iframe width="100%" height="450" src={reading.videoUrl} title="Video" allowFullScreen style={{ borderRadius: '12px', border: 'none', marginBottom: '30px' }}></iframe>
          <div style={{ lineHeight: '1.8', fontSize: '1.2rem', color: '#333', whiteSpace: 'pre-wrap' }}>{reading.content}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div>
          <h1 style={{ color: '#002e5d', margin: 0 }}>Resource Library</h1>
          <p style={{ color: '#666' }}>Official Training Guides for Punjab Schools & Colleges</p>
        </div>
        <button onClick={onBack} style={{ background: 'none', border: '1px solid #002e5d', padding: '10px', borderRadius: '5px' }}>Dashboard</button>
      </header>

      <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center' }}>
        <input 
          style={styles.searchBar} 
          placeholder="Search articles (e.g. Flood, Smog)..." 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {["All", "Health", "Industrial", "Weather"].map(cat => (
          <button 
            key={cat} 
            style={styles.filterBtn(filter === cat)} 
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={styles.grid}>
        {filteredArticles.map(art => (
          <div key={art.id} style={styles.articleCard} onClick={() => setReading(art)}>
            <div style={{ height: '4px', backgroundColor: '#ff9933', width: '40px', marginBottom: '15px' }}></div>
            <span style={{ fontSize: '12px', color: '#666' }}>{art.category}</span>
            <h3 style={{ margin: '10px 0', color: '#002e5d' }}>{art.title}</h3>
            <p style={{ color: '#555', fontSize: '14px', lineHeight: '1.5' }}>{art.description}</p>
            <p style={{ color: '#002e5d', fontWeight: 'bold', marginTop: '20px', fontSize: '14px' }}>READ MODULE →</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticlesPage;