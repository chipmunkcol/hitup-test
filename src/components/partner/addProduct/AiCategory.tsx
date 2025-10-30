// import React, { useState, useMemo } from 'react';
// import { Select, Space } from 'antd';
// import type { SelectProps } from 'antd';
// import { CATEGORY_TREE } from './categoryTree'; // 앞서 만든 CATEGORY_TREE import

// interface CategoryNode {
//   key: string;
//   label: string;
//   parent?: string;
//   type: 'category' | 'sub' | 'type';
//   value?: string;
//   fish?: string[];
// }

// interface CategorySelection {
//   category: string;
//   subCategory: string;
//   type: string;
//   fish: string[];
// }

// const CategorySelector: React.FC = () => {
//   const [selection, setSelection] = useState<CategorySelection>({
//     category: '',
//     subCategory: '',
//     type: '',
//     fish: [],
//   });

//   // 1️⃣ category 목록
//   const categoryOptions = useMemo(
//     () =>
//       CATEGORY_TREE.filter((c) => c.type === 'category').map((c) => ({
//         label: c.label,
//         value: c.key,
//       })),
//     []
//   );

//   // 2️⃣ 선택된 category에 해당하는 sub 목록
//   const subOptions = useMemo(() => {
//     if (!selection.category) return [];
//     return CATEGORY_TREE.filter(
//       (c) => c.type === 'sub' && c.parent === selection.category
//     ).map((c) => ({ label: c.label, value: c.key }));
//   }, [selection.category]);

//   // 3️⃣ 선택된 subCategory에 해당하는 type 목록
//   const typeOptions = useMemo(() => {
//     if (!selection.subCategory) return [];
//     return CATEGORY_TREE.filter(
//       (c) => c.type === 'type' && c.parent === selection.subCategory
//     ).map((c) => ({ label: c.label, value: c.key }));
//   }, [selection.subCategory]);

//   // 4️⃣ 선택된 type의 어종 목록
//   const fishOptions = useMemo(() => {
//     const typeNode = CATEGORY_TREE.find((c) => c.key === selection.type);
//     return typeNode?.fish?.map((f) => ({ label: f, value: f })) || [];
//   }, [selection.type]);

//   const handleChange = (
//     field: keyof CategorySelection,
//     value: string | string[]
//   ) => {
//     setSelection((prev) => {
//       const updated = { ...prev };
//       updated[field] = value as any;

//       // 상위 선택 변경 시 하위 단계 초기화
//       if (field === 'category') {
//         updated.subCategory = '';
//         updated.type = '';
//         updated.fish = [];
//       } else if (field === 'subCategory') {
//         updated.type = '';
//         updated.fish = [];
//       } else if (field === 'type') {
//         updated.fish = [];
//       }

//       return updated;
//     });
//   };

//   return (
//     <Space direction="vertical" size="large" style={{ width: 320 }}>
//       {/* 1️⃣ 대분류 */}
//       <Select
//         placeholder="대분류 (예: 바다, 민물)"
//         options={categoryOptions}
//         value={selection.category || undefined}
//         onChange={(v) => handleChange('category', v)}
//       />

//       {/* 2️⃣ 중분류 */}
//       <Select
//         placeholder="중분류 (예: 선상, 갯바위)"
//         options={subOptions}
//         value={selection.subCategory || undefined}
//         onChange={(v) => handleChange('subCategory', v)}
//         disabled={!selection.category}
//       />

//       {/* 3️⃣ 소분류 / 타입 */}
//       <Select
//         placeholder="타입 (예: 세트, 릴)"
//         options={typeOptions}
//         value={selection.type || undefined}
//         onChange={(v) => handleChange('type', v)}
//         disabled={!selection.subCategory}
//       />

//       {/* 4️⃣ 어종 */}
//       <Select
//         mode="multiple"
//         placeholder="어종 선택"
//         options={fishOptions}
//         value={selection.fish}
//         onChange={(v) => handleChange('fish', v)}
//         disabled={!selection.type || fishOptions.length === 0}
//       />

//       {/* 선택 결과 미리보기 */}
//       <pre style={{ background: '#f9f9f9', padding: 12, borderRadius: 8 }}>
//         {JSON.stringify(selection, null, 2)}
//       </pre>
//     </Space>
//   );
// };

// export default CategorySelector;
