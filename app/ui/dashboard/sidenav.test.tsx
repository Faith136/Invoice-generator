import { render, screen } from "@testing-library/react";
import Sidenav from "../dashboard/sidenav";

jest.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
}));

describe("Sidenav", () => {
  it("renders the PurpleHs logo", () => {
    render(<Sidenav />);

    expect(screen.getByText("PurpleHs")).toBeInTheDocument();
  });
});