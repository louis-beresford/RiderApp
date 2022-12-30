import React from "react";
import renderer from "react-test-renderer";
import RouteScreen from "../../app/screens/RouteScreen";
import CameraButton from "../../app/components/buttons/openCameraButton";

test("renders correctly", () => {
  const tree = renderer.create(<CameraButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
