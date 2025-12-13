
import React from 'react';

interface Coach {
    id: number;
    name: string;
    type: string;
    available: number;
    total: number;
}

interface CoachSelectorProps {
    coaches: Coach[];
    selectedCoachId: number;
    onSelectCoach: (id: number) => void;
}

const CoachSelector: React.FC<CoachSelectorProps> = ({ coaches, selectedCoachId, onSelectCoach }) => {
    return (
        <div className="flex flex-nowrap overflow-x-auto gap-4 py-4 mb-6 custom-scrollbar">
            {/* Locomotive */}
            <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-24 h-12 bg-gray-800 rounded-l-lg rounded-r-md flex items-center justify-center shadow-md relative">
                    <div className="absolute -bottom-1 left-2 h-3 w-3 bg-black rounded-full border border-gray-500"></div>
                    <div className="absolute -bottom-1 right-2 h-3 w-3 bg-black rounded-full border border-gray-500"></div>
                    <span className="text-white text-xs font-bold">ĐẦU TÀU</span>
                </div>
            </div>

            {coaches.map((coach) => (
                <button
                    key={coach.id}
                    onClick={() => onSelectCoach(coach.id)}
                    className={`flex-shrink-0 flex flex-col items-center group transition-all duration-300 ${selectedCoachId === coach.id ? 'transform -translate-y-1' : ''
                        }`}
                >
                    <div
                        className={`w-28 h-12 rounded-lg border-2 flex items-center justify-center relative shadow-sm transition-colors ${selectedCoachId === coach.id
                                ? 'bg-[#E6F2FF] border-[#003366]'
                                : 'bg-white border-gray-300 hover:border-[#003366]'
                            }`}
                    >
                        <span className={`font-bold ${selectedCoachId === coach.id ? 'text-[#003366]' : 'text-gray-600'}`}>Toa {coach.id}</span>
                        <div className="absolute -bottom-1 left-2 h-3 w-3 bg-gray-600 rounded-full"></div>
                        <div className="absolute -bottom-1 right-2 h-3 w-3 bg-gray-600 rounded-full"></div>
                    </div>
                    <div className="mt-2 text-center">
                        <span className="block text-xs font-medium text-gray-700">{coach.name}</span>
                        <span className="block text-[10px] text-gray-500">{coach.available}/{coach.total} chỗ</span>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default CoachSelector;
