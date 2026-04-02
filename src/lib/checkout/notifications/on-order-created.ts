// Notification hook: called after order is created
export async function onOrderCreated(orderId: string, customerEmail: string) {
  // TODO: Send order confirmation email
  // TODO: Send admin notification email
  console.log(`[notification] Order ${orderId} created for ${customerEmail}`);
}
