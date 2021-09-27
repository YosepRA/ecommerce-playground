import { createContext } from 'react';

const ShopContext = createContext({ products: [], cart: [] });

export default ShopContext;
