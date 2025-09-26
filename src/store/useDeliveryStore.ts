import { create } from 'zustand';
import type { Address } from '../data/addressesData';

interface DeliveryStore {
  addresses: Address[];
  selectedAddressId: number | null;
  setAddresses: (addresses: Address[]) => void;
  selectAddressId: (id: number) => void;
  getSelectedAddress: () => Address | null;
}

export const useDeliveryStore = create<DeliveryStore>((set, get) => ({
  addresses: [],
  selectedAddressId: null,
  setAddresses: (addresses) => {
    set({ addresses });
    const defaultAddr =
      addresses.find((a) => a.기본배송지) || addresses[0] || null;
    set({ selectedAddressId: defaultAddr ? defaultAddr.id : null });
  },
  selectAddressId: (id) => set({ selectedAddressId: id }),
  getSelectedAddress: () => {
    const { addresses, selectedAddressId } = get();
    return addresses.find((a) => a.id === selectedAddressId) || null;
  },
}));
