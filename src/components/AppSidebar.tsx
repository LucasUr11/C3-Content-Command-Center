import {
  LayoutDashboard,
  Columns3,
  FileText,
  Calendar,
  Terminal,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Kanban", url: "/kanban", icon: Columns3 },
  { title: "Editor", url: "/editor", icon: FileText },
  { title: "Calendario", url: "/calendar", icon: Calendar },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary">
            <Terminal className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold tracking-tight text-foreground">
                C3
              </span>
              <span className="text-[10px] font-mono text-muted-foreground tracking-wider uppercase">
                Content Command
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
            Navegación
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className="transition-colors duration-150 hover:bg-secondary"
                      activeClassName="bg-secondary text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && (
                        <span className="text-sm">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {!collapsed && (
          <div className="rounded-md border border-border bg-secondary/50 p-3">
            <p className="font-mono text-[10px] text-muted-foreground tracking-wider uppercase">
              Entre Líneas un Mate
            </p>
            <p className="font-mono text-xs text-foreground mt-0.5">
              v0.1.0-mvp
            </p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
