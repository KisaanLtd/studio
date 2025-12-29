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
} from 'lucide-react';
import { Separator } from './ui/separator';
import { Button } from './ui/button';

const farmerNav = [
  { href: '/farmer', icon: Search, label: 'Find Buyers' },
  { href: '/farmer/leads', icon: ClipboardList, label: 'My Leads' },
];

const buyerNav = [
  { href: '/buyer', icon: Search, label: 'Find Farmers' },
];

const coordinatorNav = [
  { href: '/coordinator', icon: Briefcase, label: 'Manage Leads' },
];

const AppSidebar = () => {
  const pathname = usePathname();

  const getRole = () => {
    if (pathname.startsWith('/farmer')) return 'Farmer';
    if (pathname.startsWith('/buyer')) return 'Buyer';
    if (pathname.startsWith('/coordinator')) return 'Coordinator';
    return 'Guest';
  };

  const role = getRole();
  let navItems = buyerNav;
  if (role === 'Farmer') navItems = farmerNav;
  if (role === 'Coordinator') navItems = coordinatorNav;
  
  const roleInfo = {
    Farmer: { icon: Leaf, color: 'text-green-500' },
    Buyer: { icon: ShoppingBag, color: 'text-blue-500' },
    Coordinator: { icon: Briefcase, color: 'text-yellow-500' },
    Guest: { icon: Home, color: 'text-gray-500' },
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
            <p className="text-xs text-muted-foreground">{role}</p>
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
        <Button variant="ghost" className="w-full justify-start gap-2" asChild>
          <Link href="/">
            <LogOut />
            <span>Switch Role</span>
          </Link>
        </Button>
      </SidebarFooter>
    </>
  );
};

export default AppSidebar;
