import {CHAIN} from "@townsquarexyz/ui-vue";
import {z} from "zod";

export const CheckProofRequest = z.object({
  address: z.string(),
  network: z.enum([CHAIN.MAINNET, CHAIN.TESTNET]),
  public_key: z.string(),
  proof: z.object({
    timestamp: z.number(),
    domain: z.object({
      lengthBytes: z.number(),
      value: z.string(),
    }),
    payload: z.string(),
    signature: z.string(),
    state_init: z.string(),
  }),
});

export type CheckProofRequestDto = z.infer<typeof CheckProofRequest>;
