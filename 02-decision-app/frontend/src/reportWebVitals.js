import { onCLS, onFID, onLCP, onTTFB, onINP } from 'web-vitals';

const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
    onINP(onPerfEntry); // optional: Interaction to Next Paint
  }
};

export default reportWebVitals;
