import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import CrowdMapPage from '@/components/pages/CrowdMapPage';
import EventsPage from '@/components/pages/EventsPage';
import EventDetailPage from '@/components/pages/EventDetailPage';
import EmergencyPage from '@/components/pages/EmergencyPage';
import MerchandisePage from '@/components/pages/MerchandisePage';
import MerchandiseDetailPage from '@/components/pages/MerchandiseDetailPage';
import NavigationPage from '@/components/pages/NavigationPage';
import VolunteerPage from '@/components/pages/VolunteerPage';
import AccessibilityPage from '@/components/pages/AccessibilityPage';
import TransitPage from '@/components/pages/TransitPage';
import FeedbackPage from '@/components/pages/FeedbackPage';
import RecommendationsPage from '@/components/pages/RecommendationsPage';
import SecurityPage from '@/components/pages/SecurityPage';
import SustainabilityPage from '@/components/pages/SustainabilityPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "crowd-map",
        element: <CrowdMapPage />,
      },
      {
        path: "events",
        element: <EventsPage />,
      },
      {
        path: "events/:id",
        element: <EventDetailPage />,
      },
      {
        path: "emergency",
        element: <EmergencyPage />,
      },
      {
        path: "merchandise",
        element: <MerchandisePage />,
      },
      {
        path: "merchandise/:id",
        element: <MerchandiseDetailPage />,
      },
      {
        path: "navigation",
        element: <NavigationPage />,
      },
      {
        path: "volunteer",
        element: <VolunteerPage />,
      },
      {
        path: "accessibility",
        element: <AccessibilityPage />,
      },
      {
        path: "transit",
        element: <TransitPage />,
      },
      {
        path: "feedback",
        element: <FeedbackPage />,
      },
      {
        path: "recommendations",
        element: <RecommendationsPage />,
      },
      {
        path: "security",
        element: <SecurityPage />,
      },
      {
        path: "sustainability",
        element: <SustainabilityPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
