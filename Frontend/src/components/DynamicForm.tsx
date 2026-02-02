import { useState, useEffect } from 'react'
import { Send, Loader2, CheckCircle, AlertCircle, Upload, X } from 'lucide-react'

// Types
export interface FormField {
    id: number
    label: string
    field_type: string
    placeholder: string | null
    help_text: string | null
    required: boolean
    choices: string | null
    choices_list: string[]
    default_value: string | null
    min_value: number | null
    max_value: number | null
    max_length: number | null
    order: number
}

export interface FormData {
    id: number
    title: string
    description: string | null
    slug: string
    is_active: boolean
    success_message: string
    fields: FormField[]
}

interface DynamicFormProps {
    formSlug: string
    onSuccess?: () => void
}

const API_BASE_URL = 'http://127.0.0.1:8000/api'

const DynamicForm = ({ formSlug, onSuccess }: DynamicFormProps) => {
    const [form, setForm] = useState<FormData | null>(null)
    const [formValues, setFormValues] = useState<Record<string, string>>({})
    const [fileValues, setFileValues] = useState<Record<string, File | null>>({})
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

    // Fetch form data
    useEffect(() => {
        const fetchForm = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await fetch(`${API_BASE_URL}/forms/${formSlug}/`)
                if (!response.ok) {
                    throw new Error('Form not found')
                }
                const data = await response.json()
                setForm(data)

                // Initialize form values with defaults
                const initialValues: Record<string, string> = {}
                data.fields.forEach((field: FormField) => {
                    initialValues[field.id] = field.default_value || ''
                })
                setFormValues(initialValues)
            } catch (err) {
                console.error('Error fetching form:', err)
                setError('Failed to load form. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        fetchForm()
    }, [formSlug])

    const handleInputChange = (fieldId: number, value: string) => {
        setFormValues(prev => ({ ...prev, [fieldId]: value }))
        // Clear field error on change
        if (fieldErrors[fieldId]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev }
                delete newErrors[fieldId]
                return newErrors
            })
        }
    }

    const handleFileChange = (fieldId: number, file: File | null) => {
        setFileValues(prev => ({ ...prev, [fieldId]: file }))
    }

    const validateForm = (): boolean => {
        if (!form) return false

        const errors: Record<string, string> = {}

        form.fields.forEach(field => {
            const value = formValues[field.id]
            const file = fileValues[field.id]

            // Required validation
            if (field.required && !value && !file) {
                errors[field.id] = `${field.label} is required`
            }

            // Email validation
            if (field.field_type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                if (!emailRegex.test(value)) {
                    errors[field.id] = 'Please enter a valid email address'
                }
            }

            // Number validation
            if (field.field_type === 'number' && value) {
                const num = parseFloat(value)
                if (isNaN(num)) {
                    errors[field.id] = 'Please enter a valid number'
                } else {
                    if (field.min_value !== null && num < field.min_value) {
                        errors[field.id] = `Minimum value is ${field.min_value}`
                    }
                    if (field.max_value !== null && num > field.max_value) {
                        errors[field.id] = `Maximum value is ${field.max_value}`
                    }
                }
            }

            // Max length validation
            if (field.max_length && value && value.length > field.max_length) {
                errors[field.id] = `Maximum ${field.max_length} characters allowed`
            }
        })

        setFieldErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm() || !form) return

        setSubmitting(true)
        setError(null)

        try {
            const formData = new FormData()

            // Add text values
            Object.entries(formValues).forEach(([fieldId, value]) => {
                formData.append(fieldId, value)
            })

            // Add file values
            Object.entries(fileValues).forEach(([fieldId, file]) => {
                if (file) {
                    formData.append(fieldId, file)
                }
            })

            const response = await fetch(`${API_BASE_URL}/forms/${formSlug}/submit/`, {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.errors?.join(', ') || 'Submission failed')
            }

            setSuccess(true)
            setSuccessMessage(data.message || form.success_message)

            // Reset form
            const initialValues: Record<string, string> = {}
            form.fields.forEach((field: FormField) => {
                initialValues[field.id] = field.default_value || ''
            })
            setFormValues(initialValues)
            setFileValues({})

            onSuccess?.()
        } catch (err) {
            console.error('Submission error:', err)
            setError(err instanceof Error ? err.message : 'Failed to submit form')
        } finally {
            setSubmitting(false)
        }
    }

    const renderField = (field: FormField) => {
        const commonClasses = `w-full px-4 py-3 rounded-lg border transition-colors duration-200
      ${fieldErrors[field.id]
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-secondary-300 focus:ring-primary-500 focus:border-primary-500'
            } focus:outline-none focus:ring-2`

        switch (field.field_type) {
            case 'textarea':
                return (
                    <textarea
                        id={`field-${field.id}`}
                        value={formValues[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder || ''}
                        required={field.required}
                        rows={4}
                        className={commonClasses}
                    />
                )

            case 'select':
                return (
                    <select
                        id={`field-${field.id}`}
                        value={formValues[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        required={field.required}
                        className={commonClasses}
                    >
                        <option value="">Select an option...</option>
                        {field.choices_list.map((choice, idx) => (
                            <option key={idx} value={choice}>{choice}</option>
                        ))}
                    </select>
                )

            case 'radio':
                return (
                    <div className="space-y-2">
                        {field.choices_list.map((choice, idx) => (
                            <label key={idx} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name={`field-${field.id}`}
                                    value={choice}
                                    checked={formValues[field.id] === choice}
                                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                                    required={field.required}
                                    className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                                />
                                <span className="text-secondary-700">{choice}</span>
                            </label>
                        ))}
                    </div>
                )

            case 'checkbox':
                return (
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            id={`field-${field.id}`}
                            checked={formValues[field.id] === 'true'}
                            onChange={(e) => handleInputChange(field.id, e.target.checked ? 'true' : '')}
                            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                        />
                        <span className="text-secondary-700">{field.placeholder || 'Yes'}</span>
                    </label>
                )

            case 'checkbox_group':
                return (
                    <div className="space-y-2">
                        {field.choices_list.map((choice, idx) => {
                            const currentValues = formValues[field.id]?.split(',').filter(Boolean) || []
                            const isChecked = currentValues.includes(choice)

                            return (
                                <label key={idx} className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={(e) => {
                                            let newValues = [...currentValues]
                                            if (e.target.checked) {
                                                newValues.push(choice)
                                            } else {
                                                newValues = newValues.filter(v => v !== choice)
                                            }
                                            handleInputChange(field.id, newValues.join(','))
                                        }}
                                        className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                                    />
                                    <span className="text-secondary-700">{choice}</span>
                                </label>
                            )
                        })}
                    </div>
                )

            case 'file':
            case 'image':
                return (
                    <div>
                        <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary-50 transition-colors
              ${fieldErrors[field.id] ? 'border-red-500' : 'border-secondary-300'}`}>
                            {fileValues[field.id] ? (
                                <div className="flex items-center space-x-2 text-secondary-700">
                                    <Upload size={20} />
                                    <span>{fileValues[field.id]?.name}</span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleFileChange(field.id, null)
                                        }}
                                        className="p-1 text-red-500 hover:bg-red-100 rounded"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-secondary-500">
                                    <Upload size={24} className="mb-2" />
                                    <span className="text-sm">Click to upload {field.field_type === 'image' ? 'image' : 'file'}</span>
                                </div>
                            )}
                            <input
                                type="file"
                                id={`field-${field.id}`}
                                accept={field.field_type === 'image' ? 'image/*' : undefined}
                                onChange={(e) => handleFileChange(field.id, e.target.files?.[0] || null)}
                                className="hidden"
                            />
                        </label>
                    </div>
                )

            case 'date':
                return (
                    <input
                        type="date"
                        id={`field-${field.id}`}
                        value={formValues[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        required={field.required}
                        className={commonClasses}
                    />
                )

            case 'time':
                return (
                    <input
                        type="time"
                        id={`field-${field.id}`}
                        value={formValues[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        required={field.required}
                        className={commonClasses}
                    />
                )

            case 'datetime':
                return (
                    <input
                        type="datetime-local"
                        id={`field-${field.id}`}
                        value={formValues[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        required={field.required}
                        className={commonClasses}
                    />
                )

            case 'number':
                return (
                    <input
                        type="number"
                        id={`field-${field.id}`}
                        value={formValues[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder || ''}
                        required={field.required}
                        min={field.min_value ?? undefined}
                        max={field.max_value ?? undefined}
                        className={commonClasses}
                    />
                )

            case 'email':
                return (
                    <input
                        type="email"
                        id={`field-${field.id}`}
                        value={formValues[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder || ''}
                        required={field.required}
                        className={commonClasses}
                    />
                )

            case 'phone':
                return (
                    <input
                        type="tel"
                        id={`field-${field.id}`}
                        value={formValues[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder || ''}
                        required={field.required}
                        className={commonClasses}
                    />
                )

            case 'url':
                return (
                    <input
                        type="url"
                        id={`field-${field.id}`}
                        value={formValues[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder || 'https://'}
                        required={field.required}
                        className={commonClasses}
                    />
                )

            default: // text
                return (
                    <input
                        type="text"
                        id={`field-${field.id}`}
                        value={formValues[field.id] || ''}
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={field.placeholder || ''}
                        required={field.required}
                        maxLength={field.max_length ?? undefined}
                        className={commonClasses}
                    />
                )
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
            </div>
        )
    }

    if (error && !form) {
        return (
            <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-secondary-600 mb-4">{error}</p>
                <button onClick={() => window.location.reload()} className="btn-primary">
                    Try Again
                </button>
            </div>
        )
    }

    if (success) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">Submitted Successfully!</h3>
                <p className="text-secondary-600 mb-6">{successMessage}</p>
                <button
                    onClick={() => setSuccess(false)}
                    className="btn-secondary"
                >
                    Submit Another Response
                </button>
            </div>
        )
    }

    if (!form) return null

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-secondary-900 mb-2">{form.title}</h2>
                    {form.description && (
                        <p className="text-secondary-600">{form.description}</p>
                    )}
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {form.fields.map((field) => (
                        <div key={field.id}>
                            <label
                                htmlFor={`field-${field.id}`}
                                className="block text-sm font-medium text-secondary-700 mb-2"
                            >
                                {field.label}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>

                            {renderField(field)}

                            {field.help_text && (
                                <p className="mt-1 text-sm text-secondary-500">{field.help_text}</p>
                            )}

                            {fieldErrors[field.id] && (
                                <p className="mt-1 text-sm text-red-500">{fieldErrors[field.id]}</p>
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full btn-primary flex items-center justify-center space-x-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Submitting...</span>
                            </>
                        ) : (
                            <>
                                <Send size={20} />
                                <span>Submit</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default DynamicForm
