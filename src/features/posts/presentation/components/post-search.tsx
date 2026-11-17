import {
  TextInput,
  View,
} from 'react-native';

import { postSearchStyles as styles } from './post-search.styles';

interface PostSearchProps {
  value: string;
  onChangeText: (value: string) => void;
}

export function PostSearch({
  value,
  onChangeText,
}: PostSearchProps) {
  return (
    <View style={styles.container}>
      <TextInput
        accessibilityLabel="Pesquisar posts"
        accessibilityHint="Digite palavras do título ou conteúdo."
        placeholder="Pesquisar posts..."
        placeholderTextColor="#9A8776"
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        clearButtonMode="while-editing"
        allowFontScaling
      />
    </View>
  );
}