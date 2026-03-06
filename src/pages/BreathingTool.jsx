import { useState, useEffect } from 'react';
import { Wind } from 'lucide-react';

export default function BreathingTool() {
    const [phase, setPhase] = useState('ready'); // ready, inhale, hold1, exhale, hold2
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (phase === 'ready' || timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(t => t - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [phase, timeLeft]);

    useEffect(() => {
        if (phase !== 'ready' && timeLeft === 0) {
            if (phase === 'inhale') {
                setPhase('hold1');
                setTimeLeft(4);
            } else if (phase === 'hold1') {
                setPhase('exhale');
                setTimeLeft(4);
            } else if (phase === 'exhale') {
                setPhase('hold2');
                setTimeLeft(4);
            } else if (phase === 'hold2') {
                setPhase('inhale');
                setTimeLeft(4);
            }
        }
    }, [timeLeft, phase]);

    const startBreathing = () => {
        setPhase('inhale');
        setTimeLeft(4);
    };

    const getPhaseText = () => {
        switch (phase) {
            case 'ready': return 'Ready to start Box Breathing?';
            case 'inhale': return 'Breathe In...';
            case 'hold1': return 'Hold...';
            case 'exhale': return 'Breathe Out...';
            case 'hold2': return 'Hold...';
            default: return '';
        }
    };

    return (
        <div className="breathing-container">
            <div className="breathing-status">{getPhaseText()}</div>

            <div className="breath-circle-container">
                {phase === 'ready' ? (
                    <Wind size={80} color="var(--primary-blue)" opacity={0.5} />
                ) : (
                    <div
                        className="breath-circle"
                        style={{
                            transition: 'transform 4s linear',
                            transform: phase === 'inhale' ? 'scale(1.5)' :
                                phase === 'exhale' ? 'scale(1)' :
                                    phase === 'hold1' ? 'scale(1.5)' : 'scale(1)'
                        }}
                    >
                        <span className="timer">{timeLeft}</span>
                    </div>
                )}
            </div>

            {phase === 'ready' ? (
                <button onClick={startBreathing} className="btn">Start Exercise</button>
            ) : (
                <button onClick={() => setPhase('ready')} className="btn btn-red">Stop</button>
            )}
        </div>
    );
}
