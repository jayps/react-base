import { render, screen } from '@testing-library/react';
import React from 'react';
import Card from './index';

describe('Card', () => {
    it('should render with correct classnames', () => {
        render(
            <Card className="testing-card">
                <p data-testid="testing-content">Testing</p>
            </Card>
        );
        const cardElement = screen.getByTestId('card');
        const contentElement = screen.getByTestId('testing-content');
        expect(cardElement).toHaveClass('testing-card');
        expect(contentElement).not.toBeNull();
    });
});
