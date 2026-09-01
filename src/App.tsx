import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Issues from './pages/Issues';
import IssueDetail from './pages/IssueDetail';
import YogaLibrary from './pages/YogaLibrary';
import MeditationLibrary from './pages/MeditationLibrary';
import ExerciseLibrary from './pages/ExerciseLibrary';
import ExerciseDetail from './pages/ExerciseDetail';
import Food from './pages/Food';
import BodyMapPage from './pages/BodyMapPage';
import RoutineBuilder from './pages/RoutineBuilder';
import Dashboard from './pages/Dashboard';
import Progress from './pages/Progress';
import Challenges from './pages/Challenges';
import TechniqueDetail from './pages/TechniqueDetail';
import GuidedSession from './pages/GuidedSession';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import About from './pages/About';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/issues" element={<Issues />} />
        <Route path="/issues/:id" element={<IssueDetail />} />
        <Route path="/yoga" element={<YogaLibrary />} />
        <Route path="/meditation" element={<MeditationLibrary />} />
        <Route path="/exercises" element={<ExerciseLibrary />} />
        <Route path="/exercise/:id" element={<ExerciseDetail />} />
        <Route path="/food" element={<Food />} />
        <Route path="/body-map" element={<BodyMapPage />} />
        <Route path="/routines" element={<RoutineBuilder />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/technique/:id" element={<TechniqueDetail />} />
        <Route path="/session/:id" element={<GuidedSession />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
