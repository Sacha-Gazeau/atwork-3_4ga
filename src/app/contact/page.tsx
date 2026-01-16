"use client";

import * as React from "react";
import Image from "next/image";
import { useEdgeStore } from "../../lib/edgestore";
import { createRequest } from "../actions/create-request";

type FormData = {
  serviceType: string;
  gardenStyle: string[];
  deadline: string;
  budget: string;
  addons: string[];
  fileUrls: string[];
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  zipCode: string;
  city: string;

};

const gardenStyles = [
  { id: "modern", title: "Moderne Tuin", image: "/garden-styles/moderne-tuin.png" },
  { id: "landelijk", title: "Landelijke Tuin", image: "/garden-styles/landelijke-tuin.png" },
  { id: "japans", title: "Japanse Tuin", image: "/garden-styles/japanse-tuin.png" },
  { id: "mediterraan", title: "Mediterrane Tuin", image: "/garden-styles/mediterrane-tuin.png" },
  { id: "stadstuin", title: "Stadstuin", image: "/garden-styles/stadstuin.png" },
  { id: "diervriendelijk", title: "Diervriendelijke Tuin", image: "/garden-styles/diervriendelijke-tuin.png" },
];

const availableAddons = [
  "Verlichtingsplan",
  "Beregeningsinstallatie",
  "Beplantingsplan",
  "3D-ontwerp",
  "Tuinhuis / Overkapping",
  "Zwembad / Zwemvijver",
];


