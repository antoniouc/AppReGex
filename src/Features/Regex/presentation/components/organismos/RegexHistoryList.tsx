import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
// import { getRegexHistory } from '../../infrastructure/database/RegexHistoryRepository'; // o donde tengas tu función
import { RegexRepositoryImpl } from '../../../data/repositories_impl/RegexRepositoryImpl';
import { GetHistoryRegex } from '../../../domain/Usecases/GetHistoryRegex';
import { RegexApi } from '../../../data/datasource/RegexApi';
import { Regex } from '../../../domain/entities/Regex';
type HistoryItem = {
  id: number;
  pattern: string;
  createdAt: string;
};

const RegexHistoryList = () => {
  
    const regexApi = new RegexApi();
    const regexRepository = new RegexRepositoryImpl(regexApi);
    const gethistory = new GetHistoryRegex(regexRepository);
  const [history, setHistory] = useState<Regex[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
       const data = await gethistory.execute();
       setHistory(data);
     };
     fetchHistory();
   }, []);

  if (history.length === 0) {
    return <Text style={styles.empty}>No hay historial aún.</Text>;
  }

  return (
    <FlatList
      data={history}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.pattern}>{item.pattern}</Text>
          <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
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
    borderColor: '#ccc',
  },
  pattern: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  date: {
    color: 'gray',
    fontSize: 12,
  },
  empty: {
    marginTop: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'gray',
  },
});
