import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { AccommodationType } from '../../../../../../types';
import { AccommodationComponent } from './Accomodation.WC';
import './Accomodation.WC';
import { ACCOMMODATION_CONSTANTS } from './constants';

type ValidType = {
  name: boolean;
  address: boolean;
  type: boolean;
};

type SetterType = Dispatch<SetStateAction<AccommodationType>> | Dispatch<SetStateAction<ValidType>>;

const Accommodation = () => {
  const { IMAGES, REQUIRED_FIELDS, LISTENER_TYPES, EVENT_TYPES } = ACCOMMODATION_CONSTANTS;
  const [isValid, setIsValid] = useState<ValidType>({
    name: true,
    address: true,
    type: true,
  });
  const [data, setData] = useState<AccommodationType>({
    name: '',
    address: '',
    description: '',
    type: 'Villa',
    images: [],
  });

  const componentRef = useRef<AccommodationComponent | null>(null);

  const setState = (
    key: keyof AccommodationType,
    value: string | Array<string> | boolean,
    setter: SetterType
  ) => {
    setter((prev: any) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const component = componentRef.current;
    if (!component) return;

    const setupListener = (key: keyof AccommodationType) => {
      component.addEventListener(LISTENER_TYPES.KEY.replace('key', key), (e: Event) => {
        const eventDetail = (e as CustomEvent).detail;

        if (key === IMAGES) {
          if (!data.images.includes(eventDetail.value)) {
            setState(key, eventDetail.value, setData);
            return;
          }
        }

        if (REQUIRED_FIELDS.includes(key)) {
          setState(key, eventDetail.isValid, setIsValid);
        }

        setState(key, eventDetail.value || '', setData);
      });
    };

    const keys = Object.keys(data) as Array<keyof AccommodationType>;
    keys.forEach(setupListener);

    if (!component.callback)
      component.callback = () =>
        dispatchEvent(
          new CustomEvent(EVENT_TYPES.SUBMIT, {
            detail: data,
            bubbles: true,
            composed: true,
          })
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const component = componentRef.current;
    if (!component) return;
    const disabled = !Object.values(isValid).every(Boolean);
    component.valid = disabled;
  }, [isValid]);

  return <wc-accommodation ref={componentRef}></wc-accommodation>;
};

export { Accommodation };