const ProgressBar = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  const progress = Math.min((currentStep / totalSteps) * 100, 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
      <div
        className="bg-[var(--background-item)] h-2.5 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

// STEP 1: Contact Details (Moved from Step 6)
const Step1Contact = ({
  formData,
  onChange,
}: {
  formData: FormData;
  onChange: (field: keyof FormData, val: string) => void;
}) => {
  const inputClass = "p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--background-item)] bg-white text-gray-900 placeholder-gray-400";
  const labelClass = "text-xs font-bold uppercase text-gray-500";

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[var(--background-item)] text-center font-sans">Contactgegevens</h2>
      <p className="text-center text-gray-500 text-sm mb-4">Laten we beginnen met uw gegevens.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Voornaam *</label>
          <input
            required
            type="text"
            value={formData.firstName}
            onChange={(e) => onChange("firstName", e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Achternaam *</label>
          <input
            required
            type="text"
            value={formData.lastName}
            onChange={(e) => onChange("lastName", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className={labelClass}>E-mailadres *</label>
        <input
          required
          type="email"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          className={inputClass}
        />
      </div>



      <div className="flex flex-col gap-1">
        <label className={labelClass}>Telefoonnummer *</label>
        <input
          required
          type="tel"
          value={formData.number}
          onChange={(e) => onChange("number", e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-1 col-span-1">
          <label className={labelClass}>Postcode</label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => onChange("zipCode", e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1 col-span-2">
          <label className={labelClass}>Woonplaats</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => onChange("city", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
    </div>
  );
};

// STEP 2: Selection (Was Step 1)
const Step2Selection = ({
  value,
  onChange,
  onNext,
}: {
  value: string;
  onChange: (val: string) => void;
  onNext: (option: string) => void;
}) => {
  const options = ["Tuinontwerp", "Tuinaanleg", "Tuinonderhoud"];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[var(--background-item)] text-center font-sans">Waarmee kunnen we u helpen?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => {
              onChange(option);
              setTimeout(() => onNext(option), 200);
            }}
            className={`p-6 rounded-xl border-2 transition-all duration-200 text-lg font-medium h-32 flex items-center justify-center hover:shadow-md 
              ${value === option
                ? "border-[var(--background-item)] bg-[var(--background-item)] text-white"
                : "border-gray-200 text-gray-600 hover:border-[var(--background-item)] hover:text-[var(--background-item)]"
              }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

// STEP 3: Style (Was Step 2)
const Step3Style = ({
  value,
  onChange,
}: {
  value: string[];
  onChange: (val: string[]) => void;
}) => {
  const toggleStyle = (style: string) => {
    if (value.includes(style)) {
      onChange(value.filter((s) => s !== style));
    } else {
      onChange([...value, style]);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[var(--background-item)] text-center font-sans">Kies uw favoriete tuinstijl</h2>
      <p className="text-center text-gray-500 text-sm">Selecteer één of meerdere stijlen die u aanspreken.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {gardenStyles.map((style) => (
          <div
            key={style.id}
            onClick={() => toggleStyle(style.title)}
            className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-200 hover:shadow-lg relative group aspect-square
              ${value.includes(style.title)
                ? "border-[var(--background-item)] ring-2 ring-[var(--background-item)] ring-offset-2"
                : "border-gray-200 hover:border-[var(--background-item)]/50"
              }`}
          >
            <Image
              src={style.image}
              alt={style.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className={`absolute inset-0 transition-colors duration-200 ${value.includes(style.title) ? "bg-[var(--background-item)]/20" : "bg-transparent"}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
              <span className="text-white font-medium text-sm md:text-base font-sans">{style.title}</span>
            </div>
            {value.includes(style.title) && (
              <div className="absolute top-2 right-2 bg-[var(--background-item)] text-white rounded-full p-1 shadow-md z-10">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


// STEP 4: Questions (Was Step 3)
const Step4Questions = ({
  formData,
  onChange,
}: {
  formData: FormData;
  onChange: (field: keyof FormData, val: string) => void;
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[var(--background-item)] text-center font-sans">Vertel ons iets meer</h2>

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Wat is de gewenste deadline?</label>
          <select
            value={formData.deadline}
            onChange={(e) => onChange("deadline", e.target.value)}
            className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--background-item)] bg-white text-gray-900"
          >
            <option value="">Maak een keuze...</option>
            <option value="Zo snel mogelijk">Zo snel mogelijk</option>
            <option value="Binnen 1 maand">Binnen 1 maand</option>
            <option value="Binnen 3 maanden">Binnen 3 maanden</option>
            <option value="Geen haast">Geen haast</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Wat is uw geschatte budget?</label>
          <select
            value={formData.budget}
            onChange={(e) => onChange("budget", e.target.value)}
            className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--background-item)] bg-white text-gray-900"
          >
            <option value="">Maak een keuze...</option>
            <option value="< €1.000">&lt; €1.000</option>
            <option value="€1.000 - €5.000">€1.000 - €5.000</option>
            <option value="€5.000 - €10.000">€5.000 - €10.000</option>
            <option value="€10.000 - €25.000">€10.000 - €25.000</option>
            <option value="> €25.000">&gt; €25.000</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// STEP 5: Addons (Was Step 4)
const Step5Addons = ({
  selectedAddons,
  onChange,
}: {
  selectedAddons: string[];
  onChange: (addons: string[]) => void;
}) => {
  const toggleAddon = (addon: string) => {
    if (selectedAddons.includes(addon)) {
      onChange(selectedAddons.filter(item => item !== addon));
    } else {
      onChange([...selectedAddons, addon]);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[var(--background-item)] text-center font-sans">Gewenste opties</h2>
      <p className="text-center text-gray-500 text-sm">Heeft u interesse in een van de volgende opties?</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {availableAddons.map((addon) => (
          <label
            key={addon}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
              ${selectedAddons.includes(addon)
                ? "border-[var(--background-item)] bg-[var(--background-item)]/5"
                : "border-gray-200 hover:border-[var(--background-item)]/50"
              }`}
          >
            <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors
              ${selectedAddons.includes(addon) ? "bg-[var(--background-item)] border-[var(--background-item)]" : "border-gray-300 bg-white"}`}>
              {selectedAddons.includes(addon) && (
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              )}
            </div>
            <input
              type="checkbox"
              className="hidden"
              checked={selectedAddons.includes(addon)}
              onChange={() => toggleAddon(addon)}
            />
            <span className={`font-medium ${selectedAddons.includes(addon) ? "text-[var(--background-item)]" : "text-gray-700"}`}>
              {addon}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

// STEP 6: Upload (Was Step 5)
const Step6Upload = ({
  files,
  setFiles,
  onRemove,
}: {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  onRemove: (index: number) => void;
}) => {
  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles((prev) => [...prev, ...Array.from(event.target.files!)]);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-[var(--background-item)] text-center font-sans">Documenten delen</h2>
      <p className="text-center text-gray-500 text-sm">Upload minimaal 5 foto&apos;s van uw tuin</p>

      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors relative group">
        <input
          type="file"
          id="file-upload"
          multiple
          accept="image/*,application/pdf"
          onChange={handleFilesChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="text-gray-400 group-hover:text-gray-600 transition-colors">
          <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="mt-2 text-sm font-medium">Klik om te uploaden of sleep bestanden hierheen</p>
          <p className="text-xs mt-1 opacity-70">Minimaal 5 bestanden vereist ({files.length}/5)</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {files.map((file, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200">
              <span className="text-sm truncate max-w-[80%] text-gray-700">{file.name}</span>
              <button onClick={() => onRemove(idx)} className="text-red-400 hover:text-red-600 text-lg leading-none p-1">
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Page() {
  const [step, setStep] = React.useState(1);
  const totalSteps = 6;

  const [formData, setFormData] = React.useState<FormData>({
    serviceType: "",
    gardenStyle: [],
    deadline: "",
    budget: "",
    addons: [],
    fileUrls: [],
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    zipCode: "",
    city: "",
  });

  const [files, setFiles] = React.useState<File[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { edgestore } = useEdgeStore();

  const handleUpdateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null);
  };

  const validateStep = (currentStep: number) => {
    // Step 1: Contact (New)
    if (currentStep === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.number) {
        return "Vul alle verplichte velden in.";
      }
    }
    // Step 2: Selection (Was 1)
    if (currentStep === 2) {
      if (!formData.serviceType) return "Maak een keuze om verder te gaan.";
    }
    // Step 3: Style (Was 2)
    if (currentStep === 3) {
      if (formData.gardenStyle.length === 0) return "Selecteer minimaal één tuinstijl die u aanspreekt.";
    }
    // Step 4: Questions (Was 3)
    if (currentStep === 4) {
      if (!formData.deadline) return "Selecteer een deadline.";
      if (!formData.budget) return "Selecteer een budget.";
    }
    // Step 5: Addons (Was 4) - Optional
    // Step 6: Upload (Was 5)
    if (currentStep === 6) {
      if (files.length < 5) {
        return `U moet minimaal 5 afbeeldingen uploaden (huidig: ${files.length}).`;
      }
    }
    return null;
  };

  const handleNext = () => {
    const err = validateStep(step);
    if (err) {
      setError(err);
      return;
    }
    if (step < totalSteps) {
      setStep((s) => s + 1);
      setError(null);
    }
  };

  const handleBack = () => {
    if (step === 6 && formData.serviceType === "Tuinonderhoud") {
      setStep(2);
      setError(null);
      return;
    }

    if (step > 1) {
      setStep((s) => s - 1);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    const err = validateStep(step);
    if (err) {
      setError(err);
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Upload files if any
      const uploadPromises = files.map((file) =>
        edgestore.publicFiles.upload({ file })
      );
      const uploadResults = await Promise.all(uploadPromises);
      const uploadedUrls = uploadResults.map((r) => r.url);

      // 2. Save to database via Server Action
      const result = await createRequest({
        ...formData,
        fileUrls: uploadedUrls,
      });

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || "Er is een fout opgetreden bij het verzenden.");
      }
    } catch (e) {
      console.error(e);
      setError("Er is iets misgegaan. Probeer het opnieuw.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full text-center space-y-6 border border-gray-100">
          <div className="w-16 h-16 bg-[var(--background-item)] rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[var(--background-item)] font-sans">Bedankt!</h2>
          <p className="text-gray-600 text-lg">
            We hebben uw aanvraag goed ontvangen. We nemen binnen 24 uur contact met u op.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[var(--background-item)] text-white rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Terug naar home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl relative border border-gray-100 min-h-[600px] flex flex-col">
        {/* Header with Progress */}
        <div className="text-center w-full">
          <ProgressBar currentStep={step} totalSteps={totalSteps} />
        </div>

        {/* Steps */}
        <div className="flex-grow py-4">
          {step === 1 && (
            <Step1Contact
              formData={formData}
              onChange={handleUpdateFormData}
            />
          )}
          {step === 2 && (
            <Step2Selection
              value={formData.serviceType}
              onChange={(val) => handleUpdateFormData("serviceType", val)}
              onNext={(option) => {
                if (option === "Tuinonderhoud") {
                  setStep(6);
                  setError(null);
                } else {
                  handleNext();
                }
              }}
            />
          )}
          {step === 3 && (
            <Step3Style
              value={formData.gardenStyle}
              onChange={(val) => handleUpdateFormData("gardenStyle", val)}
            />
          )}
          {step === 4 && (
            <Step4Questions
              formData={formData}
              onChange={handleUpdateFormData}
            />
          )}
          {step === 5 && (
            <Step5Addons
              selectedAddons={formData.addons}
              onChange={(val) => handleUpdateFormData("addons", val)}
            />
          )}
          {step === 6 && (
            <Step6Upload
              files={files}
              setFiles={setFiles}
              onRemove={(idx) => setFiles((prev) => prev.filter((_, i) => i !== idx))}
            />
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium text-center border border-red-200">
            {error}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-auto">
          <button
            onClick={handleBack}
            className={`text-gray-500 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors ${step === 1 ? "invisible" : ""
              }`}
          >
            ← Vorige
          </button>

          {step < totalSteps ? (
            <button
              onClick={handleNext}
              className="bg-[var(--background-item)] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Volgende
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-[var(--background-item)] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Versturen..." : "Aanvraag versturen"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
