import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RegexTesterView from './src/Features/Regex/components/templates/regexTestForm';

export default function App() {
  return (
    <View style={styles.container}>
      <RegexTesterView/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
