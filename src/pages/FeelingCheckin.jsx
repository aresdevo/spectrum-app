import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const EMOTIONS = [
    { id: 'happy', icon: '😄', label: 'Happy' },
    { id: 'sad', icon: '😢', label: 'Sad' },
    { id: 'angry', icon: '😠', label: 'Angry' },
    { id: 'scared', icon: '😨', label: 'Scared' },
    { id: 'excited', icon: '🤩', label: 'Excited' },
    { id: 'calm', icon: '😌', label: 'Calm' }
];

export default function FeelingCheckin() {
    const { weekId } = useParams();
    const navigate = useNavigate();

    const handleSelectEmotion = (emotionId) => {
        localStorage.setItem(`spectrum_weekly_feeling_${weekId}`, emotionId);

        // Save to global history log
        const history = JSON.parse(localStorage.getItem('spectrum_feeling_history') || '[]');
        history.push({ date: new Date().toISOString(), emotion: emotionId, week: weekId });
        localStorage.setItem('spectrum_feeling_history', JSON.stringify(history));

        // Redirect back to task
        navigate(-1);
    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Faces of Feeling</h2>
            <p style={{ textAlign: 'center', color: '#7f8fa6', marginBottom: '20px' }}>
                How are you feeling about Week {weekId}'s mission? Tap a face.
            </p>

            <div className="emotions-grid">
                {EMOTIONS.map(emotion => (
                    <div
                        key={emotion.id}
                        className="emotion-card"
                        onClick={() => handleSelectEmotion(emotion.id)}
                    >
                        <div className="emotion-icon">{emotion.icon}</div>
                        <strong>{emotion.label}</strong>
                    </div>
                ))}
            </div>
        </div>
    );
}
