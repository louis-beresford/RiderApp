import { render, screen } from "@testing-library/react";
import RouteScreen from "../../app/screens/RouteScreen";

test("renders screen", () => {
  render(<RouteScreen />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
