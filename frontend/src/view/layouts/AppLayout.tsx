import { Outlet } from 'react-router-dom';

import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Suspense } from 'react';
import LoadingScreen from '../components/LoadingScreen';

export const AppLayout = () => {
  return (
    <div className=" w-full h-full flex ">
      <Sidebar className="" />
      <div className="flex flex-col w-full h-[95%]">
        <Header />
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
