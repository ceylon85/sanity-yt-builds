import Link from "next/link"

function Header() {
    return (

        <header className="flex justify-between p-5 mx-auto max-w-7xl borders">
            <div className="flex items-center space-x-5">
                <Link href="/" >
                    <img className="object-contain w-48 cursor-pointer" src="https://links.papareact.com/yvf" alt="logo" />
                </Link>
                <div className="items-center hidden space-x-5 md:inline-flex">
                    {/* Out Story */}
                    <h3>About</h3>
                    {/* Contact */}
                    <h3>Membership</h3>
                    {/* Follow */}
                    <h3 className="px-4 py-1 text-white bg-green-600 rounded-full">Write</h3>
                </div>
            </div>
            <div className="flex items-center space-x-5 text-green-600 ">
                <h3 className="hidden md:inline-flex">Sign In</h3>
                <h3 className="px-4 py-1 border border-green-600 rounded-full">Get started</h3>
            </div>

        </header>)
}

export default Header