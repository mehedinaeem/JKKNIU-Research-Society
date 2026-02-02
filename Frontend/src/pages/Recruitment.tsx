import YoungResearcherForm from '../components/YoungResearcherForm'

const Recruitment = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-100/20 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 py-20 px-4">
                <YoungResearcherForm />
            </div>
        </div>
    )
}

export default Recruitment
