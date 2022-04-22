import Link from "next/link"

function Header() {
    return (
        // 헤더 고정 및 스크롤 내릴 때 색상변경
        <header className="flex justify-between p-3 pb-2 mx-auto border-b border-solid pl-14 max-w-7xl border-b-black">
            <div className="flex items-center space-x-5 text-sm">
                <Link href="/" >
                    <img className="object-contain w-48 cursor-pointer" src="https://links.papareact.com/yvf" alt="logo" />
                </Link>
                <div className="items-center hidden px-6 space-x-5 md:inline-flex">
                    {/* Out Story */}
                    <h3>About</h3>
                    {/* Contact */}
                    <h3>Membership</h3>
                    {/* Follow */}
                    <h3 className="px-4 py-3 border-black rounded-full">Write</h3>
                </div>
            </div>
            <div className="flex items-center py-2 space-x-5 text-sm">
                <h3 className="hidden md:inline-flex">Sign In</h3>
                <h3 className="px-4 py-3 font-light text-white bg-black rounded-full">Get started</h3>
            </div>

        </header>)
}

export default Header