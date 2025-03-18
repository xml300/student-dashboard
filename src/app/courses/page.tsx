import PageHeading from "@/components/PageHeading";
import ActionButton from "@/components/ActionButton";
import InputField from "@/components/InputField";
import Table from "@/components/Table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import courses from "@/data/jsons/courses.json";

export default function CoursesPage() {
  return (
    <section>
      <PageHeading
        title="Courses"
        description="Manage courses offered by the institution"
      />
      <div className="mb-4">
        <ActionButton
        //   onClick={openModal}
          icon={<FontAwesomeIcon icon={faPlusCircle} className="w-5 h-5" />}
          label="Add Course"
          variant="primary"
        />
      </div>
      <Table
        headers={["No.","Name", "Description", "Credits"]}
        rows={courses}
        // onEdit={openModal}
        // onDelete={handleDeleteCourse}
        emptyMessage="No courses found. Click 'Add Course' to create one."
      />

      {/* Modal for Add/Edit Course */}
      {/* {(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingCourse ? "Edit Course" : "Add Course"}
            </h2>
            <InputField
              label="Name"
            //   value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter course name"
              error={formErrors.name}
            />
            <InputField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter course description"
              error={formErrors.description}
            />
            <InputField
              label="Credits"
              type="number"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              placeholder="Enter course credits"
              error={formErrors.credits}
            />
            <div className="flex justify-end gap-4">
              <ActionButton
                onClick={closeModal}
                icon={
                  <FontAwesomeIcon icon={faTimesCircle} className="w-4 h-4" />
                }
                label="Cancel"
                variant="ghost"
              />
              <ActionButton
                onClick={handleSubmit}
                icon={
                  <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4" />
                }
                label={editingCourse ? "Update" : "Save"}
                variant="primary"
              />
            </div>
          </div>
        </div>
      )} */}
    </section>
  );
}
