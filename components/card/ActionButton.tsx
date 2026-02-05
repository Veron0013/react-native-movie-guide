import { Text, TouchableOpacity } from 'react-native';

interface ActionButtonProps {
  title: string;
  disabledTitle: string;
  onPress: () => void;
  enabled: boolean;
  variant: 'primary' | 'secondary';
}

const ActionButton = ({
  title,
  disabledTitle,
  onPress,
  enabled,
  variant,
}: ActionButtonProps) => {
  const base = 'flex-1 rounded-lg p-3';
  const textBase = 'text-center text-base font-semibold';

  const bg =
    variant === 'primary'
      ? enabled
        ? 'bg-darkAccent'
        : 'bg-darkAccent/50'
      : enabled
        ? 'bg-ratingBox'
        : 'bg-ratingBox/50';

  const textColor =
    variant === 'primary'
      ? 'text-primary'
      : enabled
        ? 'text-accentText'
        : 'text-accentText/60';

  return (
    <TouchableOpacity
      className={`${base} ${bg}`}
      onPress={onPress}
      disabled={!enabled}
    >
      <Text className={`${textBase} ${textColor}`}>
        {enabled ? title : disabledTitle}
      </Text>
    </TouchableOpacity>
  );
};

export default ActionButton;
