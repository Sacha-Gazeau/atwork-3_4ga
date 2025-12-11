"use client";

import * as React from "react";
import { useEdgeStore } from "../../lib/edgestore";

export default function Page() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [previews, setPreviews] = React.useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );
  const { edgestore } = useEdgeStore();

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList) return;

    const selectedFiles = Array.from(fileList);

    // Add the new files to the already selected ones
    setFiles((prev) => [...prev, ...selectedFiles]);
    setError(null);
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (files.length < 5) {
      setError("U moet minimaal 5 afbeeldingen selecteren.");
      return;
    }

    try {
      setError(null);

      // Upload files to EdgeStore first
      const uploadPromises = files.map((file) =>
        edgestore.publicFiles.upload({
          file,
        })
      );

      const uploadResults = await Promise.all(uploadPromises);

      // Get form data
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const formValues = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        number: formData.get("number"),
        zipCode: formData.get("zipCode"),
        city: formData.get("city"),
        startDate: formData.get("startDate"),
        maxPrice: formData.get("maxPrice"),
        fileUrls: uploadResults.map((result) => result.url),
      };

      setSuccessMessage("Formulier succesvol verzonden!");
      setTimeout(() => setSuccessMessage(null), 5000);
      setFiles([]);
      form.reset();
    } catch (err) {
      setError("Er is een fout opgetreden tijdens het verzenden.");
    }
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h2 className="page-title">Start form</h2>
      </div>
      <form onSubmit={handleSubmit} className="request-form">
        <label className="request-form__field">
          <input
            type="file"
            name="file"
            accept="image/*,application/pdf"
            multiple
            onChange={handleFilesChange}
            className="file-upload-input"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="file-upload-label">
            Bestand toevoegen (Foto&apos;s van de tuin)
          </label>
        </label>

        {files.length > 0 && (
          <div className="file-list-container">
            <div className="file-list">
              {files.map((file, index) => (
                <div key={index} className="file-item">
                  <span
                    className="file-item__name"
                    onClick={() => handleOpenPreview(previews[index])}
                    title={file.name}
                  >
                    {file.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="file-item__remove"
                    title="Remove"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button type="submit" className="request-form__submit">
          Versturen
        </button>
      </form>

      <p className="form-note">
        Indien de klant geen (duidelijk) plan heeft is opmeting door DIY tuinen
        mogelijk voor een meerprijs, afhankelijk van de gemeente van de klant
      </p>

      {previewUrl && (
        <div onClick={handleClosePreview} className="preview-modal">
          <div
            onClick={(e) => e.stopPropagation()}
            className="preview-modal__content"
          >
            <img
              src={previewUrl}
              alt="Preview"
              className="preview-modal__image"
            />
            <button
              type="button"
              onClick={handleClosePreview}
              className="preview-modal__close"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="toast toast--error">
          <span className="toast__icon">⚠</span>
          {error}
          <button onClick={() => setError(null)} className="toast__close">
            ✕
          </button>
        </div>
      )}

      {successMessage && (
        <div className="toast toast--success">
          <span className="toast__icon">✓</span>
          {successMessage}
          <button
            onClick={() => setSuccessMessage(null)}
            className="toast__close"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
