import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from './NavigationTypes';
import { RegexTesterScreen } from '../presentation/components/templates/regexTestForm';
import HistorialScreen from '../presentation/components/templates/Regexhistory';
import RegexRailScreen from '../presentation/components/templates/RegexRailDiagram';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeStore } from '../../../Store/useThemeStore';

const Stack = createNativeStackNavigator<StackParamList>();

export default function RegexStackNavigator() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <Stack.Navigator initialRouteName="RegexHome">
      <Stack.Screen
        name="RegexHome"
        component={RegexTesterScreen}
        options={{
          title: 'Probador de Regex',
            
        }}
      />
      <Stack.Screen name="RegexHistory" component={HistorialScreen} />
      <Stack.Screen name="RegexDiagram" component={RegexRailScreen} />
    </Stack.Navigator>
  );
}
