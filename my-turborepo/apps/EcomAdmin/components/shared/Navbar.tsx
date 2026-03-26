"use client";

import { LogOut, Moon, Settings, Sun, User } from 'lucide-react'
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

export default function Navbar() {
  const {  setTheme } = useTheme()
  return (
    <nav className=' w-full flex items-center justify-between p-4 sticky top-0 bg-background z-10'>
      {/* //left side */}

      <SidebarTrigger className='cursor-pointer' />

      {/* //right side  */}
      <div className='flex items-center gap-2 '>
        <Link href="/">Dashboard</Link>
        {/* //theme menu  */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='cursor-pointer'>
            <Button variant="outline" size="icon" className='cursor-pointer'>
              <Sun className="h-[1.2rem] w-[1.2rem]  scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent  align="end">
            <DropdownMenuItem className='cursor-pointer' onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer' onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem  className='cursor-pointer' onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* //usermenu  */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="https://avatars.githubusercontent.com/u/1486366" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent >
            <DropdownMenuGroup>
              <DropdownMenuLabel className=' text-black font-light'>My Account</DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer">
                <User className='h-[1.2rem] w-[1.2rem] mr-2 font-light' />Profile</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" ><Settings className='h-[1.2rem] w-[1.2rem] mr-2 font-light' />Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem  className="cursor-pointer" variant='destructive'><LogOut className='h-[1.2rem] w-[1.2rem] mr-2 font-light' />Logout</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>


    </nav>
  )
}
