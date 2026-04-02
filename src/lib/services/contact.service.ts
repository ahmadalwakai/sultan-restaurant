import { contactRepository } from "@/lib/repositories";
import { NotFoundError } from "@/lib/errors";
import type { ContactFormValues } from "@/lib/validators";

export const contactService = {
  async submit(input: ContactFormValues) {
    return contactRepository.create(input);
  },

  async getAll(params: { skip?: number; take?: number; status?: string }) {
    const where = params.status ? { status: params.status as never } : undefined;
    const [messages, total] = await Promise.all([
      contactRepository.findAll({ where, skip: params.skip, take: params.take, orderBy: { createdAt: "desc" } }),
      contactRepository.count(where),
    ]);
    return { messages, total };
  },

  async markRead(id: string) {
    const msg = await contactRepository.findById(id);
    if (!msg) throw new NotFoundError("Message");
    return contactRepository.update(id, { status: "READ" });
  },

  async markReplied(id: string) {
    const msg = await contactRepository.findById(id);
    if (!msg) throw new NotFoundError("Message");
    return contactRepository.update(id, { status: "REPLIED", repliedAt: new Date() });
  },

  async delete(id: string) {
    const msg = await contactRepository.findById(id);
    if (!msg) throw new NotFoundError("Message");
    await contactRepository.delete(id);
  },
};
