"use client";
import React, { useState } from 'react';
import { Search, Wifi, Battery, ChevronRight, MoreVertical,  Plus, RefreshCw, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

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
          <span className="flex items-center text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-500">
            <CheckCircle size={12} className="mr-1" />
            Active
          </span>
        );
      case 'inactive':
        return (
          <span className="flex items-center text-xs px-2 py-1 rounded-full bg-foreground/10 text-foreground/80">
            <XCircle size={12} className="mr-1" />
            Inactive
          </span>
        );
      case 'maintenance':
        return (
          <span className="flex items-center text-xs px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-500">
            <AlertTriangle size={12} className="mr-1" />
            Maintenance
          </span>
        );
      default:
        return (
          <span className="flex items-center text-xs px-2 py-1 rounded-full bg-foreground/10 text-foreground/80">
            {status}
          </span>
        );
    }
  };

  // Helper function to render wifi strength indicator
  const renderWifiStrength = (strength: string) => {
    switch(strength) {
      case 'strong':
        return <Wifi size={16} className="text-green-500" />;
      case 'medium':
        return <Wifi size={16} className="text-yellow-500" />;
      case 'weak':
        return <Wifi size={16} className="text-red-500" />;
      default:
        return <Wifi size={16} className="text-foreground/60" />;
    }
  };

  // Helper function to render battery level
  const renderBatteryLevel = (level: number) => {
    let color = "text-foreground/60";
    if (level >= 70) color = "text-green-500";
    else if (level >= 30) color = "text-yellow-500";
    else color = "text-red-500";

    return (
      <div className="flex items-center">
        <Battery size={16} className={color} />
        <span className="ml-1">{level}%</span>
      </div>
    );
  };

  return (
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card-background border-b border-border-color p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="text-lg font-semibold text-foreground mb-2 sm:mb-0">Devices</div>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search devices..."
                className="pl-9 pr-4 py-2 border border-border-color rounded-md focus:outline-none focus:ring-1 focus:ring-primary-accent w-full bg-background text-foreground"
              />
              <Search className="absolute left-3 top-2.5 text-foreground/60" size={18} />
            </div>
          </div>
        </header>
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6 bg-background">
          {/* Actions bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-md ${activeTab === 'all' ? 'bg-primary-accent text-white' : 'bg-card-background border border-border-color text-foreground/80 hover:bg-foreground/5'}`}>
                All
              </button>
              <button 
                onClick={() => setActiveTab('active')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-md ${activeTab === 'active' ? 'bg-primary-accent text-white' : 'bg-card-background border border-border-color text-foreground/80 hover:bg-foreground/5'}`}>
                Active
              </button>
              <button 
                onClick={() => setActiveTab('inactive')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-md ${activeTab === 'inactive' ? 'bg-primary-accent text-white' : 'bg-card-background border border-border-color text-foreground/80 hover:bg-foreground/5'}`}>
                Inactive
              </button>
              <button 
                onClick={() => setActiveTab('maintenance')}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-md ${activeTab === 'maintenance' ? 'bg-primary-accent text-white' : 'bg-card-background border border-border-color text-foreground/80 hover:bg-foreground/5'}`}>
                Maintenance
              </button>
            </div>
            
            <div className="flex space-x-3 w-full sm:w-auto">
              <button className="flex items-center justify-center w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-card-background border border-border-color rounded-md text-foreground/80 hover:bg-foreground/5">
                <RefreshCw size={16} className="mr-2" />
                Refresh
              </button>
              <button className="flex items-center justify-center w-full sm:w-auto px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-primary-accent text-white rounded-md hover:bg-primary-accent/90">
                <Plus size={16} className="mr-2" />
                Add Device
              </button>
            </div>
          </div>
          
          {/* Devices cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDevices.map(device => (
              <div key={device.id} className="bg-card-background rounded-lg border border-border-color overflow-hidden hover:border-primary-accent transition-colors justify-between flex flex-col">
                <div className="p-5">
                  <div className="flex justify-between items-start">
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
                      <MoreVertical size={20} />
                    </button>
                  </div>
                  
                  
                  <div className="mt-3 flex items-center">
                    <div className="text-sm text-foreground/80 mr-4">Model:</div>
                    <div>{device.model}</div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-foreground/80">Battery</div>
                      <div className="font-medium flex items-center mt-1">
                        {renderBatteryLevel(device.battery)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-foreground/80">WiFi</div>
                      <div className="font-medium flex items-center mt-1">
                        {renderWifiStrength(device.wifiStrength)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-sm text-foreground/80">Last Sync</div>
                    <div className="font-medium">{device.lastSync}</div>
                  </div>
                  
                  {device.assignedCourses.length > 0 && (
                    <div className="mt-4">
                      <div className="text-sm text-foreground/80 mb-1">Assigned Courses</div>
                      <div className="flex flex-wrap gap-1">
                        {device.assignedCourses.map(course => (
                          <span key={course} className="px-2 py-1 bg-primary-accent/10 text-primary-accent rounded text-xs">
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-border-color p-4 bg-foreground/5 flex justify-between items-center">
                  <Link href={`/devices/${device.id}/status`} className="text-primary-accent hover:underline text-sm">
                    Check Status
                  </Link>
                  <Link href={`/devices/${device.id}`} className="flex items-center text-primary-accent hover:underline text-sm">
                    View Details
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            ))}
            
            {/* Add new device card */}
            <div className="border-2 border-dashed border-border-color rounded-lg flex flex-col items-center justify-center p-10 text-foreground/60 hover:border-primary-accent hover:text-primary-accent cursor-pointer">
              <Plus size={32} className="mb-2" />
              <div className="font-medium">Add New Device</div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default DevicesManagementPage;
