"use client";

import * as React from "react";
import { useEdgeStore } from "../../lib/edgestore";

export default function Page() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [previews, setPreviews] = React.useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const { edgestore } = useEdgeStore();

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;

    const selectedFiles = Array.from(fileList);

    // Add the new files to the already selected ones
    setFiles((prev) => [...prev, ...selectedFiles]);
    setError(null);

    // Reset the input value so the same files can be selected again if needed
    event.target.value = "";
  };

  React.useEffect(() => {
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleOpenPreview = (url: string) => {
    setPreviewUrl(url);
  };

  const handleClosePreview = () => {
    setPreviewUrl(null);
  };

  const handleUpload = async () => {
    if (files.length < 5) {
      setError("You must select at least 5 images.");
      return;
    }

    try {
      setError(null);

      const uploadPromises = files.map((file) =>
        edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            console.log(file.name, progress);
          },
        })
      );

      const results = await Promise.all(uploadPromises);
      console.log(results);

      // Optional: clear the selection after upload
      setFiles([]);
    } catch (err) {
      console.error(err);
      setError("An error occurred during the upload.");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesChange}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {files.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            {files.map((file, index) => (
              <div
                key={index}
                style={{
                  border: "1px solid #ccc",
                  padding: "0.5rem",
                  borderRadius: "4px",
                  maxWidth: "150px",
                }}
              >
                {previews[index] && (
                  <p
                    style={{
                      fontSize: "0.8rem",
                      marginTop: "0.25rem",
                      wordBreak: "break-all",
                    }}
                    onClick={() => handleOpenPreview(previews[index])}
                  >
                    {file.name}
                  </p>
                )}
                <button
                  type="button"
                  color="red"
                  onClick={() => handleRemoveFile(index)}
                  style={{ marginTop: "0.25rem" }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleUpload}
            disabled={files.length < 5}
            style={{
              marginTop: "1rem",
              opacity: files.length < 5 ? 0.5 : 1,
              cursor: files.length < 5 ? "not-allowed" : "pointer",
            }}
          >
            Upload ({files.length} images)
          </button>
        </div>
      )}

      {previewUrl && (
        <div
          onClick={handleClosePreview}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "90%",
              maxHeight: "90%",
            }}
          >
            <img
              src={previewUrl}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
            <button
              type="button"
              onClick={handleClosePreview}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                padding: "0.25rem 0.5rem",
                background: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
