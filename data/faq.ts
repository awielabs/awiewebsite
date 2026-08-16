export interface FaqItem {
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    question: "What services does AWIE LABS provide?",
    answer: "AWIE LABS provides full-stack software development (Mobile Apps, Web Platforms, Cloud Backend) combined with hardware engineering (Embedded Systems, ESP32/STM32 Firmware, PCB Layout & Prototype Fabrication)."
  },
  {
    question: "Can AWIE LABS handle both hardware and software together?",
    answer: "Yes! Our specialty is end-to-end integration. We build physical circuit boards, program embedded firmware, construct cloud telemetry servers, and build mobile companion apps that talk to hardware in real-time."
  },
  {
    question: "How long does a typical project take?",
    answer: "Mobile app or web application MVPs typically take 3–6 weeks. Complex IoT hardware and multi-layer PCB prototyping cycles take 4–8 weeks including schematic capture, PCB fabrication, and firmware testing."
  },
  {
    question: "Do I own the intellectual property and source code?",
    answer: "Yes. Upon completion of contract milestones, 100% of source code, CAD schematics, PCB Gerber files, and intellectual property rights are delivered to you."
  }
];
