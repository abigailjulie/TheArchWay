import { expect } from "vitest";
import {
  formatCurrency,
  parseCurrency,
  isValidCurrency,
} from "../../utils/FormatCurrency";

describe("formatCurrency", () => {
  it("should return $0.00 if a value is null or undefined", () => {
    expect(formatCurrency(null)).toBe("$0.00");
    expect(formatCurrency(undefined)).toBe("$0.00");
  });

  it("should render commas if a value is longer than 3 intergers", () => {
    expect(formatCurrency(1000)).toBe("1,000.00");
    expect(formatCurrency(1000000)).toBe("1,000,000.00");
  });

  it("should add a decimal and limit to two places", () => {
    expect(formatCurrency(12.5)).toBe("12.50");
    expect(formatCurrency(12.523)).toBe("12.52");
  });

  it("should remove currency symbol before formatting", () => {
    expect(formatCurrency("$1,234.5")).toBe("1,234.50");
  });
});

describe("parseCurrency", () => {
  it("should render 0 if empty or invalid input", () => {
    expect(parseCurrency(" ")).toBe(0);
    expect(parseCurrency(null)).toBe(0);
    expect(parseCurrency("abc")).toBe(0);
  });

  it("should parse formatted currency into a number", () => {
    expect(parseCurrency("$1,567.20")).toBe(1567.2);
  });
});

describe("isValidCurrency", () => {
  it("should allow empty input", () => {
    expect(isValidCurrency("")).toBe(true);
    expect(isValidCurrency(null)).toBe(true);
  });

  it("should accept valid formats", () => {
    expect(isValidCurrency("$1,567.00")).toBe(true);
    expect(isValidCurrency("1,567.56")).toBe(true);
  });

  it("should reject invalid formats", () => {
    expect(isValidCurrency("$1,567.345")).toBe(false);
    expect(isValidCurrency("1567")).toBe(false);
  });
});
