import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import LoadingState from './components/common/LoadingState';
import { useFarmer } from './hooks/useFarmer';

const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const MandiPage = lazy(() => import('./pages/MandiPage'));
const FarmIntelligencePage = lazy(() => import('./pages/FarmIntelligencePage'));
const SatellitePage = lazy(() => import('./pages/SatellitePage'));
const DronePage = lazy(() => import('./pages/DronePage'));
const FieldCamerasPage = lazy(() => import('./pages/FieldCamerasPage'));
const CropScanPage = lazy(() => import('./pages/CropScanPage'));
const FarmInputsPage = lazy(() => import('./pages/FarmInputsPage'));
const WaterPage = lazy(() => import('./pages/WaterPage'));
const WeatherPage = lazy(() => import('./pages/WeatherPage'));
const SchemesPage = lazy(() => import('./pages/SchemesPage'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const BhumiPage = lazy(() => import('./pages/BhumiPage'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const OnboardingPage = lazy(() => import('./pages/OnboardingPage'));

const App: React.FC = () => {
  const { farmer } = useFarmer();

  return (
    <Suspense fallback={<LoadingState message="Loading Krishi Mithra..." />}>
      <Routes>
        <Route path="/onboarding" element={<OnboardingPage />} />

        <Route
          path="/"
          element={
            farmer === null ? (
              <Navigate to="/onboarding" replace />
            ) : (
              <MainLayout />
            )
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="mandi" element={<MandiPage />} />
          <Route path="farm" element={<FarmIntelligencePage />} />
          <Route path="farm/satellite" element={<SatellitePage />} />
          <Route path="farm/drone" element={<DronePage />} />
          <Route path="farm/cameras" element={<FieldCamerasPage />} />
          <Route path="farm/scan" element={<CropScanPage />} />
          <Route path="farm/inputs" element={<FarmInputsPage />} />
          <Route path="water" element={<WaterPage />} />
          <Route path="weather" element={<WeatherPage />} />
          <Route path="schemes" element={<SchemesPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="bhumi" element={<BhumiPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;
