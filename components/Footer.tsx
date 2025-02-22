import { BookAudio } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mx-auto flex items-center justify-center">
            <div className="max-w-6xl p-6 w-full flex flex-col md:flex-row justify-between items-center">
                <nav className="flex space-x-4 mt-4 md:mt-0">
                    <Link href="/about" className="text-sm hover:underline">
                        Github
                    </Link>
                    <Link href="/contact" className="text-sm hover:underline">
                        Contact
                    </Link>
                    <Link href="/privacy" className="text-sm hover:underline">
                        Portfolio
                    </Link>
                </nav>
                <div className="flex gap-x-2 mt-10 md:mt-0">
                    <BookAudio className="size-10" />
                    <h1 className="font-black text-3xl">Audiobook Blogs</h1>
                </div>
            </div>
        </footer>
    );
}
