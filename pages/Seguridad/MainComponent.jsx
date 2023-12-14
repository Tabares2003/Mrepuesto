// MainComponent.jsx
import React from 'react';
import { LocationProvider } from './LocationContext';
import dispVinculados from './dispVinculados';

function MainComponent() {
  return (
    <LocationProvider>
      <dispVinculados />
    </LocationProvider>
  );
}

export default MainComponent;