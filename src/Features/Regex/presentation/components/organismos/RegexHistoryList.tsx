import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RegexRepositoryImpl } from '../../../data/repositories_impl/RegexRepositoryImpl';
import { GetHistoryRegex } from '../../../domain/Usecases/GetHistoryRegex';
import { RegexApi } from '../../../data/datasource/RegexApi';
import { Regex } from '../../../domain/entities/Regex';
import { useAppTheme } from '../../../../../core/useAppTheme';

const RegexHistoryList = () => {
  const theme = useAppTheme();

  const regexApi = new RegexApi();
  const regexRepository = new RegexRepositoryImpl(regexApi);
  const getHistory = new GetHistoryRegex(regexRepository);

  const [history, setHistory] = useState<Regex[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getHistory.execute();
      setHistory(data);
    };
    fetchHistory();
  }, []);

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
        <View style={[styles.item, { borderColor: theme.border }]}>
          <Text style={[styles.pattern, { color: theme.text }]}>{item.pattern}</Text>
          <Text style={[styles.date, { color: theme.text + '88' }]}>
            {new Date(item.createdAt).toLocaleString()}
          </Text>
        </View>
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
