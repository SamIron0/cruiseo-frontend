import { Grid } from '@/components/Grid';
import { IListingsParams } from './actions/getListings';
import {
  createServerSupabaseClient,
  getSession,
  getUserDetails
} from './supabase-server';
import { useSupabase } from './supabase-provider';
interface HomeProps {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return (
    <Grid
      user={user}
      searchParams={searchParams}
      userDetails={getUserDetails()}
    ></Grid>
  );
}
