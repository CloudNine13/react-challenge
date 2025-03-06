import { useEffect, useRef } from 'react';
import { InfoType } from '../../../../../../types';
import { SummaryComponent } from './Summary.WC';
import './Summary.WC';

const Summary = (data: InfoType) => {
  const summaryRef = useRef<SummaryComponent | null>(null);

  useEffect(() => {
    const summary = summaryRef.current;
    if (summary) summary.data = data;
  }, [data]);

  return <wc-summary ref={summaryRef}></wc-summary>;
};

export { Summary };
