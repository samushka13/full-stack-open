import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";

import SignInContainer from "../components/sign-in/SignInContainer";

const TEST_USER = {
  username: "kalle",
  password: "password",
};

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();

      render(<SignInContainer onSubmit={onSubmit} />);

      const username = screen.getByTestId("username");
      const password = screen.getByTestId("password");
      const button = screen.getByTestId("sign-in");

      fireEvent.changeText(username, TEST_USER.username);
      fireEvent.changeText(password, TEST_USER.password);
      fireEvent.press(button);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
      });

      expect(onSubmit.mock.calls[0][0]).toEqual(TEST_USER);
    });
  });
});
