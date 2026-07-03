const PageHeading = ({ title, description }: { title: string; description?: string }) => (
    <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h1>
        {description && <p className="mt-2 text-gray-600 dark:text-gray-300 text-lg">{description}</p>}
    </div>
);

export default PageHeading;
