import { uniqBy } from 'lodash';
import React, { useState, useEffect, useMemo } from 'react';
import FeaturesContext from './features-context';
import { DataProviderClient, Feature } from './types';

export interface FeaturesProviderOptions {
    /**
     * Data provider client
     */
    client: DataProviderClient;

    /**
     * The child nodes that your provider is wrapped in
     */
    children?: React.ReactNode;

    /**
     * Feature overrides
     */
    overrides?: Feature[];
}

const FeaturesProvider = (props: FeaturesProviderOptions): JSX.Element => {
    const { client, overrides = [], children } = props;
    const [error, setError] = useState<Error | undefined>(undefined);
    const [features, setFeatures] = useState<Feature[]>([]);

    useEffect(() => {
        (async () => {
            try {
                await client.getFeatures(setFeatures, setError);
            } catch (error) {
                setError(error as Error);
            }
        })();
    }, []);

    const allFeatures = useMemo(
        () =>
            uniqBy([...features, ...overrides], 'name').map((item) => {
                const featureOverride = overrides.find((featureOverrideItem) => featureOverrideItem.name === item.name);
                if (!featureOverride) {
                    return { ...item };
                }

                return { ...featureOverride };
            }),
        [features, overrides]
    );

    return (
        <FeaturesContext.Provider
            value={{
                error,
                features: allFeatures,
            }}
        >
            {children}
        </FeaturesContext.Provider>
    );
};

export default FeaturesProvider;
