import Link from 'next/link'

const Navbar = () => {
    return (
        <div className="navbar justify-between bg-base-200">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><Link href="/">Chat</Link></li>
                        <li><Link href="/voice-chat">Voice Chat</Link></li>
                        <li><Link href="/generate-image">Generate Image</Link></li>
                    </ul>
                </div>
                <Link href="/" className="btn btn-ghost text-xl">SpringAiDemo</Link>
            </div>
            <div className="hidden md:block">
                <ul className="menu menu-horizontal p-0">
                    <li><Link href="/">Chat</Link></li>
                    <li><Link href="/voice-chat">Voice Chat</Link></li>
                    <li><Link href="/generate-image">Generate Image</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
