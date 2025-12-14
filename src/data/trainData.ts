/**
 * DATA: Train Data - Mock Data Chuyến Tàu
 * 
 * File này chứa:
 * - Helper functions: generateSeats, generateCarriages
 * - Mock data: initialTrainData (10 chuyến tàu mẫu)
 * - Constants: stations (danh sách ga), trainTypes (loại tàu)
 * 
 * Mock data dùng để khởi tạo TrainContext nếu chưa có data trong localStorage
 */

import { Train, Carriage, Seat } from '@/types/train';

// Helper function to generate seats for a carriage
function generateSeats(carriageId: string, rows: number, columns: number): Seat[] {
    const seats: Seat[] = [];
    const columnLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

    for (let row = 1; row <= rows; row++) {
        for (let col = 0; col < columns; col++) {
            seats.push({
                id: `${carriageId}-${row}${columnLabels[col]}`,
                carriageId,
                seatNumber: `${row}${columnLabels[col]}`,
                row,
                column: col + 1,
                isAvailable: true,
                isDisabled: false,
            });
        }
    }

    return seats;
}

// Generate carriages for a train
function generateCarriages(trainId: string, count: number, type: string, seatsPerCarriage: number): Carriage[] {
    const carriages: Carriage[] = [];
    const rows = 16;
    const columns = Math.ceil(seatsPerCarriage / rows);

    for (let i = 1; i <= count; i++) {
        const carriageId = `${trainId}-carriage-${i}`;
        carriages.push({
            id: carriageId,
            trainId,
            number: i,
            type,
            totalSeats: seatsPerCarriage,
            seatLayout: {
                rows,
                columns,
                pattern: `${columns}x${rows}`,
            },
            seats: generateSeats(carriageId, rows, columns),
            priceMultiplier: type.includes('VIP') ? 1.5 : type.includes('Giường') ? 1.3 : 1.0,
        });
    }

    return carriages;
}

