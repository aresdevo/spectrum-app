import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EMOTIONS } from './FeelingCheckin';

const missions = {
    '1': {
        title: 'Week 1: Three Things in Common',
        desc: 'Let us see what we have in common! Pick a partner and figure out what you share.',
        activity: 'Talk with a sidekick friend. Find 3 things you both like. For example: Do you both like pizza? Video games? The color blue?',
        inputs: [
            { type: 'text', id: 'common1', label: 'First thing in common:' },
            { type: 'text', id: 'common2', label: 'Second thing in common:' },
            { type: 'text', id: 'common3', label: 'Third thing in common:' }
        ]
    },
    '2': {
        title: 'Week 2: Similarities and Differences',
        desc: 'What makes us unique? What brings us together?',
        activity: 'Use a Venn diagram with your group to find out what similarities and differences you have with your siblings and family.',
        inputs: [
            { type: 'image', id: 'vennDiagram', label: 'Upload a photo of your Venn Diagram:' },
            { type: 'textarea', id: 'similarities', label: 'What is one big similarity?' },
            { type: 'textarea', id: 'differences', label: 'What is one big difference?' }
        ]
    },
    '3': {
        title: 'Week 3: Faces of Feeling',
        desc: 'How does your sibling make you feel?',
        activity: 'Draw a different expression of how your sibling with autism makes you feel on four blank faces. Share these faces with the group.',
        inputs: [
            { type: 'image', id: 'facesDrawing', label: 'Upload a picture of your drawing:' }
        ]
    },
    '4': {
        title: 'Week 4: Leaf Project',
        desc: 'Identify the good and bad things about your sibling with autism.',
        activity: 'Write good things on green leaves and bad things on brown leaves. Place them on our group tree!',
        inputs: [
            { type: 'textarea', id: 'greenLeaves', label: 'List your Green Leaf thoughts (Good things):' },
            { type: 'textarea', id: 'brownLeaves', label: 'List your Brown Leaf thoughts (Bad things):' },
            { type: 'image', id: 'leafTree', label: 'Upload a picture of the tree!' }
        ]
    },
    '5': {
        title: 'Week 5: Helping Hands',
        desc: 'Who can you turn to for help, advice, or just to talk?',
        activity: 'On a picture of a hand, write the name of one person you could go to for help on each finger. Share your helping hands with the group!',
        inputs: [
            { type: 'text', id: 'finger1', label: 'Thumb (Person 1):' },
            { type: 'text', id: 'finger2', label: 'Pointer (Person 2):' },
            { type: 'text', id: 'finger3', label: 'Middle (Person 3):' },
            { type: 'text', id: 'finger4', label: 'Ring (Person 4):' },
            { type: 'text', id: 'finger5', label: 'Pinky (Person 5):' }
        ]
    },
    '6': {
        title: 'Week 6: Autism Trivia',
        desc: 'Test your Autism knowledge!',
        activity: 'Work with your team to answer True/False questions about autism, or compete in a Jeopardy style game!',
        inputs: [
            { type: 'textarea', id: 'triviaNotes', label: 'What was your favorite trivia fact you learned?' }
        ]
    },
    '7': {
        title: 'Week 7: Mindful Awareness',
        desc: 'Review autism definition and prepare for our guest speaker.',
        activity: 'Decorate a welcome poster for next week\'s guest speaker and brainstorm questions to ask them.',
        inputs: [
            { type: 'textarea', id: 'speakerQuestions', label: 'Questions to ask the guest speaker:' },
            { type: 'image', id: 'poster', label: 'Upload your welcome poster!' }
        ]
    },
    '8': {
        title: 'Week 8: Q&A with Guest Speaker',
        desc: 'Learn from someone who also has a sibling with ASD.',
        activity: 'Listen to and ask questions of our adult guest speaker who has a sibling with ASD.',
        inputs: [
            { type: 'textarea', id: 'speakerNotes', label: 'Notes and things you learned from the speaker:' }
        ]
    },
    '9': {
        title: 'Week 9: Problem Solving',
        desc: 'Discuss positive characteristics and learn how to help your sibling.',
        activity: 'Work through problem-solving scenarios on how to handle situations when your sibling may not be able to stand up for themselves.',
        inputs: [
            { type: 'textarea', id: 'scenario1', label: 'Scenario 1 Solution:' },
            { type: 'textarea', id: 'scenario2', label: 'Scenario 2 Solution:' }
        ]
    },
    '10': {
        title: 'Week 10: Reflect and Celebrate!',
        desc: 'Reflect on the group activities and decorate cupcakes.',
        activity: 'Choose a cupcake and decorate it. Write a word or phrase that shows what you learned on a topper and share it with the group!',
        inputs: [
            { type: 'text', id: 'takeawayWord', label: 'Your Takeaway Word/Phrase:' },
            { type: 'image', id: 'cupcake', label: 'Upload a picture of your cupcake!' }
        ]
    }
};

