// Train Management Types

export type TrainStatus = 'Hoạt động' | 'Tạm dừng' | 'Đã hủy';

export interface Train {
    id: string;
    code: string; // Mã chuyến tàu (SE101, SE1, etc.)
    name: string; // Tên chuyến tàu
    from: string; // Ga đi
    to: string; // Ga đến
    departureTime: string; // ISO datetime string
    arrivalTime: string; // ISO datetime string
    trainType: string; // Loại tàu (Ghế ngồi mềm điều hòa, etc.)
    totalSeats: number; // Tổng số ghế
    availableSeats: number; // Số ghế còn trống
    basePrice: number; // Giá vé cơ bản
    status: TrainStatus;
    carriages: Carriage[]; // Danh sách toa tàu
    createdAt: string;
    updatedAt: string;
    createdBy?: string; // Admin tạo
    hasOrders?: boolean; // Có đơn hàng hay không (để check trước khi xóa)
}

export interface Carriage {
    id: string;
    trainId: string;
    number: number; // Số toa (1, 2, 3...)
    type: string; // Loại toa (Ghế ngồi mềm, Giường nằm, VIP...)
    totalSeats: number;
    seatLayout: SeatLayout; // Sơ đồ ghế
    seats: Seat[];
    priceMultiplier: number; // Hệ số nhân giá (1.0 = giá cơ bản, 1.5 = 150% giá cơ bản)
}

export interface SeatLayout {
    rows: number; // Số hàng
    columns: number; // Số cột (ghế mỗi hàng)
    pattern: string; // Pattern mô tả (4x16 = 4 ghế x 16 hàng)
}

export interface Seat {
    id: string;
    carriageId: string;
    seatNumber: string; // Số ghế (1A, 1B, 2A, etc.)
    row: number;
    column: number;
    isAvailable: boolean;
    isDisabled: boolean; // Bị vô hiệu hóa
    disabledReason?: string; // Lý do vô hiệu hóa
    disabledAt?: string;
    disabledBy?: string; // Admin vô hiệu hóa
}

export interface ActivityLog {
    id: string;
    action: string; // "created", "updated", "deleted", "disabled_seat", etc.
    entityType: 'train' | 'carriage' | 'seat';
    entityId: string;
    description: string; // Mô tả hành động
    adminName: string; // Tên admin thực hiện
    timestamp: string;
    details?: Record<string, unknown>; // Chi tiết thay đổi
}

// Filter và Search types
export interface TrainFilters {
    searchKeyword?: string;
    route?: string; // Tuyến đường (format: "Hà Nội - TP. Hồ Chí Minh")
    status?: TrainStatus;
    departureDate?: string; // YYYY-MM-DD
}

export interface TrainFormData {
    code: string;
    name: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    trainType: string;
    totalSeats: number;
    basePrice: number;
    status: TrainStatus;
}

// Statistics types
export interface TrainStatistics {
    totalOrders: number;
    totalRevenue: number;
    occupancyRate: number; // Tỷ lệ lấp đầy (%)
    popularRoute: boolean;
}

// Order Management Types
export type OrderStatus = 'Chờ xử lý' | 'Đã xác nhận' | 'Hoàn thành' | 'Đã hủy';
export type PaymentStatus = 'Chưa thanh toán' | 'Đã thanh toán' | 'Hoàn tiền';
export type PaymentMethod = 'Thẻ tín dụng' | 'Chuyển khoản' | 'Ví điện tử' | 'Tiền mặt';

export interface Customer {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    idNumber?: string; // CCCD/CMND
}

export interface Ticket {
    id: string;
    orderId: string;
    passengerName: string;
    passengerIdNumber: string;
    carriageNumber: number;
    seatNumber: string;
    ticketType: string; // Người lớn, Trẻ em, Sinh viên
    price: number;
    qrCode?: string; // QR code cho vé điện tử
}

export interface Order {
    id: string;
    orderCode: string; // Mã đơn hàng (DH2025001)
    customer: Customer;
    trainId: string;
    trainCode: string; // Denormalized for display
    trainName: string;
    departureTime: string;
    tickets: Ticket[];
    totalAmount: number;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    orderStatus: OrderStatus;
    createdAt: string;
    confirmedAt?: string;
    cancelledAt?: string;
    cancelReason?: string;
    notes?: string;
}

export interface OrderFilters {
    searchKeyword?: string; // Search by order code, customer name
    orderStatus?: OrderStatus;
    paymentStatus?: PaymentStatus;
    startDate?: string; // YYYY-MM-DD
    endDate?: string; // YYYY-MM-DD
    trainId?: string;
}
