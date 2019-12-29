import React from 'react';
interface EnglishInputProps {
    text: string;
    onChange: (text: string) => unknown;
    onKannadize: () => unknown;
}
const EnglishInput: React.FC<EnglishInputProps> = ({text, onChange, onKannadize}) => {
    return (
        <div className="english-input">
            <input
                type="text"
                value={text}
                onChange={e => onChange(e.target.value)}
            />
            <button
                type="button"
                onClick={() => onKannadize()}
            >
                Kannadize It!
            </button>
        </div>
    );
}

export default EnglishInput;