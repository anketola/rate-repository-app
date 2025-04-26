import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      
      render(<SignInContainer onSubmit={onSubmit}/>)
      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'tester');
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'passworder');
      fireEvent.press(screen.getByText('Sign in'));

      await waitFor(() => {
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'tester',
          password: 'passworder'
        });
      });
    });
  });
});