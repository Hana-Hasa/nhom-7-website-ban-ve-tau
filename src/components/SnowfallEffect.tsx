/**
 * SNOWFALL EFFECT COMPONENT - HIỆU ỨNG TUYẾT RƠI NOEL
 * Component tạo hiệu ứng tuyết rơi cho trang chủ
 * - Tạo nhiều bông tuyết với kích thước và tốc độ khác nhau
 * - Sử dụng CSS animation để tạo hiệu ứng mượt mà
 * - Không ảnh hưởng đến performance
 */

'use client';

import { useEffect, useState } from 'react';

interface Snowflake {
    id: number;
    left: number; // Vị trí ngang (%)
    animationDuration: number; // Thời gian rơi (giây)
    size: number; // Kích thước bông tuyết (px)
    delay: number; // Độ trễ bắt đầu animation (giây)
    opacity: number; // Độ mờ
}

export default function SnowfallEffect() {
    const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

    useEffect(() => {
        // Tạo 50 bông tuyết với các thuộc tính ngẫu nhiên
        const flakes: Snowflake[] = [];
        for (let i = 0; i < 50; i++) {
            flakes.push({
                id: i,
                left: Math.random() * 100, // Vị trí ngẫu nhiên từ 0-100%
                animationDuration: 5 + Math.random() * 10, // 5-15 giây
                size: 2 + Math.random() * 6, // 2-8px
                delay: Math.random() * 5, // 0-5 giây delay
                opacity: 0.3 + Math.random() * 0.7, // 0.3-1.0
            });
        }
        setSnowflakes(flakes);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="absolute top-0 animate-snowfall"
                    style={{
                        left: `${flake.left}%`,
                        width: `${flake.size}px`,
                        height: `${flake.size}px`,
                        animationDuration: `${flake.animationDuration}s`,
                        animationDelay: `${flake.delay}s`,
                        opacity: flake.opacity,
                    }}
                >
                    {/* Bông tuyết dạng ❄️ hoặc • */}
                    <div
                        className="w-full h-full rounded-full bg-white shadow-lg"
                        style={{
                            boxShadow: '0 0 3px rgba(255, 255, 255, 0.8)',
                        }}
                    />
                </div>
            ))}

            {/* CSS Animation cho tuyết rơi */}
            <style jsx>{`
                @keyframes snowfall {
                    0% {
                        transform: translateY(-10px) translateX(0);
                    }
                    50% {
                        transform: translateY(50vh) translateX(50px);
                    }
                    100% {
                        transform: translateY(100vh) translateX(0);
                    }
                }

                .animate-snowfall {
                    animation-name: snowfall;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                }
            `}</style>
        </div>
    );
}
