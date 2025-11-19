import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const DeviceDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { device } = route.params; // Obtenemos el objeto 'device' de los parámetros de la ruta

  // Componente para mostrar las barras de señal (copiado de App.js para consistencia)
  const SignalStrengthIndicator = ({ rssi }) => {
    const getBarColor = (level) => {
      if (rssi >= -65) return level <= 4 ? '#34C759' : '#e0e0e0'; // Verde (fuerte)
      if (rssi >= -80) return level <= 3 ? '#FF9500' : '#e0e0e0'; // Naranja (medio)
      return level <= 2 ? '#FF3B30' : '#e0e0e0'; // Rojo (débil)
    };

    return (
      <View style={styles.signalContainer}>
        <View style={[styles.signalBar, { height: 6, backgroundColor: getBarColor(1) }]} />
        <View style={[styles.signalBar, { height: 10, backgroundColor: getBarColor(2) }]} />
        <View style={[styles.signalBar, { height: 14, backgroundColor: getBarColor(3) }]} />
        <View style={[styles.signalBar, { height: 18, backgroundColor: getBarColor(4) }]} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Detalles del Dispositivo</Text>
      <View style={styles.detailCard}>
        <Text style={styles.deviceName}>{device.name || 'Dispositivo sin nombre'}</Text>
        <Text style={styles.detailText}>ID: {device.id}</Text>
        <Text style={styles.detailText}>Señal (RSSI): {device.rssi} dBm</Text>
        <View style={styles.signalWrapper}>
          <Text style={styles.detailText}>Intensidad de Señal:</Text>
          <SignalStrengthIndicator rssi={device.rssi} />
        </View>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    alignItems: 'center',
    paddingTop: 60,
    padding: 20,
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 30 },
  detailCard: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2,
  },
  deviceName: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  detailText: { fontSize: 18, color: '#555', marginBottom: 8 },
  signalWrapper: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  backButton: { backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
  backButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  signalContainer: { flexDirection: 'row', alignItems: 'flex-end', marginLeft: 10 },
  signalBar: { width: 5, borderRadius: 2, marginLeft: 2 },
});

export default DeviceDetailScreen;