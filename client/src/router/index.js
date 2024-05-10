import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/Login.vue';
import { GET } from '@/utils/API/ApiRequest';

const verified = async()=>{
    try {
      const response = await GET('/users/verify');
      return response;
    } catch (error) {
      console.error(error)
    }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: {authentication: false},
      beforeEnter: async(to,from,next)=>{
        try {
          const response = await verified();
          console.log(response)
          const auth = response.authentication;
          if(auth){
            const role = response.data[0].role;
            switch (role) {
              case "root":
                next('/root/dashboard')
                break;
              case "helpdesk":
                next('/root/dashboard')
                break;
              case "technical_support":
                next('/technical-support/dashboard')
                break;
              case "user":
                next('/dashboard')
                break;  
              default:
                console.log("something errors.")
                break;
            }
          }else{
            next()
          }
        } catch (error) {
          console.error(error)
        }
      },
      children:[
        {
          path: '',
          name: 'sign-in',
          component: ()=>import('@/views/partials/Forms/sign-in.vue')
        },
        {
          path: 'registration',
          name: 'sign-up',
          component: ()=>import('@/views/partials/Forms/sign-up.vue')
        }
      ],
    },
    {
      path: "/root/dashboard",
      name: 'root-dashboard',
      component: ()=>import('@/components/roots/Dashboard.vue'),
      meta: {authentication: true},
      beforeEnter: async(to,from,next)=>{
        try {
          const response = await verified()
          const auth = response.authentication;
          if(auth){
            const role = response.data[0].role;
            switch (role) {
              case "root":
                next()
                break;
              case "helpdesk":
                next('/helpdesk/dashboard')
                break;
              case "technical_support":
                next('/technical-support/dashboard')
                break;
              case "user":
                next('/dashboard')
                break;  
              default:
                console.log("something errors.")
                break;
            }
          }else{
            next()
          }
        } catch (error) {
          console.error(error)
        }
      },
      children: [
        {
          path: '',
          name: "root-home",
          component: ()=>import('@/components/roots/partials/Home.vue')
        },
        {
          path: 'account',
          name: "root-account",
          component: ()=>import('@/components/roots/partials/Account.vue'),
          children:[
            {
              path: '',
              name: 'account-unverified',
              component:()=>import('@/components/roots/partials/Accounts/Unverified.vue')
            },
            {
              path: 'verified',
              name: 'account-verified',
              component:()=>import('@/components/roots/partials/Accounts/Verified.vue')
            },
          ]
        }
      ]
    },
    {
      path: "/helpdesk/dashboard",
      name: 'helpdesk-dashboard',
      component: ()=>import('@/components/helpdesk/Dashboard.vue'),
      meta: {authentication: true},
      beforeEnter: async(to,from,next)=>{
        try {
          const response = await verified();
          const auth = response.authentication;
          if(auth){
            const role = response.data[0].role;
            switch (role) {
              case "root":
                next('/root/dashboard')
                break;
              case "helpdesk":
                next()
                break;
              case "technical_support":
                next('/technical-support/dashboard')
                break;
              case "user":
                next('/dashboard')
                break;  
              default:
                console.log("something errors.")
                break;
            }
          }else{
            next()
          }
        } catch (error) {
          console.error(error)
        }
      },
    },
    {
      path: '/technical-support/dashboard',
      name:'technical-support-dashboard',
      component: ()=>import('@/components/technical_support/Dashboard.vue'),
      meta: {authentication: true},
      beforeEnter: async(to,from,next)=>{
        try {
          const response = await verified()
          console.log(response)
          const auth = response.authentication;
          if(auth){
            const role = response.data[0].role;
            switch (role) {
              case "root":
                next('/root/dashboard')
                break;
              case "helpdesk":
                next('/helpdesk/dashboard')
                break;
              case "technical_support":
                next()
                break;
              case "user":
                next('/dashboard')
                break;  
              default:
                console.log("something errors.")
                break;
            }
          }else{
            next()
          }
        } catch (error) {
          console.error(error)
        }
      },
      children:[
        {
          path: '',
          name:'technical-support-home',
          component: ()=>import('@/components/technical_support/partials/Home.vue'),
        },
        {
          path: 'ticket',
          name:'technical-support-ticket',
          component: ()=>import('@/components/technical_support/partials/Ticket.vue'),
        },{
          path: 'report',
          name:'technical-support-report',
          component: ()=>import('@/components/technical_support/partials/Report.vue'),
          children:[
            {
              path: '',
              name:'report-InProcess',
              component: ()=>import('@/components/technical_support/partials/Reports/InProcess.vue'),
            },
            {
              path: 'completed',
              name:'report-completed',
              component: ()=>import('@/components/technical_support/partials/Reports/Completed.vue'),
            },
            {
              path: 'condemnend',
              name:'report-condemned',
              component: ()=>import('@/components/technical_support/partials/Reports/Condemned.vue'),
            }
          ]
        },
        // {
        //   path: 'account',
        //   name:'co-account',
        //   component: ()=>import('../../../Account.vue'),
        // }
      ]
    },
    {
      path: '/dashboard',
      name: "user-dashboard",
      component: ()=>import('@/components/end-users/Dashboard.vue'),
      meta: {authentication: true},
      beforeEnter: async(to,from,next)=>{
        try {
          const response = await verified()
          console.log(response)
          const auth = response.authentication;
          if(auth){
            const role = response.data[0].role;
            switch (role) {
              case "root":
                next('/root/dashboard')
                break;
              case "helpdesk":
                next('/helpdesk/dashboard')
                break;
              case "technical_support":
                next()
                break;
              case "user":
                next()
                break;  
              default:
                console.log("something errors.")
                break;
            }
          }else{
            next()
          }
        } catch (error) {
          console.error(error)
        }
      },
    }
  ]
});

router.beforeEach(async(to,from,next)=>{
  const response = await verified();
  if(to.meta.authentication){
    if(response && response.authentication){
      next()
    }
    else{
      alert("YOU MUST LOGIN FIRST!!!")
      next('/')
    }
  }else{
    next()
  }
});

export default router;
