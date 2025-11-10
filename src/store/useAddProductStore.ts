import { create } from 'zustand';

// interface ProductForm {
//   category: string;
//   subCategory: string;
//   type: string;
//   fish: string[];

//   productName: string;
//   price: {
//     original: number;
//     instantDiscount: {
//       isApplied: boolean;
//       type: 'percent' | 'amount';
//       value: number;
//     };
//     taxType: '과세' | '면세';
//   };
//   stock: number;

//   // isEnabled: false,
//   //   optionType: '단독형',
//   //   OptionLength: 1,
//   //   sortOrder: 1,
//   //   options: [] as OptionType[],

//   options?: {
//     isEnabled?: boolean;
//     optionType?: '단독형' | '조합형';
//     OptionLength?: number;
//     sortOrder?: number;
//     options?: { optionName: string; additionalPrice: number }[];
//   };
// }

interface ProductStore {
  // product: ProductForm;
  // // Actions
  // onChangeInput: (name: string, value: string) => void;
  // changeDiscountApplied: (isApplied: boolean) => void;
  // onChangePrice: (value: string) => void;
  // resetProduct: () => void;

  // 상품상세 참조
  상품상세: boolean;
  onClick상품상세참조: (checked: boolean) => void;

  mode: 'date' | 'manual';
  setMode: (mode: 'date' | 'manual') => void;
}

export const useAddProductStore = create<ProductStore>((set) => ({
  // product: {
  //   category: '',
  //   subCategory: '',
  //   type: '',
  //   fish: [],

  //   productName: '',
  //   price: {
  //     original: 0,
  //     instantDiscount: {
  //       isApplied: false,
  //       type: 'percent',
  //       value: 0,
  //     },
  //     taxType: '과세',
  //   },
  //   stock: 0,
  // },
  // onChangeInput: (name: string, value: string) =>
  //   set((state) => ({
  //     product: { ...state.product, [name]: value },
  //   })),
  // changeDiscountApplied: (isApplied: boolean) =>
  //   set((state) => ({
  //     product: {
  //       ...state.product,
  //       price: {
  //         ...state.product.price,
  //         instantDiscount: {
  //           ...state.product.price.instantDiscount,
  //           isApplied,
  //         },
  //       },
  //     },
  //   })),
  // onChangePrice: (value: string) =>
  //   set((state) => ({
  //     product: {
  //       ...state.product,
  //       price: {
  //         ...state.product.price,
  //         original: Number(value),
  //       },
  //     },
  //   })),
  // resetProduct: () =>
  //   set(() => ({
  //     product: {
  //       productName: '',
  //       price: {
  //         original: 0,
  //         instantDiscount: {
  //           isApplied: false,
  //           type: 'percent',
  //           value: 0,
  //         },
  //         taxType: '과세',
  //       },
  //       stock: 0,
  //     },
  //   })),
  상품상세: false,
  onClick상품상세참조: (checked) => set({ 상품상세: checked }),

  mode: 'date',
  setMode: (mode) => set({ mode }),
}));
