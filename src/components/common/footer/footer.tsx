import Image from "next/image";

export default function Footer() {
    return (
        <footer className="position-absolute bottom-0 left-0 w-full">
            <div className="container">
                <p className="py-10 px-3 bg-[#101010] text-center rounded-4xl">©2025 Copyright UIXPLOR. All Right Reserved </p>
                <Image src={'/images/bgs/fade-logo.svg'} className="w-full mt-10" width={200} height={100} alt="" />
            </div>
        </footer>
    )
}