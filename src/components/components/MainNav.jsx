import { Link, useLocation } from "react-router-dom"
import { cn } from "../components/utils"

export function MainNav() {
  const location = useLocation()

  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/dashboard" className={cn(
        "mr-6 flex items-center space-x-2",
        location.pathname === "/dashboard" && "text-sm font-medium transition-colors hover:text-primary"
      )}>
        <span>Dashboard</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          to="/career"
          className={cn(
            "transition-colors hover:text-primary",
            location.pathname === "/career" && "text-primary"
          )}
        >
          Career
        </Link>
        <Link
          to="/mentorship"
          className={cn(
            "transition-colors hover:text-primary",
            location.pathname === "/mentorship" && "text-primary"
          )}
        >
          Mentorship
        </Link>
        <Link
          to="/skills"
          className={cn(
            "transition-colors hover:text-primary",
            location.pathname === "/skills" && "text-primary"
          )}
        >
          Skills
        </Link>
      </nav>
    </div>
  )
}

