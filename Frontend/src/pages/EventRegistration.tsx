import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Calendar,
  Clock,
  MapPin,
  UserRound,
  Users,
  Send,
  Loader2,
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import {
  events,
  formatEventDate,
  formatEventTimeRange,
  formatStudentsRegistered
} from '../data/events'
import { useRegistrationCount } from '../hooks/useRegistrationCount'

interface RegistrationFormValues {
  fullName: string
  email: string
  mobileNumber: string
  department: string
  session: string
  studentId: string
  previouslyParticipated: string
  previousResearchExperience: string
  researchArea: string
  expectations: string
}

const GOOGLE_FORM_BASE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSf2NTC6OS5w8wFOLZMD0T52IGg2GxpVO9r3bHHDE1632Ynmpw'

const RESEARCH_EVENT_FORM_ACTION_URL =
  import.meta.env.VITE_RESEARCH_EVENT_FORM_ACTION_URL || `${GOOGLE_FORM_BASE_URL}/formResponse`
const RESEARCH_EVENT_ENTRY_FULL_NAME = import.meta.env.VITE_RESEARCH_EVENT_ENTRY_FULL_NAME || 'entry.1885145925'
const RESEARCH_EVENT_ENTRY_EMAIL = import.meta.env.VITE_RESEARCH_EVENT_ENTRY_EMAIL || 'entry.787947099'
const RESEARCH_EVENT_ENTRY_MOBILE_NUMBER = import.meta.env.VITE_RESEARCH_EVENT_ENTRY_MOBILE_NUMBER || 'entry.111236255'
const RESEARCH_EVENT_ENTRY_DEPARTMENT = import.meta.env.VITE_RESEARCH_EVENT_ENTRY_DEPARTMENT || 'entry.1068123373'
const RESEARCH_EVENT_ENTRY_SESSION = import.meta.env.VITE_RESEARCH_EVENT_ENTRY_SESSION || 'entry.2145961679'
const RESEARCH_EVENT_ENTRY_STUDENT_ID = import.meta.env.VITE_RESEARCH_EVENT_ENTRY_STUDENT_ID || 'entry.1979395834'
const RESEARCH_EVENT_ENTRY_PREVIOUSLY_PARTICIPATED =
  import.meta.env.VITE_RESEARCH_EVENT_ENTRY_PREVIOUSLY_PARTICIPATED || 'entry.370905792'
const RESEARCH_EVENT_ENTRY_PREVIOUS_RESEARCH_EXPERIENCE =
  import.meta.env.VITE_RESEARCH_EVENT_ENTRY_PREVIOUS_RESEARCH_EXPERIENCE || 'entry.1568005229'
const RESEARCH_EVENT_ENTRY_RESEARCH_AREA =
  import.meta.env.VITE_RESEARCH_EVENT_ENTRY_RESEARCH_AREA || 'entry.398865954'
const RESEARCH_EVENT_ENTRY_EXPECTATIONS =
  import.meta.env.VITE_RESEARCH_EVENT_ENTRY_EXPECTATIONS || 'entry.793542276'

const researchAreaOptions = [
  'Science and Technology',
  'Social Science',
  'Business and Economics',
  'Arts and Humanities',
  'Environmental Studies',
  'Health and Life Sciences',
  'Other'
]

