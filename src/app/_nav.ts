import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: '1. Overview',
    url: '/overview',
    icon: 'icon-puzzle',
    children: [
      {
        name: '1.1 List Project',
        url: '/overview/list-project',
        icon: 'icon-puzzle'
      },
      {
        name: '1.2 Weekly',
        url: '/overview/weekly',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: '2. Upload',
    url: '/upload',
    icon: 'icon-pie-chart'
  },
  {
    name: '3. Download Report',
    url: '/download-report',
    icon: 'icon-pie-chart'
  },
  {
    name: '4. Settings',
    url: '/settings',
    icon: 'icon-puzzle',
    children: [
      {
        name: '4.1 Week Range SetUp',
        url: '/settings/week-range',
        icon: 'icon-puzzle'
      },
      {
        name: '4.2 User',
        url: '/settings/users',
        icon: 'icon-puzzle'
      }
    ]
  },


];
