import React from 'react';

import './KannadaOutput.css';

interface KannadaOutputProps {
    kantext: string;
    onClick: () => unknown;
}

const KannadaOutput: React.FC<KannadaOutputProps> = ({ kantext, onClick }) => {
    return (
        <div className="kannada-output">
            {
                kantext.length === 0
                ? <p><em>Hit Translate!</em></p>
                : (
                    <React.Fragment>
                        <p>{kantext}</p>
                        <button
                            type="button"
                            onClick={onClick}
                        >
                            STAR
                        </button>
                    </React.Fragment>
                )
            }
        </div>
    )
}

export default KannadaOutput;