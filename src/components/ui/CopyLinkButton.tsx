"use client";

export default function CopyLinkButton() {
  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link berhasil disalin!");
  };

  return (
    <button
      onClick={handleCopy}
      className="hover:text-gray-800"
    >
      Copy Link
    </button>
  );
}
