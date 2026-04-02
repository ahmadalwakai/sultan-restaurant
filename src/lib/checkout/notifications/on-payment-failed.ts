// Notification hook: called after payment failure
export async function onPaymentFailed(orderId: string, customerEmail: string) {
  // TODO: Send payment failure notification
  console.log(`[notification] Payment failed for order ${orderId} - ${customerEmail}`);
}
