import Link from "next/link"

function Header() {
    return (

        <header className="flex">
            <div>
                <Link href="/" >
                    <img className="object-contain cursor-pointer w-44" src="https://links.papareact.com/yvf" alt="logo" />
                </Link>
                <div>
                    <h3></h3>
                    <h3></h3>
                    <h3></h3>
                </div>
            </div>
            <div className="">
                <div>Sign In</div>
                <div>Get started</div>
            </div>
        </header>)
}

export default Header