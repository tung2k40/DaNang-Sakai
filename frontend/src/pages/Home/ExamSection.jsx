function ExamSection({ subject }) {
  return (
    <div className="relative flex flex-col items-center mt-8">
      {/* Thẻ tên môn học nằm ngoài */}
      <div className="absolute -top-4 text-blue-700 text-4xl font-bold px-10 pb-[10px] bg-blue-100 rounded-full border border-blue-300">
  {subject}
</div>


      {/* Khung nội dung chính */}
      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 w-full max-w-3xl mt-4">
        <h2 className="text-xl font-semibold text-blue-600 mb-3 text-center">
        🧾 Đề thi
        </h2>
        <p className="text-gray-700 text-center">
        Hiển thị đề thi các năm, câu hỏi trắc nghiệm và đề cương ôn tập.
        </p>
      </div>
    </div>
  );
}

export default ExamSection;
