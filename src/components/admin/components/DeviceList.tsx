import React, { useState } from 'react';
import { Device } from '@/data/types/types';
import { PhoneIcon, DeviceTabletIcon, ListBulletIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const DeviceList = ({ devices, className }: {devices: Device[], className: string}) => {
  const [expandedDevice, setExpandedDevice] = useState<number|null>(null);
  
  const toggleExpand = (index: number) => {
    setExpandedDevice(expandedDevice === index ? null : index);
  };

  return (
    <div className={`w-full ${className} bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden`}>
      {devices.length > 0 ? (
        <div className="space-y-4">
          {devices.map((device, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-border-color dark:border-gray-700 rounded-lg p-4"
            >
              
              <div className="p-4 flex flex-wrap items-center justify-between">
                <div className="flex items-center space-x-3 w-full sm:w-auto mb-2 sm:mb-0">
                  <div className="flex-shrink-0">
                    {device.type === 'phone' && (
                      <div className="bg-blue-100 p-2 rounded-full">
                        <PhoneIcon className="h-5 w-5 text-blue-600" />
                      </div>
                    )}
                    {device.type === 'tablet' && (
                      <div className="bg-purple-100 p-2 rounded-full">
                        <DeviceTabletIcon className="h-5 w-5 text-purple-600" />
                      </div>
                    )}
                    {device.type === 'laptop' && (
                      <div className="bg-green-100 p-2 rounded-full">
                        <ListBulletIcon className="h-5 w-5 text-green-600" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">{device.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">#{index + 1} · {device.location}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${device.status === 'online' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'}`}>
                    <span className={`w-2 h-2 mr-1 rounded-full ${device.status === 'online' ? 'bg-green-500 dark:bg-green-300' : 'bg-red-500 dark:bg-red-300'}`}></span>
                    {device.status === 'online' ? 'Online' : 'Offline'}
                  </span>
                  
                  <button
                    onClick={() => toggleExpand(index)}
                    className="ml-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                  >
                    <ChevronDownIcon
                      className={`h-5 w-5 text-gray-500 dark:text-gray-300 transition-transform ${expandedDevice === index ? 'transform rotate-180' : ''}`}
                    />
                  </button>
                </div>
              </div>
              
              
              {expandedDevice === index && (
                <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3">
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Last Seen</p>
                      <p className="text-sm text-gray-700 dark:text-gray-200">
                        {device.lastSeen.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric'}) + " " + 
                        device.lastSeen.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-xs font-medium rounded">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-medium rounded">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white dark:bg-gray-900 rounded-lg shadow text-gray-900 dark:text-gray-100">
          <p className="text-gray-500">No devices found matching your criteria. Click &lsquo;Add Device&rsquo; to register one.</p>
        </div>
      )}
    </div>
  );
};

export default DeviceList;
