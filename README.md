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

type PartnerFindPasswordPayload = Omit<
PartnerFindAccountPayload,
'companyOwnerName'

> & {
> loginId: string;
> };

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

### antd
