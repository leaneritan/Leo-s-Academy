import React from 'react';
import HeroHeader from '@/components/dashboard/HeroHeader';
import TodaysPlanCard from '@/components/dashboard/TodaysPlanCard';
import AcademicOverview from '@/components/dashboard/AcademicOverview';
import CurrentlyReading from '@/components/dashboard/CurrentlyReading';
import RecentBadge from '@/components/dashboard/RecentBadge';
import QuickChips from '@/components/dashboard/QuickChips';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-8">
        <HeroHeader />
        <TodaysPlanCard />
        <AcademicOverview />
      </div>
      <div className="lg:col-span-4 lg:pt-32">
        <CurrentlyReading />
        <RecentBadge />
        <QuickChips />
      </div>
    </div>
  );
}
