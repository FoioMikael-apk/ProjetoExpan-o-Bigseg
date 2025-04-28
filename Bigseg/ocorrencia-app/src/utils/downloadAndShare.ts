// utils/downloadAndShare.ts
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Linking from 'expo-linking';
import { Platform, Alert } from 'react-native';

export async function downloadAndShareFile(url: string, filename: string) {
  try {
    const fileUri = FileSystem.documentDirectory + filename;

    const download = await FileSystem.downloadAsync(url, fileUri);

    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(download.uri);
      } else {
        Alert.alert('Erro', 'Compartilhamento não disponível neste dispositivo.');
      }
    } else {
      // Para web
      Linking.openURL(url);
    }
  } catch (error) {
    console.error('Erro ao baixar ou compartilhar arquivo:', error);
    Alert.alert('Erro', 'Não foi possível compartilhar o arquivo.');
  }
}
