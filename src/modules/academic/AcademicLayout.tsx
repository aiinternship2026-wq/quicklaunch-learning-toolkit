import { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useRouterState } from '@tanstack/react-router';
import { TrainerProvider, useTrainer } from './context/TrainerContext';
import { Header } from './components/layout/Header';
import { ToastContainer } from './components/common/Toast';

const pages = [
  { to: '/academic', label: 'Dashboard', exact: true },
  { to: '/academic/syllabus', label: 'My class  Schedule', exact: false },
  { to: '/academic/notes', label: 'Notes', exact: false },
  { to: '/academic/examinations', label: 'Examinations', exact: false },
] as const;

/** Pages that go straight to their content; the title row only shows on the portal home. */
const TITLE_ROW_HIDDEN = ['/academic/syllabus', '/academic/notes', '/academic/examinations'];

function Portal() {
  const { toasts, removeToast } = useTrainer();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const showTitleRow = !TITLE_ROW_HIDDEN.some(
    (page) => pathname === page || pathname.startsWith(`${page}/`)
  );

  return (
    <div className="space-y-6">
      {/* Same underline tab menu as Admission */}
      <div className="overflow-x-auto border-b border-border">
        <nav aria-label="Academic pages" className="academic-tabs -mb-px flex min-w-max gap-1">
          {pages.map((page) => (
            <Link
              key={page.to}
              to={page.to}
              activeOptions={{ exact: page.exact }}
              activeProps={{ className: 'border-primary text-primary', 'aria-current': 'page' }}
              inactiveProps={{ className: 'border-transparent text-muted-foreground hover:text-foreground' }}
              className="whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition"
            >
              {page.label}
            </Link>
          ))}
        </nav>
      </div>
      {showTitleRow && <Header />}
      <main className="w-full">
        <Outlet />
      </main>
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}

export function AcademicLayout() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return (
    <div className="academic-module text-foreground">
      {hydrated ? (
        <TrainerProvider>
          <Portal />
        </TrainerProvider>
      ) : (
        <p role="status" className="p-6 text-sm text-muted-foreground">Loading academic portal…</p>
      )}
    </div>
  );
}

export function AcademicNotFound() {
  return <Navigate to="/academic" replace />;
}
