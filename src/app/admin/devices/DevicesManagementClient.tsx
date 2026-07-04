"use client";
import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import AddDeviceModal from '@/components/admin/modals/AddDeviceModal';
import { Device } from '@/types/data';
import { api } from '@/lib/api';

interface DevicesManagementClientProps {
  initialDevices: Device[];
}

const DevicesManagementClient: React.FC<DevicesManagementClientProps> = ({ initialDevices }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [devices] = useState<Device[]>(initialDevices);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredDevices = devices.filter((device: Device) =>
    activeTab === 'all' || device.status === activeTab
  );

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="flex items-center text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-700 font-medium">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Active
          </span>
        );
      case 'inactive':
        return (
          <span className="flex items-center text-xs px-2 py-1 rounded-full bg-foreground/10 text-foreground/80 font-medium">
            <XCircleIcon className="h-3 w-3 mr-1" />
            Inactive
          </span>
        );
      case 'maintenance':
        return (
          <span className="flex items-center text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-700 font-medium">
            <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
            Maintenance
          </span>
        );
      default:
        return (
          <span className="flex items-center text-xs px-2 py-1 rounded-full bg-foreground/10 text-foreground/80 font-medium">
            {status}
          </span>
        );
    }
  };

  const handleAddDevice = async (device: { deviceName: string; deviceType: string; deviceUUID: string; status: string }) => {
    await api.post('/admin/devices', device);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4 sm:mb-0">Devices</h1>
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search devices..."
              className="pl-10 pr-4 py-2 border border-border-color rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent w-full bg-card-background text-foreground"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60 h-5 w-5" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'all' ? 'bg-primary-accent text-white' : 'bg-card-background text-foreground/80 hover:bg-foreground/5'}`}>
              All
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'active' ? 'bg-primary-accent text-white' : 'bg-card-background text-foreground/80 hover:bg-foreground/5'}`}>
              Active
            </button>
            <button
              onClick={() => setActiveTab('inactive')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'inactive' ? 'bg-primary-accent text-white' : 'bg-card-background text-foreground/80 hover:bg-foreground/5'}`}>
              Inactive
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'maintenance' ? 'bg-primary-accent text-white' : 'bg-card-background text-foreground/80 hover:bg-foreground/5'}`}>
              Maintenance
            </button>
          </div>

          <div className="flex space-x-3 w-full sm:w-auto">
            <button className="flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium bg-primary-accent text-white rounded-lg hover:bg-primary-accent/90" onClick={() => setModalOpen(true)}>
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Device
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredDevices.map(device => (
            <Card key={device.id} className="flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div className="p-2">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center">
                      <h2 className="font-bold text-lg text-foreground">{device.name}</h2>
                      <div className="ml-2">
                        {renderStatusBadge(device.status)}
                      </div>
                    </div>
                    <div className="text-sm text-foreground/80 mt-1">DEV_ID_{device.id} • {device.type}</div>
                  </div>
                  <button className="text-foreground/60 hover:text-foreground">
                    <EllipsisVerticalIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-3 flex items-center text-sm">
                  <div className="text-foreground/80 mr-4">Model:</div>
                  <div className="font-medium text-foreground">{device.model}</div>
                </div>

                <div className="mt-4 text-sm">
                  <div className="text-foreground/80">Owner</div>
                  <div className="font-medium text-foreground">{device.owner}</div>
                </div>
              </div>

              <div className="border-t border-border-color p-4 bg-background flex justify-between items-center">
                <div></div>
                <Link href={`/admin/devices/${device.id}`} className="flex items-center text-primary-accent hover:underline text-sm font-medium">
                  View Details
                  <ChevronRightIcon className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </Card>
          ))}

          <Card className="border-2 border-dashed border-border-color flex flex-col items-center justify-center p-10 text-foreground/60 hover:border-primary-accent hover:text-primary-accent cursor-pointer transition-colors" onClick={() => setModalOpen(true)}>
            <PlusIcon className="h-8 w-8 mb-2" />
            <div className="font-medium">Add New Device</div>
          </Card>
        </div>
      </div>

      <AddDeviceModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAddDevice} />
    </div>
  );
};

export default DevicesManagementClient;
