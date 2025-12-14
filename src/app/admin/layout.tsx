import { ReactNode } from 'react';
import { TrainProvider } from '@/context/TrainContext';
import { OrderProvider } from '@/context/OrderContext';
import AdminLayout from '@/components/admin/AdminLayout';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <TrainProvider>
            <OrderProvider>
                <AdminLayout>{children}</AdminLayout>
            </OrderProvider>
        </TrainProvider>
    );
}
