import { render, screen } from "@testing-library/react";
import FaultReportScreen from "../../app/screens/FaultReportScreen";

test("renders screen", () => {
  render(<FaultReportScreen />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
