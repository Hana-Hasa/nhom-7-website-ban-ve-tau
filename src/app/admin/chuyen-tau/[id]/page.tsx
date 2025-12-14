'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTrainManagement } from '@/hooks/useTrainManagement';
import { useTrainContext } from '@/context/TrainContext';
import { Carriage, Seat } from '@/types/train';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Toast from '@/components/admin/Toast';

export default function TrainDetailPage() {
    const params = useParams();
    const router = useRouter();
    const trainId = params?.id as string;

    const { getTrainById, deleteTrain, disableSeat, toast, showToast } = useTrainManagement();
    const { activityLogs } = useTrainContext();
    const train = getTrainById(trainId);

    const [activeTab, setActiveTab] = useState<'info' | 'carriages' | 'stats' | 'history'>('info');
    const [selectedCarriage, setSelectedCarriage] = useState<Carriage | null>(null);
    const [seatToDisable, setSeatToDisable] = useState<Seat | null>(null);
    const [disableReason, setDisableReason] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    if (!train) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-600">Không tìm thấy chuyến tàu</p>
                <Link href="/admin/chuyen-tau" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
                    ← Quay lại danh sách
                </Link>
            </div>
        );
    }

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price) + ' VND';
    };

    const handleDelete = () => {
        const result = deleteTrain(trainId);
        if (result.success) {
            router.push('/admin/chuyen-tau');
        } else {
            showToast(result.message, 'error');
            setShowDeleteConfirm(false);
        }
    };

    const handleDisableSeat = () => {
        if (seatToDisable && selectedCarriage && disableReason.trim()) {
            const result = disableSeat(trainId, selectedCarriage.id, seatToDisable.id, disableReason);
            if (result.success) {
                setSeatToDisable(null);
                setDisableReason('');
                // Refresh carriage data
                const updatedTrain = getTrainById(trainId);
                if (updatedTrain) {
                    const updatedCarriage = updatedTrain.carriages.find(c => c.id === selectedCarriage.id);
                    if (updatedCarriage) {
                        setSelectedCarriage(updatedCarriage);
                    }
                }
            }
        }
    };

    const trainLogs = activityLogs.filter(log => log.entityId === trainId || log.entityId.startsWith(trainId));

    return (
        <div className="max-w-6xl">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Link href="/admin/chuyen-tau" className="hover:text-blue-600">
                        Quản lý Chuyến tàu
                    </Link>
                    <span>/</span>
                    <span>{train.code}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{train.name}</h1>
                        <p className="text-gray-600 mt-1">Mã: {train.code}</p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href={`/admin/chuyen-tau/${trainId}/sua`}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Sửa thông tin
                        </Link>
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                        >
                            Xóa chuyến tàu
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-6">
                    {[
                        { key: 'info' as const, label: 'Thông tin cơ bản', icon: '📋' },
                        { key: 'carriages' as const, label: 'Toa tàu & Ghế', icon: '🎫' },
                        { key: 'stats' as const, label: 'Thống kê', icon: '📊' },
                        { key: 'history' as const, label: 'Lịch sử', icon: '📜' },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${activeTab === tab.key
                                    ? 'border-blue-600 text-blue-600 font-medium'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <span>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {/* Thông tin cơ bản */}
                {activeTab === 'info' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Mã chuyến tàu</h3>
                            <p className="text-lg text-gray-900">{train.code}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Tên chuyến tàu</h3>
                            <p className="text-lg text-gray-900">{train.name}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Ga đi</h3>
                            <p className="text-lg text-gray-900">{train.from}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Ga đến</h3>
                            <p className="text-lg text-gray-900">{train.to}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Thời gian khởi hành</h3>
                            <p className="text-lg text-gray-900">{formatDateTime(train.departureTime)}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Thời gian đến</h3>
                            <p className="text-lg text-gray-900">{formatDateTime(train.arrivalTime)}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Loại tàu</h3>
                            <p className="text-lg text-gray-900">{train.trainType}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Số ghế</h3>
                            <p className="text-lg text-gray-900">{train.availableSeats} / {train.totalSeats} còn trống</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Giá vé cơ bản</h3>
                            <p className="text-lg font-bold text-gray-900">{formatPrice(train.basePrice)}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-1">Trạng thái</h3>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${train.status === 'Hoạt động' ? 'bg-green-100 text-green-800' :
                                    train.status === 'Tạm dừng' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                }`}>
                                {train.status}
                            </span>
                        </div>
                    </div>
                )}

                {/* Toa tàu & Ghế */}
                {activeTab === 'carriages' && (
                    <div>
                        {train.carriages.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <p>Chưa có toa tàu nào</p>
                                <p className="text-sm mt-2">Thêm toa tàu để quản lý ghế ngồi</p>
                            </div>
                        ) : (
                            <div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    {train.carriages.map((carriage) => (
                                        <button
                                            key={carriage.id}
                                            onClick={() => setSelectedCarriage(carriage)}
                                            className={`p-4 border-2 rounded-lg text-left transition-all ${selectedCarriage?.id === carriage.id
                                                    ? 'border-blue-600 bg-blue-50'
                                                    : 'border-gray-200 hover:border-blue-300'
                                                }`}
                                        >
                                            <div className="font-bold text-lg mb-1">Toa số {carriage.number}</div>
                                            <div className="text-sm text-gray-600">{carriage.type}</div>
                                            <div className="text-sm text-gray-600 mt-2">
                                                {carriage.seats.filter(s => s.isAvailable && !s.isDisabled).length} / {carriage.totalSeats} ghế
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {selectedCarriage && (
                                    <div>
                                        <h3 className="font-bold text-lg mb-4">
                                            Sơ đồ ghế - Toa {selectedCarriage.number} ({selectedCarriage.type})
                                        </h3>
                                        <div className="grid gap-2" style={{
                                            gridTemplateColumns: `repeat(${selectedCarriage.seatLayout.columns}, minmax(0, 1fr))`
                                        }}>
                                            {selectedCarriage.seats.map((seat) => (
                                                <button
                                                    key={seat.id}
                                                    onClick={() => !seat.isDisabled && setSeatToDisable(seat)}
                                                    disabled={seat.isDisabled}
                                                    className={`p-3 rounded border-2 text-sm font-medium transition-all ${seat.isDisabled
                                                            ? 'bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed'
                                                            : seat.isAvailable
                                                                ? 'bg-green-50 border-green-300 text-green-800 hover:bg-green-100'
                                                                : 'bg-red-50 border-red-300 text-red-800'
                                                        }`}
                                                    title={seat.isDisabled ? `Vô hiệu hóa: ${seat.disabledReason}` : seat.seatNumber}
                                                >
                                                    {seat.seatNumber}
                                                    {seat.isDisabled && <div className="text-xs">❌</div>}
                                                </button>
                                            ))}
                                        </div>
                                        <div className="mt-4 flex gap-4 text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                                                <span>Còn trống</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                                                <span>Đã đặt</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded"></div>
                                                <span>Vô hiệu hóa</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Thống kê */}
                {activeTab === 'stats' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-blue-50 rounded-lg">
                            <h3 className="text-sm font-medium text-blue-600 mb-1">Tỷ lệ lấp đầy</h3>
                            <p className="text-3xl font-bold text-blue-900">
                                {Math.round(((train.totalSeats - train.availableSeats) / train.totalSeats) * 100)}%
                            </p>
                        </div>
                        <div className="p-6 bg-green-50 rounded-lg">
                            <h3 className="text-sm font-medium text-green-600 mb-1">Tổng số toa</h3>
                            <p className="text-3xl font-bold text-green-900">{train.carriages.length}</p>
                        </div>
                        <div className="p-6 bg-purple-50 rounded-lg">
                            <h3 className="text-sm font-medium text-purple-600 mb-1">Ghế vô hiệu hóa</h3>
                            <p className="text-3xl font-bold text-purple-900">
                                {train.carriages.reduce((sum, c) => sum + c.seats.filter(s => s.isDisabled).length, 0)}
                            </p>
                        </div>
                    </div>
                )}

                {/* Lịch sử */}
                {activeTab === 'history' && (
                    <div>
                        {trainLogs.length === 0 ? (
                            <p className="text-center py-12 text-gray-500">Chưa có lịch sử thay đổi</p>
                        ) : (
                            <div className="space-y-4">
                                {trainLogs.map((log) => (
                                    <div key={log.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="text-2xl">
                                            {log.action === 'created' && '➕'}
                                            {log.action === 'updated' && '✏️'}
                                            {log.action === 'deleted' && '🗑️'}
                                            {log.action === 'disabled_seat' && '🚫'}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">{log.description}</p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {log.adminName} • {formatDateTime(log.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Disable Seat Dialog */}
            {seatToDisable && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Vô hiệu hóa ghế {seatToDisable.seatNumber}
                        </h3>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lý do vô hiệu hóa:
                        </label>
                        <textarea
                            value={disableReason}
                            onChange={(e) => setDisableReason(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                            placeholder="VD: Ghế hỏng, cần bảo trì"
                        />
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setSeatToDisable(null);
                                    setDisableReason('');
                                }}
                                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleDisableSeat}
                                disabled={!disableReason.trim()}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            <ConfirmDialog
                isOpen={showDeleteConfirm}
                title="Xác nhận xóa chuyến tàu"
                message={`Bạn có chắc chắn muốn xóa chuyến tàu ${train.code}?`}
                confirmText="Xác nhận xóa"
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteConfirm(false)}
                type="danger"
            />

            {/* Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => { }}
                />
            )}
        </div>
    );
}
