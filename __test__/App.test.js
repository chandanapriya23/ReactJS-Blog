import { render, screen } from '@testing-library/react';
import App from '../src/App';
import Enzyme, {shallow} from "enzyme";
import "@babel/polyfill";

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

it("renders without crashing", () => {
  shallow(<App />);
}); 