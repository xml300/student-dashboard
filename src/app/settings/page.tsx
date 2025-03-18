import PageHeading from "@/components/PageHeading";
import ActionButton from "@/components/ActionButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export default function SettingsPage() {
    return (
        <section>
        <PageHeading title="Settings" description="Customize your dashboard settings" />
        <div className="bg-white shadow-md rounded-md p-6 space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                <input
                    type="text"
                    value={"siteName"}
                    // onChange={(e) => setSiteName(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:outline-none focus:ring-2"
                    placeholder="Enter site name"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                <input
                    type="color"
                    value={"primaryColor"}
                    // onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 rounded-full cursor-pointer"
                />
                <span className='ml-2'>{"primaryColor"}</span>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                <input
                    type="file"
                    accept="image/*"
                    // onChange={handleLogoChange}
                    className="mb-2"
                />
                {/* {logo && (
                    <div className="mt-2">
                        <img src={logo} alt="Logo Preview" className="h-12" />
                    </div>
                )} */}
            </div>
            <div>
                <ActionButton
                    // onClick={() => console.log()}
                    label="Save Settings"
                    // onClick={handleSaveSettings}
                    icon={<FontAwesomeIcon icon={faGear} className="w-4 h-4" />}
                    // label={isSaving ? 'Saving...' : 'Save Settings'}
                    variant="primary"
                    // className={isSaving ? 'opacity-70 cursor-not-allowed' : ''}
                    // disabled={isSaving}
                />
            </div>
        </div>
    </section>
    );
}
