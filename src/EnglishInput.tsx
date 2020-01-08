import React from 'react';

import './EnglishInput.css';
interface EnglishInputProps {
    text: string;
    onChange: (text: string) => unknown;
    onKannadize: () => unknown;
}
const EnglishInput: React.FC<EnglishInputProps> = ({ text, onChange, onKannadize }) => {
    return (
        <div className="english-input">
            <input
                type="text"
                value={text}
                placeholder="English..."
                onChange={e => onChange(e.target.value)}
                onKeyPress={e => {
                    if (e.key === 'Enter') {
                        onKannadize();
                    }
                }}
            />
            <button
                type="button"
                className={text.length > 0 ? 'is-ready' : ''}
                onClick={() => onKannadize()}
            >
                Kannadize It!
            </button>
        </div>
    );
}

export default EnglishInput;