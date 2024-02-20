const nav_links = [
  {
    name: 'dashboard',
    href: '/admin/dashboard',
  },
  {
    name: 'log',
    href: '/admin/log',
    sub_links: [
      {
        name: 'tracker',
        href: '/admin/log_tracker',
      },
      {
        name: 'pipeline',
        href: '/admin/log_pipeline',
      },
    ],
  },
  {
    name: 'profile',
    href: '/admin/profile',
  },
  {
    name: 'blockchain',
    href: '/admin/blockchain',
  },
  {
    name: 'maps',
    href: '/admin/maps',
    sub_links: [
      {
        name: 'tanker',
        href: '/admin/maps/tanker',
      },
      {
        name: 'pipeline',
        href: '/admin/maps/pipeline',
      },
    ],
  },
]


const notify_link = [
  {
    name: 'notification',
    href: '/admin/notification'
  },
]

export { nav_links, notify_link };
