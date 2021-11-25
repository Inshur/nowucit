import React from 'react';
import useFeatures from './use-features';

const Feature = ({
    name,
    children,
    render = children,
}: {
    name: string;
    children?: React.ReactNode | ((hasFeature: boolean) => JSX.Element);
    render?: React.ReactNode | ((hasFeature: boolean) => JSX.Element);
}) => {
    const { hasFeature } = useFeatures();
    if (typeof render === 'function') return render(hasFeature(name));
    if (!hasFeature(name)) return null;
    return render;
};

export default Feature;
