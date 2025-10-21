import NavbarPage from "../navbar/page";
import SidebarRoute from "../sidebar/page";
import { DropdownMenuPage } from "../dropdown/page";
export default function Homepage() {
  return (
    <div>
      <NavbarPage />
      <SidebarRoute />
      <div className="flex bottom">
        <DropdownMenuPage />
      </div>

      <main>
        <h1>Welcome to the Homepage</h1>
      </main>
    </div>
  );
}
