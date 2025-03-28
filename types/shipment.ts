export interface Shipment {
  mode: 'ocean' | 'air';
  mbl: string;
  carrier: string;
  consignee: string;
  dispatchDate: string;
  shareWith: string;
  referenceNumber: string;
  pol: string;
  pod: string;
}
