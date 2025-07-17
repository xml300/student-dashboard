"use client";
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const validateDeviceAuthorization = async (imageData: string) => {
      try {
        const response = await fetch(imageData);
        const blob = await response.blob();
        const file = new File([blob], "env.png", {type: blob.type});
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);
        const res = await fetch('/api/device/validate', {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) throw new Error('Validation failed');
        const data = await res.json();
        if (data.valid) {
          return [true, data.uuid];
        } else {
          return [false, null];
        }
      } catch (error) {
        alert('Failed to validate device.');
      }
  };

export default function AttendancePage() {
    const router = useRouter();
    const params = useParams();
    const sessionId = params?.sessionId as string;
    const [deviceUUID, setDeviceUUID] = useState(null);
    const [currentRoom, setCurrentRoom] = useState<{id: string, name: string, status: string} | null>(null);
    const [currentSession, setCurrentSession] = useState<{id: string, name: string, time: string, status: string} | null>(null);
    const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Fetch attendance room and session info
    async function fetchAttendanceData() {
      if (!sessionId) return;
      try {
        const res = await fetch(`/api/attendance-summary?attendID=${sessionId}`);
        if (!res.ok) throw new Error('Failed to fetch attendance data');
        const data = await res.json();
        setCurrentRoom(data.room);
        setCurrentSession(data.session);
      } catch (err) {
        // fallback or error UI could be added here
      }
    }
    fetchAttendanceData();
    intervalRef.current = window.setInterval(fetchAttendanceData, 5000);


    // Device authorization
    fetch('/api/device/authorize')
      .then(res => res.json())
      .then(json => {
        return validateDeviceAuthorization(json.image);
      }).then( arr => {
        if(arr){
        const [isValid, deviceUUID] = arr;
        if(!isValid){
          router.push("/dashboard");
        }
        setDeviceUUID(deviceUUID);
      }
      });
    
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [sessionId, router]);
  
  const handleTakeAttendance = async () => {
    let device: BluetoothDevice | undefined;
    try {
      if (!navigator.bluetooth) {
        alert("Bluetooth not supported on this browser.");
        return;
      }
      const isBluetoothAvailable = await navigator.bluetooth.getAvailability();
      if (!isBluetoothAvailable) {
        alert("Bluetooth is not available or not enabled.");
        return;
      }

      const uuids = await fetch("/api/attendance-rooms", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({sessionId: sessionId})
      }).then(res => res.json());

      const SERVICE_UUIDs = uuids.rooms;
      const CHARACTERISTIC_UUID = "bfc0c92f-317d-4ba9-976b-cc11ce77b4ca";

      console.log(SERVICE_UUIDs)
      device = await navigator.bluetooth.requestDevice({ filters: [{ services: SERVICE_UUIDs }] });
      const server = await device.gatt?.connect();
      if (!server) throw new Error("Couldn't connect to device");

      let service;
      for (const uuid of SERVICE_UUIDs) {
          try {
              service = await server.getPrimaryService(uuid);
              if (service) break;
          } catch (e) {
              console.error(`Service ${uuid} not found, trying next.`);
          }
      }

      if (!service) throw new Error("No matching service found on device.");
      
      const characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);        
      const value = await characteristic.readValue();
      
      const decoder = new TextDecoder("utf-8");
      const uuidValue = decoder.decode(value);

      const res = await fetch('/api/attendance/mark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uuid: uuidValue, sessionId: currentSession?.id }),
      });
      if (!res.ok) throw new Error('Attendance marking failed');
      const data = await res.json();
      if (data.success) {
        alert('Attendance marked successfully!');
      } else {
        alert('Attendance marking failed.');
      }

    } catch (error) {
      console.log(error)
      alert(`An error occurred: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
        if (device?.gatt?.connected) {
            device.gatt.disconnect();
        }
    }
  };


  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-8">
        <CheckCircleIcon className="h-10 w-10 text-blue-500" />
        <h1 className="text-3xl font-extrabold text-neutral-100 tracking-tight">Attendance Room</h1>
      </div>

      {/* Room Info Card */}
      <div className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl shadow-lg p-6 mb-6">
        {currentRoom ? (
          <>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-neutral-100">{currentRoom.name}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${currentRoom.status === 'open' ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>{currentRoom.status.toUpperCase()}</span>
            </div>
            <p className="text-neutral-400 text-sm">Room ID: <span className="font-mono text-neutral-300">{currentRoom.id}</span></p>
          </>
        ) : (
          <p className="text-neutral-400">Loading room info...</p>
        )}
      </div>

      {/* Session Info Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-8">
        {currentSession ? (
          <>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <h3 className="text-lg font-semibold text-neutral-200">Session Info</h3>
            </div>
            <p className="text-neutral-300 font-medium mb-1">{currentSession.name}</p>
            <p className="text-neutral-400 mb-1">{new Date(currentSession.time).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            <p className="text-neutral-400">Session Status: <span className={currentSession.status === 'ongoing' ? 'text-blue-400 font-bold' : 'text-yellow-400'}>{currentSession.status.charAt(0).toUpperCase() + currentSession.status.slice(1)}</span></p>
          </>
        ) : (
          <p className="text-neutral-400">Loading session info...</p>
        )}
      </div>

      {/* Take Attendance Button */}
      <button
        onClick={handleTakeAttendance}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        disabled={!currentRoom || !currentSession}
      >
        <CheckCircleIcon className="h-6 w-6 text-white animate-bounce" />
        Take Attendance
      </button>
    </div>
  );
}
