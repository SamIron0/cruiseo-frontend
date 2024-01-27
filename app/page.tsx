import { Grid } from "@/components/Grid";
import { IListingsParams } from "./actions/getListings";
import { getSession, getUserDetails } from "./supabase-server";

interface HomeProps {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
    const session = await getSession();

  return <Grid user={session?.user} searchParams={searchParams} userDetails={getUserDetails()}></Grid>;
};

