/**
 * TYPES: Train Management và Order Management
 * 
 * File này định nghĩa tất cả các TypeScript types và interfaces cho:
 * 1. TRAIN MANAGEMENT:
 *    - Train, Carriage, Seat: Cấu trúc chuyến tàu, toa tàu, ghế ngồi
 *    - ActivityLog: Logging các thao tác admin
 *    - TrainFilters, TrainFormData: Form và filter data
 *    - TrainStatistics: Thống kê chuyến tàu
 * 
 * 2. ORDER MANAGEMENT:
 *    - Customer, Ticket, Order: Cấu trúc đơn hàng và vé
 *    - OrderFilters: Filter đơn hàng
 *    - OrderStatus, PaymentStatus, PaymentMethod: Các status types
 */

// ============================================================
// TRAIN MANAGEMENT TYPES
// ============================================================

/** TrainStatus - Trạng thái chuyến tàu */
export type TrainStatus = 'Hoạt động' | 'Tạm dừng' | 'Đã hủy';

/**
 * Interface Train - Thông tin chuyến tàu
 * Interface chính quản lý toàn bộ thông tin 1 chuyến tàu
 */
export interface Train {
    id: string; // ID duy nhất
    code: string; // Mã chuyến tàu (SE101, SE1, etc.)
    name: string; // Tên chuyến tàu (Thống Nhất SE101)
    from: string; // Ga đi
    to: string; // Ga đến
    departureTime: string; // Thời gian khởi hành (ISO datetime string)
    arrivalTime: string; // Thời gian đến (ISO datetime string)
    trainType: string; // Loại tàu (Ghế ngồi mềm điều hòa, etc.)
    totalSeats: number; // Tổng số ghế của tất cả toa
    availableSeats: number; // Số ghế còn trống (chưa book)
    basePrice: number; // Giá vé cơ bản (VND)
    status: TrainStatus; // Trạng thái chuyến tàu
    carriages: Carriage[]; // Danh sách toa tàu
    createdAt: string; // Ngày tạo (ISO string)
    updatedAt: string; // Ngày cập nhật gần nhất
    createdBy?: string; // Tên admin tạo chuyến tàu
    hasOrders?: boolean; // Có đơn hàng hay không (để check trước khi xóa)
}

/**
 * Interface Carriage - Thông tin toa tàu
 * Mỗi chuyến tàu có nhiều toa, mỗi toa có sơ đồ ghế riêng
 */
export interface Carriage {
    id: string; // ID duy nhất
    trainId: string; // ID chuyến tàu chứa toa này
    number: number; // Số toa (1, 2, 3...)
    type: string; // Loại toa (Ghế ngồi mềm, Giường nằm, VIP...)
    totalSeats: number; // Tổng số ghế trong toa
    seatLayout: SeatLayout; // Sơ đồ bố trí ghế (rows x columns)
    seats: Seat[]; // Danh sách ghế trong toa
    priceMultiplier: number; // Hệ số nhân giá (1.0 = giá cơ bản, 1.5 = 150% giá cơ bản)
}

/**
 * Interface SeatLayout - Sơ đồ bố trí ghế
 * Định nghĩa cách sắp xếp ghế trong toa (grid layout)
 */
export interface SeatLayout {
    rows: number; // Số hàng ghế
    columns: number; // Số cột ghế (số ghế mỗi hàng)
    pattern: string; // Pattern mô tả (ví dụ: "4x16" = 4 ghế x 16 hàng)
}

/**
 * Interface Seat - Thông tin ghế ngồi
 * Đại diện cho 1 ghế cụ thể trong toa tàu
 */
export interface Seat {
    id: string; // ID duy nhất
    carriageId: string; // ID toa tàu chứa ghế này
    seatNumber: string; // Số ghế (1A, 1B, 2A, etc.)
    row: number; // Hàng (0-indexed)
    column: number; // Cột (0-indexed)
    isAvailable: boolean; // Ghế còn trống hay đã được book
    isDisabled: boolean; // Ghế bị vô hiệu hóa (hỏng, maintenance...)
    disabledReason?: string; // Lý do vô hiệu hóa
    disabledAt?: string; // Thời gian vô hiệu hóa (ISO string)
    disabledBy?: string; // Tên admin vô hiệu hóa
}

/**
 * Interface ActivityLog - Log hoạt động admin
 * Ghi lại tất cả thao tác admin trên trains, carriages, seats
 */
export interface ActivityLog {
    id: string; // ID duy nhất
    action: string; // Loại action: "created", "updated", "deleted", "disabled_seat", etc.
    entityType: 'train' | 'carriage' | 'seat'; // Loại entity bị tác động
    entityId: string; // ID của entity bị tác động
    description: string; // Mô tả hành động (human-readable)
    adminName: string; // Tên admin thực hiện
    timestamp: string; // Thời gian thực hiện (ISO string)
    details?: Record<string, unknown>; // Chi tiết thay đổi (optional JSON data)
}

// ============================================================
// FILTER VÀ FORM TYPES (TRAIN)
// ============================================================

/**
 * Interface TrainFilters - Bộ lọc tìm kiếm chuyến tàu
 * Dùng cho trang admin quản lý chuyến tàu
 */
