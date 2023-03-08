import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import ViewShot, { captureScreen } from "react-native-view-shot";

const { width } = Dimensions.get('screen')

export function Camera({ route }) {
  const navigation = useNavigation();

  const [photos, setPhotos] = useState([]);
  const [dimensionsOfTheCapturedArea, setDimensionsOfTheCapturedArea] = useState({ width: '', height: '' });

  const areaCaptureRef = useRef(null)

  function capturePicture() {
    try {
      captureScreen({
        format: 'jpg',
        quality: 0.9,
      }).then(uri => setPhotos(photo => [...photo, uri]));
    } catch (error) {
      console.log(error);
    }
  }

  function getLayoutAreaCapture(layout) {
    const { width, height } = layout
    setDimensionsOfTheCapturedArea({ width, height })
  }

  useEffect(() => {
    setPhotos([])
  }, [route.params])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}
        style={{ position: 'absolute', left: 25, top: 26, zIndex: 9999, paddingHorizontal: 21, paddingVertical: 12, backgroundColor: '#212121', borderRadius: 9999 }}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Voltar</Text>
      </TouchableOpacity>
      <RNCamera type={RNCamera.Constants.Type.back} style={styles.preview}>
        <ViewShot style={{
          position: 'absolute',
          top: -width / 2 + 100,
          left: -width / 2 + 15,
          right: -width / 2 + 15,
          bottom: -width / 2 + 200,
          backgroundColor: 'transparent',
          borderWidth: width / 2,
          borderRadius: width / 1.8,
          borderColor: '#000',
          opacity: 0.5,
        }}
          ref={areaCaptureRef}
        >
          <View
            onLayout={event => getLayoutAreaCapture(event.nativeEvent.layout)}
            style={{ width: '100%', height: '100%' }} />
        </ViewShot>

        <View style={{ position: 'absolute', width, alignItems: 'center' }}>
          <View style={{
            flexDirection: 'row',
            marginBottom: 15,
            alignItems: 'center',
            width,
          }}>
            <View style={{ width: width / 3 }} />
            <View style={{ width: width / 3, alignItems: 'center' }}>
              <TouchableOpacity style={{
                padding: 3,
                borderRadius: 9999,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 3,
                borderColor: '#fff',
              }}
                onPress={() => capturePicture()}
              >
                <View style={styles.captureButton} />
              </TouchableOpacity>
            </View>
            <View style={{ width: width / 3, alignItems: 'center' }}>
              {photos.length > 0 && (
                <TouchableOpacity
                  style={styles.countPhotos}
                  onPress={() => navigation.navigate('Gallery', { data: photos, dimensions: dimensionsOfTheCapturedArea })}>
                  <Text style={styles.textCount}>{photos.length}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{ marginBottom: 23, paddingHorizontal: 18, paddingVertical: 14, backgroundColor: '#212121', borderRadius: 9999 }}>
            {photos.length === 0 ? (
              <View>
                <Text style={{ fontSize: 12, color: '#e8f5e9' }}>
                  Fotografe as {' '}
                  <Text style={{ fontWeight: 'bold' }}>Notas Fiscais</Text>{' '}para confirmar sua Parada</Text>
              </View>
            ) : (
              <TouchableOpacity>
                <Text style={{ fontSize: 12, color: '#e8f5e9' }}>
                  Continue fotografando ou aperte aqui para{' '}
                  <Text style={{ fontWeight: 'bold' }}>Continuar</Text>
                </Text>
              </TouchableOpacity>
            )}

          </View>
        </View>
      </RNCamera >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  captureButton: {
    width: 72.5,
    height: 72.5,
    backgroundColor: '#FFF',
    borderRadius: 36.75,
  },
  areaCountPhotos: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  countPhotos: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: 56,
    backgroundColor: '#FFF',
    borderRadius: 28,
    marginRight: 12.5,
  },
  textCount: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
