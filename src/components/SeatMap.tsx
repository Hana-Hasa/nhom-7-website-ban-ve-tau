
import React from 'react';

export interface Seat {
    id: string;
    number: number;
    type: 'SoftSeat' | 'HardSeat' | 'Sleeper';
    status: 'available' | 'occupied' | 'selected';
    price: number;
}

interface SeatMapProps {
    seats: Seat[];
    onToggleSeat: (seatId: string) => void;
}

const SeatMap: React.FC<SeatMapProps> = ({ seats, onToggleSeat }) => {
    const getSeatColor = (status: string, type: string) => {
        if (status === 'occupied') return 'bg-gray-300 cursor-not-allowed text-gray-400';
        if (status === 'selected') return 'bg-[#CC0000] text-white border-[#CC0000]';
        // Available
        if (type === 'Sleeper') return 'bg-white border-[#003366] text-[#003366] hover:bg-[#E6F2FF]';
        return 'bg-white border-gray-400 text-gray-700 hover:border-[#003366] hover:text-[#003366]';
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-bold text-[#003366] mb-4">Sơ đồ chỗ ngồi</h3>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-6 text-xs text-gray-600 justify-center">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border border-gray-400 bg-white"></div>
                    <span>Ghế trống</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#CC0000]"></div>
                    <span>Đang chọn</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-gray-300"></div>
                    <span>Đã đặt</span>
                </div>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-items-center">
                {seats.map((seat) => (
                    <button
                        key={seat.id}
                        disabled={seat.status === 'occupied'}
                        onClick={() => onToggleSeat(seat.id)}
                        className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center font-bold text-sm border-2 transition-all duration-200 ${getSeatColor(
                            seat.status,
                            seat.type
                        )}`}
                        title={`Ghế ${seat.number} - ${seat.price.toLocaleString()}đ`}
                    >
                        {seat.number}
                    </button>
                ))}
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
                Toa này có {seats.filter(s => s.status === 'available').length} chỗ trống
            </div>
        </div>
    );
};

export default SeatMap;
