
import React from 'react';
import { Seat } from './SeatMap';

interface BookingSummaryProps {
    selectedSeats: Seat[];
    onContinue: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ selectedSeats, onContinue }) => {
    const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            <h3 className="text-xl font-bold text-[#003366] mb-4 border-b pb-2">Thông tin vé</h3>

            {selectedSeats.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    <p>Chưa có ghế nào được chọn</p>
                    <p className="text-sm mt-1">Vui lòng chọn ghế ở bảng bên trái</p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                        {selectedSeats.map((seat) => (
                            <div key={seat.id} className="flex justify-between items-center py-2 border-b border-dashed border-gray-200 last:border-0">
                                <div>
                                    <span className="font-bold text-[#003366]">Ghế {seat.number}</span>
                                    <span className="text-xs text-gray-500 block">{seat.type === 'Sleeper' ? 'Giường nằm' : 'Ghế mềm'}</span>
                                </div>
                                <span className="font-semibold text-[#CC0000]">{seat.price.toLocaleString()}đ</span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-end mb-4">
                            <span className="text-gray-600 font-medium">Tổng tiền:</span>
                            <span className="text-2xl font-bold text-[#CC0000]">{totalPrice.toLocaleString()}đ</span>
                        </div>

                        <button
                            onClick={onContinue}
                            className="w-full bg-[#CC0000] hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg shadow transition-colors duration-200 flex justify-center items-center gap-2"
                        >
                            <span>Tiếp tục</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingSummary;
