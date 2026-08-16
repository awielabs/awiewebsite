'use client';

import { Project } from '@/data/projects';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#0B0F17]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-[#161F2E] border border-[#22D3EE]/40 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#101827] border border-white/10 text-white flex items-center justify-center hover:bg-[#2563EB] hover:border-[#22D3EE] transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Category Tag */}
            <span className="inline-block px-3 py-1 bg-[#22D3EE]/15 text-[#22D3EE] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              {project.category}
            </span>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{project.title}</h2>

            {/* Image */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-white/10"
            />

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#101827] p-5 rounded-xl border border-white/5">
                <h4 className="text-[#22D3EE] font-semibold text-base mb-2">The Problem</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{project.problem}</p>
              </div>
              <div className="bg-[#101827] p-5 rounded-xl border border-white/5">
                <h4 className="text-[#22D3EE] font-semibold text-base mb-2">The Solution</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{project.solution}</p>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-[#101827] p-5 rounded-xl border border-white/5 mb-6">
              <h4 className="text-white font-semibold text-base mb-3">Engineering Features</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-gray-300">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#22D3EE] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Pills */}
            <div className="bg-[#101827] p-5 rounded-xl border border-white/5 mb-6">
              <h4 className="text-white font-semibold text-base mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#2563EB]/20 border border-[#2563EB]/40 rounded-lg text-xs font-semibold text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                href="/contact"
                className="btn-glow-blue inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm w-full sm:w-auto"
                onClick={onClose}
              >
                <span>Inquire About Similar Project</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
