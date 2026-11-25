import { motion } from 'motion/react'
import { ExternalLink, ShieldCheck } from 'lucide-react'
import { useCertifications } from '@/features/certifications/queries'

const CERT_IMAGES: Record<string, string> = {
  'aws-solutions-architect': '/AWS_Solutions_Architect_Associate.png',
  'aws-developer':           '/AWS_Developer_Associate.png',
  'aws-ml':                  '/AWS_Machine_Learning_Engineer_Associate.png',
  'aws-genai':               '/AWS_Generative_AI_Developer_Professional.png',
  'aws-data-engineer':       '/AWS_Data_Engineer_Associate.png',
}

const LEVEL_COLOR: Record<string, string> = {
  'Associate':   'bg-primary/10 text-primary border-primary/20',
  'Professional':'bg-secondary/10 text-secondary border-secondary/20',
}

export function Certifications() {
  const { data: certs = [] } = useCertifications()

  return (
    <section id="certifications" className="py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">Credentials</p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            AWS <span className="text-brand-gradient">Certifications</span>
          </h2>
          <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">
            5 active AWS certifications spanning cloud architecture, development, machine learning, generative AI, and data engineering.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {certs.map((cert, i) => (
            <motion.a
              key={cert.id}
              href={cert.credlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 28, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="group relative rounded-2xl border border-border bg-card shadow-card hover:shadow-glow hover:border-primary/30 transition-shadow duration-300 flex flex-col items-center gap-4 p-6 overflow-hidden"
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

              {/* Badge image */}
              <div className="relative w-20 h-20 flex items-center justify-center">
                {CERT_IMAGES[cert.id] ? (
                  <img
                    src={CERT_IMAGES[cert.id]}
                    alt={cert.title}
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-brand-gradient flex items-center justify-center">
                    <ShieldCheck size={28} className="text-white" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-center space-y-1.5 flex-1">
                <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border ${LEVEL_COLOR[cert.level] ?? 'bg-accent text-accent-foreground border-border'}`}>
                  {cert.level}
                </span>
                <h3 className="text-xs sm:text-sm font-semibold leading-snug">{cert.title}</h3>
                <p className="text-[11px] text-muted-foreground">{cert.issuer}</p>
              </div>

              {/* Credly link — always visible */}
              <div className="flex items-center gap-1 text-[11px] text-primary font-medium">
                <ExternalLink size={10} /> Verify →
              </div>
            </motion.a>
          ))}
        </div>

        {/* AWS badge strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card text-sm text-muted-foreground">
            <ShieldCheck size={14} className="text-primary" />
            All certifications verified on{' '}
            <a
              href="https://www.credly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Credly
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
