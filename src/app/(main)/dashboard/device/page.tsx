import { ArrowLeftIcon, DevicePhoneMobileIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function DeviceManagePage() {
  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <Link href="/dashboard" className="flex items-center text-neutral-400 hover:text-neutral-100 mb-6 transition-colors">
        <ArrowLeftIcon className="h-5 w-5 mr-2" /> Back to Dashboard
      </Link>
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-neutral-800 rounded-full flex items-center justify-center">
            <DevicePhoneMobileIcon className="h-8 w-8 text-neutral-400" />
          </div>
          <div>
            <div className="text-lg font-bold text-neutral-100">John’s MacBook Pro</div>
            <div className="text-sm text-neutral-400">Last active: Today, 10:15 AM</div>
            <div className="text-xs text-neutral-500 mt-1">Device ID: 8A2F-1B3C-4D5E</div>
          </div>
        </div>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 transition-colors duration-200">
            <CheckBadgeIcon className="h-5 w-5" /> Authorize Device
          </button>
          <p className="text-xs text-neutral-500 text-center">Authorizing this device will allow it to be used for attendance verification.</p>
        </div>
      </div>
    </div>
  );
}
