
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart, CartItem } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TrainInfo from '@/components/TrainInfo';
import CoachSelector from '@/components/CoachSelector';
import SeatMap, { Seat } from '@/components/SeatMap';
import BookingSummary from '@/components/BookingSummary';
import RelatedProducts from '@/components/RelatedProducts';
import CommentsSection from '@/components/CommentsSection';

// Mock Data
const coaches = [
    { id: 1, name: 'Toa 1: Ngồi mềm điều hòa', type: 'SoftSeat', available: 20, total: 64 },
    { id: 2, name: 'Toa 2: Ngồi mềm điều hòa', type: 'SoftSeat', available: 15, total: 64 },
    { id: 3, name: 'Toa 3: Giường nằm khoang 4', type: 'Sleeper', available: 5, total: 28 },
    { id: 4, name: 'Toa 4: Giường nằm khoang 6', type: 'Sleeper', available: 8, total: 42 },
];

const generateSeats = (coachId: number): Seat[] => {
    const seats: Seat[] = [];
    const type = coachId > 2 ? 'Sleeper' : (coachId > 4 ? 'HardSeat' : 'SoftSeat');
    const price = type === 'Sleeper' ? 850000 : 450000;
    const total = coachId > 2 ? 30 : 64;

    for (let i = 1; i <= total; i++) {
        seats.push({
            id: `${coachId}-${i}`,
            number: i,
            type: type,
            status: Math.random() < 0.3 ? 'occupied' : 'available',
            price: price,
        });
    }
    return seats;
};

export default function SeatSelectionPage() {
    const [selectedCoachId, setSelectedCoachId] = useState<number>(1);
    const [currentSeats, setCurrentSeats] = useState<Seat[]>(generateSeats(1)); // Initial load
    const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
    const router = useRouter();
    const { addToCart } = useCart();

    const handleContinue = () => {
        if (selectedSeats.length === 0) {
            alert('Vui lòng chọn ít nhất 1 ghế');
            return;
        }

        const coachName = coaches.find(c => c.id === selectedCoachId)?.name || 'Ghế ngồi';

        const itemsToAdd: CartItem[] = selectedSeats.map(seat => ({
            id: `SE1-${selectedCoachId}-${seat.id}`,
            seatNumber: seat.number,
            seatType: seat.type,
            price: seat.price,
            trainId: 'SE1',
            departureStation: 'Sài Gòn',
            arrivalStation: 'Hà Nội',
            departureTime: '06:00',
            coachId: selectedCoachId,
            coachName: coachName,
        }));

        addToCart(itemsToAdd);
        router.push('/gio-hang');
    };

    const handleSelectCoach = (id: number) => {
        setSelectedCoachId(id);
        // In real app, fetch seats for this coach
        setCurrentSeats(generateSeats(id));
    };

    const handleToggleSeat = (seatId: string) => {
        const seat = currentSeats.find((s) => s.id === seatId);
        if (!seat || seat.status === 'occupied') return;

        const isSelected = selectedSeats.some((s) => s.id === seatId);

        if (isSelected) {
            setSelectedSeats(selectedSeats.filter((s) => s.id !== seatId));
            // Update visual status in current map
            setCurrentSeats(currentSeats.map(s => s.id === seatId ? { ...s, status: 'available' } : s));
        } else {
            setSelectedSeats([...selectedSeats, { ...seat, status: 'selected' }]);
            // Update visual status in current map
            setCurrentSeats(currentSeats.map(s => s.id === seatId ? { ...s, status: 'selected' } : s));
        }
    };

    // Sync selection status when changing coaches (basic implementation)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        setCurrentSeats(prev => prev.map(seat => {
            const isSelected = selectedSeats.some(s => s.id === seat.id);
            return isSelected ? { ...seat, status: 'selected' } : (seat.status === 'selected' ? { ...seat, status: 'available' } : seat);
        }));
    }, [selectedSeats, selectedCoachId]);


    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow bg-[#E6F2FF] py-8">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#003366] mb-6 text-center md:text-left">
                        Chi tiết chuyến tàu & Chọn chỗ
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content (Left/Center) */}
                        <div className="lg:col-span-2">
                            <TrainInfo
                                trainId="SE1"
                                departureStation="Sài Gòn"
                                arrivalStation="Hà Nội"
                                departureTime="06:00"
                                arrivalTime="18:30"
                                duration="36h 30m"
                            />

                            <CoachSelector
                                coaches={coaches}
                                selectedCoachId={selectedCoachId}
                                onSelectCoach={handleSelectCoach}
                            />

                            <SeatMap
                                seats={currentSeats}
                                onToggleSeat={handleToggleSeat}
                            />

                            <div className="block lg:hidden mb-6">
                                <BookingSummary
                                    selectedSeats={selectedSeats}
                                    onContinue={handleContinue}
                                />
                            </div>

                            <RelatedProducts />

                            <CommentsSection />
                        </div>

                        {/* Sidebar (Right) - Desktop only (or Sticky logic) */}
                        <div className="hidden lg:block">
                            <div className="sticky top-4 space-y-6">
                                <BookingSummary
                                    selectedSeats={selectedSeats}
                                    onContinue={handleContinue}
                                />

                                <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                                    <h4 className="font-bold text-[#003366] mb-2">Hỗ trợ khách hàng</h4>
                                    <p className="text-sm text-gray-600 mb-2">Hotline: <span className="font-bold text-[#CC0000]">1900 1234</span></p>
                                    <p className="text-sm text-gray-600">Email: support@dsvn.vn</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Sticky Bottom Bar (Optional, if BookingSummary is too long) */}
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 md:hidden z-50 flex justify-between items-center border-t border-gray-200">
                    <div>
                        <span className="text-xs text-gray-500 block">Tổng tiền tạm tính</span>
                        <span className="font-bold text-[#CC0000] text-lg">
                            {selectedSeats.reduce((sum, s) => sum + s.price, 0).toLocaleString()}đ
                        </span>
                    </div>
                    <button
                        onClick={handleContinue}
                        className="bg-[#CC0000] text-white font-bold py-2 px-6 rounded-full shadow-lg"
                    >
                        Tiếp tục
                    </button>
                </div>
                {/* Spacer for sticky bottom */}
                <div className="h-20 md:hidden"></div>
            </main>
            <Footer />
        </div>
    );
}
