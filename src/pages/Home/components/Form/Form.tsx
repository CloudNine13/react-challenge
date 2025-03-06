import { useEffect, useRef, useState } from 'react';
import { AccommodationType } from '../../../../types';
import { FormComponent } from './Form.WC';

const Form = () => {
  const [step, setStep] = useState(1);
  const [accommodationInfo, setAccomodationInfo] = useState<AccommodationType>({
    name: '',
    address: '',
    description: '',
    type: '',
    images: [],
  });
  const formRef = useRef<FormComponent | null>(null);

  const handleAccommodationInfoSubmit = (data: AccommodationType) => {
    setAccomodationInfo(data);
    console.log(data);
    setStep(2);
  };

  useEffect(() => {
    const form = formRef.current;

    const accommodationInfoSubmitEvent = (e: Event) =>
      handleAccommodationInfoSubmit((e as CustomEvent).detail);

    if (form) {
      form.step = step;
      form.accomodationInfo = accommodationInfo;
      form.addEventListener('accommodation-info-submit', accommodationInfoSubmitEvent);
    }

    return () => {
      if (form) {
        form.removeEventListener('accommodation-info-submit', accommodationInfoSubmitEvent);
      }
    };
  }, [accommodationInfo, step]);

  return <wc-form ref={formRef} />;
};

export default Form;
