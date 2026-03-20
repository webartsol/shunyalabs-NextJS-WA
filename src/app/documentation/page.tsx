export default function DocumentationPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">
        Documentation Overview
      </h1>
      <p className="text-gray-500 mb-6">
        Explore the Shunya Labs Speech-to-Text API documentation. Choose a
        section from the sidebar.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Feature {i}
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Learn how to use this feature in your transcription workflow.
            </p>
            <a
              href="#"
              className="text-sm text-blue-500 font-medium hover:underline"
            >
              See how it works →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
