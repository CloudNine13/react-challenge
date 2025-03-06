import { useEffect, useRef, useState } from 'react';
import { AccommodationType, OwnerType } from '../../../../types';
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
    setStep(2);
  };

  const handleOwnerInfoSubmit = (data: OwnerType) => {
    const formData = {
      ...accommodationInfo,
      ownerName: data.name,
      phone: data.phone,
      email: data.email,
    };
    formRef.current?.setAttribute('data', JSON.stringify(formData));
    setStep(3);
  };

  useEffect(() => {
    const form = formRef.current;

    const accommodationInfoSubmitEvent = (e: Event) =>
      handleAccommodationInfoSubmit((e as CustomEvent).detail);

    const ownerInfoSubmitEvent = (e: Event) => handleOwnerInfoSubmit((e as CustomEvent).detail);

    if (form) {
      form.step = step;
      if (step === 1) {
        form.addEventListener('accommodation-info-submit', accommodationInfoSubmitEvent);
      }
      if (step === 2) {
        form.addEventListener('owner-info-submit', ownerInfoSubmitEvent);
      }
    }

    return () => {
      if (form) {
        form.removeEventListener('accommodation-info-submit', accommodationInfoSubmitEvent);
        form.removeEventListener('owner-info-submit', ownerInfoSubmitEvent);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accommodationInfo, step]);

  return <wc-form ref={formRef} />;
};

export default Form;
