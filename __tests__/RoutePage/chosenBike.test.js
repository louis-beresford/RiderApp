import { render, screen } from "@testing-library/react";
import ChoseBike from "../components/routePage/choseBike";

test("renders screen", () => {
  render(<ChoseBike />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
