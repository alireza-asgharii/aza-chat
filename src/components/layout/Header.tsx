import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

import { Button } from "../ui/button";
import { ModeToggle } from "../ui/ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOutButton from "../module/SignOutButton";
import InitUser from "@/lib/store/InitUser";
import OnlineStatus from "../module/OnlineStatus";

const Header = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <>
      <InitUser user={data?.user ?? undefined} />
      <header className="flex justify-between items-center py-2 border-b-[1px]">
        <div>
          <Link className="font-bold p-2 relative" href="/">
            AZA Chat
            <span className="absolute bg-yellow-300 dark:bg-primaryBlue  top-1/2 left-1/2 w-full h-3 -z-10 translate-x-[-50%] translate-y-[-20%]"></span>
          </Link>
          <OnlineStatus />
        </div>
        <div className="flex items-center">
          {!data?.user && (
            <Link href="/signin">
              <Button className="mr-3">Sign In</Button>
            </Link>
          )}

          {data?.user && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="mr-3">
                    <AvatarImage
                      src={data.user?.user_metadata?.avatar_url ?? ""}
                    />
                    <AvatarFallback>
                      {data.user.email ? data.user.email[0].toUpperCase() : "P"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <SignOutButton>Sign Out</SignOutButton>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          <ModeToggle />
        </div>
      </header>
    </>
  );
};

export default Header;
