import { KeystoneContext } from '@keystone-next/types';
import {
  CartItemCreateInput,
  OrderCreateInput,
  UserCreateInput,
} from '../.keystone/schema-types';
import { Session } from '../types';
import stripeConfig from '../lib/stripe';

const graphql = String.raw;

async function checkout(
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> {
  const userId = context.session.itemId;
  if (!userId) {
    throw new Error('You must be signed into create an order!');
  }
  // find current user
  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: graphql`
      id
      name
      email
      cart {
        id
        quantity
        product {
          name
          price
          description
          id
          photo { 
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }  
      `,
  });

  const validItems: CartItemCreateInput[] = user.cart.filter(
    (item: CartItemCreateInput) => item.product
  );
  const amount = validItems.reduce(function (
    tally: number,
    cartItem: CartItemCreateInput
  ) {
    return tally + cartItem.quantity * cartItem.product.price;
  },
  0);

  console.dir(user, { depth: null });

  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: 'GBP',
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });

  console.log('charge', charge);

  const orderItems = validItems.map((item: CartItemCreateInput) => {
    const orderItem = {
      name: item.product.name,
      description: item.product.description,
      price: item.product.price,
      quantity: item.quantity,
      photo: { connect: { id: item.product.photo.id } },
    };
    return orderItem;
  });

  const order = await context.lists.Order.createOne({
    data: {
      total: charge.amount,
      charge: charge.id,
      items: { create: orderItems },
      user: { connect: { id: userId } },
    },
  });

  // delete items from cart
  const cartItemIds = user.cart.map((item) => item.id);

  await context.lists.CartItem.deleteMany({
    ids: cartItemIds,
  });

  return order;
}

export default checkout;
