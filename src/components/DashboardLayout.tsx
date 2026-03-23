import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b border-border px-4 shrink-0">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground transition-colors" />
            <div className="ml-auto flex items-center gap-2">
              <span className="font-mono text-[10px] text-muted-foreground tracking-wider">
                {new Date().toLocaleDateString("es-AR", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                })}
              </span>
              <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                <span className="text-[10px] font-mono font-bold text-primary-foreground">
                  EL
                </span>
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
