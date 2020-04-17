import React from 'react';

const authContext = React.createContext({status: false, login: (stat) => {}});

export default authContext;