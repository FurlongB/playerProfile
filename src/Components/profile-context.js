import React from 'react';

const profileContext = React.createContext({profile: {}, profileStatus: (data) => {}});

export default profileContext;