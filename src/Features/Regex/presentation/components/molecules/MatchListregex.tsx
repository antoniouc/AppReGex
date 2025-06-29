// src/shared/molecules/MatchList.tsx
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

type Props = {
  matches: string[];
  originalText: string;
};

const MatchList = ({ matches, originalText }: Props) => {
  if (matches.length === 0 || originalText.trim() === "") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Coincidencias:</Text>
        <Text style={styles.noMatch}>Sin coincidencias</Text>
      </View>
    );
  }

  const regex = new RegExp(matches.join("|"), "g");
  const parts = originalText.split(regex);

  const highlights = originalText.match(regex) || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coincidencias:</Text>
      <Text style={styles.textContainer}>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <Text style={styles.normal}>{part}</Text>
            {index < highlights.length && (
              <Text style={styles.highlight}>{highlights[index]}</Text>
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
  normal: {
    color: '#000',
  },
  highlight: {
    backgroundColor: '#c2f0c2',
    color: '#000',
    fontWeight: 'bold',
  },
  noMatch: {
    fontStyle: 'italic',
    color: 'gray',
  },
});
