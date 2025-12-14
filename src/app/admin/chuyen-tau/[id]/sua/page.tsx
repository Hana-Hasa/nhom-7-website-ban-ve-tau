'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTrainManagement } from '@/hooks/useTrainManagement';
import { TrainFormData, TrainStatus } from '@/types/train';
import { stations, trainTypes } from '@/data/trainData';
import Toast from '@/components/admin/Toast';

export default function EditTrainPage() {
    const params = useParams();
    const router = useRouter();
    const trainId = params?.id as string;

    const { getTrainById, updateTrain, toast, showToast } = useTrainManagement();
    const train = getTrainById(trainId);

    const [formData, setFormData] = useState<TrainFormData>({
        code: '',
        name: '',
        from: '',
        to: '',
        departureTime: '',
        arrivalTime: '',
        trainType: '',
        totalSeats: 0,
        basePrice: 0,
        status: 'Hoạt động',
    });

    const [errors, setErrors] = useState<Partial<Record<keyof TrainFormData, string>>>({});

    // Load train data
    useEffect(() => {
        if (train) {
            setFormData({
                code: train.code,
                name: train.name,
                from: train.from,
                to: train.to,
                departureTime: train.departureTime.substring(0, 16), // Format for datetime-local
                arrivalTime: train.arrivalTime.substring(0, 16),
                trainType: train.trainType,
                totalSeats: train.totalSeats,
                basePrice: train.basePrice,
                status: train.status,
            });
        }
    }, [train]);

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

    const handleChange = (field: keyof TrainFormData, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof TrainFormData, string>> = {};

        if (!formData.code) newErrors.code = 'Mã chuyến tàu là bắt buộc';
        if (!formData.name) newErrors.name = 'Tên chuyến tàu là bắt buộc';
        if (!formData.from) newErrors.from = 'Ga đi là bắt buộc';
        if (!formData.to) newErrors.to = 'Ga đến là bắt buộc';
        if (!formData.departureTime) newErrors.departureTime = 'Thời gian khởi hành là bắt buộc';
        if (!formData.arrivalTime) newErrors.arrivalTime = 'Thời gian đến là bắt buộc';
        if (!formData.trainType) newErrors.trainType = 'Loại tàu là bắt buộc';
        if (!formData.totalSeats || formData.totalSeats <= 0) newErrors.totalSeats = 'Số ghế phải lớn hơn 0';
        if (!formData.basePrice || formData.basePrice <= 0) newErrors.basePrice = 'Giá vé phải lớn hơn 0';

        if (formData.from === formData.to) {
            newErrors.to = 'Ga đến phải khác ga đi';
        }

        if (formData.departureTime && formData.arrivalTime) {
            if (new Date(formData.departureTime) >= new Date(formData.arrivalTime)) {
                newErrors.arrivalTime = 'Thời gian đến phải sau thời gian khởi hành';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            showToast('Vui lòng kiểm tra lại thông tin', 'error');
            return;
        }

        const result = updateTrain(trainId, formData);

        if (result.success) {
            router.push(`/admin/chuyen-tau/${trainId}`);
        } else {
            showToast(result.message, 'error');
        }
    };

    return (
        <div className="max-w-4xl">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Link href="/admin/chuyen-tau" className="hover:text-blue-600">
                        Quản lý Chuyến tàu
                    </Link>
                    <span>/</span>
                    <Link href={`/admin/chuyen-tau/${trainId}`} className="hover:text-blue-600">
                        {train.code}
                    </Link>
                    <span>/</span>
                    <span>Chỉnh sửa</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Chỉnh sửa chuyến tàu</h1>
                <p className="text-gray-600 mt-1">Cập nhật thông tin chuyến tàu {train.code}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Mã chuyến tàu */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mã chuyến tàu <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.code}
                            onChange={(e) => handleChange('code', e.target.value.toUpperCase())}
                            className={`w-full px-4 py-2 border ${errors.code ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                        {errors.code && <p className="mt-1 text-sm text-red-500">{errors.code}</p>}
                    </div>

                    {/* Tên chuyến tàu */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tên chuyến tàu <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                    </div>

                    {/* Ga đi */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ga đi <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.from}
                            onChange={(e) => handleChange('from', e.target.value)}
                            className={`w-full px-4 py-2 border ${errors.from ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        >
                            <option value="">-- Chọn ga đi --</option>
                            {stations.map((station) => (
                                <option key={station} value={station}>
                                    {station}
                                </option>
                            ))}
                        </select>
                        {errors.from && <p className="mt-1 text-sm text-red-500">{errors.from}</p>}
                    </div>

                    {/* Ga đến */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ga đến <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.to}
                            onChange={(e) => handleChange('to', e.target.value)}
                            className={`w-full px-4 py-2 border ${errors.to ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        >
                            <option value="">-- Chọn ga đến --</option>
                            {stations.map((station) => (
                                <option key={station} value={station}>
                                    {station}
                                </option>
                            ))}
                        </select>
                        {errors.to && <p className="mt-1 text-sm text-red-500">{errors.to}</p>}
                    </div>

                    {/* Thời gian khởi hành */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Thời gian khởi hành <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="datetime-local"
                            value={formData.departureTime}
                            onChange={(e) => handleChange('departureTime', e.target.value)}
                            className={`w-full px-4 py-2 border ${errors.departureTime ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                        {errors.departureTime && <p className="mt-1 text-sm text-red-500">{errors.departureTime}</p>}
                    </div>

                    {/* Thời gian đến */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Thời gian đến <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="datetime-local"
                            value={formData.arrivalTime}
                            onChange={(e) => handleChange('arrivalTime', e.target.value)}
                            className={`w-full px-4 py-2 border ${errors.arrivalTime ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                        {errors.arrivalTime && <p className="mt-1 text-sm text-red-500">{errors.arrivalTime}</p>}
                    </div>

                    {/* Loại tàu */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Loại tàu <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.trainType}
                            onChange={(e) => handleChange('trainType', e.target.value)}
                            className={`w-full px-4 py-2 border ${errors.trainType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        >
                            <option value="">-- Chọn loại tàu --</option>
                            {trainTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        {errors.trainType && <p className="mt-1 text-sm text-red-500">{errors.trainType}</p>}
                    </div>

                    {/* Tổng số ghế */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tổng số ghế <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={formData.totalSeats || ''}
                            onChange={(e) => handleChange('totalSeats', parseInt(e.target.value) || 0)}
                            className={`w-full px-4 py-2 border ${errors.totalSeats ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            min="1"
                        />
                        {errors.totalSeats && <p className="mt-1 text-sm text-red-500">{errors.totalSeats}</p>}
                    </div>

                    {/* Giá vé cơ bản */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Giá vé cơ bản (VND) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            value={formData.basePrice || ''}
                            onChange={(e) => handleChange('basePrice', parseInt(e.target.value) || 0)}
                            className={`w-full px-4 py-2 border ${errors.basePrice ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            min="1"
                            step="1000"
                        />
                        {errors.basePrice && <p className="mt-1 text-sm text-red-500">{errors.basePrice}</p>}
                    </div>

                    {/* Trạng thái */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Trạng thái <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) => handleChange('status', e.target.value as TrainStatus)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="Hoạt động">Hoạt động</option>
                            <option value="Tạm dừng">Tạm dừng</option>
                            <option value="Đã hủy">Đã hủy</option>
                        </select>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                    <Link
                        href={`/admin/chuyen-tau/${trainId}`}
                        className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
                    >
                        Hủy
                    </Link>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Cập nhật
                    </button>
                </div>
            </form>

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
