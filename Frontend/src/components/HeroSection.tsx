import { Link } from 'react-router-dom'
import { ArrowRight, Calendar } from 'lucide-react'
import ResearchAnimation from './ResearchAnimation'

const HeroSection = () => {
    // Local research animation video
    const videoUrl = "/media/Research-animation.mp4"

    return (
        <div className="w-full overflow-x-hidden">
            {/* Full-screen hero section */}
            <div className="relative w-full overflow-hidden">
                {/* Main hero container */}
                <div className="relative w-full h-screen">

                    {/* Background Video */}
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                        poster="/media/vc.jpeg"
                    >
                        <source src={videoUrl} type="video/quicktime" />
                        <source src={videoUrl} type="video/mp4" />
                        {/* Fallback image if video doesn't load */}
                        Your browser does not support the video tag.
                    </video>

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>

                    {/* Research Animation Background */}
                    <ResearchAnimation />

                    {/* Hero Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
                        {/* Main Title - JKKNIU */}
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white text-center animate-title tracking-wide drop-shadow-2xl">
                            JKKNIU
                        </h1>

                        {/* Golden Subtitle - Research Society */}
                        <h2
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mt-4 animate-title-delay italic drop-shadow-2xl"
                            style={{ color: '#F5A623' }}
                        >
                            Research Society
                        </h2>

                        {/* Tagline */}
                        <p className="text-white text-xl md:text-2xl lg:text-3xl mt-8 animate-fade-up font-light tracking-widest text-center drop-shadow-lg">
                            Advancing Knowledge & Inspiring Innovation
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-up-delay">
                            <Link
                                to="/membership"
                                className="group flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-secondary-900 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                style={{ backgroundColor: '#F5A623' }}
                            >
                                Join Us
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/events"
                                className="group flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white border-2 border-white/80 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                            >
                                Upcoming Events
                                <Calendar size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
