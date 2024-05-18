import React from 'react';

const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="px-6 py-16 lg:px-8">
            <div className="mx-auto max-w-8xl text-base leading-7">{children}</div>
        </div>
    );
};

export default Container;
