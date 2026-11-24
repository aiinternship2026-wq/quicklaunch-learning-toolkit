import React from 'react';
import { useRouterState } from '@tanstack/react-router';

export const Header: React.FC = () => {
  const pathname = useRouterState({ select: state => state.location.pathname.replace(/^\/academic/, '') || '/' });

  const getPageTitle = (pathname: string): { title: string; subtitle: string } => {
    if (pathname.startsWith('/notes/')) {
      return { title: 'Notes Management', subtitle: 'Prepare and manage notes for assigned module topics' };
    }

    switch (pathname) {
      case '/':
        return { title: 'Dashboard Overview', subtitle: "Monitor today's sessions and pending syllabus actions" };
      case '/schedule':
        return { title: 'My Class Schedule', subtitle: 'Review assigned teaching schedules and request changes' };
      case '/syllabus':
        return { title: 'Syllabus Tracker', subtitle: 'Review batch schedules and track topic progress' };
      case '/notes':
        return { title: 'Notes Management', subtitle: 'Prepare and manage notes for assigned module topics' };
      case '/attendance':
        return { title: 'Attendance', subtitle: 'Review batch-wise biometric attendance records' };
      case '/notifications':
        return { title: 'Notifications & Reminders', subtitle: 'Syllabus overdue alerts and schedule actions' };
      case '/examinations':
        return { title: 'Examinations', subtitle: 'Review Admin schedules and submit examination marks' };
      case '/profile':
        return { title: 'Trainer Profile', subtitle: 'Faculty credentials, assigned batches, and mock configuration' };
      default:
        return { title: 'Trainer Portal', subtitle: 'Faculty Management System' };
    }
  };

  const { title, subtitle } = getPageTitle(pathname);

  return (
    <header className="portal-header flex flex-wrap items-center justify-between gap-4">
      <div className="min-w-0">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </header>
  );
};
