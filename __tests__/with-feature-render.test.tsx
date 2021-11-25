import React from 'react';
import Feature from '../src/with-feature-render';
import FeaturesContext from '../src/features-context';
import { hasFeatureCheck } from '../src/features-provider';
import { render, screen } from '@testing-library/react';

describe('<Feature />', () => {
    describe('children', () => {
        test('active', () => {
            const features = [{ name: 'feature-one', value: true }];
            const hasFeature = (name: string) => hasFeatureCheck(name, features);
            render(
                <FeaturesContext.Provider value={{ features, hasFeature }}>
                    <Feature name="feature-one">
                        <div>Feature One</div>
                    </Feature>
                </FeaturesContext.Provider>
            );
            expect(screen.queryByText(/feature one/i)).toBeInTheDocument();
        });

        test('inactive', () => {
            const features = [{ name: 'feature-one', value: false }];
            const hasFeature = (name: string) => hasFeatureCheck(name, features);
            render(
                <FeaturesContext.Provider value={{ features, hasFeature }}>
                    <Feature name="feature-one">
                        <div>Feature One</div>
                    </Feature>
                </FeaturesContext.Provider>
            );
            expect(screen.queryByText(/feature one/i)).not.toBeInTheDocument();
        });
    });

    describe('function', () => {
        test('active', () => {
            const features = [{ name: 'feature-one', value: true }];
            const hasFeature = (name: string) => hasFeatureCheck(name, features);
            render(
                <FeaturesContext.Provider value={{ features, hasFeature }}>
                    <Feature name="feature-one">
                        {(active: boolean) => (active ? <div>Feature One</div> : null)}
                    </Feature>
                </FeaturesContext.Provider>
            );
            expect(screen.queryByText(/feature one/i)).toBeInTheDocument();
        });

        test('inactive', () => {
            const features = [{ name: 'feature-one', value: false }];
            const hasFeature = (name: string) => hasFeatureCheck(name, features);
            render(
                <FeaturesContext.Provider value={{ features, hasFeature }}>
                    <Feature name="feature-one">
                        {(active: boolean) => (active ? <div>Feature One</div> : <div>Feature One Fallback</div>)}
                    </Feature>
                </FeaturesContext.Provider>
            );
            expect(screen.queryByText(/feature one fallback/i)).toBeInTheDocument();
        });
    });

    describe('render prop', () => {
        test('element - active', () => {
            const features = [{ name: 'feature-one', value: true }];
            const hasFeature = (name: string) => hasFeatureCheck(name, features);
            render(
                <FeaturesContext.Provider value={{ features, hasFeature }}>
                    <Feature name="feature-one" render={<div>Feature One</div>} />
                </FeaturesContext.Provider>
            );
            expect(screen.queryByText(/feature one/i)).toBeInTheDocument();
        });

        test('element - inactive', () => {
            const features = [{ name: 'feature-one', value: false }];
            const hasFeature = (name: string) => hasFeatureCheck(name, features);
            render(
                <FeaturesContext.Provider value={{ features, hasFeature }}>
                    <Feature name="feature-one" render={<div>Feature One</div>} />
                </FeaturesContext.Provider>
            );
            expect(screen.queryByText(/feature one/i)).not.toBeInTheDocument();
        });

        test('function - active', () => {
            const features = [{ name: 'feature-one', value: true }];
            const hasFeature = (name: string) => hasFeatureCheck(name, features);
            render(
                <FeaturesContext.Provider value={{ features, hasFeature }}>
                    <Feature
                        name="feature-one"
                        render={(active: boolean) => (active ? <div>Feature One</div> : null)}
                    />
                </FeaturesContext.Provider>
            );
            expect(screen.queryByText(/feature one/i)).toBeInTheDocument();
        });

        test('function - inactive', () => {
            const features = [{ name: 'feature-one', value: false }];
            const hasFeature = (name: string) => hasFeatureCheck(name, features);
            render(
                <FeaturesContext.Provider value={{ features, hasFeature }}>
                    <Feature
                        name="feature-one"
                        render={(active: boolean) =>
                            active ? <div>Feature One</div> : <div>Feature One Fallback</div>
                        }
                    />
                </FeaturesContext.Provider>
            );
            expect(screen.queryByText(/feature one fallback/i)).toBeInTheDocument();
        });
    });
});
