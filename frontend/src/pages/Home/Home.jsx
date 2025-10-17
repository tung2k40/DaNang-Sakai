import DocumentSection from "./DocumentSection";
import ExamSection from "./ExamSection";

function Home({ selectedOption }) {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {!selectedOption && (
        <h1 className="text-2xl font-semibold text-gray-800">Home Page</h1>
      )}

      {selectedOption?.type === "tailieu" && (
        <DocumentSection subject={selectedOption.subject} />
      )}

      {selectedOption?.type === "dethi" && (
        <ExamSection subject={selectedOption.subject} />
      )}
    </div>
  );
}

export default Home;
