import PageHeading from "@/components/PageHeading";
import ActionButton from "@/components/ActionButton";
import Table from "@/components/Table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import rooms from "@/data/jsons/rooms.json";

export default function RoomsPage() {
    return (
        <section>
        <PageHeading title="Rooms" description="Manage and allocate rooms" />
        <div className="mb-4">
            <ActionButton
                // onClick={() => console.log()}
                // onClick={openModal}
                icon={<FontAwesomeIcon icon={faPlusCircle} className="w-5 h-5" />}
                label="Add Room"
                variant="primary"
            />
        </div>
        <Table
            headers={['No.','Name', 'Capacity', 'Type']}
            rows={rooms}
            // onEdit={openModal}
            // onDelete={handleDeleteRoom}
            emptyMessage="No rooms found. Click 'Add Room' to create one."
        />

        {/* Modal */}
        {/* {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4">
                        {editingRoom ? 'Edit Room' : 'Add Room'}
                    </h2>
                    <InputField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter room name"
                        error={formErrors.name}
                    />
                    <InputField
                        label="Capacity"
                        type="number"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        placeholder="Enter room capacity"
                        error={formErrors.capacity}
                    />
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value as 'classroom' | 'lab' | 'office')}
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:outline-none focus:ring-2"
                        >
                            <option value="classroom">Classroom</option>
                            <option value="lab">Lab</option>
                            <option value="office">Office</option>
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
                            label={editingRoom ? 'Update' : 'Save'}
                            variant="primary"
                        />
                    </div>
                </div>
            </div>
        )} */}
    </section>
    );
}

