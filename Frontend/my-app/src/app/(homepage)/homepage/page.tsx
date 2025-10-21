import NavbarPage from "../navbar/page";
import SidebarRoute from "../sidebar/page";
export default function Homepage() {
  return (
    <div>
      <NavbarPage />
      <SidebarRoute />
      <main>
        <h1>Welcome to the Homepage</h1>
      </main>
    </div>
  );
}
