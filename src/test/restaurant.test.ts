import { describe, expect, it } from "vitest";
import { PHONE, PHONE_DISPLAY, WHATSAPP_URL } from "@/data/restaurant";

describe("Restaurant contact", () => {
  it("uses the supplied phone number for Indian calls and WhatsApp", () => {
    expect(PHONE_DISPLAY).toBe("9981401199");
    expect(PHONE).toBe("+919981401199");
    expect(WHATSAPP_URL).toBe("https://wa.me/919981401199");
  });
});