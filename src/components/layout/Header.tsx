import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/ModeToggle";

const Header = () => {
  return (
    <header className="flex justify-between items-center py-2 border-b-[1px]">
      <div>
        <Link className="font-bold p-2 relative" href='/'>
        AZA Chat
        <span className="absolute bg-yellow-300 dark:bg-primaryBlue  top-1/2 left-1/2 w-full h-3 -z-10 translate-x-[-50%] translate-y-[-20%]"></span>
        </Link>
      </div>
      <div className="flex items-center">
        <Button className="mr-3">Sign In</Button>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
