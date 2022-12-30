import { render, screen } from "@testing-library/react";
import FleetMapScreen from "../../app/screens/FleetMapScreen";

test("renders screen", () => {
  render(<FleetMapScreen />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
