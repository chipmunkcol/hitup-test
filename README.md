### TypeScript 객체 값 가져오기

1. key가 enum으로 정의된 경우

```
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

function getDomesticValue(key: keyof typeof domesticData) {
  return domesticData[key];
}

function getImportValue(key: keyof typeof importData) {
  return importData[key];
}
```

객체 부분 key 변경하기

```
type PartnerFindPasswordPayload = Omit<PartnerFindAccountPayload,'companyOwnerName'> & { loginId: string; };

```

```

type AuthStoreState = {
  partnerAuth: PartnerAuth | null;
  setPartnerAuth: (authData: Partial<PartnerAuth>) => void;
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, get) => ({
      partnerAuth: null,
      setPartnerAuth: (authData) =>
        set({
          partnerAuth: {
            ...get().partnerAuth,
            ...authData, // ✅ 변경된 부분만 반영
          } as PartnerAuth,
        }),
    }),
    {
      name: 'partner-auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
);


```

### antd

Radio, Select, Selectbox

```
<Radio.Group
  defaultValue={'card'}
  options={[
    { value: 'card', label: '카드결제' },
    { value: 'naverpay', label: '네이버페이' },
  ]}
  onChange={onChange}
/>
```

```
<SelectBox
  options={[
    { value: '1', label: '1개', price: item.가격 },
    {
      value: '2',
      label: '2개',
      price: item.가격 * 2,
    },
    {
      value: '3',
      label: '3개',
      price: item.가격 * 3,
    },
  ]}
/>
```
