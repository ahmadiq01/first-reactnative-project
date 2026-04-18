import { Text } from 'react-native';

export function SectionLabel({ label }: { label: string }) {
  return (
    <Text className="text-[10px] font-semibold text-gray-400 tracking-widest uppercase mb-2 mt-4">
      {label}
    </Text>
  );
}

