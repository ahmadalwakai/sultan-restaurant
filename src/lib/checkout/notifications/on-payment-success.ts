// Notification hook: called after successful payment
export async function onPaymentSuccess(orderId: string, customerEmail: string) {
  // TODO: Send payment confirmation email
  console.log(`[notification] Payment received for order ${orderId} - ${customerEmail}`);
}
