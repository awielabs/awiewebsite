export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
}

export const processData: ProcessStep[] = [
  { step: "01", title: "Idea", desc: "Requirement gathering and goal mapping." },
  { step: "02", title: "Research", desc: "Feasibility assessment & component sourcing." },
  { step: "03", title: "Design", desc: "UI/UX mockups, schematics & PCB layout." },
  { step: "04", title: "Prototype", desc: "Initial functional builds and bench validation." },
  { step: "05", title: "Development", desc: "Production code, firmware & API compilation." },
  { step: "06", title: "Testing", desc: "QA stress testing, HIL sweeps & security audit." },
  { step: "07", title: "Deployment", desc: "Final release, documentation & ongoing support." }
];
