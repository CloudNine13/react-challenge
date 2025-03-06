import React, { DOMAttributes } from 'react';
import {
  HomeComponent,
  FormComponent,
  AccommodationComponent,
  NameComponent,
  AddressComponent,
  DescriptionComponent,
  PhotoUploadComponent,
  OwnerComponent,
  AccomodationComponent,
  TypeComponent,
} from './pages/Home/components/Form/Form';

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare module 'react/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      ['wc-home']: CustomElement<HomeComponent>;
      ['wc-form']: CustomElement<FormComponent & { ref: React.RefObject<FormComponent | null> }>;
      ['wc-accommodation']: CustomElement<AccommodationComponent>;
      ['wc-accommodation-name']: CustomElement<NameComponent>;
      ['wc-accommodation-address']: CustomElement<AddressComponent>;
      ['wc-accommodation-description']: CustomElement<DescriptionComponent>;
      ['wc-accommodation-type']: CustomElement<TypeComponentComponent>;
      ['wc-image-upload']: CustomElement<PhotoUploadComponent>;
      ['wc-owner']: CustomElement<OwnerComponent>;
      ['wc-owner-name']: CustomElement<NameComponent>;
      ['wc-owner-email']: CustomElement<EmailComponent>;
      ['wc-owner-phone']: CustomElement<PhoneComponent>;
    }
  }
}
