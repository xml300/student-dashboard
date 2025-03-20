import React, { useState } from 'react';
import { Device } from '@/data/types/types';

const DeviceList = ({ devices, className }: {devices: Device[], className: string}) => {
  const [expandedDevice, setExpandedDevice] = useState<number|null>(null);
  
  const toggleExpand = (index: number) => {
    setExpandedDevice(expandedDevice === index ? null : index);
  };

  return (
    <div className={`w-full ${className}`}>
      {devices.length > 0 ? (
        <div className="space-y-4">
          {devices.map((device, index) => (
            <div 
              key={index} 
              className="bg-white shadow rounded-lg overflow-hidden border border-gray-200"
            >
              {/* Main info row - always visible */}
              <div className="p-4 flex flex-wrap items-center justify-between">
                <div className="flex items-center space-x-3 w-full sm:w-auto mb-2 sm:mb-0">
                  <div className="flex-shrink-0">
                    {device.type === 'phone' && (
                      <div className="bg-blue-100 p-2 rounded-full">
                        <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                    )}
                    {device.type === 'tablet' && (
                      <div className="bg-purple-100 p-2 rounded-full">
                        <svg className="h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm4 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    {device.type === 'laptop' && (
                      <div className="bg-green-100 p-2 rounded-full">
                        <svg className="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 3a1 1 0 011-1h12a1 1 0 110 2H5a1 1 0 01-1-1zm1 3a1 1 0 011-1h12a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{device.name}</h3>
                    <p className="text-xs text-gray-500">#{index + 1} · {device.location}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${device.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    <span className={`w-2 h-2 mr-1 rounded-full ${device.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    {device.status === 'online' ? 'Online' : 'Offline'}
                  </span>
                  
                  <button
                    onClick={() => toggleExpand(index)}
                    className="ml-2 p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                  >
                    <svg 
                      className={`h-5 w-5 text-gray-500 transition-transform ${expandedDevice === index ? 'transform rotate-180' : ''}`} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Expanded section */}
              {expandedDevice === index && (
                <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Last Seen</p>
                      <p className="text-sm text-gray-700">
                        {device.lastSeen.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric'}) + " " + 
                        device.lastSeen.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2 pt-2">
                      <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs font-medium rounded">
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
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <p className="text-gray-500">No devices found matching your criteria. Click &lsquo;Add Device&rsquo; to register one.</p>
        </div>
      )}
    </div>
  );
};

export default DeviceList;