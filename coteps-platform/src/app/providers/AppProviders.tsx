import React from 'react';

const AppProviders: React.FC = ({ children }) => {
    return (
        <React.Fragment>
            {/* Add context providers here */}
            {children}
        </React.Fragment>
    );
};

export default AppProviders;