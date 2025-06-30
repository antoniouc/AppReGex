// src/Features/Regex/ViewModel/RegexHistoryViewModel.ts
import { useEffect, useState } from 'react';
import { Regex } from '../../domain/entities/Regex';
import { RegexRepositoryImpl } from '../../data/repositories_impl/RegexRepositoryImpl';
import { GetHistoryRegex } from '../../domain/Usecases/GetHistoryRegex';
import { RegexApi } from '../../data/datasource/RegexApi';

export const useRegexHistoryViewModel = () => {
  const [history, setHistory] = useState<Regex[]>([]);
  const [loading, setLoading] = useState(true);

  const regexApi = new RegexApi();
  const regexRepository = new RegexRepositoryImpl(regexApi);
  const getHistory = new GetHistoryRegex(regexRepository);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getHistory.execute();
      setHistory(data);
      setLoading(false);
    };
    fetchHistory();
  }, []);

  return { history, loading };
};
