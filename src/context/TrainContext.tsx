/**
 * TRAIN CONTEXT - QUẢN LÝ CHUYẾN TÀU VÀ ACTIVITY LOGS
 * Context quản lý:
 * - Danh sách chuyến tàu (trains data)
 * - Activity logs (lịch sử thao tác admin)
 * - Sync với localStorage để persist data
 */

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Train, ActivityLog } from '@/types/train';
import { initialTrainData } from '@/data/trainData';

/**
 * Interface TrainContextType - API của Train Context
 */
interface TrainContextType {
    trains: Train[]; // Danh sách chuyến tàu
    activityLogs: ActivityLog[]; // Lịch sử hoạt động (CRUD logs)
    setTrains: (trains: Train[]) => void; // Cập nhật trains và lưu localStorage
    addActivityLog: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => void; // Thêm log mới
    isLoading: boolean; // Loading state khi load từ localStorage
}

// Tạo Context
const TrainContext = createContext<TrainContextType | undefined>(undefined);

// localStorage keys
const STORAGE_KEY = 'admin_trains_data';
const LOGS_KEY = 'admin_activity_logs';

/**
 * TrainProvider Component
 * Provider bao bọc app để cung cấp train state và activity logs
 */
export function TrainProvider({ children }: { children: ReactNode }) {
    const [trains, setTrainsState] = useState<Train[]>([]);
    const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    /**
     * useEffect: Load trains và logs từ localStorage khi mount
     * - Nếu có data trong localStorage: load lên
     * - Nếu chưa có: khởi tạo với initialTrainData (mock data)
     */
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

    /**
     * setTrains - Cập nhật trains và tự động lưu vào localStorage
     * Dùng function này thay vì setTrainsState trực tiếp để đảm bảo sync
     */
    const setTrains = (newTrains: Train[]) => {
        setTrainsState(newTrains);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newTrains));
        } catch (error) {
            console.error('Error saving trains to localStorage:', error);
        }
    };

    /**
     * addActivityLog - Thêm log mới vào activity logs
     * - Tự động generate ID và timestamp
     * - Lưu vào localStorage
     * - Log hiển thị ở trang chi tiết chuyến tàu (tab Lịch sử)
     */
    const addActivityLog = (log: Omit<ActivityLog, 'id' | 'timestamp'>) => {
        const newLog: ActivityLog = {
            ...log,
            id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString(),
        };

        // Thêm log mới vào đầu mảng (newest first)
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

/**
 * Custom hook useTrainContext
 * Dùng để access train context từ bất kỳ component nào
 * Throw error nếu dùng ngoài TrainProvider
 */
export function useTrainContext() {
    const context = useContext(TrainContext);
    if (context === undefined) {
        throw new Error('useTrainContext must be used within a TrainProvider');
    }
    return context;
}
