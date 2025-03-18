const PageHeading = ({ title, description }: { title: string; description?: string }) => (
    <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">{title}</h2>
        {description && <p className="text-gray-600">{description}</p>}
    </div>
);

export default PageHeading;