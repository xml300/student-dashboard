"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, DevicePhoneMobileIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type DeviceInfo = {
  name: string;
  id: string;
  lastActive: string;
};

export default function DeviceManagePage() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [authorizing, setAuthorizing] = useState(false);
  const [authImage, setAuthImage] = useState<string | null>(null);
  const [etag, setEtag] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchDeviceStatus = async () => {
      try {
        const res = await fetch('/api/device/authorize');
        if (res.ok) {
          const data = await res.json();
          setDeviceInfo({
            name: 'Authorized Device',
            id: data.uuid,
            lastActive: new Date().toLocaleString(),
          });
        }
      } catch (error) {
        console.error('Failed to fetch device status:', error);
      }
    };

    fetchDeviceStatus();
  }, []);

  // Step 1: Request backend to generate UUID and image
  const handleAuthorizeDevice = async () => {
    setAuthorizing(true);
    try {
      const res = await fetch('/api/device/authorize');
      if (res.status === 304) {
        alert('Device already authorized.');
        const data = await res.json();
        setDeviceInfo({
          name: 'Authorized Device',
          id: data.uuid,
          lastActive: new Date().toLocaleString(),
        });
      } else if (res.ok) {
        const data = await res.json();
        setAuthImage(data.image); // image should be a base64 string or URL
        setEtag(res.headers.get('ETag'));
        setDeviceInfo({
          name: 'Authorized Device',
          id: data.uuid,
          lastActive: new Date().toLocaleString(),
        });
        alert('Device authorized successfully!');
      } else {
        throw new Error('Failed to authorize device');
      }
    } catch (error) {
      alert('Device authorization failed.');
    }
    setAuthorizing(false);
  };

  // Step 2: Upload image to backend for validation
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('image', file);
      // Replace with your backend endpoint
      const res = await fetch('/api/device/validate', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Validation failed');
      const data = await res.json();
      if (data.valid) {
        alert('Device authorization validated!');
      } else {
        alert('Device authorization invalid.');
      }
    } catch (error) {
      alert('Failed to validate device.');
    }
    setUploading(false);
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <Link href="/dashboard" className="flex items-center text-neutral-400 hover:text-neutral-100 mb-6 transition-colors">
        <ArrowLeftIcon className="h-5 w-5 mr-2" /> Back to Dashboard
      </Link>
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl shadow-lg p-8">
        {deviceInfo ? (
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-neutral-800 rounded-full flex items-center justify-center">
                <DevicePhoneMobileIcon className="h-8 w-8 text-neutral-400" />
              </div>
              <div>
                <div className="text-lg font-bold text-neutral-100">{deviceInfo.name}</div>
                <div className="text-sm text-neutral-400">Last active: {deviceInfo.lastActive}</div>
                <div className="text-xs text-neutral-500 mt-1">Device ID: {deviceInfo.id}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-neutral-800 rounded-full flex items-center justify-center">
              <DevicePhoneMobileIcon className="h-8 w-8 text-neutral-400" />
            </div>
            <div className="text-lg font-bold text-neutral-100">No device authorized</div>
            <button
              onClick={handleAuthorizeDevice}
              disabled={authorizing}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <CheckBadgeIcon className="h-5 w-5" />
              {authorizing ? 'Authorizing...' : 'Authorize Device'}
            </button>
            <p className="text-xs text-neutral-500 text-center">Authorizing this device will allow it to be used for attendance verification.</p>
          </div>
        )}
      </div>
    </div>
  );
}
