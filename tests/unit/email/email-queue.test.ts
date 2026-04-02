import { describe, it, expect, vi, beforeEach } from "vitest";

describe("Email Queue", () => {
  const queue: Array<{ to: string; subject: string }> = [];
  let processing = false;

  const enqueue = (email: { to: string; subject: string }) => {
    queue.push(email);
  };

  const processQueue = async (
    sendFn: (email: { to: string; subject: string }) => Promise<void>
  ) => {
    if (processing) return;
    processing = true;
    while (queue.length > 0) {
      const email = queue.shift()!;
      await sendFn(email);
    }
    processing = false;
  };

  beforeEach(() => {
    queue.length = 0;
    processing = false;
  });

  it("should enqueue emails", () => {
    enqueue({ to: "test@test.com", subject: "Test" });
    expect(queue).toHaveLength(1);
  });

  it("should process all queued emails", async () => {
    const sent: string[] = [];
    enqueue({ to: "a@test.com", subject: "Email 1" });
    enqueue({ to: "b@test.com", subject: "Email 2" });

    await processQueue(async (email) => {
      sent.push(email.to);
    });

    expect(sent).toEqual(["a@test.com", "b@test.com"]);
    expect(queue).toHaveLength(0);
  });

  it("should handle empty queue", async () => {
    const sendFn = vi.fn();
    await processQueue(sendFn);
    expect(sendFn).not.toHaveBeenCalled();
  });

  it("should process sequentially", async () => {
    const order: number[] = [];
    enqueue({ to: "1@test.com", subject: "First" });
    enqueue({ to: "2@test.com", subject: "Second" });

    await processQueue(async (email) => {
      const num = parseInt(email.to.charAt(0));
      order.push(num);
    });

    expect(order).toEqual([1, 2]);
  });
});
