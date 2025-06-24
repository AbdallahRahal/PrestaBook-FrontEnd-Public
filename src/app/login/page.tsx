// src/app/login/page.tsx
import GuestRoute from '../../components/GuestRoute';
import Login from '../../components/Login';

export default function LoginPage() {
    return (
        <GuestRoute>
            <Login />
        </GuestRoute>
    );
}
