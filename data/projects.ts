export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  summary: string;
  problem: string;
  solution: string;
  techStack: string[];
  features: string[];
}

export const projectsData: Project[] = [
  {
    id: "robot-car",
    title: "Smart Robot Car",
    category: "IoT • Robotics",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    summary: "Autonomous robotic chassis equipped with obstacle avoidance, camera streaming, and Wi-Fi telemetry.",
    problem: "Indoor robotic navigation requires low latency kinematic control and precision motor feedback.",
    solution: "Designed a 4-wheel robot car with FreeRTOS motor control, ultrasonic distance sweeps, and real-time app telemetry.",
    techStack: ["C++", "FreeRTOS", "ESP32", "ROS2"],
    features: [
      "Obstacle detection and collision avoidance",
      "Real-time video feed streaming over Wi-Fi",
      "Remote gamepad joystick mobile app control",
      "Encoder pulse feedback velocity calculation"
    ]
  },
  {
    id: "plant-monitor",
    title: "Smart Plant Monitor",
    category: "IoT • Automation",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80",
    summary: "Solar-powered soil moisture, ambient light, and irrigation telemetry node with companion mobile app.",
    problem: "Plants often wither due to overwatering or irregular light telemetry data.",
    solution: "Created a low-power Bluetooth & Wi-Fi soil sensor node that triggers automated water pumps when moisture drops below target threshold.",
    techStack: ["ESP32-C3", "Flutter", "MQTT", "Firebase"],
    features: [
      "Capacitive soil moisture sensing",
      "Automated peristaltic water pump control",
      "Custom Flutter mobile dashboard",
      "Deep sleep low-power battery mode"
    ]
  },
  {
    id: "health-tracker",
    title: "Health Tracker Wearable",
    category: "IoT • Health",
    image: "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=800&q=80",
    summary: "Compact wearable smart band tracking heart rate, SpO2 levels, and daily activity metrics.",
    problem: "Wearable health sensors need compact PCB layout, water resistance, and low power Bluetooth transmission.",
    solution: "Engineered a custom rigid-flex PCB smart band with optical pulse-oximeter, accelerometer, and BLE telemetry.",
    techStack: ["Nordic nRF52", "Embedded C", "BLE", "React Native"],
    features: [
      "Optical PPG heart rate & blood oxygen sensor",
      "3-Axis accelerometer step counting algorithm",
      "Bluetooth Low Energy continuous sync",
      "Compact circular OLED display"
    ]
  },
  {
    id: "custom-pcb",
    title: "Custom PCB Design",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    summary: "High-density 4-layer industrial controller board with ESD protection and USB-C power delivery.",
    problem: "Legacy industrial boards suffered from electromagnetic noise interference and bulky terminal blocks.",
    solution: "Designed a multi-layer compact PCB featuring solid ground planes, low-ESR capacitors, and ESD transient voltage suppression.",
    techStack: ["Altium Designer", "KiCAD", "EMC Testing", "STM32"],
    features: [
      "4-Layer controlled impedance board stackup",
      "USB Type-C Power Delivery up to 60W",
      "Optocoupler isolated digital input channels",
      "Thermal ground vias copper pour"
    ]
  },
  {
    id: "iot-dashboard",
    title: "IoT Dashboard",
    category: "Web • Analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    summary: "Real-time web monitoring portal displaying live device telemetry graphs, status alerts, and remote triggers.",
    problem: "Industrial IoT operators need central control screens with sub-second data streaming and visual analytics.",
    solution: "Built a dark-themed Next.js dashboard connected to WebSockets and TimescaleDB for continuous streaming graphs.",
    techStack: ["Next.js", "React", "TypeScript", "WebSockets", "Chart.js"],
    features: [
      "Live WebSocket telemetry graph streams",
      "Remote device relay turn-on/off triggers",
      "Automated alert notification log",
      "Exportable CSV telemetry reporting"
    ]
  }
];
