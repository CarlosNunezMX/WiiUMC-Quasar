
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {path: '/connect',component: ()=> import('pages/connect.vue')},
      {path: '/logout',component: ()=> import('pages/logout.vue')},
      {path: '/tv',component: ()=> import('pages/TV.vue')},
      {path: '/play/:id', component: ()=>import("pages/play.vue"), props:true}
    ]
  },
  {
    path: "/tv/see/",
    component: () => import("layouts/TV.vue"),
    children:[
      {path:":name",component: () => import("pages/live.tv.vue"),props: true}
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
