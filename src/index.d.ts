import React, { DOMAttributes } from 'react';
import { HomeComponent } from './components';

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      ['wc-home']: CustomElement<HomeComponent>;
    }
  }
}
