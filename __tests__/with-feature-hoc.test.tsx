import React from 'react';
import withFeature from '../src/with-feature-hoc';
import FeaturesContext from '../src/features-context';
import { render, screen } from '@testing-library/react';

const TestComponent = withFeature('feature-one')(() => <div>feature is active</div>);

describe('withFeature HOC', () => {
    test('active', () => {
        const features = [{ name: 'feature-one', value: true }];
        render(
            <FeaturesContext.Provider value={{ features }}>
                <TestComponent />
            </FeaturesContext.Provider>
        );
        expect(screen.queryByText(/feature is active/i)).toBeInTheDocument();
    });

    test('inactive', () => {
        const features = [{ name: 'feature-one', value: false }];
        render(
            <FeaturesContext.Provider value={{ features }}>
                <TestComponent />
            </FeaturesContext.Provider>
        );
        expect(screen.queryByText(/feature is active/i)).not.toBeInTheDocument();
    });
});
