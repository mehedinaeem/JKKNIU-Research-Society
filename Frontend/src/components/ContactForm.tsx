import { useState } from 'react'
import { Send, User, Mail, MessageSquare, BookOpen, CheckCircle, Loader2 } from 'lucide-react'

interface FormData {
    name: string
    email: string
    department: string
    researchInterest: string
    message: string
}

const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        department: '',
        researchInterest: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    // Your actual Google Form action URL (changed viewform to formResponse)
    const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdgvYBnzykLGw2iJuwTCQxziiiiKZYG7ddr1T2FLpgT7BZE6w/formResponse"

    // Entry IDs from your Google Form
    const ENTRY_IDS = {
        name: 'entry.1713590287',
        email: 'entry.1474064494',
        department: 'entry.1116554861',
        researchInterest: 'entry.1899992818',
        message: 'entry.167187498'
    }

    const researchAreas = [
        'Computer Science & AI',
        'Engineering & Technology',
        'Life Sciences & Biology',
        'Social Sciences',
        'Environmental Science',
        'Mathematics & Statistics',
        'Other'
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const submitData = new FormData()
        submitData.append(ENTRY_IDS.name, formData.name)
        submitData.append(ENTRY_IDS.email, formData.email)
        submitData.append(ENTRY_IDS.department, formData.department)
        submitData.append(ENTRY_IDS.researchInterest, formData.researchInterest)
        submitData.append(ENTRY_IDS.message, formData.message)

        try {
            await fetch(GOOGLE_FORM_ACTION_URL, {
                method: 'POST',
                body: submitData,
                mode: 'no-cors'
            })

            setIsSubmitted(true)
            setFormData({
                name: '',
                email: '',
                department: '',
                researchInterest: '',
                message: ''
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
                    <h3 className="text-3xl font-bold text-primary-800 mb-4">Thank You!</h3>
                    <p className="text-primary-700 text-lg mb-8">
                        Your message has been submitted successfully. We'll get back to you soon!
                    </p>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-8 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-all duration-300"
                    >
                        Submit Another Response
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Form Header */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl mb-4 shadow-lg">
                    <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-3">
                    Join Our Research Community
                </h2>
                <p className="text-secondary-600 text-lg">
                    Connect with fellow researchers and explore collaborative opportunities
                </p>
            </div>

            {/* Form Card */}
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Decorative Header */}
                <div className="h-2 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700"></div>

                <div className="p-8 md:p-10 space-y-6">
                    {/* Name Field */}
                    <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-secondary-700 mb-2">
                            <User size={16} className="text-primary-600" />
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 rounded-xl border-2 border-secondary-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 outline-none"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-secondary-700 mb-2">
                            <Mail size={16} className="text-primary-600" />
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                            className="w-full px-4 py-3 rounded-xl border-2 border-secondary-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 outline-none"
                        />
                    </div>

                    {/* Department Field */}
                    <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-secondary-700 mb-2">
                            <BookOpen size={16} className="text-primary-600" />
                            Department
                        </label>
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Computer Science & Engineering"
                            className="w-full px-4 py-3 rounded-xl border-2 border-secondary-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 outline-none"
                        />
                    </div>

                    {/* Research Interest Dropdown */}
                    <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-secondary-700 mb-2">
                            <BookOpen size={16} className="text-primary-600" />
                            Research Interest
                        </label>
                        <select
                            name="researchInterest"
                            value={formData.researchInterest}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border-2 border-secondary-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 outline-none bg-white cursor-pointer"
                        >
                            <option value="">Select your research area</option>
                            {researchAreas.map((area) => (
                                <option key={area} value={area}>{area}</option>
                            ))}
                        </select>
                    </div>

                    {/* Message Field */}
                    <div className="group">
                        <label className="flex items-center gap-2 text-sm font-semibold text-secondary-700 mb-2">
                            <MessageSquare size={16} className="text-primary-600" />
                            Message
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={4}
                            placeholder="Tell us about your research interests and how you'd like to contribute..."
                            className="w-full px-4 py-3 rounded-xl border-2 border-secondary-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-300 outline-none resize-none"
                        />
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
                        🔬 Join 500+ researchers in our growing community
                    </p>
                </div>
            </form>
        </div>
    )
}

export default ContactForm
