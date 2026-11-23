import { Outlet, useRouterState } from "@tanstack/react-router";
import { useApp } from "../store/AppContext";

const TITLES: Record<string, string> = {
  "/directors": "Dashboard",
  "/directors/approvals": "Approvals",
  "/directors/tasks": "Schedule",
  "/directors/performance": "Performance",
  "/directors/institute": "Institute",
  "/directors/departments": "Employees",
  "/directors/reports": "Reports",
  "/directors/notifications": "Notifications",
  "/directors/activity": "Activity",
  "/directors/settings": "Settings",
  "/directors/profile": "Profile",
};

export default function DirectorsLayout() {
  const { settings, toasts, dismissToast } = useApp()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const title = TITLES[pathname] || (pathname.startsWith("/directors/skillai") ? "SkillAI" : "Dashboard")

  return (
    <div className={`app-shell directors-embedded${settings.theme === "dark" ? " dark" : ""}`}>
      <div className="dashboard-device">
        <div className="device-workspace">
          <main className="device-content" aria-label={title}>
            <Outlet />
          </main>
        </div>
      </div>
      <div className="toast-stack">
        {toasts.map(item => <button type="button" key={item.id} onClick={() => dismissToast(item.id)} className={`dashboard-toast ${item.kind}`} role="status">{item.text}</button>)}
      </div>
    </div>
  )
}
