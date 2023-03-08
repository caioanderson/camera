import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen')

export function Gallery({ route, navigation }) {
  const { data, dimensions } = route.params;
  const numberOfPhotosTaken = data.length

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Camera', { dataPhotos: [] })}
        style={{ position: 'absolute', left: 25, top: 26, zIndex: 9999, paddingHorizontal: 21, paddingVertical: 12, backgroundColor: '#fff', borderRadius: 9999 }}>
        <Text style={{ color: '#212121', fontWeight: 'bold' }}>Voltar</Text>
      </TouchableOpacity>
      <View style={styles.wrapper}>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={item => String(item)}
            contentContainerStyle={{
              marginLeft: 4,
              marginRight: 4,
              alignItems: 'center',
            }}
            renderItem={({ item, index }) => (
              <View style={{ position: 'relative' }}>
                <Image source={{ uri: item }} style={{ height: dimensions.height, width: dimensions.width, borderRadius: 15, marginRight: 10 }} />
                <View style={{ position: 'absolute', bottom: 14, right: 24, width: 44, height: 44, backgroundColor: '#212121', borderRadius: 22, alignItems: 'center', justifyContent: 'center' }}>
                  <Text>{index + 1}</Text>
                </View>
              </View>
            )}
          />
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 12, backgroundColor: 'red', marginBottom: 24, }}>
          <TouchableOpacity style={{ backgroundColor: '#9575cd', width: '100%', padding: 8 }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Enviar Nota Fiscal</Text>
          </TouchableOpacity>
          <Text style={{ color: '#e8f5e9', }}>
            <Text style={{ fontWeight: 'bold' }}>{numberOfPhotosTaken}x Notas Fiscais</Text>{' '}fotografadas com sucesso!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
    position: 'relative',
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 20,
    borderRadius: 8,
  },
  text: {
    color: '#000',
  },
});
