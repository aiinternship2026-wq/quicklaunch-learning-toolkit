import { createFileRoute, redirect } from '@tanstack/react-router';
import { academicHead, academicSearch } from '@/modules/academic/seo';

export const Route = createFileRoute('/academic/attendance')({
  beforeLoad: () => {
    throw redirect({ to: '/academic/syllabus', replace: true });
  },
  head: academicHead('My class Schedule', 'Review class schedules and batch attendance in the academic portal.'),
  validateSearch: academicSearch
});
