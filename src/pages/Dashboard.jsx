import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wind, Smile, Map, ShieldAlert } from 'lucide-react';

export default function Dashboard() {
    const [completedCount, setCompletedCount] = useState(0);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('spectrum_completed_missions') || '{}');
        const count = Object.values(saved).filter(val => val === true).length;
        setCompletedCount(count);
    }, []);

    return (
        <div>
            <div className="dashboard-hero">
                <h2>Welcome, Sidekick!</h2>
                <p>Ready to start your training for the day?</p>
                <ShieldAlert className="hero-icon" size={120} />
            </div>

            <div className="card-grid">
                <Link to="/roadmap" className="card">
                    <div className="card-icon-container bg-blue">
                        <Map size={32} />
                    </div>
                    <div className="card-content">
                        <h3>Your Roadmap</h3>
                        <p>{completedCount}/10 Missions Completed</p>
                    </div>
                </Link>

                <Link to="/breathe" className="card red">
                    <div className="card-icon-container bg-red">
                        <Wind size={32} />
                    </div>
                    <div className="card-content">
                        <h3>Take a Breath</h3>
                        <p>Feeling stressed? Let's take a break.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
