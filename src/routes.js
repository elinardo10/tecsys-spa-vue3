import {createRouter} from 'vue-router'
import Customer from './pages/customers/Customer.vue';
import Product from './pages/products/Product.vue';
import Create from './pages/products/Create.vue';

const routes = [
  {
    path: '/customers',
    component: Customer
  },
  
  {
    path: '/products',
    component: Product
  },

  {
    path: '/products/create',
    component: Create
  },
]

export default function (history) {
  return createRouter({
    history,
    routes
  })
}
