import PageHeading from "@/components/PageHeading";
import ActionButton from "@/components/ActionButton";
import InputField from "@/components/InputField";
import Table from "@/components/Table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import devices from "@/data/jsons/devices.json";

export default function DevicesPage() {
    return (
        <section>
        <PageHeading title="Devices" description="Manage and monitor connected devices" />
        <div className="mb-4">
            <ActionButton
                // onClick={() => console.log()}
                // onClick={openModal}
                icon={<FontAwesomeIcon icon={faPlusCircle} className="w-5 h-5" />}
                label="Add Device"
                variant="primary"
            />
        </div>
        <Table
            headers={['No.','Name', 'Location', 'Status']}
            rows={devices.map(d => ({ ...d, status: d.status === 'online' ? 'Online' : 'Offline' }))}
            // onEdit={openModal}
            // onDelete={handleDeleteDevice}
            emptyMessage="No devices found. Click 'Add Device' to register one."
        />

        {/* Modal */}
        {/* {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4">
                        {editingDevice ? 'Edit Device' : 'Add Device'}
                    </h2>
                    <InputField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter device name"
                        error={formErrors.name}
                    />
                    <InputField
                        label="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter device location"
                        error={formErrors.location}
                    />
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value as 'online' | 'offline')}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:outline-none focus:ring-2"
                        >
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-4">
                        <ActionButton
                            onClick={closeModal}
                            icon={<FontAwesomeIcon icon={faTimesCircle} className="w-4 h-4" />}
                            label="Cancel"
                            variant="ghost"
                        />
                        <ActionButton
                            onClick={handleSubmit}
                            icon={<FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4" />}
                            label={editingDevice ? 'Update' : 'Save'}
                            variant="primary"
                        />
                    </div>
                </div>
            </div>
        )} */}
    </section>
    );
}

