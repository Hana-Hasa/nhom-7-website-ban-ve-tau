
import React from 'react';

const relatedItems = [
    { id: 1, name: 'Combo Bánh Mì + Nước Suối', price: 35000, image: 'https://placehold.co/100x100?text=Combo' },
    { id: 2, name: 'Cà phê sữa đá', price: 20000, image: 'https://placehold.co/100x100?text=Coffee' },
    { id: 3, name: 'Gối cổ chữ U', price: 45000, image: 'https://placehold.co/100x100?text=Pillow' },
    { id: 4, name: 'Khăn lạnh (10 cái)', price: 15000, image: 'https://placehold.co/100x100?text=Towel' },
];

const RelatedProducts: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-bold text-[#003366] mb-4 border-b pb-2">Dịch vụ & Sản phẩm đi kèm</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                        <div className="aspect-square bg-gray-100 rounded-md mb-2 overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-semibold text-sm text-gray-800 line-clamp-2 min-h-[40px]">{item.name}</h4>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-[#CC0000] font-bold text-sm">{item.price.toLocaleString()}đ</span>
                            <button className="bg-[#E6F2FF] text-[#003366] hover:bg-[#003366] hover:text-white p-1.5 rounded-full transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
