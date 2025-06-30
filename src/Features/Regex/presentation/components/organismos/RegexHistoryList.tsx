import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRegexHistoryViewModel } from '../../ViewModel/GetHistoryRegexViewModel';
import { useRegexStore } from '../../../../../Store/useRegexStore';
import { useAppTheme } from '../../../../../core/useAppTheme';

const RegexHistoryList = () => {
  const { history, loading } = useRegexHistoryViewModel();
  const { setPattern } = useRegexStore();
  const theme = useAppTheme();
  const navigation = useNavigation();

  if (loading) return <Text style={{ color: theme.text }}>Cargando...</Text>;

  if (history.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.empty, { color: theme.text }]}>No hay historial aún.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={history}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ backgroundColor: theme.background, paddingBottom: 20 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            setPattern(item.pattern);
            navigation.goBack();
          }}
        >
          <View style={[styles.item, { borderColor: theme.border }]}>
            <Text style={[styles.pattern, { color: theme.text }]}>{item.pattern}</Text>
            <Text style={[styles.date, { color: theme.text + '88' }]}>
              {new Date(item.createdAt).toLocaleString()}
            </Text>
          </View>
        </Pressable>
      )}
    />
  );
};

export default RegexHistoryList;

const styles = StyleSheet.create({
  item: {
    padding: 12,
    borderBottomWidth: 1,
  },
  pattern: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  empty: {
    fontStyle: 'italic',
    fontSize: 16,
  },
});
