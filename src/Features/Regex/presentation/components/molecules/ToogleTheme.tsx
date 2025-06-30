import { useAppTheme } from '../../../../../core/useAppTheme';
import { useThemeStore } from '../../../../../Store/useThemeStore';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppText from '../atoms/MyText';

export const ToggleTheme = () => {
      const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const tema = useAppTheme();

  return(
          <TouchableOpacity onPress={toggleTheme} style={{ paddingRight: 12 }}>
        <Ionicons
          name={theme === 'dark' ? 'sunny-outline' : 'moon-outline'}
          size={24}
          color={theme === 'dark' ? '#fff' : '#000'}
        />
        <AppText style={{ color: tema.text, fontSize: 16 }}>
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </AppText>
   
      </TouchableOpacity>
  );
}

const styles = {
    container: {
        padding: 20,
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
}