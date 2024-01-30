import React from 'react';
import { createServerSupabaseClient } from '@/app/supabase-server';
import Categories from './Categories';
import Container from '../Container';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';
import { UserDetails } from '@/types';
import { User } from '@supabase/supabase-js';

export default async function Navbar(user: User) {
 
  return (
    <div className="fixed w-full z-10 shadow-sm  shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div>
        <div className="py-4 sm:px-8 border-[#232325] border-b-[1px]">
          <Container>
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
              <Logo />
              <Search />
              <UserMenu user={user} />
            </div>
          </Container>
        </div>
        <Categories />
      </div>
    </div>
  );
}
