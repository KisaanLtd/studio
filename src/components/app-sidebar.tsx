'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import Logo from '@/components/logo';
import {
  Briefcase,
  Leaf,
  ShoppingBag,
  Home,
  LogOut,
  ClipboardList,
  Search,
  User,
} from 'lucide-react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useAuth } from '@/hooks/use-auth';

const farmerNav = [
  { href: '/farmer', icon: Search, label: 'Find Buyers' },
  { href: '/farmer/leads', icon: ClipboardList, label: 'My Leads' },
  { href: '/profile', icon: User, label: 'My Profile' },
];

const buyerNav = [
  { href: '/buyer', icon: Search, label: 'Find Farmers' },
  { href: '/profile', icon: User, label: 'My Profile' },
];

const coordinatorNav = [
  { href: '/coordinator', icon: Briefcase, label: 'Manage Leads' },
  { href: '/profile', icon: User, label: 'My Profile' },
];

const AppSidebar = () => {
  const pathname = usePathname();
  const { userRole, logout } = useAuth();
  
  const role = userRole || 'Guest';

  let navItems = buyerNav;
  if (role === 'farmer') navItems = farmerNav;
  if (role === 'coordinator') navItems = coordinatorNav;
  
  const roleInfo: {[key: string]: {icon: React.ElementType, color: string, name: string}} = {
    farmer: { icon: Leaf, color: 'text-green-500', name: 'Farmer' },
    buyer: { icon: ShoppingBag, color: 'text-blue-500', name: 'Buyer' },
    coordinator: { icon: Briefcase, color: 'text-yellow-500', name: 'Coordinator' },
    Guest: { icon: Home, color: 'text-gray-500', name: 'Guest' },
  }
  const CurrentRoleIcon = roleInfo[role].icon;


  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-auto" />
          <span className="font-headline text-lg font-semibold text-foreground">
            AgriMatch
          </span>
        </Link>
        <div className="flex items-center gap-3 rounded-lg bg-muted p-2 mt-4">
           <CurrentRoleIcon className={`h-6 w-6 ${roleInfo[role].color}`} />
           <div>
            <p className="text-sm font-semibold text-foreground">Current Role</p>
            <p className="text-xs text-muted-foreground">{roleInfo[role].name}</p>
           </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} className="w-full">
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-2" />
        <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => logout()}>
          <LogOut />
          <span>Log Out</span>
        </Button>
      </SidebarFooter>
    </>
  );
};

export default AppSidebar;
