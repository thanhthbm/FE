import { Admin, Resource } from 'react-admin'
import { dataProvider } from '../../admin/dataProvider'
import { authProvider } from '../../admin/authProvider'
import { ProductList } from './Products/ProductList'
import { CategoryList } from './Category/CategoryList'
import { CategoryEdit } from './Category/CategoryEdit'
import { CategoryCreate } from './Category/CategoryCreate'
import { ProductEdit } from './Products/ProductEdit'
import { ProductCreate } from './Products/ProductCreate'
import OrderList from '../OrderList'
import { OrderListAdmin } from './Order/OrderListAdmin'
import { OrderEdit } from './Order/OrderEdit'

const AdminApp = () => (
  <Admin basename='/admin' dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name='products' list={ProductList} edit={ProductEdit} create={ProductCreate} />
    <Resource name='category' list={CategoryList} edit={CategoryEdit} create={CategoryCreate} />
    <Resource name='category-type' />
    <Resource name='order' list={OrderListAdmin} edit={OrderEdit} />
  </Admin>
)

export default AdminApp
