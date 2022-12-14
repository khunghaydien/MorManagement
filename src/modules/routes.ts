import { Diversity3, Newspaper } from '@mui/icons-material'
import ModuleCustomer from './customer'
import ModuleProject from './project'
const modules = [
  {
    id: 1,
    name: 'customer',
    pathNavigate: 'customer',
    pathRoot: 'customer/*',
    role: 'useCustomerList',
    Icon: Diversity3,
    Module: ModuleCustomer,
    features: [
      // {
      //   id: 1,
      //   label: 'Dashboard',
      //   pathNavigate: 'customer/dashboard',
      //   pathRoot: 'dashboard',
      // },
      {
        id: 2,
        label: 'Customer Management',
        pathNavigate: 'customer/list-customers',
        pathRoot: 'list-customers',
      },
      {
        id: 3,
        label: 'Partner Management',
        pathNavigate: 'customer/list-partners',
        pathRoot: 'list-partners',
      },
    ],
  },
  {
    id: 2,
    name: 'project',
    pathNavigate: 'project',
    pathRoot: 'project/*',
    Icon: Newspaper,
    Module: ModuleProject,
    role: 'useProjectList',
    features: [
      {
        id: 2,
        label: 'Project Management',
        pathNavigate: 'project/list-project',
        pathRoot: 'list-project',
      },
    ],
  },
]

export default modules
