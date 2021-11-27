# nowucit

React package that provides the ability to toggle visibility on features and components.

## Installation

Using [npm](https://npmjs.org/)

```bash
npm install @inshur/nowucit
```

Using [yarn](https://yarnpkg.com/)

```bash
yarn add @inshur/nowucit
```

## Getting Started

### Basic Configuration

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { createFireBaseClient, FeaturesProvider } from 'nowucit';
import App from './App';

// firebase connection details
const config = {
    apiKey: '__API_KEY__',
    authDomain: '__AUTH_DOMAIN__',
    projectId: '__PROJECT_ID__',
    storageBucket: '__STORAGE_BUCKET____',
    messagingSenderId: '__MESSAGING_SENDER_ID__',
    appId: '__APP_ID__',
    measurementId: '__MEASUREMENT_ID__',
    collectionId: '__COLLECTION_ID__',
};

// create client
const client = createFireBaseClient(client);

ReactDOM.render(
    <FeaturesProvider client={client}>
        <App />
    </FeaturesProvider>,
    document.getElementById('app')
);
```

### Configuration with overrides

The `FeaturesProvider` is able to take in an optional `overrides` array which take precedence over features that have been fetch using the data provider client.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { createFireBaseClient, FeaturesProvider } from 'nowucit';
import App from './App';

const config = {...};
const client = createFireBaseClient(client);
const overrides = [{ name: 'slider', value: false }, { name: 'tabs', value: true }];

ReactDOM.render(
    <FeaturesProvider client={client} overrides={overrides}>
        <App />
    </FeaturesProvider>,
    document.getElementById('app')
);
```

## Usage

### Feature

`Feature` is a consumer component which can be used as a wrapper and also as a render prop component

```jsx
import React from 'react';
import { Feature } from 'nowucit';

const App = () => (
  <>
    <Feature name='slider'>
      <div>Slider feature enabled</div>
    </Feature>

    <Feature name='tabs' render={(isEnabled) => isEnabled ?
      <div>Tabs feature enabled</div> : <div>Tabs feature disabled</div>} />

    <Feature name='tabs'>
      {(isEnabled) => isEnabled ?
        <div>Tabs feature enabled</div> : <div>Tabs feature disabled</div>}
    </Feature>
  </>
);
```

### withFeature Higher Order Ciomponent

```jsx
import React from 'react';
import { withFeature } from 'nowucit';

const SliderComponent = () => <div>Slider component</div>;

export default withFeature('slider')(SliderComponent);
```
