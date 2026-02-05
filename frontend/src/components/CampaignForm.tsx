import React, { useState } from "react"
import { Loader2, PlusCircle } from "lucide-react"

// 🔹 Interface pour les données du formulaire
interface FormData {
  name: string
  advertiser: string
  budget: number
}

// 🔹 Props du composant
interface Props {
  onCreate: (data: FormData) => Promise<void>
}

const CampaignForm: React.FC<Props> = ({ onCreate }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    advertiser: "",
    budget: 0,
  })
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData({ ...formData, [field]: value })
    setErrors({ ...errors, [field]: undefined })
  }

  const validate = () => {
    const newErrors: Partial<FormData> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.advertiser.trim()) newErrors.advertiser = "Advertiser is required"
    if (formData.budget <= 0) newErrors.budget = "Budget must be positive"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      await onCreate(formData)
      setFormData({ name: "", advertiser: "", budget: 0 })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 max-w-sm mx-auto">

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom de la campagne
          </label>
          <input
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500
              ${errors.name ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Advertiser */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Annonceur
          </label>
          <input
            value={formData.advertiser}
            onChange={(e) => handleChange("advertiser", e.target.value)}
            className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500
              ${errors.advertiser ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.advertiser && (
            <p className="text-red-500 text-sm">{errors.advertiser}</p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Budget (€)
          </label>
          <input
            type="number"
            min={0}
            value={formData.budget === 0 ? "" : formData.budget}
            onChange={(e) => handleChange("budget", Number(e.target.value))}
            className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500
              ${errors.budget ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.budget && (
            <p className="text-red-500 text-sm">{errors.budget}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2
                     bg-blue-600 hover:bg-blue-700 text-white
                     py-2 rounded-lg font-medium transition
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              En cours de création...
            </>
          ) : (
            <>
              <PlusCircle className="h-4 w-4" />
               Creer
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default CampaignForm
