import {render, screen} from '@testing-library/react';
import React from 'react';
import Button from './index';
import {MemoryRouter} from 'react-router-dom';

describe('button', () => {
    it('should render a loader when busy', () => {
        render(<Button busy={true}/>);
        const loaderElement = screen.getByTestId('button-loader');
        expect(loaderElement).not.toBeNull();
    });

    it('should have a link', () => {
        render(
            <MemoryRouter>
                <Button link={`/groups/new`} text={"New Group"}/>
            </MemoryRouter>
        );
        const linkElement = screen.getByTestId('button-link');
        expect(linkElement).toHaveAttribute('href', '/groups/new');
    });

    it('should render a submit button without a handler or link', () => {
        render(
            <Button type="submit" text="Submit" />
        );
        const buttonElement = screen.getByTestId('button');
        expect(buttonElement).not.toHaveAttribute('href');
        expect(buttonElement).not.toHaveAttribute('onClick');
    });

    it('should render properties corectly', () => {
        render(
            <Button color="primary" text="Submit" size="sm" className="custom-class"/>
        );
        const buttonElement = screen.getByTestId('button');
        expect(buttonElement).toHaveClass('primary');
        expect(buttonElement).toHaveClass('sm');
        expect(buttonElement).toHaveClass('custom-class');
    });
});