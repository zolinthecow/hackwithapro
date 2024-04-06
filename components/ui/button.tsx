import React from 'react';

type Props = {
        size: 'sm' | 'md';
        children: React.ReactNode;
}

export const Button: React.FC<Props> = ({ size, children }) => {
        return (
                <div> {children} </div>
        );
}

