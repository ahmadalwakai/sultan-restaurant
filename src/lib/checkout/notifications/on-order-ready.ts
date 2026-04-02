// Notification hook: called when order is marked READY
export async function onOrderReady(orderId: string, customerEmail: string) {
  // TODO: Send "order ready" email/SMS
  console.log(`[notification] Order ${orderId} ready for pickup - notifying ${customerEmail}`);
}
