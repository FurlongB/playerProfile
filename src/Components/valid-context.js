import React from 'react';

const validContext = React.createContext({valid: {}, validStat: (token) => {}});

export default validContext;