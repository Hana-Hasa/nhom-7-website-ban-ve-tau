import { ReactNode } from 'react';
import { TrainProvider } from '@/context/TrainContext';
import AdminLayout from '@/components/admin/AdminLayout';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <TrainProvider>
            <AdminLayout>{children}</AdminLayout>
        </TrainProvider>
    );
}
