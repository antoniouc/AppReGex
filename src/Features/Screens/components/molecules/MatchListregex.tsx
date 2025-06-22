// src/shared/molecules/MatchList.tsx
import React from 'react';
import { StyleSheet, View } from 'react-native';
import AppText from '../atoms/MyText';

type Props = {
  matches: string[];
};

const MatchList = ({ matches }: Props) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Coincidencias:</AppText>
      {matches.length > 0 ? (
        matches.map((match, i) => (
          <AppText key={i} style={styles.match}>
            {match}
          </AppText>
        ))
      ) : (
        <AppText style={styles.noMatch}>Sin coincidencias</AppText>
      )}
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
  match: {
    backgroundColor: '#c2f0c2',
    padding: 5,
    borderRadius: 5,
    marginTop: 4,
  },
  noMatch: {
    fontStyle: 'italic',
    color: 'gray',
    marginTop: 4,
  },
});
