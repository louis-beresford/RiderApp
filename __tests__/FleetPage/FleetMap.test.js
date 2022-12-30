import { render, screen } from "@testing-library/react";
import FleetMap from "../../app/components/fleetMapPage/fleetMap";

test("renders map", () => {
  render(<FleetMap />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
