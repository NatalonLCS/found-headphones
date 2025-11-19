import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, FlatList, SafeAreaView, Platform } from 'react-native';

export default function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [discoveredDevices, setDiscoveredDevices] = useState([]);

  const handleScanPress = () => {
    if (isScanning) {
      // Lógica para detener el escaneo
      setIsScanning(false);
    } else {
      // Lógica para iniciar el escaneo
      setDiscoveredDevices([]); // Limpiamos la lista de dispositivos encontrados
      setIsScanning(true);

      // --- Simulación de descubrimiento de dispositivos ---
      setTimeout(() => {
        setDiscoveredDevices(prev => [...prev, { id: '1', name: 'AirPods de Ana', rssi: -45 }]);
      }, 2000);
      setTimeout(() => {
        setDiscoveredDevices(prev => [...prev, { id: '2', name: 'WH-1000XM4', rssi: -78 }]);
      }, 4000);
      setTimeout(() => {
        setDiscoveredDevices(prev => [...prev, { id: '3', name: 'Galaxy Buds Pro', rssi: -62 }]);
      }, 5500);
      // --- Fin de la simulación ---

      // Detenemos la búsqueda después de 15 segundos
      setTimeout(() => {
        setIsScanning(false);
        console.log("Búsqueda finalizada.");
      }, 15000);
    }
  };

  // Componente para mostrar las barras de señal
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

  const renderDeviceItem = ({ item }) => (
    <TouchableOpacity style={styles.deviceItem}>
      <View>
        <Text style={styles.deviceName}>{item.name || 'Dispositivo sin nombre'}</Text>
        <Text style={styles.deviceRssi}>Señal: {item.rssi || 'N/A'} dBm</Text>
      </View>
      <SignalStrengthIndicator rssi={item.rssi} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Found Headphones</Text>
      <Text style={styles.subtitle}>Encuentra tus auriculares perdidos</Text>

      {isScanning && <ActivityIndicator size="large" color="#007AFF" style={styles.spinner} />}

      {!isScanning && (
        <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
          <Text style={styles.scanButtonText}>Buscar Auriculares</Text>
        </TouchableOpacity>
      )}

      {discoveredDevices.length > 0 && (
        <FlatList
          // Ordenamos la lista para mostrar los dispositivos con señal más fuerte primero
          data={[...discoveredDevices].sort((a, b) => (b.rssi || -100) - (a.rssi || -100))}
          renderItem={renderDeviceItem}
          keyExtractor={item => item.id}
          style={styles.list}
        />
      )}

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  scanButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  spinner: {
    marginVertical: 20,
  },
  list: {
    marginTop: 20,
    width: '100%',
  },
  deviceItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  deviceRssi: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  signalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  signalBar: {
    width: 5,
    borderRadius: 2,
    marginLeft: 2,
  },
});
