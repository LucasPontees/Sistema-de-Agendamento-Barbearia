import Link from 'next/link'


export default function NextNavbar() {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">Next Navbar</div>
                <div className="space-x-4">
                    <Link href="/" className="text-white hover:text-gray-400">Home</Link  >

                    <Link href="/sign-in" className="text-white hover:text-gray-400">Sign In</Link>
                </div>
            </div>
        </nav>
    );
}