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
    const { features } = useFeatures();
    const hasFeature = !!features.find((item) => item?.name === name && item?.value);
    if (typeof render === 'function') return render(hasFeature);
    if (!hasFeature) return null;
    return render;
};

export default Feature;
