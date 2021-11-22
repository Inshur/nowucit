import { useContext } from 'react';
import FeaturesContext from './features-context';
import { FeaturesContextInterface } from './features-context';

const useFeatures = (): FeaturesContextInterface => useContext(FeaturesContext);
export default useFeatures;
