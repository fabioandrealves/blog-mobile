import {
  forwardRef,
  useState,
} from 'react';

import {
  Pressable,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import { passwordFieldStyles as styles } from './password-field.styles';

export type PasswordFieldProps = Omit<
  TextInputProps,
  'secureTextEntry' | 'value' | 'onChangeText'
> & {
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

const PasswordField = forwardRef<TextInput, PasswordFieldProps>(
  function PasswordField(
    {
      value,
      onChange,
      label = 'Senha',
      editable = true,
      style,
      accessibilityLabel,
      accessibilityHint,
      returnKeyType = 'done',
      ...textInputProps
    },
    ref,
  ) {
    const [isPasswordVisible, setIsPasswordVisible] =
      useState(false);

    const isDisabled = editable === false;

    return (
      <View style={styles.container}>
        <Text
          style={styles.label}
          allowFontScaling
        >
          {label}
        </Text>

        <View
          style={[
            styles.inputContainer,
            isDisabled && styles.containerDisabled,
          ]}
        >
          <TextInput
            {...textInputProps}
            ref={ref}
            value={value}
            onChangeText={onChange}
            secureTextEntry={!isPasswordVisible}
            editable={editable}
            style={[
              styles.input,
              isDisabled && styles.inputDisabled,
              style,
            ]}
            accessibilityLabel={accessibilityLabel ?? label}
            accessibilityHint={
              accessibilityHint ??
              'Digite sua senha. Utilize o botão ao lado para mostrar ou ocultar.'
            }
            accessibilityState={{
              disabled: isDisabled,
            }}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType={returnKeyType}
            allowFontScaling
          />

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              isPasswordVisible
                ? 'Ocultar senha'
                : 'Mostrar senha'
            }
            accessibilityHint={
              isPasswordVisible
                ? 'Oculta os caracteres da senha.'
                : 'Exibe os caracteres da senha.'
            }
            accessibilityState={{
              disabled: isDisabled,
              expanded: isPasswordVisible,
            }}
            onPress={() =>
              setIsPasswordVisible(current => !current)
            }
            disabled={isDisabled}
            hitSlop={8}
            style={({ pressed }) => [
              styles.visibilityButton,
              pressed && !isDisabled && styles.visibilityPressed,
            ]}
          >
            <Text
              style={styles.visibilityText}
              allowFontScaling
            >
              {isPasswordVisible ? 'Ocultar' : 'Mostrar'}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  },
);

export default PasswordField;