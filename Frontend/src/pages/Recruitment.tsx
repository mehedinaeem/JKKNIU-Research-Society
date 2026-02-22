import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { XCircle, ArrowLeft } from 'lucide-react'

const Recruitment = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-100/20 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                <div className="max-w-lg w-full text-center bg-white rounded-2xl shadow-xl p-10">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                            <XCircle className="text-red-500" size={48} />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-secondary-900 mb-4">
                        Not Receiving Applications
                    </h1>
                    <p className="text-secondary-600 mb-3">
                        The recruitment for <strong>Young Researcher Recruitment 6.0</strong> has been completed.
                    </p>
                    <p className="text-secondary-500 text-sm mb-8">
                        We are not accepting new applications at this time. Please follow our social media and events page for future recruitment announcements.
                    </p>
                    <Link
                        to="/events"
                        className="inline-flex items-center space-x-2 btn-primary px-6 py-3"
                    >
                        <ArrowLeft size={18} />
                        <span>Back to Events</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Recruitment

