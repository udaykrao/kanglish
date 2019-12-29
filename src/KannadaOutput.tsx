import React from 'react';

interface KannadaOutputProps {
    kantext: string;
}

const KannadaOutput: React.FC<KannadaOutputProps> = ({kantext}) => {
    return (
        <div className="kannada-output">
            <p>{kantext}</p>
        </div>
    )
}

export default KannadaOutput;