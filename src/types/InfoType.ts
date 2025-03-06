import { AccommodationType } from './AccommodationType';
import { OwnerType } from './OwnerType';

type InfoType = AccommodationType & OwnerType & { ownerName: string };

export type { InfoType };
