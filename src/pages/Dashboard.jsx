import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import PageContainer from '../components/common/PageContainer';
import ProfileCard from '../components/dashboard/ProfileCard';
import WeatherCard from '../components/dashboard/WeatherCard';
import NotesWidget from '../components/dashboard/NotesWidget';
import NewsCard from '../components/dashboard/NewsCard';
import TimerWidget from '../components/dashboard/TimerWidget';

const Dashboard = () => {
  const navigate = useNavigate();
  const setHasVisitedDashboard = useStore((state) => state.setHasVisitedDashboard);

  useEffect(() => {
    setHasVisitedDashboard(true);
  }, [setHasVisitedDashboard]);

  return (
    <PageContainer>
      <div className="min-h-screen px-5 py-6 lg:flex lg:items-center lg:px-12 lg:py-5">
        <div className="grid w-full gap-4 lg:grid-cols-[1.18fr_0.86fr_0.72fr] lg:grid-rows-[auto_auto_1fr]">
          <div className="space-y-4">
            <ProfileCard />
            <WeatherCard />
          </div>

          <div className="lg:row-span-2">
          <NotesWidget />
          </div>

          <div className="flex flex-col gap-4 lg:row-span-3">
            <NewsCard />
            <button
              onClick={() => navigate('/movies')}
              className="self-end rounded-full bg-[#148A08] px-7 py-2 text-xs font-semibold text-white transition hover:bg-[#1fb315]"
            >
              Browse
            </button>
          </div>

          <div className="lg:col-span-2">
            <TimerWidget />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
