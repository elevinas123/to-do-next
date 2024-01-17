import React, { useState } from 'react';

const Accordion = ({ title, content, level = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button onClick={toggleAccordion} style={{ marginLeft: `${level * 20}px` }}>
                {title}
            </button>
            {isOpen && (
                <div>
                    {Array.isArray(content) ? (
                        content.map((item, index) => (
                            <Accordion
                                key={index}
                                title={item.title}
                                content={item.content}
                                level={level + 1}
                            />
                        ))
                    ) : (
                        <p>{content}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Accordion;
