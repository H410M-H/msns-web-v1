import Link from 'next/link';
import React from 'react';
import { Menubar, MenubarMenu, MenubarTrigger } from '~/components/ui/menubar';

export const HorizontalMenu = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
        <Link href="/admin/dashboard">Dashboard</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
        <Link href="/admin/alumni">Alumni</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
        <Link href="/admin/academics">Academics</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
        <Link href="/registration/portal">Registration</Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
            <Link href="/revenue">Revenue</Link>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}


export { Menubar };

