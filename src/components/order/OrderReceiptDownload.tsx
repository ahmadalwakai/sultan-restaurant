"use client";

import { Button } from "@chakra-ui/react";

interface OrderReceiptDownloadProps {
  orderId: string;
}

export default function OrderReceiptDownload({ orderId }: OrderReceiptDownloadProps) {
  const handleDownload = () => {
    window.open(`/api/orders/${encodeURIComponent(orderId)}/receipt`, "_blank");
  };

  return (
    <Button variant="outline" size="sm" onClick={handleDownload}>
      Download Receipt
    </Button>
  );
}
