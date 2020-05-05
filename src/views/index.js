import Projects from "./pages/projects/Projects";
import ProjectOverview from "./pages/projects/ProjectOverview";
import ErrorPage from "./pages/404";
import Compounds from './pages/compounds/Compounds';
import Models from "./pages/models/Models"
import DrugExPage from './pages/generators/drugex/DrugEx';
import MapCreator from './pages/maps/create/MapCreator';
import Maps from './pages/maps/display/MapDashboard';

// See React Router documentation for details: https://reacttraining.com/react-router/web/api/Route
const pageList = [
  {
    name: 'Projects',
    path: ["/", "/projects/"],
    key: 'projects',
    component: Projects,
  },
  {
    name: 'Project Overview',
    path: ["/projects/:project/"],
    key: 'projects-name',
    component: ProjectOverview,
  },
  {
    name: 'Compounds',
    path: ["/projects/:project/compounds/"],
    key: 'data',
    component: Compounds,
  },
  {
    name: 'QSAR Models',
    path: ["/projects/:project/qsar/"],
    key: 'qsar',
    component: Models,
  },
  {
    name: 'DrugEx',
    path: ["/projects/:project/generators/drugex/"],
    key: 'generators',
    component: DrugExPage,
  },
  {
    name: 'Map Creator',
    path: ["/projects/:project/maps/creator/"],
    key: 'maps-creator',
    component: MapCreator,
  },
  {
    name: 'Map Explorer',
    path: ["/projects/:project/maps/explorer/"],
    key: 'maps-explorer',
    component: Maps,
  },
  {
    name: '404',
    key: 'NotFound-404',
    component: ErrorPage,
  },
];

export default pageList;