export interface TrainFilters {
    searchKeyword?: string; // Tìm theo mã hoặc tên chuyến tàu
    route?: string; // Tuyến đường (format: "Hà Nội - TP. Hồ Chí Minh")
    status?: TrainStatus; // Lọc theo trạng thái
    departureDate?: string; // Lọc theo ngày khởi hành (YYYY-MM-DD)
}

/**
 * Interface TrainFormData - Dữ liệu form thêm/sửa chuyến tàu
 * Dùng cho form ở trang admin/chuyen-tau/them-moi và sua
 */
export interface TrainFormData {
    code: string; // Mã chuyến tàu
    name: string; // Tên chuyến tàu
    from: string; // Ga đi
    to: string; // Ga đến
    departureTime: string; // Giờ khởi hành (datetime-local input)
    arrivalTime: string; // Giờ đến
    trainType: string; // Loại tàu
    totalSeats: number; // Tổng số ghế
    basePrice: number; // Giá cơ bản (VND)
    status: TrainStatus; // Trạng thái
}

// ============================================================
// STATISTICS TYPES (TRAIN)
// ============================================================

/**
 * Interface TrainStatistics - Thống kê chuyến tàu
 * Dùng cho dashboard và trang chi tiết chuyến tàu
 */
export interface TrainStatistics {
    totalOrders: number; // Tổng số đơn hàng
    totalRevenue: number; // Tổng doanh thu (VND)
    occupancyRate: number; // Tỷ lệ lấp đầy (%, = booked seats / total seats * 100)
    popularRoute: boolean; // Tuyến đường phổ biến hay không
}

// ============================================================
// ORDER MANAGEMENT TYPES
// ============================================================

/** OrderStatus - Trạng thái đơn hàng */
export type OrderStatus = 'Chờ xử lý' | 'Đã xác nhận' | 'Hoàn thành' | 'Đã hủy';

/** PaymentStatus - Trạng thái thanh toán */
export type PaymentStatus = 'Chưa thanh toán' | 'Đã thanh toán' | 'Hoàn tiền';

/** PaymentMethod - Phương thức thanh toán */
export type PaymentMethod = 'Thẻ tín dụng' | 'Chuyển khoản' | 'Ví điện tử' | 'Tiền mặt';

/**
 * Interface Customer - Thông tin khách hàng
 * Lưu trong mỗi order để dễ query
 */
export interface Customer {
    id: string; // ID khách hàng
    fullName: string; // Họ và tên
    email: string; // Email liên hệ
    phone: string; // Số điện thoại
    idNumber?: string; // Số CCCD/CMND (optional)
}

/**
 * Interface Ticket - Thông tin vé
 * Mỗi order có nhiều tickets (mỗi vé = 1 ghế)
 */
export interface Ticket {
    id: string; // ID vé
    orderId: string; // ID đơn hàng chứa vé này
    passengerName: string; // Tên hành khách trên vé
    passengerIdNumber: string; // Số CCCD/CMND hành khách
    carriageNumber: number; // Số toa
    seatNumber: string; // Số ghế (1A, 2B, etc.)
    ticketType: string; // Loại vé (Người lớn, Trẻ em, Sinh viên)
    price: number; // Giá vé (VND, đã tính hệ số nhân)
    qrCode?: string; // QR code cho vé điện tử (optional)
}

/**
 * Interface Order - Thông tin đơn hàng
 * Interface chính quản lý toàn bộ thông tin đơn hàng
 */
export interface Order {
    id: string; // ID đơn hàng
    orderCode: string; // Mã đơn hàng (DH2025001, DH2025002, etc.)
    customer: Customer; // Thông tin khách hàng
    trainId: string; // ID chuyến tàu
    trainCode: string; // Mã chuyến tàu (denormalized for display)
    trainName: string; // Tên chuyến tàu (denormalized)
    departureTime: string; // Giờ khởi hành (denormalized)
    tickets: Ticket[]; // Danh sách vé trong đơn
    totalAmount: number; // Tổng tiền (VND)
    paymentMethod: PaymentMethod; // Phương thức thanh toán
    paymentStatus: PaymentStatus; // Trạng thái thanh toán
    orderStatus: OrderStatus; // Trạng thái đơn hàng
    createdAt: string; // Ngày tạo đơn (ISO string)
    confirmedAt?: string; // Ngày xác nhận (optional)
    cancelledAt?: string; // Ngày hủy (optional)
    cancelReason?: string; // Lý do hủy (optional)
    notes?: string; // Ghi chú (optional)
}

/**
 * Interface OrderFilters - Bộ lọc tìm kiếm đơn hàng
 * Dùng cho trang admin quản lý đơn hàng
 */
export interface OrderFilters {
    searchKeyword?: string; // Tìm theo mã đơn hoặc tên khách hàng
    orderStatus?: OrderStatus; // Lọc theo trạng thái đơn
    paymentStatus?: PaymentStatus; // Lọc theo trạng thái thanh toán
    startDate?: string; // Lọc từ ngày (YYYY-MM-DD)
    endDate?: string; // Lọc đến ngày (YYYY-MM-DD)
    trainId?: string; // Lọc theo chuyến tàu
}
