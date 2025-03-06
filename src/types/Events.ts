import { AccommodationType } from './AccommodationType';

interface AccommodationInfoSubmitEvent extends CustomEvent {
  detail: AccommodationType;
}

export type { AccommodationInfoSubmitEvent };
