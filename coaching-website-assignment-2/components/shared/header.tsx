import Link from "next/link"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  currentPage?: string
}

export function Header({ currentPage }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 py-4 lg:px-12">
      <Link href="/" className="flex items-center space-x-2">
        <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">L</span>
        </div>
        <span className="text-xl font-bold">LOLCoachUp</span>
      </Link>

      <nav className="hidden md:flex items-center space-x-8">
        <Link
          href="/"
          className={`transition-colors ${currentPage === "home" ? "text-white font-semibold" : "text-gray-300 hover:text-white"}`}
        >
          Home
        </Link>
        <Link
          href="/coaches"
          className={`transition-colors ${currentPage === "coaches" ? "text-white font-semibold" : "text-gray-300 hover:text-white"}`}
        >
          Coaches
        </Link>
        <Link
          href="/pricing"
          className={`transition-colors ${currentPage === "pricing" ? "text-white font-semibold" : "text-gray-300 hover:text-white"}`}
        >
          Pricing
        </Link>
      </nav>

      <Link href="/book-now">
        <Button className="bg-transparent border border-white text-white hover:bg-white hover:text-black rounded-full px-6">
          Book Now
        </Button>
      </Link>
    </header>
  )
}
