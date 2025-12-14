import { ReactNode } from 'react';
import { TrainProvider } from '@/context/TrainContext';
import { OrderProvider } from '@/context/OrderContext';
import { NewsProvider } from '@/context/NewsContext';
import AdminLayout from '@/components/admin/AdminLayout';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <TrainProvider>
            <OrderProvider>
                <NewsProvider>
                    <AdminLayout>{children}</AdminLayout>
                </NewsProvider>
            </OrderProvider>
        </TrainProvider>
    );
}
