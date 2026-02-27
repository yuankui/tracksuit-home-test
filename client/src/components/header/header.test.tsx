import { describe, expect, it } from "vitest";
import { Header, HEADER_TEXT } from "./header.tsx";
import { render } from "@testing-library/react";
import { wrapper } from "../../lib/test-wrapper.tsx";

describe("header", () => {
  it("renders", () => {
    const { getByText } = render(<Header />, {
      wrapper,
    });
    expect(getByText(HEADER_TEXT)).toBeTruthy();
  });
});
