import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function SidebarPage() {
  <SidebarProvider>
    <AppSidebar />
    <main>
      <SidebarTrigger />
      Sidebar Page
    </main>
  </SidebarProvider>;
}
