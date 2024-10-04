import React from 'react';
import { render, screen } from '@testing-library/react';
import Alert from './index';

describe('Alert component', () => {
    it('should not render if no message is present', () => {
        render(<Alert severity="error" />);
        const alertElement = screen.queryByTestId('alert');
        expect(alertElement).toBeNull();
    });

    it('should render with appropriate class when message is present', () => {
        render(<Alert severity="warning" message="This is a test warning!" />);
        const alertElement = screen.getByTestId('alert');
        expect(alertElement).toHaveClass('alert warning');
        expect(alertElement.textContent).toBe('This is a test warning!');
    });
});
