/**
 * HOOK: useTrainManagement
 * Hook quản lý chuyến tàu với đầy đủ CRUD operations:
 * - Add, Update, Delete trains
 * - Add carriage, Disable seat
 * - Filter trains (search, route, status, date)
 * - Toast notifications + Activity logging
 * 
 * @return { trains, getTrainById, addTrain, updateTrain, deleteTrain,
 *          addCarriage, disableSeat, filterTrains, availableRoutes, toast }
 */

'use client';

import { useState, useCallback, useMemo } from 'react';
import { useTrainContext } from '@/context/TrainContext';
import { Train, TrainFormData, TrainFilters, Carriage, Seat } from '@/types/train';

export function useTrainManagement() {
    const { trains, setTrains, addActivityLog } = useTrainContext();
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

    // Show toast notification
    const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }, []);

    // Get train by ID
    const getTrainById = useCallback(
        (id: string): Train | undefined => {
            return trains.find((train) => train.id === id);
        },
        [trains]
    );

    // Get train by code
    const getTrainByCode = useCallback(
        (code: string): Train | undefined => {
            return trains.find((train) => train.code === code);
        },
        [trains]
    );

    // Check if train code exists (for validation)
    const isTrainCodeExists = useCallback(
        (code: string, excludeId?: string): boolean => {
            return trains.some((train) => train.code === code && train.id !== excludeId);
        },
        [trains]
    );

    // Add new train
    const addTrain = useCallback(
        (formData: TrainFormData): { success: boolean; message: string; trainId?: string } => {
            // Validation: Check duplicate code
            if (isTrainCodeExists(formData.code)) {
                return { success: false, message: 'Mã chuyến tàu đã tồn tại' };
            }

            // Validation: Check required fields
            if (!formData.code || !formData.name || !formData.from || !formData.to || !formData.departureTime) {
                return { success: false, message: 'Vui lòng điền đầy đủ thông tin bắt buộc' };
            }

            // Validation: Departure time before arrival time
            if (new Date(formData.departureTime) >= new Date(formData.arrivalTime)) {
                return { success: false, message: 'Thời gian đến phải sau thời gian khởi hành' };
            }

            const newTrain: Train = {
                id: `train-${Date.now()}`,
                ...formData,
                availableSeats: formData.totalSeats,
                carriages: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                createdBy: 'Admin', // TODO: Replace with actual admin name
                hasOrders: false,
            };

            setTrains([...trains, newTrain]);
            addActivityLog({
                action: 'created',
                entityType: 'train',
                entityId: newTrain.id,
                description: `Admin đã thêm chuyến tàu ${formData.code}`,
                adminName: 'Admin',
                details: { trainCode: formData.code, trainName: formData.name },
            });

            showToast('Thêm chuyến tàu thành công', 'success');
            return { success: true, message: 'Thêm chuyến tàu thành công', trainId: newTrain.id };
        },
        [trains, setTrains, addActivityLog, isTrainCodeExists, showToast]
    );

    // Update train
    const updateTrain = useCallback(
        (id: string, formData: Partial<TrainFormData>): { success: boolean; message: string } => {
            const train = getTrainById(id);
            if (!train) {
                return { success: false, message: 'Không tìm thấy chuyến tàu' };
            }

            // Check duplicate code if code is being changed
            if (formData.code && formData.code !== train.code && isTrainCodeExists(formData.code, id)) {
                return { success: false, message: 'Mã chuyến tàu đã tồn tại' };
            }

            const updatedTrain: Train = {
                ...train,
                ...formData,
                updatedAt: new Date().toISOString(),
            };

            const updatedTrains = trains.map((t) => (t.id === id ? updatedTrain : t));
            setTrains(updatedTrains);

            addActivityLog({
                action: 'updated',
                entityType: 'train',
                entityId: id,
                description: `Admin đã cập nhật chuyến tàu ${train.code}`,
                adminName: 'Admin',
                details: { changes: formData },
            });

            showToast('Cập nhật chuyến tàu thành công', 'success');
            return { success: true, message: 'Cập nhật chuyến tàu thành công' };
        },
        [trains, setTrains, addActivityLog, getTrainById, isTrainCodeExists, showToast]
    );

    // Delete train
    const deleteTrain = useCallback(
        (id: string): { success: boolean; message: string } => {
            const train = getTrainById(id);
            if (!train) {
                return { success: false, message: 'Không tìm thấy chuyến tàu' };
            }

            // Check if train has orders
            if (train.hasOrders) {
                return { success: false, message: 'Không thể xóa chuyến tàu đã có đơn hàng' };
            }

            const filteredTrains = trains.filter((t) => t.id !== id);
            setTrains(filteredTrains);

            addActivityLog({
                action: 'deleted',
                entityType: 'train',
                entityId: id,
                description: `Admin đã xóa chuyến tàu ${train.code}`,
                adminName: 'Admin',
                details: { trainCode: train.code, trainName: train.name },
            });

            showToast('Xóa chuyến tàu thành công', 'success');
            return { success: true, message: 'Xóa chuyến tàu thành công' };
        },
        [trains, setTrains, addActivityLog, getTrainById, showToast]
    );

    // Add carriage to train
    const addCarriage = useCallback(
        (trainId: string, carriage: Omit<Carriage, 'id' | 'trainId'>): { success: boolean; message: string } => {
            const train = getTrainById(trainId);
            if (!train) {
                return { success: false, message: 'Không tìm thấy chuyến tàu' };
            }

            const newCarriage: Carriage = {
                ...carriage,
                id: `${trainId}-carriage-${Date.now()}`,
                trainId,
            };

            const updatedTrain: Train = {
                ...train,
                carriages: [...train.carriages, newCarriage],
                totalSeats: train.totalSeats + carriage.totalSeats,
                availableSeats: train.availableSeats + carriage.totalSeats,
                updatedAt: new Date().toISOString(),
            };

            const updatedTrains = trains.map((t) => (t.id === trainId ? updatedTrain : t));
            setTrains(updatedTrains);

            addActivityLog({
                action: 'created',
                entityType: 'carriage',
                entityId: newCarriage.id,
                description: `Admin đã thêm toa tàu số ${carriage.number} cho chuyến ${train.code}`,
                adminName: 'Admin',
            });

            showToast('Thêm toa tàu thành công', 'success');
            return { success: true, message: 'Thêm toa tàu thành công' };
        },
        [trains, setTrains, addActivityLog, getTrainById, showToast]
    );

    // Disable seat
    const disableSeat = useCallback(
        (trainId: string, carriageId: string, seatId: string, reason: string): { success: boolean; message: string } => {
            const train = getTrainById(trainId);
            if (!train) {
                return { success: false, message: 'Không tìm thấy chuyến tàu' };
            }

            const updatedCarriages = train.carriages.map((carriage) => {
                if (carriage.id === carriageId) {
                    const updatedSeats = carriage.seats.map((seat) => {
                        if (seat.id === seatId) {
                            return {
                                ...seat,
                                isDisabled: true,
                                isAvailable: false,
                                disabledReason: reason,
                                disabledAt: new Date().toISOString(),
                                disabledBy: 'Admin',
                            };
                        }
                        return seat;
                    });
                    return { ...carriage, seats: updatedSeats };
                }
                return carriage;
            });

            const updatedTrain: Train = {
                ...train,
                carriages: updatedCarriages,
                availableSeats: train.availableSeats - 1,
                updatedAt: new Date().toISOString(),
            };

            const updatedTrains = trains.map((t) => (t.id === trainId ? updatedTrain : t));
            setTrains(updatedTrains);

            const seat = train.carriages
                .find((c) => c.id === carriageId)
                ?.seats.find((s) => s.id === seatId);

            addActivityLog({
                action: 'disabled_seat',
                entityType: 'seat',
                entityId: seatId,
                description: `Admin đã vô hiệu hóa ghế ${seat?.seatNumber} - ${reason}`,
                adminName: 'Admin',
                details: { reason },
            });

            showToast('Vô hiệu hóa ghế thành công', 'success');
            return { success: true, message: 'Vô hiệu hóa ghế thành công' };
        },
        [trains, setTrains, addActivityLog, getTrainById, showToast]
    );

    // Filter and search trains
    const filterTrains = useCallback(
        (filters: TrainFilters): Train[] => {
            return trains.filter((train) => {
                // Search by keyword (code or name)
                if (filters.searchKeyword) {
                    const keyword = filters.searchKeyword.toLowerCase();
                    if (
                        !train.code.toLowerCase().includes(keyword) &&
                        !train.name.toLowerCase().includes(keyword)
                    ) {
                        return false;
                    }
                }

                // Filter by route
                if (filters.route) {
                    const route = `${train.from} - ${train.to}`;
                    if (route !== filters.route) {
                        return false;
                    }
                }

                // Filter by status
                if (filters.status && train.status !== filters.status) {
                    return false;
                }

                // Filter by departure date
                if (filters.departureDate) {
                    const trainDate = new Date(train.departureTime).toISOString().split('T')[0];
                    if (trainDate !== filters.departureDate) {
                        return false;
                    }
                }

                return true;
            });
        },
        [trains]
    );

    // Get unique routes for filter dropdown
    const availableRoutes = useMemo(() => {
        const routes = new Set(trains.map((train) => `${train.from} - ${train.to}`));
        return Array.from(routes).sort();
    }, [trains]);

    return {
        trains,
        getTrainById,
        getTrainByCode,
        isTrainCodeExists,
        addTrain,
        updateTrain,
        deleteTrain,
        addCarriage,
        disableSeat,
        filterTrains,
        availableRoutes,
        toast,
        showToast,
    };
}
