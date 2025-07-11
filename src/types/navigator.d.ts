interface Bluetooth {
  requestDevice(options?: RequestDeviceOptions): Promise<BluetoothDevice>;
  getAvailability(): Promise<boolean>;
  // Add other Web Bluetooth API methods/properties as needed
}

interface Navigator {
  bluetooth: Bluetooth;
}
