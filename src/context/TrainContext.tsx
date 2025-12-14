'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Train, ActivityLog } from '@/types/train';
import { initialTrainData } from '@/data/trainData';

interface TrainContextType {
    trains: Train[];
    activityLogs: ActivityLog[];
    setTrains: (trains: Train[]) => void;
    addActivityLog: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
    isLoading: boolean;
}

const TrainContext = createContext<TrainContextType | undefined>(undefined);

const STORAGE_KEY = 'admin_trains_data';
const LOGS_KEY = 'admin_activity_logs';

export function TrainProvider({ children }: { children: ReactNode }) {
    const [trains, setTrainsState] = useState<Train[]>([]);
    const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load data from localStorage on mount
    useEffect(() => {
        try {
            const storedTrains = localStorage.getItem(STORAGE_KEY);
            const storedLogs = localStorage.getItem(LOGS_KEY);

            if (storedTrains) {
                setTrainsState(JSON.parse(storedTrains));
            } else {
                // Initialize with mock data if no stored data
                setTrainsState(initialTrainData);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTrainData));
            }

            if (storedLogs) {
                setActivityLogs(JSON.parse(storedLogs));
            } else {
                setActivityLogs([]);
            }
        } catch (error) {
            console.error('Error loading data from localStorage:', error);
            setTrainsState(initialTrainData);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Save trains to localStorage whenever it changes
    const setTrains = (newTrains: Train[]) => {
        setTrainsState(newTrains);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newTrains));
        } catch (error) {
            console.error('Error saving trains to localStorage:', error);
        }
    };

    // Add activity log
    const addActivityLog = (log: Omit<ActivityLog, 'id' | 'timestamp'>) => {
        const newLog: ActivityLog = {
            ...log,
            id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString(),
        };

        const updatedLogs = [newLog, ...activityLogs];
        setActivityLogs(updatedLogs);

        try {
            localStorage.setItem(LOGS_KEY, JSON.stringify(updatedLogs));
        } catch (error) {
            console.error('Error saving activity logs to localStorage:', error);
        }
    };

    return (
        <TrainContext.Provider
            value={{
                trains,
                activityLogs,
                setTrains,
                addActivityLog,
                isLoading,
            }}
        >
            {children}
        </TrainContext.Provider>
    );
}

export function useTrainContext() {
    const context = useContext(TrainContext);
    if (context === undefined) {
        throw new Error('useTrainContext must be used within a TrainProvider');
    }
    return context;
}
