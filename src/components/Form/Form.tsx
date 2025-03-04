import { useEffect, useRef, useState } from 'react';

const Form = () => {
  const [step] = useState<number>(1);
  const homeWcRef = useRef<any>(null);

  useEffect(() => {
    const homeWc = homeWcRef.current;
    if (homeWc) {
      homeWcRef.current.step = step;
    }
  }, [step]);

  return <wc-form ref={homeWcRef} />;
};

export default Form;
