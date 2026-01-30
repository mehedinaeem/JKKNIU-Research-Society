import { useEffect, useState } from 'react'

interface Particle {
    id: number
    x: number
    y: number
    size: number
    duration: number
    delay: number
    type: 'molecule' | 'dna' | 'network' | 'atom'
}

const ResearchAnimation = () => {
    const [particles, setParticles] = useState<Particle[]>([])

    useEffect(() => {
        const newParticles: Particle[] = []

        // Generate particles
        for (let i = 0; i < 30; i++) {
            const types: Particle['type'][] = ['molecule', 'dna', 'network', 'atom']
            newParticles.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 20 + 10,
                duration: Math.random() * 10 + 15,
                delay: Math.random() * 5,
                type: types[Math.floor(Math.random() * types.length)]
            })
        }
        setParticles(newParticles)
    }, [])

    const renderParticle = (particle: Particle) => {
        const baseClass = "absolute opacity-30 animate-float pointer-events-none"

        switch (particle.type) {
            case 'molecule':
                return (
                    <div
                        key={particle.id}
                        className={baseClass}
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animationDuration: `${particle.duration}s`,
                            animationDelay: `${particle.delay}s`,
                        }}
                    >
                        {/* Molecule structure */}
                        <div className="relative" style={{ width: particle.size, height: particle.size }}>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full shadow-glow-yellow"></div>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full"></div>
                            <div className="absolute bottom-0 left-0 w-2 h-2 bg-purple-400 rounded-full"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 bg-pink-400 rounded-full"></div>
                            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }}>
                                <line x1="50%" y1="50%" x2="50%" y2="0%" stroke="#22d3ee" strokeWidth="1" />
                                <line x1="50%" y1="50%" x2="0%" y2="100%" stroke="#a855f7" strokeWidth="1" />
                                <line x1="50%" y1="50%" x2="100%" y2="100%" stroke="#ec4899" strokeWidth="1" />
                            </svg>
                        </div>
                    </div>
                )

            case 'dna':
                return (
                    <div
                        key={particle.id}
                        className={`${baseClass} animate-spin-slow`}
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animationDuration: `${particle.duration}s`,
                            animationDelay: `${particle.delay}s`,
                        }}
                    >
                        {/* DNA Helix */}
                        <div className="relative" style={{ width: particle.size * 0.8, height: particle.size * 2 }}>
                            <div className="absolute w-full h-full">
                                {[0, 1, 2, 3].map(i => (
                                    <div key={i} className="absolute w-full flex justify-between items-center" style={{ top: `${i * 25}%` }}>
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                        <div className="flex-1 h-0.5 bg-gradient-to-r from-cyan-400 via-white/50 to-purple-400"></div>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )

            case 'network':
                return (
                    <div
                        key={particle.id}
                        className={baseClass}
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animationDuration: `${particle.duration}s`,
                            animationDelay: `${particle.delay}s`,
                        }}
                    >
                        {/* Network nodes */}
                        <div className="relative" style={{ width: particle.size * 1.5, height: particle.size * 1.5 }}>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-cyan-300 rounded-full"></div>
                            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-purple-300 rounded-full"></div>
                            <svg className="absolute inset-0 w-full h-full opacity-40">
                                <line x1="50%" y1="50%" x2="0%" y2="0%" stroke="#22d3ee" strokeWidth="1" strokeDasharray="2,2" />
                                <line x1="50%" y1="50%" x2="100%" y2="0%" stroke="#facc15" strokeWidth="1" strokeDasharray="2,2" />
                                <line x1="50%" y1="50%" x2="50%" y2="100%" stroke="#a855f7" strokeWidth="1" strokeDasharray="2,2" />
                            </svg>
                        </div>
                    </div>
                )

            case 'atom':
                return (
                    <div
                        key={particle.id}
                        className={`${baseClass}`}
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            animationDuration: `${particle.duration}s`,
                            animationDelay: `${particle.delay}s`,
                        }}
                    >
                        {/* Atom with orbits */}
                        <div className="relative animate-spin-slow" style={{ width: particle.size, height: particle.size }}>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full shadow-glow-yellow"></div>
                            <div className="absolute inset-0 border border-cyan-400/50 rounded-full"></div>
                            <div className="absolute inset-1 border border-purple-400/50 rounded-full rotate-45"></div>
                            <div className="absolute inset-2 border border-pink-400/50 rounded-full -rotate-45"></div>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"></div>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-400 rounded-full"></div>
                        </div>
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-900/20 via-primary-900/10 to-purple-900/20 animate-gradient-shift"></div>

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
                    backgroundSize: '50px 50px',
                }}
            ></div>

            {/* Floating particles */}
            {particles.map(renderParticle)}

            {/* Connecting lines animation */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#facc15" />
                    </linearGradient>
                </defs>
                <line x1="0%" y1="30%" x2="100%" y2="70%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-dash" />
                <line x1="20%" y1="0%" x2="80%" y2="100%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-dash-reverse" />
                <line x1="100%" y1="20%" x2="0%" y2="80%" stroke="url(#lineGradient)" strokeWidth="1" className="animate-dash" />
            </svg>
        </div>
    )
}

export default ResearchAnimation
