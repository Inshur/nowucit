import React from 'react';
import Feature from './with-feature-render';

const withFeature =
    (feature: string) =>
    <P extends Record<string, unknown>>(Component: React.ComponentType<P>) =>
    (props: P) =>
        (
            <Feature name={feature}>
                <Component {...(props as P)} />
            </Feature>
        );

export default withFeature;