const EventRegistration = () => {
  const { slug } = useParams<{ slug: string }>()
  const event = events.find((item) => item.slug === slug)
  const { count, isLoading, error } = useRegistrationCount(event?.registrationCountUrl || '')

  if (!event) {
    return (
      <section className="py-24 bg-secondary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">Event Not Found</h1>
          <p className="text-secondary-600 mb-6">
            We could not find the event registration page you requested.
          </p>
          <Link to="/events" className="btn-primary inline-flex items-center justify-center">
            Back to Events
          </Link>
        </div>
      </section>
    )
  }

  const isPastEvent = new Date(event.statusChangeDateTime).getTime() <= Date.now()

  return (
    <section className="py-16 bg-secondary-50">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 overflow-x-hidden">
        <div className="bg-white border border-secondary-200 rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(360px,0.9fr)_minmax(0,1.4fr)]">
            <div className="border-b lg:border-b-0 lg:border-r border-secondary-200 p-3 sm:p-4 md:p-6">
              <EventPoster imageSrc="/media/basics_research.png" title={event.title} />

              <h1 className="text-2xl font-bold text-secondary-900 mt-5 mb-4">{event.title}</h1>

              <div className="space-y-3 text-secondary-700 text-sm md:text-base">
                <div className="flex items-center space-x-2">
                  <Calendar className="text-primary-600" size={18} />
                  <span>{event.eventDate || formatEventDate(event.startDateTime)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="text-primary-600" size={18} />
                  <span>{formatEventTimeRange(event.startDateTime, event.endDateTime)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <UserRound className="text-primary-600" size={18} />
                  <span>{event.speaker}</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="text-primary-600 mt-0.5" size={18} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="text-primary-600" size={18} />
                  {isLoading && <span>Loading registration count...</span>}
                  {!isLoading && (error || count === null) && <span>Registration count unavailable</span>}
                  {!isLoading && !error && count !== null && <span>{formatStudentsRegistered(count)}</span>}
                </div>
              </div>
            </div>

            <div className="p-3 sm:p-4 md:p-6">
              {!isPastEvent ? (
                <>
                  <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                    Registration Form: Basics of Research
                  </h2>
                  <p className="text-secondary-600 mb-5">
                    JKKNIU Research Society is organizing an introductory research session titled
                    {' '}
                    <span className="font-medium text-secondary-800">Basics of Research</span>
                    {' '}
                    conducted by
                    {' '}
                    <span className="font-medium text-secondary-800">Dr. Sheikh Mehedi Hasan</span>
                    , Moderator, JKKNIU Research Society. Please complete this form to confirm your
                    participation. Seats may be limited.
                  </p>

                  <EventRegistrationForm />

                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <Link to="/events" className="btn-secondary inline-flex items-center justify-center">
                      Back to Events
                    </Link>
                  </div>
                </>
              ) : (
                <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-6">
                  <p className="text-lg font-semibold text-secondary-900 mb-2">Registration Closed</p>
                  <p className="text-emerald-700 font-medium mb-3">Event Completed</p>

                  {isLoading && <p className="text-secondary-700 mb-4">Loading registration count...</p>}
                  {!isLoading && (error || count === null) && (
                    <p className="text-secondary-700 mb-4">Registration count unavailable</p>
                  )}
                  {!isLoading && !error && count !== null && (
                    <p className="text-secondary-700 mb-4">{formatStudentsRegistered(count)}</p>
                  )}

                  <Link to="/events" className="btn-secondary inline-flex items-center justify-center">
                    Return to Events
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const EventRegistrationForm = () => {
  const formSteps = [
    {
      title: 'Personal Information',
      subtitle: 'Tell us who you are and how we can contact you.'
    },
    {
      title: 'Academic Information',
      subtitle: 'Share your session and university details.'
    },
    {
      title: 'Research Background and Interest',
      subtitle: 'Help us understand your current research journey.'
    }
  ]

  const [formValues, setFormValues] = useState<RegistrationFormValues>({
    fullName: '',
    email: '',
    mobileNumber: '',
    department: '',
    session: '',
    studentId: '',
    previouslyParticipated: '',
    previousResearchExperience: '',
    researchArea: '',
    expectations: ''
  })
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValues((previousValues) => ({
      ...previousValues,
      [event.target.name]: event.target.value
    }))
  }

  const validateStep = (step: number) => {
    if (step === 0) {
      if (!formValues.fullName || !formValues.email || !formValues.mobileNumber) {
        return 'Please complete all required personal information fields.'
      }
    }

    if (step === 1) {
      if (!formValues.department || !formValues.session || !formValues.studentId) {
        return 'Please complete all required academic information fields.'
      }
    }

    if (step === 2) {
      if (!formValues.previouslyParticipated || !formValues.previousResearchExperience) {
        return 'Please complete all required research background fields.'
      }

      if (!formValues.researchArea) {
        return 'Please select at least one research area.'
      }

    }

    return null
  }

  const handleNextStep = () => {
    const validationError = validateStep(currentStep)
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setCurrentStep((previousStep) => Math.min(previousStep + 1, formSteps.length - 1))
  }

  const handlePreviousStep = () => {
    setError(null)
    setCurrentStep((previousStep) => Math.max(previousStep - 1, 0))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (currentStep !== formSteps.length - 1) {
      handleNextStep()
      return
    }

    const validationError = validateStep(currentStep)
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setIsSubmitting(true)

    const payload = new FormData()
    payload.append(RESEARCH_EVENT_ENTRY_FULL_NAME, formValues.fullName)
    payload.append(RESEARCH_EVENT_ENTRY_EMAIL, formValues.email)
    payload.append(RESEARCH_EVENT_ENTRY_MOBILE_NUMBER, formValues.mobileNumber)
    payload.append(RESEARCH_EVENT_ENTRY_DEPARTMENT, formValues.department)
    payload.append(RESEARCH_EVENT_ENTRY_SESSION, formValues.session)
    payload.append(RESEARCH_EVENT_ENTRY_STUDENT_ID, formValues.studentId)
    payload.append(RESEARCH_EVENT_ENTRY_PREVIOUSLY_PARTICIPATED, formValues.previouslyParticipated)
    payload.append(
      RESEARCH_EVENT_ENTRY_PREVIOUS_RESEARCH_EXPERIENCE,
      formValues.previousResearchExperience
    )
    payload.append(RESEARCH_EVENT_ENTRY_RESEARCH_AREA, formValues.researchArea)
    // The Google Form requires this field, while it is intentionally optional in this UI.
    payload.append(RESEARCH_EVENT_ENTRY_EXPECTATIONS, formValues.expectations.trim() || 'Not provided')

    try {
      await fetch(RESEARCH_EVENT_FORM_ACTION_URL, {
        method: 'POST',
        body: payload,
        mode: 'no-cors'
      })

      setIsSubmitted(true)
      setFormValues({
        fullName: '',
        email: '',
        mobileNumber: '',
        department: '',
        session: '',
        studentId: '',
        previouslyParticipated: '',
        previousResearchExperience: '',
        researchArea: '',
        expectations: ''
      })
      setCurrentStep(0)
    } catch {
      setError('Submission failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-primary-50 border border-primary-100 rounded-xl p-6 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-primary-600 text-white flex items-center justify-center mb-3">
          <CheckCircle size={26} />
        </div>
        <h3 className="text-xl font-semibold text-secondary-900 mb-2">Registration Submitted</h3>
        <p className="text-secondary-600 mb-4">
          Thank you. Your response has been recorded for this research session.
        </p>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => setIsSubmitted(false)}
        >
          Submit Another Response
        </button>
      </div>
    )
  }

  const progressWidth = `${((currentStep + 1) / formSteps.length) * 100}%`

  const inputClassName =
    'w-full px-4 py-3 rounded-lg border border-secondary-300 bg-white text-secondary-900 placeholder:text-secondary-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 hover:border-secondary-400'

  const fieldLabelClassName = 'block text-sm font-semibold text-secondary-800 mb-1.5'
  const choiceClassName =
    'flex items-center gap-3 rounded-lg border border-secondary-200 bg-white px-4 py-3 text-secondary-700 shadow-sm transition-all hover:border-primary-300 hover:bg-primary-50/40 cursor-pointer has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 has-[:checked]:text-primary-800'

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-secondary-200 rounded-2xl overflow-hidden shadow-xl shadow-secondary-200/60">
      <div className="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 p-5 md:p-7 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">{formSteps[currentStep].title}</h3>
            <p className="text-sm text-primary-50 mt-1">{formSteps[currentStep].subtitle}</p>
          </div>
          <div className="shrink-0 text-sm font-semibold bg-white/15 border border-white/20 px-3 py-1.5 rounded-full">
            Step {currentStep + 1} of {formSteps.length}
          </div>
        </div>

        <div className="mt-5">
          <div className="w-full h-2 rounded-full bg-white/25 overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: progressWidth }}
            />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] sm:text-xs text-primary-100">
            {formSteps.map((step, index) => (
              <span
                key={step.title}
                className={index <= currentStep ? 'font-semibold text-white' : 'text-primary-200'}
              >
                {index + 1}. {step.title.replace(' Information', '')}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-5 md:p-7 space-y-6">
        <div className="flex items-center justify-between gap-3 border-b border-secondary-100 pb-4">
          <p className="text-sm text-secondary-600">Please provide accurate registration information.</p>
          <span className="shrink-0 text-xs font-medium text-secondary-500">* Required</span>
        </div>

        {currentStep === 0 && (
          <div className="space-y-5">
            <h4 className="text-base font-semibold text-secondary-900">Personal Information</h4>

            <div className="space-y-4">
              <div>
                <label className={fieldLabelClassName}>Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="fullName"
                  value={formValues.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={fieldLabelClassName}>Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  autoComplete="email"
                  required
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={fieldLabelClassName}>Mobile Number <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formValues.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter mobile number"
                  autoComplete="tel"
                  required
                  className={inputClassName}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-5">
            <h4 className="text-base font-semibold text-secondary-900">Academic Information</h4>

            <div className="space-y-4">
              <div>
                <label className={fieldLabelClassName}>Department <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="department"
                  value={formValues.department}
                  onChange={handleChange}
                  placeholder="Enter your department"
                  required
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={fieldLabelClassName}>Academic Session <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="session"
                  value={formValues.session}
                  onChange={handleChange}
                  placeholder="Enter Session (e.g., 2022-2023)"
                  required
                  className={inputClassName}
                />
              </div>

              <div>
                <label className={fieldLabelClassName}>Student ID / Roll Number <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="studentId"
                  value={formValues.studentId}
                  onChange={handleChange}
                  placeholder="Enter your student ID or roll"
                  required
                  className={inputClassName}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h4 className="text-base font-semibold text-secondary-900">Research Background and Interest</h4>

            <div>
              <label className={fieldLabelClassName}>
                Have you previously participated in any research-related session or workshop? <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col gap-3">
                <label className={choiceClassName}>
                  <input
                    type="radio"
                    name="previouslyParticipated"
                    value="Yes"
                    checked={formValues.previouslyParticipated === 'Yes'}
                    onChange={handleChange}
                  />
                  <span>Yes</span>
                </label>
                <label className={choiceClassName}>
                  <input
                    type="radio"
                    name="previouslyParticipated"
                    value="No"
                    checked={formValues.previouslyParticipated === 'No'}
                    onChange={handleChange}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            <div>
              <label className={fieldLabelClassName}>
                Do you have any previous research experience? <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col gap-3">
                <label className={choiceClassName}>
                  <input
                    type="radio"
                    name="previousResearchExperience"
                    value="Yes"
                    checked={formValues.previousResearchExperience === 'Yes'}
                    onChange={handleChange}
                  />
                  <span>Yes</span>
                </label>
                <label className={choiceClassName}>
                  <input
                    type="radio"
                    name="previousResearchExperience"
                    value="No"
                    checked={formValues.previousResearchExperience === 'No'}
                    onChange={handleChange}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            <div>
              <label className={fieldLabelClassName}>
                Which research area are you interested in? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 gap-2">
                {researchAreaOptions.map((area) => (
                  <label key={area} className={choiceClassName}>
                    <input
                      type="radio"
                      name="researchArea"
                      value={area}
                      checked={formValues.researchArea === area}
                      onChange={handleChange}
                    />
                    <span>{area}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={fieldLabelClassName}>
                What do you expect to learn from this session?
                <span className="ml-2 text-xs font-normal text-secondary-500">Optional</span>
              </label>
              <textarea
                name="expectations"
                value={formValues.expectations}
                onChange={handleChange}
                rows={4}
                placeholder="Share your learning goals for this session"
                className={inputClassName}
              />
            </div>
          </div>
        )}

        {error && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">{error}</p>}

        <p className="text-xs text-secondary-500">Never submit passwords through this form.</p>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handlePreviousStep}
            disabled={currentStep === 0 || isSubmitting}
            className="btn-secondary inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          {currentStep < formSteps.length - 1 ? (
            <button
              type="button"
              onClick={handleNextStep}
              disabled={isSubmitting}
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Next
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Final Submit
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

const EventPoster = ({ imageSrc, title }: { imageSrc: string; title: string }) => {
  const [hasLoadError, setHasLoadError] = useState(false)

  if (!imageSrc || hasLoadError) {
    return (
      <div className="w-full overflow-hidden rounded-lg border border-secondary-200 bg-secondary-100">
        <div className="py-10 text-center">
          <p className="text-secondary-500 text-sm">Image unavailable</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full overflow-hidden rounded-lg border border-secondary-200 bg-white">
      <img
        src={imageSrc}
        alt={`${title} poster`}
        className="block w-full h-auto max-w-full object-contain"
        onError={() => setHasLoadError(true)}
      />
    </div>
  )
}

export default EventRegistration
