// src/app/register/page.tsx
import GuestRoute from '../../components/GuestRoute';
import Register from '../../components/Register';

export default function RegisterPage() {
    return <GuestRoute>
        <Register />
    </GuestRoute>
}
