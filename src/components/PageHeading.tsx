const PageHeading = ({ title, description }: { title: string; description?: string }) => (
    <div className="mb-6"> {/* Increased margin-bottom */}
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2> {/* Slightly reduced margin-bottom */}
        {description && <p className="mt-2 text-gray-600 text-lg">{description}</p>} {/* Adjusted description typography */}
    </div>
);

export default PageHeading;