import { useState } from 'react'
import { Send, User, Mail, Phone, BookOpen, CheckCircle, Loader2, Image, FileText, Facebook } from 'lucide-react'

interface FormData {
    name: string
    department: string
    session: string
    email: string
    whatsappNumber: string
    facebookId: string
    formalPhoto: string
    researchInterest: string
    whyJoin: string
    expectations: string
    priorExperience: string
    hasPublications: string
    transactionId: string
}

const YoungResearcherForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        department: '',
        session: '',
        email: '',
        whatsappNumber: '',
        facebookId: '',
        formalPhoto: '',
        researchInterest: '',
        whyJoin: '',
        expectations: '',
        priorExperience: '',
        hasPublications: '',
        transactionId: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})

    // Google Form action URL
    const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe1jKvZOHlgfx6n-fvk0MMj6g8os-l01ea-RKabMF9EnHYXuw/formResponse"

    // Entry IDs from your Google Form
    const ENTRY_IDS = {
        name: 'entry.120762379',
        department: 'entry.1532548749',
        session: 'entry.140628752',
        email: 'entry.1633268407',
        whatsappNumber: 'entry.1589072760',
        facebookId: 'entry.842011154',
        formalPhoto: 'entry.1631458569',
        researchInterest: 'entry.1446170046',
        whyJoin: 'entry.1042567384',
        expectations: 'entry.780566374',
        priorExperience: 'entry.1009923903',
        hasPublications: 'entry.1372427898',
        transactionId: 'entry.205071350'
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        // Clear error when user types
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {}

        if (!formData.name.trim()) newErrors.name = 'Name is required'
        if (!formData.department.trim()) newErrors.department = 'Department is required'
        if (!formData.session.trim()) newErrors.session = 'Session is required'
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }
        if (!formData.whatsappNumber.trim()) newErrors.whatsappNumber = 'WhatsApp number is required'
        if (!formData.researchInterest.trim()) newErrors.researchInterest = 'Research interest is required'
        if (!formData.whyJoin.trim()) newErrors.whyJoin = 'This field is required'
        if (!formData.expectations.trim()) newErrors.expectations = 'This field is required'
        if (!formData.priorExperience.trim()) newErrors.priorExperience = 'This field is required'
        if (!formData.hasPublications) newErrors.hasPublications = 'Please select an option'
        if (!formData.transactionId.trim()) newErrors.transactionId = 'Transaction ID is required'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        const submitData = new FormData()
        submitData.append(ENTRY_IDS.name, formData.name)
        submitData.append(ENTRY_IDS.department, formData.department)
        submitData.append(ENTRY_IDS.session, formData.session)
        submitData.append(ENTRY_IDS.email, formData.email)
        submitData.append(ENTRY_IDS.whatsappNumber, formData.whatsappNumber)
        submitData.append(ENTRY_IDS.facebookId, formData.facebookId)
        submitData.append(ENTRY_IDS.formalPhoto, formData.formalPhoto)
        submitData.append(ENTRY_IDS.researchInterest, formData.researchInterest)
        submitData.append(ENTRY_IDS.whyJoin, formData.whyJoin)
        submitData.append(ENTRY_IDS.expectations, formData.expectations)
        submitData.append(ENTRY_IDS.priorExperience, formData.priorExperience)
        submitData.append(ENTRY_IDS.hasPublications, formData.hasPublications)
        submitData.append(ENTRY_IDS.transactionId, formData.transactionId)

        try {
            await fetch(GOOGLE_FORM_ACTION_URL, {
                method: 'POST',
                body: submitData,
                mode: 'no-cors'
            })

            setIsSubmitted(true)
            setFormData({
                name: '',
                department: '',
                session: '',
                email: '',
                whatsappNumber: '',
                facebookId: '',
                formalPhoto: '',
                researchInterest: '',
                whyJoin: '',
                expectations: '',
                priorExperience: '',
                hasPublications: '',
                transactionId: ''
            })
        } catch (error) {
            console.error('Error submitting form:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSubmitted) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-12 text-center shadow-xl">
                    <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-primary-800 mb-4">Application Submitted!</h3>
                    <p className="text-primary-700 text-lg mb-8">
                        Thank you for applying to join the JKKNIU Research Society.
                        We will review your application and get back to you soon!
                    </p>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-8 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-all duration-300"
                    >
                        Submit Another Application
                    </button>
                </div>
            </div>
        )
    }

    const inputClasses = "w-full px-4 py-3 rounded-xl border-2 border-secondary-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 outline-none"
    const errorInputClasses = "w-full px-4 py-3 rounded-xl border-2 border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none"
    const labelClasses = "flex items-center gap-2 text-sm font-semibold text-secondary-700 mb-2"

    return (
        <div className="max-w-2xl mx-auto">
            {/* Form Header */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl mb-4 shadow-lg">
                    <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-3">
                    Young Researcher Application
                </h2>
                <p className="text-secondary-600 text-lg">
                    Join JKKNIU Research Society and start your research journey
                </p>
            </div>

            {/* Form Card */}
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Decorative Header */}
                <div className="h-2 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700"></div>

                <div className="p-8 md:p-10 space-y-6">
                    {/* Name Field */}
                    <div className="group">
                        <label className={labelClasses}>
                            <User size={16} className="text-primary-600" />
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className={errors.name ? errorInputClasses : inputClasses}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Department Field */}
                    <div className="group">
                        <label className={labelClasses}>
                            <BookOpen size={16} className="text-primary-600" />
                            Department <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            placeholder="e.g., Computer Science & Engineering"
                            className={errors.department ? errorInputClasses : inputClasses}
                        />
                        {errors.department && <p className="text-red-500 text-sm mt-1">{errors.department}</p>}
                    </div>

                    {/* Session Field */}
                    <div className="group">
                        <label className={labelClasses}>
                            <FileText size={16} className="text-primary-600" />
                            Session <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="session"
                            value={formData.session}
                            onChange={handleChange}
                            placeholder="e.g., 2023-24"
                            className={errors.session ? errorInputClasses : inputClasses}
                        />
                        {errors.session && <p className="text-red-500 text-sm mt-1">{errors.session}</p>}
                    </div>

                    {/* Email Field */}
                    <div className="group">
                        <label className={labelClasses}>
                            <Mail size={16} className="text-primary-600" />
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            className={errors.email ? errorInputClasses : inputClasses}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* WhatsApp Number Field */}
                    <div className="group">
                        <label className={labelClasses}>
                            <Phone size={16} className="text-primary-600" />
                            WhatsApp Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="whatsappNumber"
                            value={formData.whatsappNumber}
                            onChange={handleChange}
                            placeholder="e.g., 01XXXXXXXXX"
                            className={errors.whatsappNumber ? errorInputClasses : inputClasses}
                        />
                        {errors.whatsappNumber && <p className="text-red-500 text-sm mt-1">{errors.whatsappNumber}</p>}
                    </div>

                    {/* Facebook ID Field */}
                    <div className="group">
                        <label className={labelClasses}>
                            <Facebook size={16} className="text-primary-600" />
                            Facebook ID
                        </label>
                        <input
                            type="text"
                            name="facebookId"
                            value={formData.facebookId}
                            onChange={handleChange}
                            placeholder="Your Facebook profile link or username"
                            className={inputClasses}
                        />
                    </div>

                    {/* Formal Photo - Text Field */}
                    <div className="group">
                        <label className={labelClasses}>
                            <Image size={16} className="text-primary-600" />
                            Formal Photo
                        </label>
                        <input
                            type="text"
                            name="formalPhoto"
                            value={formData.formalPhoto}
                            onChange={handleChange}
                            placeholder="Enter Google Drive link to your formal photo"
                            className={inputClasses}
                        />
                        <p className="text-secondary-500 text-sm mt-1">
                            Upload your photo to Google Drive and paste the shareable link here
                        </p>
                    </div>

                    {/* Area of Research Interest/Topic */}
                    <div className="group">
                        <label className={labelClasses}>
                            <BookOpen size={16} className="text-primary-600" />
                            Area of Research Interest/Topic <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="researchInterest"
                            value={formData.researchInterest}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Describe your research interests and topics you want to explore..."
                            className={errors.researchInterest ? errorInputClasses : inputClasses}
                        />
                        {errors.researchInterest && <p className="text-red-500 text-sm mt-1">{errors.researchInterest}</p>}
                    </div>

                    {/* Why Join */}
                    <div className="group">
                        <label className={labelClasses}>
                            Why do you want to join the Research Society? <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="whyJoin"
                            value={formData.whyJoin}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Tell us your motivation for joining..."
                            className={errors.whyJoin ? errorInputClasses : inputClasses}
                        />
                        {errors.whyJoin && <p className="text-red-500 text-sm mt-1">{errors.whyJoin}</p>}
                    </div>

                    {/* Expectations */}
                    <div className="group">
                        <label className={labelClasses}>
                            What do you expect from the Research Society? <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="expectations"
                            value={formData.expectations}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Share your expectations and goals..."
                            className={errors.expectations ? errorInputClasses : inputClasses}
                        />
                        {errors.expectations && <p className="text-red-500 text-sm mt-1">{errors.expectations}</p>}
                    </div>

                    {/* Prior Research Experience */}
                    <div className="group">
                        <label className={labelClasses}>
                            Do you have any prior research experience? If yes, briefly describe it. <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="priorExperience"
                            value={formData.priorExperience}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Describe any previous research experience you have..."
                            className={errors.priorExperience ? errorInputClasses : inputClasses}
                        />
                        {errors.priorExperience && <p className="text-red-500 text-sm mt-1">{errors.priorExperience}</p>}
                    </div>

                    {/* Publications - Radio Buttons */}
                    <div className="group">
                        <label className={labelClasses}>
                            Do you have any publications? <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-3 mt-2">
                            <label className="flex items-center gap-3 cursor-pointer group/radio">
                                <input
                                    type="radio"
                                    name="hasPublications"
                                    value="Yes"
                                    checked={formData.hasPublications === 'Yes'}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-primary-600 border-2 border-secondary-300 focus:ring-primary-500"
                                />
                                <span className="text-secondary-700 group-hover/radio:text-secondary-900">Yes</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group/radio">
                                <input
                                    type="radio"
                                    name="hasPublications"
                                    value="No"
                                    checked={formData.hasPublications === 'No'}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-primary-600 border-2 border-secondary-300 focus:ring-primary-500"
                                />
                                <span className="text-secondary-700 group-hover/radio:text-secondary-900">No</span>
                            </label>
                        </div>
                        {errors.hasPublications && <p className="text-red-500 text-sm mt-1">{errors.hasPublications}</p>}
                    </div>

                    {/* Transaction ID */}
                    <div className="group">
                        <label className={labelClasses}>
                            Transaction ID <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="transactionId"
                            value={formData.transactionId}
                            onChange={handleChange}
                            placeholder="Enter your payment transaction ID"
                            className={errors.transactionId ? errorInputClasses : inputClasses}
                        />
                        {errors.transactionId && <p className="text-red-500 text-sm mt-1">{errors.transactionId}</p>}
                        <p className="text-secondary-500 text-sm mt-1">
                            Please complete the payment and enter the transaction ID here
                        </p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Send size={20} />
                                Submit Application
                            </>
                        )}
                    </button>
                </div>

                {/* Decorative Footer */}
                <div className="px-8 py-4 bg-gradient-to-r from-primary-50 to-primary-100 border-t border-primary-100">
                    <p className="text-center text-sm text-primary-700">
                        🔬 Join JKKNIU Research Society and kickstart your research career
                    </p>
                </div>
            </form>
        </div>
    )
}

export default YoungResearcherForm
