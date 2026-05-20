"use client";

import {  Moon, Settings, Sun, User } from 'lucide-react'
import Link from 'next/link'
import { AvatarFallback, AvatarImage, Avatar } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';
import { SidebarTrigger } from '../ui/sidebar';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation'; // Cleaned up import path
import { logoutUser } from '@/services/user.service';
import useCurrentAdmin from '@/hooks/Usecurrentadmin';

export default function Navbar() {
  const {user} = useCurrentAdmin()
  const userName = user ? `${user.firstName} ${user.lastName}` : "Admin"
  
  // Create dynamic initials for the fallback text (e.g., "John Doe" -> "JD")
  const userInitials = user && user.firstName && user.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() 
    : "AD";

  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear()
      queryClient.invalidateQueries({ queryKey: ["admin"] })
      router.push("/sign-in")
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    }
  })

  const handlelogout = () => {
    logout()
  }
  
  const { setTheme } = useTheme()
  return (
    <nav className=' w-full flex items-center justify-between p-4 sticky top-0 bg-background z-10'>
      <SidebarTrigger className='cursor-pointer' />

      <div className='flex items-center gap-2 '>
        <Link href="/dashboard">Dashboard</Link>
        
        {/* Theme Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='cursor-pointer'>
            <Button variant="outline" size="icon" className='cursor-pointer'>
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className='cursor-pointer' onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer' onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer' onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='cursor-pointer'>
              {/* FIX: Injected the userName variable into a standard avatar API string template */}
              <AvatarImage 
                className='cursor-pointer' 
                src={`https://dicebear.com{encodeURIComponent(userName)}`} 
                alt={userName}
              />
              {/* FIX: Dynamic initials instead of a static "CN" fallback */}
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent >
            <DropdownMenuGroup>
              <DropdownMenuLabel className='text-black font-light'>My Account</DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer">
                <User className='h-[1.2rem] w-[1.2rem] mr-2 font-light' />Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className='h-[1.2rem] w-[1.2rem] mr-2 font-light' />Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handlelogout} className="cursor-pointer" variant='destructive'>
                {isPending ? 'Logging out...' : 'Logout'}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