export default function WeekMission() {
    const { weekId } = useParams();
    const navigate = useNavigate();
    const [complete, setComplete] = useState(false);
    const [taskData, setTaskData] = useState({});
    const [weeklyFeeling, setWeeklyFeeling] = useState(null);

    const mission = missions[weekId] || { title: 'Mission Not Found', desc: '', activity: '', inputs: [] };

    // Load saved data and completion status
    useEffect(() => {
        const savedMissions = JSON.parse(localStorage.getItem('spectrum_completed_missions') || '{}');
        if (savedMissions[weekId]) {
            setComplete(true);
        }

        const savedData = JSON.parse(localStorage.getItem(`spectrum_mission_data_${weekId}`) || '{}');
        setTaskData(savedData);

        const savedFeeling = localStorage.getItem(`spectrum_weekly_feeling_${weekId}`);
        if (savedFeeling) setWeeklyFeeling(savedFeeling);
    }, [weekId]);

    const handleInputChange = (id, value) => {
        const newData = { ...taskData, [id]: value };
        setTaskData(newData);
        localStorage.setItem(`spectrum_mission_data_${weekId}`, JSON.stringify(newData));
    };

    const handleImageUpload = (id, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas'); // Scale to avoid storage limits
                    const MAX_WIDTH = 400;
                    const scaleSize = MAX_WIDTH / img.width;
                    canvas.width = MAX_WIDTH;
                    canvas.height = img.height * scaleSize;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    handleInputChange(id, canvas.toDataURL('image/jpeg', 0.8));
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const markComplete = () => {
        setComplete(true);
        const savedMissions = JSON.parse(localStorage.getItem('spectrum_completed_missions') || '{}');
        savedMissions[weekId] = true;
        localStorage.setItem('spectrum_completed_missions', JSON.stringify(savedMissions));
    };

    return (
        <div style={{ paddingBottom: '40px' }}>
            <h2 style={{ marginBottom: '16px', color: 'var(--primary-blue)' }}>{mission.title}</h2>
            <p style={{ marginBottom: '24px', fontSize: '1.1rem' }}>{mission.desc}</p>

            <div style={{ background: 'var(--bg-color)', padding: '20px', borderRadius: '15px', marginBottom: '30px', borderLeft: '4px solid var(--primary-yellow)' }}>
                <strong>Your Mission:</strong>
                <p style={{ marginTop: '10px' }}>{mission.activity}</p>
            </div>

            <div style={{ marginBottom: '30px', background: 'var(--card-bg)', border: '2px dashed var(--border-color)', borderRadius: '15px', padding: '20px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Mission Feeling</h3>
                {weeklyFeeling ? (
                    <div>
                        <div style={{ fontSize: '4rem', marginBottom: '10px' }}>
                            {EMOTIONS.find(e => e.id === weeklyFeeling)?.icon}
                        </div>
                        <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '15px' }}>
                            You felt {EMOTIONS.find(e => e.id === weeklyFeeling)?.label}
                        </p>
                        <button className="btn" style={{ background: 'var(--bg-color)', color: 'var(--text-dark)', boxShadow: 'none', border: '2px solid var(--border-color)' }} onClick={() => navigate(`/feelings/${weekId}`)}>
                            Change Feeling
                        </button>
                    </div>
                ) : (
                    <div>
                        <p style={{ marginBottom: '20px', color: '#7f8fa6' }}>How do you feel about this week's task?</p>
                        <button className="btn" onClick={() => navigate(`/feelings/${weekId}`)}>
                            Log my Feeling
                        </button>
                    </div>
                )}
            </div>

            {(mission.inputs && mission.inputs.length > 0) && (
                <div style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-dark)' }}>Your Work:</h3>
                    {mission.inputs.map(input => (
                        <div key={input.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontWeight: 'bold', fontSize: '1rem', color: '#576574' }}>{input.label}</label>

                            {input.type === 'text' && (
                                <input
                                    type="text"
                                    value={taskData[input.id] || ''}
                                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                                    style={{ padding: '12px', borderRadius: '10px', border: '2px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-dark)', fontSize: '1rem', width: '100%', outline: 'none' }}
                                    placeholder="Type here..."
                                />
                            )}

                            {input.type === 'textarea' && (
                                <textarea
                                    value={taskData[input.id] || ''}
                                    onChange={(e) => handleInputChange(input.id, e.target.value)}
                                    style={{ padding: '12px', borderRadius: '10px', border: '2px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-dark)', fontSize: '1rem', minHeight: '100px', width: '100%', resize: 'vertical', outline: 'none' }}
                                    placeholder="Write your thoughts here..."
                                />
                            )}

                            {input.type === 'image' && (
                                <div style={{ padding: '15px', background: 'var(--bg-color)', borderRadius: '10px', textAlign: 'center', border: '2px dashed var(--border-color)' }}>
                                    {taskData[input.id] ? (
                                        <div style={{ position: 'relative', display: 'inline-block' }}>
                                            <img src={taskData[input.id]} alt="Uploaded drawing" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px', border: '2px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                                            <button
                                                onClick={() => handleInputChange(input.id, null)}
                                                style={{ position: 'absolute', top: '-12px', right: '-12px', background: 'var(--primary-red)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}
                                            >
                                                X
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <label htmlFor={`file-${input.id}`} style={{ cursor: 'pointer', display: 'inline-block', padding: '10px 20px', background: 'white', color: 'var(--primary-blue)', borderRadius: '8px', border: '2px solid var(--primary-blue)', fontWeight: 'bold' }}>
                                                Select Photo
                                            </label>
                                            <input
                                                id={`file-${input.id}`}
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(input.id, e)}
                                                style={{ display: 'none' }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {!complete ? (
                <button className="btn" onClick={markComplete}>
                    I Completed the Mission! 🌟
                </button>
            ) : (
                <div style={{ textAlign: 'center', background: '#d1ffd6', padding: '20px', borderRadius: '15px', border: '2px solid #58d68d' }}>
                    <h3 style={{ color: '#2ecc71', marginBottom: '10px' }}>Awesome Job, Sidekick!</h3>
                    <p style={{ marginBottom: '20px' }}>You earned a new star for your hero badge. Your answers are saved.</p>
                    <button className="btn" style={{ background: '#2ecc71', boxShadow: '0 6px 0 #27ae60' }} onClick={() => navigate('/roadmap')}>
                        Back to Roadmap
                    </button>
                </div>
            )}
        </div>
    );
}
