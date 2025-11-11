export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;

export const commonRules = [
  { required: false, message: '필수 정보를 입력해주세요' },
];

export const commonRulesMaxLength = (length: number) => [
  { required: false, message: '필수 정보를 입력해주세요' },
  { max: length, message: `최대 ${length}자까지 입력 가능합니다` },
];
