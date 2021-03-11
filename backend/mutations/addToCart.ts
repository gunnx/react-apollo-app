import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('add to cart');

  const session = context.session as Session;
  if (!session.itemId) {
    throw new Error('you need to be logged in to do this action');
  }

  const cartItems = (await context.lists.CartItem.findMany({
    where: { user: { id: session.itemId }, product: { id: productId } },
    resolveFields: 'id,quantity',
  })) as { id: string; quantity: number }[];

  console.log('addToCart - cartItems', { cartItems, session, productId });

  if (cartItems.length) {
    const [existingCartItem] = cartItems;
    // increment quantity as item exists
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });

    console.log('found existing item, so incrementing by 1');
  }
  console.log('new item, so creating it now');
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: session.itemId } },
    },
  });
}

export default addToCart;
