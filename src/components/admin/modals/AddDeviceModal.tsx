import React, { useState } from "react";

interface AddDeviceModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (device: { deviceName: string; deviceType: string; deviceUUID: string; status: string }) => Promise<void>;
}

const AddDeviceModal: React.FC<AddDeviceModalProps> = ({ open, onClose, onAdd }) => {
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("Tablet");
  const [deviceUUID, setDeviceUUID] = useState("");
  const [status, setStatus] = useState("active");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deviceName || !deviceUUID) {
      setError("Device name and UUID are required.");
      return;
    }
    setError("");
    await onAdd({ deviceName, deviceType, deviceUUID, status });
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 min-w-[340px] max-w-xs mx-auto relative border border-border-color dark:border-zinc-700">
        <button
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-2xl text-foreground dark:text-zinc-300"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-primary-accent dark:text-blue-400 mb-6">Add New Device</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Device Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-border-color dark:border-zinc-700 bg-white dark:bg-zinc-900 text-foreground dark:text-white"
              value={deviceName}
              onChange={e => setDeviceName(e.target.value)}
              required
              placeholder="e.g. TAB-247"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Device Type</label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-border-color dark:border-zinc-700 bg-white dark:bg-zinc-900 text-foreground dark:text-white"
              value={deviceType}
              onChange={e => setDeviceType(e.target.value)}
            >
              <option value="Tablet">Tablet</option>
              <option value="Laptop">Laptop</option>
              <option value="Phone">Phone</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Device UUID</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border border-border-color dark:border-zinc-700 bg-white dark:bg-zinc-900 text-foreground dark:text-white"
              value={deviceUUID}
              onChange={e => setDeviceUUID(e.target.value)}
              required
              placeholder="Unique device identifier"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-1">Status</label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-border-color dark:border-zinc-700 bg-white dark:bg-zinc-900 text-foreground dark:text-white"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-zinc-800 text-foreground dark:text-white font-semibold hover:bg-gray-300 dark:hover:bg-zinc-700 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary-accent text-white font-semibold hover:bg-primary-accent/90 transition"
            >
              Add Device
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeviceModal;
