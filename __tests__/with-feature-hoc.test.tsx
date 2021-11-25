import React from 'react';
import withFeature from '../src/with-feature-hoc';
import FeaturesContext from '../src/features-context';
import { hasFeatureCheck } from '../src/features-provider';
import { render, screen } from '@testing-library/react';

const TestComponent = withFeature('feature-one')(() => <div>feature is active</div>);

describe('withFeature HOC', () => {
    test('active', () => {
        const features = [{ name: 'feature-one', value: true }];
        const hasFeature = (name: string) => hasFeatureCheck(name, features);
        render(
            <FeaturesContext.Provider value={{ features, hasFeature }}>
                <TestComponent />
            </FeaturesContext.Provider>
        );
        expect(screen.queryByText(/feature is active/i)).toBeInTheDocument();
    });

    test('inactive', () => {
        const features = [{ name: 'feature-one', value: false }];
        const hasFeature = (name: string) => hasFeatureCheck(name, features);
        render(
            <FeaturesContext.Provider value={{ features, hasFeature }}>
                <TestComponent />
            </FeaturesContext.Provider>
        );
        expect(screen.queryByText(/feature is active/i)).not.toBeInTheDocument();
    });
});
