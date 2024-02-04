'use client'
import useSwr from 'swr';
import {axios} from './utils';
import { createContext, useContext, useEffect, useState } from 'react';

type UserData = {
    data: any,
    error: any,
    isLoading: boolean,
};

export const UserContext = createContext<UserData>({ data: null, error: null, isLoading: true });
export const URL = 'http://localhost:8000'

export const UserProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const { data, error, isLoading } = useSwr('/api/profile', async () => {
        return await axios.get('/api/profile', { withCredentials: true });
    });
    // useEffect(() => { console.log(data, error, isLoading) })
    return (
        <UserContext.Provider value= {{ data: data && data.data, error, isLoading }}>
            {children}
        </UserContext.Provider> 
    );
}

export const useUser = () => useContext(UserContext);

type RecruiterData = {
    data: any,
    error: any,
    isLoading: boolean,
};

export const RecruiterContext = createContext<RecruiterData>({ data: null, error: null, isLoading: true });

export const RecruiterProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const { data, error, isLoading } = useSwr('/api/company/profile', async () => {
        return await axios.get('/api/company/profile')
    });
    return (
        <RecruiterContext.Provider value={{data: data && data.data, error, isLoading}}>
            {children}
        </RecruiterContext.Provider>
    )
}

export const useRecruiter = () => useContext(RecruiterContext);