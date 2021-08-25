import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Project',
    url: '/overview',
    children: [
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
      }
    ]
  },
  {
    name: 'Meeting Minute',
    url: '/meeting-minute',
    children: [
      {
        name: '1. Maintain',
        url: '/meeting-minutes/upload',
        icon: 'icon-puzzle'
      },
      {
        name: '2. Tansaction',
        url: '',
        icon: 'icon-puzzle',
        children: [
          {
            name: '2.1 List Meeting',
            url: '/meeting-minutes/list-meeting',
            class: "menu-margin",
          }
        ]
      },
      {
        name: '3. Report',
        url: '',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    name: 'Project V2',
    url: '/projects',
    children: [
      {
        name: '1. Maintain',
        url: '/projects/upload',
        icon: 'icon-puzzle'
      },
      {
        name: '2. Query',
        url: '',
        icon: 'icon-puzzle',
        children: [
          {
            name: '2.1 List Meeting',
            url: '/projects/list',
            class: "menu-margin",
          }
        ]
      },
      {
        name: '3. Report',
        url: '',
        icon: 'icon-puzzle'
      }
    ]
  },


];
