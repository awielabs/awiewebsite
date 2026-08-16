export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const servicesData: Service[] = [
  {
    id: "apps",
    title: "Apps Development",
    description: "Custom mobile applications for Android & iOS that delivers excellent user experiences.",
    iconName: "Smartphone"
  },
  {
    id: "web",
    title: "Web Development",
    description: "Modern, responsive and high-performance web solutions for your business.",
    iconName: "Globe"
  },
  {
    id: "iot",
    title: "IoT Solutions",
    description: "Smart and scalable IoT systems to connect, monitor and automate everything.",
    iconName: "Wifi"
  },
  {
    id: "electronics",
    title: "Electronics Design",
    description: "PCB design, circuit design and embedded systems for innovative electronic products.",
    iconName: "Cpu"
  },
  {
    id: "cloud",
    title: "Cloud & Backend",
    description: "Robust cloud infrastructure and backend systems that scale with your needs.",
    iconName: "Cloud"
  },
  {
    id: "prototyping",
    title: "Prototyping & R&D",
    description: "Rapid prototyping and research-driven solutions to turn ideas into reality.",
    iconName: "Settings"
  }
];
