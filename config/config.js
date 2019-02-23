export default {
    singular: true,
    plugins: [
        ['umi-plugin-react', {
            antd:true,
            dva:true
        }],
    ],
    history:"hash",
    routes: [
    {
        path: '/user',
        component: '../layout/UserLayout',
        routes: [
            { path: '/user', redirect: '/user/login' },
            { path: '/user/login', component: './User/Login' }
        ],
    },
    {
        path: '/',
        component: '../layout',
        routes: [
          {
            path: '/',
            redirect: '/helloworld'
          },
          {
            path: '/helloworld',
            component: 'HelloWorld'
          },
          {
            path: '/dashboard',
            routes: [
              { path: '/dashboard/analysis', component: 'Dashboard/Analysis' },
              { path: '/dashboard/monitor', component: 'Dashboard/Monitor' },
              { path: '/dashboard/workplace', component: 'Dashboard/Workplace' }
            ]
          },
        ]
    }
  ]
};