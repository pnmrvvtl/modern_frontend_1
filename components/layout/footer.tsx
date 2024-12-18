export default function Footer() {
  return (
    <footer className="bg-secondary p-6 border-t border-primary shadow-md">
      <div className="flex justify-end items-center text-primary">
        Modern frontend first homework by&nbsp;
        <a
          href="https://github.com/pnrvvtl"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-primary hover:text-gray-600 transition-colors duration-200"
        >
          Vitalii Ponomarov
        </a>
      </div>
    </footer>
  );
}
