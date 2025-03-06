const validateInput = (
  input: HTMLInputElement | HTMLTextAreaElement,
  error: HTMLSpanElement,
  errorMessages: Record<string, string>
) => {
  let isValid = false;
  if (input.validity.valueMissing) {
    error.textContent = errorMessages.valueMissing;
  } else if (input.validity.tooShort) {
    error.textContent = errorMessages.tooShort;
  } else if (input.validity.tooLong) {
    error.textContent = errorMessages.tooLong;
  } else if (input.validity.patternMismatch) {
    error.textContent = errorMessages.patternMismatch;
  } else {
    error.textContent = '';
    isValid = true;
  }
  error.style.display = input.validity.valid ? 'none' : 'block';
  return isValid;
};

export { validateInput };
