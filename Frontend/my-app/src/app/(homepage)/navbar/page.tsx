import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NavbarPage() {
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-xl flex items-center bg-black px-4 py-2 z-50">
      <Input type="text" placeholder="Search..." className="flex-grow mr-4" />
      <Button>Search</Button>
    </div>
  );
}
