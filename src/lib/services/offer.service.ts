import { offerRepository } from "@/lib/repositories";
import { toOfferPublic, toOfferAdmin } from "@/lib/mappers";
import { NotFoundError } from "@/lib/errors";
import type { CreateOfferInput, UpdateOfferInput } from "@/types/offer";

export const offerService = {
  async getActiveOffers() {
    const offers = await offerRepository.findActive();
    return offers.map(toOfferPublic);
  },

  async getAllOffers() {
    const offers = await offerRepository.findAll();
    return offers.map(toOfferAdmin);
  },

  async getById(id: string) {
    const offer = await offerRepository.findById(id);
    if (!offer) throw new NotFoundError("Offer");
    return toOfferAdmin(offer);
  },

  async create(input: CreateOfferInput) {
    const offer = await offerRepository.create({
      ...input,
      discount: input.discount,
      minOrder: input.minOrder ?? undefined,
      validFrom: input.validFrom ? new Date(input.validFrom) : undefined,
      validUntil: input.validUntil ? new Date(input.validUntil) : undefined,
    });
    return toOfferAdmin(offer);
  },

  async update(id: string, input: UpdateOfferInput) {
    const existing = await offerRepository.findById(id);
    if (!existing) throw new NotFoundError("Offer");
    const offer = await offerRepository.update(id, {
      ...input,
      validFrom: input.validFrom ? new Date(input.validFrom) : undefined,
      validUntil: input.validUntil ? new Date(input.validUntil) : undefined,
    });
    return toOfferAdmin(offer);
  },

  async delete(id: string) {
    const existing = await offerRepository.findById(id);
    if (!existing) throw new NotFoundError("Offer");
    await offerRepository.delete(id);
  },

  async toggle(id: string) {
    const existing = await offerRepository.findById(id);
    if (!existing) throw new NotFoundError("Offer");
    const offer = await offerRepository.update(id, { isActive: !existing.isActive });
    return toOfferAdmin(offer);
  },
};