// Mock train data
export const initialTrainData: Train[] = [
    {
        id: 'train-1',
        code: 'SE1',
        name: 'Thống Nhất SE1',
        from: 'Hà Nội',
        to: 'TP. Hồ Chí Minh',
        departureTime: '2025-12-25T19:30:00',
        arrivalTime: '2025-12-26T08:30:00',
        trainType: 'Ghế ngồi mềm điều hòa',
        totalSeats: 200,
        availableSeats: 156,
        basePrice: 850000,
        status: 'Hoạt động',
        carriages: generateCarriages('train-1', 5, 'Ghế ngồi mềm', 40),
        createdAt: '2025-12-01T10:00:00',
        updatedAt: '2025-12-01T10:00:00',
        hasOrders: true,
    },
    {
        id: 'train-2',
        code: 'SE3',
        name: 'Thống Nhất SE3',
        from: 'Hà Nội',
        to: 'Đà Nẵng',
        departureTime: '2025-12-26T07:00:00',
        arrivalTime: '2025-12-26T19:30:00',
        trainType: 'Ghế ngồi mềm điều hòa',
        totalSeats: 180,
        availableSeats: 120,
        basePrice: 600000,
        status: 'Hoạt động',
        carriages: generateCarriages('train-2', 5, 'Ghế ngồi mềm', 36),
        createdAt: '2025-12-01T10:00:00',
        updatedAt: '2025-12-01T10:00:00',
        hasOrders: true,
    },
    {
        id: 'train-3',
        code: 'SE5',
        name: 'Thống Nhất SE5',
        from: 'Hà Nội',
        to: 'Nha Trang',
        departureTime: '2025-12-27T14:00:00',
        arrivalTime: '2025-12-28T06:00:00',
        trainType: 'Giường nằm điều hòa',
        totalSeats: 150,
        availableSeats: 98,
        basePrice: 750000,
        status: 'Hoạt động',
        carriages: generateCarriages('train-3', 5, 'Giường nằm', 30),
        createdAt: '2025-12-01T10:00:00',
        updatedAt: '2025-12-01T10:00:00',
        hasOrders: true,
    },
    {
        id: 'train-4',
        code: 'SE7',
        name: 'Thống Nhất SE7',
        from: 'Hà Nội',
        to: 'Vinh',
        departureTime: '2025-12-28T06:00:00',
        arrivalTime: '2025-12-28T11:30:00',
        trainType: 'Ghế ngồi mềm điều hòa',
        totalSeats: 160,
        availableSeats: 160,
        basePrice: 350000,
        status: 'Hoạt động',
        carriages: generateCarriages('train-4', 4, 'Ghế ngồi mềm', 40),
        createdAt: '2025-12-01T10:00:00',
        updatedAt: '2025-12-01T10:00:00',
        hasOrders: false,
    },
    {
        id: 'train-5',
        code: 'SE9',
        name: 'Thống Nhất SE9',
        from: 'TP. Hồ Chí Minh',
        to: 'Nha Trang',
        departureTime: '2025-12-29T08:00:00',
        arrivalTime: '2025-12-29T16:30:00',
        trainType: 'Ghế ngồi mềm điều hòa',
        totalSeats: 140,
        availableSeats: 95,
        basePrice: 280000,
        status: 'Hoạt động',
        carriages: generateCarriages('train-5', 4, 'Ghế ngồi mềm', 35),
        createdAt: '2025-12-01T10:00:00',
        updatedAt: '2025-12-01T10:00:00',
        hasOrders: true,
    },
    {
        id: 'train-6',
        code: 'SP1',
        name: 'Sapaly SP1',
        from: 'Hà Nội',
        to: 'Lào Cai',
        departureTime: '2025-12-30T21:00:00',
        arrivalTime: '2025-12-31T05:30:00',
        trainType: 'Giường nằm VIP',
        totalSeats: 100,
        availableSeats: 45,
        basePrice: 500000,
        status: 'Hoạt động',
        carriages: generateCarriages('train-6', 3, 'Giường nằm VIP', 33),
        createdAt: '2025-12-01T10:00:00',
        updatedAt: '2025-12-01T10:00:00',
        hasOrders: true,
    },
    {
        id: 'train-7',
        code: 'SQN2',
        name: 'Tàu Quảng Ninh SQN2',
        from: 'Hà Nội',
        to: 'Hạ Long',
        departureTime: '2025-12-26T09:00:00',
        arrivalTime: '2025-12-26T13:00:00',
        trainType: 'Ghế ngồi mềm điều hòa',
        totalSeats: 120,
        availableSeats: 85,
        basePrice: 280000,
        status: 'Hoạt động',
        carriages: generateCarriages('train-7', 3, 'Ghế ngồi mềm', 40),
        createdAt: '2025-12-01T10:00:00',
        updatedAt: '2025-12-01T10:00:00',
        hasOrders: false,
    },
    {
        id: 'train-8',
        code: 'SPT1',
        name: 'Tàu Phương Nam SPT1',
        from: 'TP. Hồ Chí Minh',
        to: 'Phan Thiết',
        departureTime: '2025-12-27T07:00:00',
        arrivalTime: '2025-12-27T11:00:00',
        trainType: 'Ghế ngồi mềm',
        totalSeats: 100,
        availableSeats: 72,
        basePrice: 180000,
        status: 'Hoạt động',
        carriages: generateCarriages('train-8', 3, 'Ghế ngồi mềm', 33),
        createdAt: '2025-12-01T10:00:00',
        updatedAt: '2025-12-01T10:00:00',
        hasOrders: false,
    },
    {
        id: 'train-9',
        code: 'SE11',
        name: 'Thống Nhất SE11',
        from: 'Hà Nội',
        to: 'Huế',
        departureTime: '2025-12-28T15:00:00',
        arrivalTime: '2025-12-29T03:00:00',
        trainType: 'Giường nằm điều hòa',
        totalSeats: 130,
        availableSeats: 130,
        basePrice: 450000,
        status: 'Tạm dừng',
        carriages: generateCarriages('train-9', 4, 'Giường nằm', 32),
        createdAt: '2025-12-01T10:00:00',
        updatedAt: '2025-12-05T14:30:00',
        hasOrders: false,
    },
    {
        id: 'train-10',
        code: 'SE13',
        name: 'Thống Nhất SE13',
        from: 'TP. Hồ Chí Minh',
        to: 'Đà Nẵng',
        departureTime: '2025-12-25T20:00:00',
        arrivalTime: '2025-12-26T08:00:00',
        trainType: 'Ghế ngồi mềm điều hòa',
        totalSeats: 170,
        availableSeats: 115,
        basePrice: 580000,
        status: 'Hoạt động',
        carriages: generateCarriages('train-10', 5, 'Ghế ngồi mềm', 34),
        createdAt: '2025-12-01T10:00:00',
        updatedAt: '2025-12-01T10:00:00',
        hasOrders: true,
    },
];

// Common stations for dropdowns
export const stations = [
    'Hà Nội',
    'TP. Hồ Chí Minh',
    'Đà Nẵng',
    'Nha Trang',
    'Huế',
    'Vinh',
    'Hạ Long',
    'Lào Cai',
    'Phan Thiết',
    'Quy Nhơn',
    'Đồng Hới',
];

// Train types for dropdowns
export const trainTypes = [
    'Ghế ngồi mềm',
    'Ghế ngồi mềm điều hòa',
    'Giường nằm',
    'Giường nằm điều hòa',
    'Giường nằm VIP',
];
