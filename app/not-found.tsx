import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
            <h2 className="text-6xl font-black text-slate-900 mb-4">404</h2>
            <p className="text-xl font-medium text-slate-600 mb-8">Oops! The story you're looking for doesn't exist.</p>
            <Link
                href="/"
                className="btn-primary px-8 py-3 rounded-xl"
            >
                Go Back Home
            </Link>
        </div>
    );
}
