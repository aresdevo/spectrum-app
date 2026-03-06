import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Map, CheckCircle } from 'lucide-react';
import { EMOTIONS } from './FeelingCheckin';

const WEEKS = [
    { id: 1, title: 'Three Things in Common' },
    { id: 2, title: 'Similarities & Differences' },
    { id: 3, title: 'Faces of Feeling' },
    { id: 4, title: 'Leaf Project' },
    { id: 5, title: 'Helping Hands' },
    { id: 6, title: 'Autism Trivia' },
    { id: 7, title: 'Mindful Awareness' },
    { id: 8, title: 'Q&A with Speaker' },
    { id: 9, title: 'Problem Solving' },
    { id: 10, title: 'Reflect & Celebrate' }
];

export default function Roadmap() {
    const [completed, setCompleted] = useState({});
    const [feelings, setFeelings] = useState({});

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('spectrum_completed_missions') || '{}');
        setCompleted(saved);

        const savedFeelings = {};
        for (let i = 1; i <= 10; i++) {
            const feeling = localStorage.getItem(`spectrum_weekly_feeling_${i}`);
            if (feeling) {
                savedFeelings[i] = feeling;
            }
        }
        setFeelings(savedFeelings);
    }, []);

    const handleReset = () => {
        if (window.confirm('Are you sure you want to start over? All your missions and feelings will be erased. This cannot be undone!')) {
            localStorage.removeItem('spectrum_completed_missions');
            localStorage.removeItem('spectrum_feeling_history');
            for (let i = 1; i <= 10; i++) {
                localStorage.removeItem(`spectrum_mission_data_${i}`);
                localStorage.removeItem(`spectrum_weekly_feeling_${i}`);
            }
            window.location.reload();
        }
    };

    return (
        <div>
            <div className="dashboard-hero" style={{ background: 'linear-gradient(135deg, var(--primary-blue), #2980b9)' }}>
                <h2>Your Roadmap</h2>
                <p>Complete all 10 missions to become a certified Spectrum Sidekick!</p>
                <Map className="hero-icon" size={120} />
            </div>

            <div className="card-grid">
                {WEEKS.map((week) => (
                    <Link key={week.id} to={`/mission/${week.id}`} className="card" style={{ border: completed[week.id] ? '2px solid #2ecc71' : '' }}>
                        <div className="card-icon-container" style={{ backgroundColor: completed[week.id] ? '#2ecc71' : 'var(--primary-blue)' }}>
                            {completed[week.id] ? <CheckCircle size={32} /> : <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{week.id}</span>}
                        </div>
                        <div className="card-content" style={{ flexGrow: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3>Week {week.id}</h3>
                                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                                    {completed[week.id] && <span style={{ color: '#2ecc71', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Done 🌟</span>}
                                    {feelings[week.id] && <span style={{ fontSize: '1.6rem', marginTop: '2px', lineHeight: '1' }} title={EMOTIONS.find(e => e.id === feelings[week.id])?.label}>{EMOTIONS.find(e => e.id === feelings[week.id])?.icon}</span>}
                                </div>
                            </div>
                            <p>{week.title}</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div style={{ marginTop: '40px', marginBottom: '20px', textAlign: 'center' }}>
                <button
                    onClick={handleReset}
                    style={{ background: 'transparent', color: 'var(--primary-red)', border: '2px solid var(--primary-red)', padding: '12px 24px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', transition: 'all 0.2s ease' }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'var(--primary-red)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--primary-red)'; }}
                >
                    Restart Your Training (Reset Progress)
                </button>
            </div>
        </div>
    );
}
