import React, { DOMAttributes } from 'react';
import { HomeComponent } from './pages';
import { FormComponent } from './pages/Home/components/Form';
import { AccommodationComponent } from './pages/Home/components/Form/components/Accomodation';
import { PhotoUploadComponent, NameComponent, AddressComponent, DescriptionComponent } from '';

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      ['wc-home']: CustomElement<HomeComponent>;
      ['wc-form']: CustomElement<FormComponent & { ref: React.RefObject<FormComponent | null> }>;
      ['wc-accommodation']: CustomElement<AccommodationComponent>;
      ['wc-image-upload']: CustomElement<PhotoUploadComponent>;
      ['wc-accommodation-name']: CustomElement<NameComponent>;
      ['wc-accommodation-address']: CustomElement<AddressComponent>;
      ['wc-accommodation-description']: CustomElement<DescriptionComponent>;
      ['wc-accommodation-type']: CustomElement<FormComponent>;
    }
  }
}
