import { Button } from "@/components/ui/button";
import { BookAudio } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="mx-auto flex items-center justify-center">
            <nav className="max-w-6xl p-6 w-full flex justify-between items-center">
                <div className="flex gap-4">
                    <Link href="/" passHref>
                        <BookAudio className="size-10" />
                    </Link>
                </div>
                <Link href="/create" passHref>
                    <Button size="lg" variant="secondary">
                        Create
                    </Button>
                </Link>
            </nav>
        </div>
    );
}
