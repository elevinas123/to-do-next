// MyContext.js
import React from 'react';
import { IAccount } from '../database/schema/AccSchema';

type AccountContext = {
    account: IAccount;
};

const accountContext = React.createContext<AccountContext | null>(null);

export default accountContext;
