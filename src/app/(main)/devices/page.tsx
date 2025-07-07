"use client";
import React, { useState } from 'react';
import {
  MagnifyingGlassIcon,
  WifiIcon,
  Battery50Icon, // Default battery icon, will adjust based on level
  ChevronRightIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Card from '@/components/Card';

const DevicesManagementPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Sample devices data
  const devices = [
    {
      id: 'DEV001',
      name: 'Main Hall Scanner',
      type: 'Tablet',
      model: 'iPad Air (2022)',
      roomId: 'R101',
      status: 'active',
      battery: 87,
      lastSync: '19 Mar 2025, 08:32 AM',
      lastUsed: '19 Mar 2025, 08:32 AM',
      wifiStrength: 'strong',
      assignedCourses: ['CSC301', 'ENG205']
    },
    {
      id: 'DEV002',
      name: 'Lab A Scanner',
      type: 'Tablet',
      model: 'Samsung Galaxy Tab S7',
      roomId: 'R102',
      status: 'active',
      battery: 64,
      lastSync: '19 Mar 2025, 08:45 AM',
      lastUsed: '18 Mar 2025, 03:15 PM',
      wifiStrength: 'medium',
      assignedCourses: ['CSC301', 'MATH401']
    },
    {
      id: 'DEV003',
      name: 'Science Hall Scanner',
      type: 'Fixed Terminal',
      model: 'AttendancePoint Pro',
      roomId: 'R103',
      status: 'active',
      battery: 100,
      lastSync: '19 Mar 2025, 09:00 AM',
      lastUsed: '18 Mar 2025, 05:30 PM',
      wifiStrength: 'strong',
      assignedCourses: ['PHY302', 'BIO101']
    },
    {
      id: 'DEV004',
      name: 'Portable Scanner 1',
      type: 'Mobile',
      model: 'HandyScan 200',
      roomId: null,
      status: 'inactive',
      battery: 23,
      lastSync: '17 Mar 2025, 11:22 AM',
      lastUsed: '17 Mar 2025, 11:20 AM',
      wifiStrength: 'weak',
      assignedCourses: []
    },
    {
      id: 'DEV005',
      name: 'Engineering Lab Scanner',
      type: 'Tablet',
      model: 'iPad Pro (2023)',
      roomId: 'R105',
      status: 'maintenance',
      battery: 42,
      lastSync: '15 Mar 2025, 02:17 PM',
      lastUsed: '15 Mar 2025, 02:15 PM',
      wifiStrength: 'medium',
      assignedCourses: ['ENG205']
    }
  ];

  const filteredDevices = devices.filter(device => 
    activeTab === 'all' || device.status === activeTab
  );

  // Helper function to render status badge
  const renderStatusBadge = (status: string) => {
    switch(status) {
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

  // Helper function to render wifi strength indicator
  const renderWifiStrength = (strength: string) => {
    let color = "text-foreground/60";
    if (strength === 'strong') color = "text-green-500";
    else if (strength === 'medium') color = "text-yellow-500";
    else color = "text-red-500";

    return <WifiIcon className={`h-5 w-5 ${color}`} />;
  };

  // Helper function to render battery level
  const renderBatteryLevel = (level: number) => {
    let color = "text-foreground/60";
    let Icon = Battery50Icon; // Default to 50% icon

    if (level >= 90) Icon = Battery50Icon; // Placeholder, ideally use Battery100Icon
    else if (level >= 70) Icon = Battery50Icon; // Placeholder, ideally use Battery75Icon
    else if (level >= 30) Icon = Battery50Icon; // Placeholder, ideally use Battery25Icon
    else Icon = Battery50Icon; // Placeholder, ideally use Battery0Icon

    if (level >= 70) color = "text-green-500";
    else if (level >= 30) color = "text-yellow-500";
    else color = "text-red-500";

    return (
      <div className="flex items-center">
        <Icon className={`h-5 w-5 ${color}`} />
        <span className="ml-1">{level}%</span>
      </div>
    );
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
              <button className="flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium bg-card-background border border-border-color rounded-lg text-foreground/80 hover:bg-foreground/5">
                <ArrowPathIcon className="h-5 w-5 mr-2" />
                Refresh
              </button>
              <button className="flex items-center justify-center w-full sm:w-auto px-4 py-2 text-sm font-medium bg-primary-accent text-white rounded-lg hover:bg-primary-accent/90">
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
                      <div className="text-sm text-foreground/80 mt-1">{device.id} • {device.type}</div>
                    </div>
                    <button className="text-foreground/60 hover:text-foreground">
                      <EllipsisVerticalIcon className="h-6 w-6" />
                    </button>
                  </div>
                  
                  
                  <div className="mt-3 flex items-center text-sm">
                    <div className="text-foreground/80 mr-4">Model:</div>
                    <div className="font-medium text-foreground">{device.model}</div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-foreground/80">Battery</div>
                      <div className="font-medium flex items-center mt-1 text-foreground">
                        {renderBatteryLevel(device.battery)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-foreground/80">WiFi</div>
                      <div className="font-medium flex items-center mt-1 text-foreground">
                        {renderWifiStrength(device.wifiStrength)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-sm">
                    <div className="text-foreground/80">Last Sync</div>
                    <div className="font-medium text-foreground">{device.lastSync}</div>
                  </div>
                  
                  {device.assignedCourses.length > 0 && (
                    <div className="mt-4">
                      <div className="text-sm text-foreground/80 mb-1">Assigned Courses</div>
                      <div className="flex flex-wrap gap-1">
                        {device.assignedCourses.map(course => (
                          <span key={course} className="px-2 py-1 bg-primary-accent/10 text-primary-accent rounded-full text-xs font-medium">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-border-color p-4 bg-background flex justify-between items-center">
                  <Link href={`/devices/${device.id}/status`} className="text-primary-accent hover:underline text-sm font-medium">
                    Check Status
                  </Link>
                  <Link href={`/devices/${device.id}`} className="flex items-center text-primary-accent hover:underline text-sm font-medium">
                    View Details
                    <ChevronRightIcon className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </Card>
            ))}
            
            <Card className="border-2 border-dashed border-border-color flex flex-col items-center justify-center p-10 text-foreground/60 hover:border-primary-accent hover:text-primary-accent cursor-pointer transition-colors">
              <PlusIcon className="h-8 w-8 mb-2" />
              <div className="font-medium">Add New Device</div>
            </Card>
          </div>
        </div>
      </div>
  );
};

export default DevicesManagementPage;
