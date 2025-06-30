// src/shared/molecules/MatchList.tsx
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useAppTheme } from '../../../../../core/useAppTheme';

type Props = {
  matches: string[];
  originalText: string;
};

const MatchList = ({ matches, originalText }: Props) => {
  const theme = useAppTheme(); // 🔥 USAR TEMA

  if (matches.length === 0 || originalText.trim() === "") {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>Coincidencias:</Text>
        <Text style={[styles.noMatch, { color: theme.text + '88' }]}>Sin coincidencias</Text>
      </View>
    );
  }

  const regex = new RegExp(matches.join("|"), "g");
  const parts = originalText.split(regex);
  const highlights = originalText.match(regex) || [];

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>Coincidencias:</Text>
      <Text style={[styles.textContainer, { color: theme.text }]}>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <Text style={{ color: theme.text }}>{part}</Text>
            {index < highlights.length && (
              <Text style={[styles.highlight, { backgroundColor: theme.background, color: theme.textResalt }]}>
                {highlights[index]}
              </Text>
            )}
          </React.Fragment>
        ))}
      </Text>
    </View>
  );
};

export default MatchList;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
  },
  highlight: {
    fontWeight: 'bold',
    paddingHorizontal: 2,
    borderRadius: 4,
  },
  noMatch: {
    fontStyle: 'italic',
  },
});
