import { describe, expect, it } from "vitest";
import { PHONE, PHONE_DISPLAY, WHATSAPP_URL } from "@/data/restaurant";

describe("Restaurant contact", () => {
  it("uses the supplied phone number for Indian calls and WhatsApp", () => {
    expect(PHONE_DISPLAY).toBe("7987827020");
    expect(PHONE).toBe("+917987827020");
    expect(WHATSAPP_URL).toBe("https://wa.me/917987827020");
  });
});