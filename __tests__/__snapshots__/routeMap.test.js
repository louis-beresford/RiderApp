import renderer from "react-test-renderer";
import RouteMap from "../../app/components/routePage/routingMap";
import { routeData } from "../exampleData/routeData";
import axios from 'axios';

jest.mock('axios');

const bike

test('should fetch bike', () => {
    const bike = [{name: 'Bike 1', id: 1, condition: 1, long: 51.2344, lat: 0.1232}];
    const resp = {data: bike};

    axios.get.mockImplementation(() => Promise.resolve(resp).then(resp => bike = resp.data))
  
    return Users.all().then(data => expect(data).toEqual(users));
  });

it("renders correctly", () => {
  const tree = renderer
    .create(
      <RouteMap stopInfo={routeData[0]} showNextStop={true} round={routeData} bike={bike} />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
