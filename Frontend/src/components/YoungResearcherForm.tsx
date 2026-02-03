import { useState, useRef } from 'react'
import { Send, User, Mail, Phone, BookOpen, CheckCircle, Loader2, Upload, X, Image, FileText, Facebook, GraduationCap, Microscope, CreditCard, ChevronRight, ChevronLeft } from 'lucide-react'

interface FormData {
    name: string
    department: string
    session: string
    email: string
    whatsappNumber: string
    facebookId: string
    formalPhotoUrl: string
    researchInterest: string
    whyJoin: string
    expectations: string
    priorExperience: string
    hasPublications: string
    transactionId: string
}

const YoungResearcherForm = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        department: '',
        session: '',
        email: '',
        whatsappNumber: '',
        facebookId: '',
        formalPhotoUrl: '',
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
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const steps = [
        { title: 'Introduction', icon: GraduationCap, color: 'primary' },
        { title: 'Personal Information', icon: User, color: 'blue' },
        { title: 'Research Background', icon: Microscope, color: 'purple' },
        { title: 'Application Fee', icon: CreditCard, color: 'green' }
    ]

    // Cloudinary configuration
    const CLOUDINARY_CLOUD_NAME = 'dqiecxgh0'
    const CLOUDINARY_UPLOAD_PRESET = 'JKKNIURS Recruitement 6.0'

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
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const uploadToCloudinary = async (file: File): Promise<string> => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData
            }
        )

        if (!response.ok) {
            throw new Error('Failed to upload image')
        }

        const data = await response.json()
        return data.secure_url
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            setErrors(prev => ({ ...prev, formalPhotoUrl: 'Please select an image file' }))
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, formalPhotoUrl: 'Image size must be less than 5MB' }))
            return
        }

        setSelectedFile(file)
        setIsUploading(true)
        setUploadProgress(0)
        setErrors(prev => ({ ...prev, formalPhotoUrl: '' }))

        try {
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => Math.min(prev + 10, 90))
            }, 200)

            const imageUrl = await uploadToCloudinary(file)

            clearInterval(progressInterval)
            setUploadProgress(100)

            setFormData(prev => ({ ...prev, formalPhotoUrl: imageUrl }))

            setTimeout(() => {
                setUploadProgress(0)
            }, 1000)
        } catch (error) {
            console.error('Upload error:', error)
            setErrors(prev => ({ ...prev, formalPhotoUrl: 'Failed to upload image. Please try again.' }))
            setSelectedFile(null)
        } finally {
            setIsUploading(false)
        }
    }

    const removeFile = () => {
        setSelectedFile(null)
        setFormData(prev => ({ ...prev, formalPhotoUrl: '' }))
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const validateStep = (step: number): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {}

        if (step === 1) {
            // Personal Information validation
            if (!formData.name.trim()) newErrors.name = 'Name is required'
            if (!formData.department.trim()) newErrors.department = 'Department is required'
            if (!formData.session.trim()) newErrors.session = 'Session is required'
            if (!formData.email.trim()) {
                newErrors.email = 'Email is required'
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email'
            }
            if (!formData.whatsappNumber.trim()) newErrors.whatsappNumber = 'WhatsApp number is required'
        } else if (step === 2) {
            // Research Background validation
            if (!formData.researchInterest.trim()) newErrors.researchInterest = 'Research interest is required'
            if (!formData.whyJoin.trim()) newErrors.whyJoin = 'This field is required'
            if (!formData.expectations.trim()) newErrors.expectations = 'This field is required'
            if (!formData.priorExperience.trim()) newErrors.priorExperience = 'This field is required'
            if (!formData.hasPublications) newErrors.hasPublications = 'Please select an option'
        } else if (step === 3) {
            // Application Fee validation
            if (!formData.transactionId.trim()) newErrors.transactionId = 'Transaction ID is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleNext = () => {
        if (currentStep === 0 || validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateStep(3)) return

        setIsSubmitting(true)

        const submitData = new FormData()
        submitData.append(ENTRY_IDS.name, formData.name)
        submitData.append(ENTRY_IDS.department, formData.department)
        submitData.append(ENTRY_IDS.session, formData.session)
        submitData.append(ENTRY_IDS.email, formData.email)
        submitData.append(ENTRY_IDS.whatsappNumber, formData.whatsappNumber)
        submitData.append(ENTRY_IDS.facebookId, formData.facebookId)
        submitData.append(ENTRY_IDS.formalPhoto, formData.formalPhotoUrl)
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
                formalPhotoUrl: '',
                researchInterest: '',
                whyJoin: '',
                expectations: '',
                priorExperience: '',
                hasPublications: '',
                transactionId: ''
            })
            setSelectedFile(null)
            setCurrentStep(0)
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
        <div className="max-w-3xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-8">
                <div className="flex items-center justify-between relative">
                    {/* Progress Line */}
                    <div className="absolute top-5 left-0 right-0 h-1 bg-secondary-200 mx-10">
                        <div
                            className="h-full bg-primary-600 transition-all duration-500"
                            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                        ></div>
                    </div>

                    {steps.map((step, index) => {
                        const StepIcon = step.icon
                        const isActive = index === currentStep
                        const isCompleted = index < currentStep

                        return (
                            <div key={index} className="flex flex-col items-center relative z-10">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive
                                        ? 'bg-primary-600 text-white shadow-lg scale-110'
                                        : isCompleted
                                            ? 'bg-primary-600 text-white'
                                            : 'bg-secondary-200 text-secondary-500'
                                        }`}
                                >
                                    {isCompleted ? (
                                        <CheckCircle size={20} />
                                    ) : (
                                        <StepIcon size={20} />
                                    )}
                                </div>
                                <span className={`text-xs mt-2 font-medium hidden sm:block ${isActive ? 'text-primary-700' : 'text-secondary-500'
                                    }`}>
                                    {step.title}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {/* ===== STEP 0: Introduction ===== */}
                {currentStep === 0 && (
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-fadeIn">
                        {/* Banner Image */}
                        <div className="w-full">
                            <img
                                src="/recruitment-banner.png"
                                alt="Young Researcher Recruitment 6.0"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        <div className="p-8 md:p-10">
                            <div className="prose prose-secondary max-w-none">
                                <p className="text-secondary-600 leading-relaxed mb-4">
                                    The Research Society of Jatiya Kabi Kazi Nazrul Islam University (JKKNIU) is inviting passionate and motivated students to join our <strong className="text-primary-700">Young Researcher Recruitment Program</strong>.
                                </p>
                                <p className="text-secondary-600 leading-relaxed mb-4">
                                    We welcome applicants from all disciplines who have a strong interest in research, critical thinking, data analysis, writing, and academic collaboration. Prior research experience is not mandatory - <strong className="text-primary-700">enthusiasm, commitment, and a willingness to learn</strong> are highly valued.
                                </p>
                                <p className="text-secondary-600 leading-relaxed mb-4">
                                    If you aspire to grow as a researcher and contribute to a vibrant research culture at JKKNIU, we encourage you to apply.
                                </p>
                                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                                    <p className="text-amber-800 font-medium text-sm">
                                        ⚠️ Only shortlisted candidates will be contacted.
                                    </p>
                                </div>
                            </div>

                            {/* Next Button */}
                            <div className="mt-8 flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold flex items-center gap-2 hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Start Application
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ===== STEP 1: Personal Information ===== */}
                {currentStep === 1 && (
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-fadeIn">
                        <div className="h-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"></div>
                        <div className="p-8 md:p-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <User className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-bold text-secondary-900">Personal Information</h2>
                            </div>
                            <p className="text-secondary-500 text-sm mb-6 bg-blue-50 p-3 rounded-lg border border-blue-100">
                                📋 The information provided will be used solely for recruitment and communication purposes. Please ensure all details are accurate.
                            </p>

                            <div className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label className={labelClasses}>
                                        <User size={16} className="text-blue-600" />
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

                                {/* Department */}
                                <div>
                                    <label className={labelClasses}>
                                        <BookOpen size={16} className="text-blue-600" />
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

                                {/* Session */}
                                <div>
                                    <label className={labelClasses}>
                                        <FileText size={16} className="text-blue-600" />
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

                                {/* Email */}
                                <div>
                                    <label className={labelClasses}>
                                        <Mail size={16} className="text-blue-600" />
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

                                {/* WhatsApp */}
                                <div>
                                    <label className={labelClasses}>
                                        <Phone size={16} className="text-blue-600" />
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

                                {/* Facebook ID */}
                                <div>
                                    <label className={labelClasses}>
                                        <Facebook size={16} className="text-blue-600" />
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

                                {/* Formal Photo Upload */}
                                <div>
                                    <label className={labelClasses}>
                                        <Image size={16} className="text-blue-600" />
                                        Formal Photo
                                    </label>
                                    <div className="relative">
                                        {formData.formalPhotoUrl ? (
                                            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border-2 border-green-200">
                                                <img
                                                    src={formData.formalPhotoUrl}
                                                    alt="Uploaded photo"
                                                    className="w-20 h-20 object-cover rounded-lg"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium text-green-800">Photo uploaded!</p>
                                                    <p className="text-sm text-green-600 truncate max-w-xs">
                                                        {selectedFile?.name || 'Image uploaded'}
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={removeFile}
                                                    className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                                                >
                                                    <X size={20} />
                                                </button>
                                            </div>
                                        ) : isUploading ? (
                                            <div className="p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <Loader2 size={24} className="text-blue-600 animate-spin" />
                                                    <span className="font-medium text-blue-700">Uploading...</span>
                                                </div>
                                                <div className="w-full bg-blue-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${uploadProgress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ) : (
                                            <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer hover:bg-secondary-50 transition-colors ${errors.formalPhotoUrl ? 'border-red-300' : 'border-secondary-300'}`}>
                                                <Upload size={32} className="text-secondary-400 mb-2" />
                                                <span className="text-secondary-700 font-medium text-sm">Click to upload photo</span>
                                                <span className="text-secondary-400 text-xs mt-1">JPG, PNG (Max 5MB)</span>
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        )}
                                    </div>
                                    {errors.formalPhotoUrl && <p className="text-red-500 text-sm mt-1">{errors.formalPhotoUrl}</p>}
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="mt-8 flex justify-between">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="px-6 py-3 border-2 border-secondary-300 text-secondary-700 rounded-xl font-semibold flex items-center gap-2 hover:bg-secondary-50 transition-all duration-300"
                                >
                                    <ChevronLeft size={20} />
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={isUploading}
                                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold flex items-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70"
                                >
                                    Next
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ===== STEP 2: Research Background & Interests ===== */}
                {currentStep === 2 && (
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-fadeIn">
                        <div className="h-2 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700"></div>
                        <div className="p-8 md:p-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                                    <Microscope className="w-5 h-5 text-purple-600" />
                                </div>
                                <h2 className="text-xl font-bold text-secondary-900">Research Background & Interests</h2>
                            </div>
                            <p className="text-secondary-500 text-sm mb-6 bg-purple-50 p-3 rounded-lg border border-purple-100">
                                🔬 Tell us about your research interests and why you want to be involved in research activities.
                            </p>

                            <div className="space-y-5">
                                {/* Research Interest */}
                                <div>
                                    <label className={labelClasses}>
                                        <BookOpen size={16} className="text-purple-600" />
                                        Area of Research Interest/Topic <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="researchInterest"
                                        value={formData.researchInterest}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Describe your research interests..."
                                        className={errors.researchInterest ? errorInputClasses : inputClasses}
                                    />
                                    {errors.researchInterest && <p className="text-red-500 text-sm mt-1">{errors.researchInterest}</p>}
                                </div>

                                {/* Why Join */}
                                <div>
                                    <label className={labelClasses}>
                                        Why do you want to join the Research Society? <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="whyJoin"
                                        value={formData.whyJoin}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Tell us your motivation..."
                                        className={errors.whyJoin ? errorInputClasses : inputClasses}
                                    />
                                    {errors.whyJoin && <p className="text-red-500 text-sm mt-1">{errors.whyJoin}</p>}
                                </div>

                                {/* Expectations */}
                                <div>
                                    <label className={labelClasses}>
                                        What do you expect from the Research Society? <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="expectations"
                                        value={formData.expectations}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Share your expectations..."
                                        className={errors.expectations ? errorInputClasses : inputClasses}
                                    />
                                    {errors.expectations && <p className="text-red-500 text-sm mt-1">{errors.expectations}</p>}
                                </div>

                                {/* Prior Experience */}
                                <div>
                                    <label className={labelClasses}>
                                        Do you have any prior research experience? If yes, briefly describe it. <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="priorExperience"
                                        value={formData.priorExperience}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Describe your experience..."
                                        className={errors.priorExperience ? errorInputClasses : inputClasses}
                                    />
                                    {errors.priorExperience && <p className="text-red-500 text-sm mt-1">{errors.priorExperience}</p>}
                                </div>

                                {/* Publications */}
                                <div>
                                    <label className={labelClasses}>
                                        Do you have any publications? <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-6 mt-2">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="hasPublications"
                                                value="Yes"
                                                checked={formData.hasPublications === 'Yes'}
                                                onChange={handleChange}
                                                className="w-5 h-5 text-purple-600 border-2 border-secondary-300 focus:ring-purple-500"
                                            />
                                            <span className="text-secondary-700">Yes</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="hasPublications"
                                                value="No"
                                                checked={formData.hasPublications === 'No'}
                                                onChange={handleChange}
                                                className="w-5 h-5 text-purple-600 border-2 border-secondary-300 focus:ring-purple-500"
                                            />
                                            <span className="text-secondary-700">No</span>
                                        </label>
                                    </div>
                                    {errors.hasPublications && <p className="text-red-500 text-sm mt-1">{errors.hasPublications}</p>}
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="mt-8 flex justify-between">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="px-6 py-3 border-2 border-secondary-300 text-secondary-700 rounded-xl font-semibold flex items-center gap-2 hover:bg-secondary-50 transition-all duration-300"
                                >
                                    <ChevronLeft size={20} />
                                    Back
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold flex items-center gap-2 hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Next
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ===== STEP 3: Application Fee Details ===== */}
                {currentStep === 3 && (
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-fadeIn">
                        <div className="h-2 bg-gradient-to-r from-green-500 via-green-600 to-green-700"></div>
                        <div className="p-8 md:p-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-green-600" />
                                </div>
                                <h2 className="text-xl font-bold text-secondary-900">Application Fee Details</h2>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
                                <p className="text-secondary-600 text-sm mb-3">
                                    💰 A one-time, non-refundable application fee of <strong className="text-green-700">BDT 100</strong> is required to submit this application. Applicants must complete the payment via bKash or Nagad using the official numbers provided below before submitting the form and enter the correct payment information for verification.
                                </p>
                                <div className="flex flex-wrap gap-4 mt-3">
                                    <div className="flex items-center gap-2 bg-pink-100 px-4 py-2 rounded-lg">
                                        <span className="font-bold text-pink-600">bKash:</span>
                                        <span className="text-pink-800 font-mono">01518975412</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-orange-100 px-4 py-2 rounded-lg">
                                        <span className="font-bold text-orange-600">Nagad:</span>
                                        <span className="text-orange-800 font-mono">01792220295</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5">
                                {/* Transaction ID */}
                                <div>
                                    <label className={labelClasses}>
                                        <CreditCard size={16} className="text-green-600" />
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
                                    <p className="text-secondary-500 text-sm mt-2">
                                        Please complete the payment and enter the transaction ID here
                                    </p>
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="mt-8 flex justify-between">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="px-6 py-3 border-2 border-secondary-300 text-secondary-700 rounded-xl font-semibold flex items-center gap-2 hover:bg-secondary-50 transition-all duration-300"
                                >
                                    <ChevronLeft size={20} />
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold flex items-center gap-2 hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={20} className="animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            Submit
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
                <p className="text-sm text-secondary-500">
                    🔬 Join JKKNIU Research Society and kickstart your research career
                </p>
            </div>

            {/* Animation Styles */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </div>
    )
}

export default YoungResearcherForm
