"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState("");

  // Handle Upload
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    // 1. Ask backend for pre-signed URL
    const res = await fetch("/api/s3url");
    const { uploadUrl, fileKey } = await res.json();

    // 2. Upload file directly to S3
    const uploadRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (uploadRes.ok) {
      // 3. Generate public file URL
      const publicUrl = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileKey}`;
      setUploadedUrl(publicUrl);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Next.js + S3 Upload</h1>

      <form onSubmit={handleUpload} className="space-y-2">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>

      {uploadedUrl && (
        <div>
          ✅ File Uploaded:{" "}
          <a href={uploadedUrl} target="_blank" className="text-blue-500">
            {uploadedUrl}
          </a>
        </div>
      )}
    </div>
  );
}
