export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  categorySlug: string;
  categoryName: string;
  subCategory?: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery?: string[];
  description: string;
  specs: Record<string, string>;
  features: string[];
  hatCompatibility?: string;
  isFeatured?: boolean;
}

export interface StoreCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  itemCount: number;
  color: string;
  subCategories: string[];
}

export const STORE_CATEGORIES: StoreCategory[] = [
  {
    id: 'dev-boards',
    name: 'Development Boards',
    slug: 'development-boards',
    description: 'Explore development boards from Raspberry Pi, Arduino, ESP32, Jetson, and STM32 for prototyping to production.',
    icon: 'Cpu',
    itemCount: 48,
    color: 'from-blue-600 to-indigo-700',
    subCategories: [
      'Raspberry Pi',
      'Official Arduino Boards',
      'Arduino Compatible & Accessories',
      'Single Board Computers',
      'ARM Microcontroller Boards',
      'AVR Microcontroller Boards'
    ]
  },
  {
    id: 'drone-parts',
    name: 'Drone Parts',
    slug: 'drone-parts',
    description: 'BLDC motors, ESCs, propellers, flight controllers, GPS modules, and telemetry for DIY drones and UAVs.',
    icon: 'Navigation',
    itemCount: 34,
    color: 'from-cyan-600 to-blue-700',
    subCategories: [
      'BLDC Motors',
      'Flight Controllers',
      'Electronic Speed Controllers (ESC)',
      'Propellers & Frames',
      'FPV Cameras & Goggles'
    ]
  },
  {
    id: 'batteries-power',
    name: 'Batteries, Power Supply & Accessories',
    slug: 'batteries-power',
    description: 'LiPo batteries, Lithium-Ion cells, BMS protection boards, SMPS power supplies, and voltage regulators.',
    icon: 'Zap',
    itemCount: 52,
    color: 'from-amber-500 to-orange-600',
    subCategories: [
      'LiPo Batteries',
      '18650 Li-Ion Cells',
      'BMS Protection Boards',
      'SMPS Power Supplies',
      'Buck & Boost Converters'
    ]
  },
  {
    id: '3d-printers',
    name: '3D Printers & Parts',
    slug: '3d-printers-parts',
    description: 'FDM and Resin 3D printers, PLA/ABS filaments, extruders, hotends, nozzles, and stepper motors.',
    icon: 'Printer',
    itemCount: 29,
    color: 'from-[#0066FF] to-[#2563EB]',
    subCategories: [
      '3D Printers',
      'PLA & ABS Filaments',
      'Extruders & Hotends',
      'Nozzles & Heatbeds',
      'Mainboards & Drivers'
    ]
  },
  {
    id: 'sensors',
    name: 'Sensors',
    slug: 'sensors',
    description: 'Precision environmental, motion, biometric, optical, gas, ultrasonic, and current sensing modules.',
    icon: 'Radio',
    itemCount: 65,
    color: 'from-emerald-600 to-teal-700',
    subCategories: [
      'Temperature & Humidity',
      'IMU Motion & Gyroscope',
      'Ultrasonic & Distance',
      'Gas & Air Quality',
      'Biometric & Heart Rate'
    ]
  },
  {
    id: 'electronic-components',
    name: 'Electronic Components',
    slug: 'electronic-components',
    description: 'Passives, active components, ICs, microcontrollers, SMD components, relays, and connectors.',
    icon: 'Layers',
    itemCount: 120,
    color: 'from-slate-700 to-slate-900',
    subCategories: [
      'Resistors & Capacitors',
      'Integrated Circuits (ICs)',
      'Diodes & Transistors',
      'Relays & Switches',
      'Connectors & Headers'
    ]
  },
  {
    id: 'motors-actuators',
    name: 'Motors | Drivers | Pumps | Actuators',
    slug: 'motors-drivers-actuators',
    description: 'Stepper motors, servo motors, DC gear motors, motor driver ICs, and linear actuators.',
    icon: 'Cog',
    itemCount: 42,
    color: 'from-blue-700 to-slate-900',
    subCategories: [
      'NEMA Stepper Motors',
      'Servo Motors',
      'DC Gear Motors',
      'Motor Driver Boards',
      'Solenoids & Pumps'
    ]
  },
  {
    id: 'modules-displays',
    name: 'Electronic Modules & Displays',
    slug: 'electronic-modules-displays',
    description: 'OLED displays, TFT LCD touchscreens, audio amplifier modules, and relay driver boards.',
    icon: 'Monitor',
    itemCount: 38,
    color: 'from-purple-600 to-indigo-700',
    subCategories: [
      'OLED & LCD Displays',
      'TFT Touchscreens',
      'Audio Amplifiers',
      'RTC Clock Modules',
      'RFID & NFC Modules'
    ]
  },
  {
    id: 'iot-wireless',
    name: 'IoT & Wireless Modules',
    slug: 'iot-wireless-modules',
    description: 'Wi-Fi microcontrollers, Bluetooth 5.0, LoRa long-range RF, GSM/GPRS, and Zigbee wireless units.',
    icon: 'Wifi',
    itemCount: 31,
    color: 'from-[#0066FF] to-[#0284C7]',
    subCategories: [
      'ESP32 & ESP8266',
      'Bluetooth & BLE',
      'LoRa & RF Transceivers',
      'GSM / GPRS / GPS',
      'Zigbee & NRF24L01'
    ]
  },
  {
    id: 'tools-workbench',
    name: 'Mechanical Parts & Workbench Tools',
    slug: 'mechanical-workbench-tools',
    description: 'Soldering stations, digital multimeters, wire strippers, heat guns, and precision hardware tools.',
    icon: 'Wrench',
    itemCount: 27,
    color: 'from-slate-800 to-slate-900',
    subCategories: [
      'Soldering Stations & Iron',
      'Multimeters & Oscilloscopes',
      'Wire Strippers & Cutters',
      'Hardware Fasteners',
      'Workbench Accessories'
    ]
  },
  {
    id: 'diy-kits',
    name: 'DIY & Maker Kits',
    slug: 'diy-maker-kits',
    description: 'Robotics starter kits, STEM learning packages, IoT experimenter boxes, and electronic project kits.',
    icon: 'Package',
    itemCount: 22,
    color: 'from-rose-600 to-pink-700',
    subCategories: [
      'Robotics Starter Kits',
      'STEM Educational Kits',
      'IoT Prototyping Kits',
      'Arduino Beginner Bundles'
    ]
  },
  {
    id: 'ev-parts',
    name: 'Electric Vehicle Parts',
    slug: 'electric-vehicle-parts',
    description: 'BLDC hub motors, EV controllers, thumb throttles, battery BMS systems, and EV chargers.',
    icon: 'BatteryCharging',
    itemCount: 18,
    color: 'from-emerald-700 to-green-800',
    subCategories: [
      'EV Hub Motors',
      'Motor Controllers',
      'Throttles & Switches',
      'High Current BMS',
      'EV Chargers'
    ]
  }
];

export const STORE_PRODUCTS: Product[] = [
  {
    id: 'prod-rpi-zero-13',
    name: 'Raspberry Pi Zero V1.3',
    slug: 'raspberry-pi-zero-v1-3',
    sku: 'SKU-31905',
    categorySlug: 'development-boards',
    categoryName: 'Development Boards',
    subCategory: 'Raspberry Pi',
    price: 1229,
    originalPrice: 1299,
    discountPercent: 5,
    inStock: false,
    stockCount: 0,
    rating: 4.8,
    reviewCount: 11,
    image: '/logo.jpeg',
    description: 'The Raspberry Pi Zero v1.3 is ultra-compact and ultra-low cost, powered by a 1GHz single-core CPU and 512MB RAM with dedicated camera connector.',
    features: [
      '1GHz single-core Broadcom BCM2835 CPU',
      '512MB RAM',
      'Mini-HDMI and USB On-The-Go ports',
      'CSI camera connector',
      'HAT-compatible 40-pin header space'
    ],
    specs: {
      'Architecture': 'ARM1176JZF-S',
      'Clock Speed': '1.0 GHz',
      'RAM': '512MB LPDDR2',
      'Storage': 'MicroSD card slot',
      'Dimensions': '65mm x 30mm x 5mm'
    },
    hatCompatibility: 'Compatible with all 40-pin GPIO Raspberry Pi HATs and breakout boards.',
    isFeatured: true
  },
  {
    id: 'prod-rpi-zero-w',
    name: 'Raspberry Pi Zero Wireless WH (Pre-Soldered Header)',
    slug: 'raspberry-pi-zero-wireless-wh',
    sku: 'SKU-57418',
    categorySlug: 'development-boards',
    categoryName: 'Development Boards',
    subCategory: 'Raspberry Pi',
    price: 1929,
    originalPrice: 2029,
    discountPercent: 5,
    inStock: true,
    stockCount: 14,
    rating: 4.9,
    reviewCount: 9,
    image: '/logo.jpeg',
    description: 'Raspberry Pi Zero WH features built-in 802.11 b/g/n wireless LAN and Bluetooth 4.1 with pre-soldered 40-pin male color GPIO header.',
    features: [
      '802.11 b/g/n wireless LAN',
      'Bluetooth 4.1 & Bluetooth Low Energy (BLE)',
      'Pre-soldered 40-pin color-coded header',
      'Micro-USB OTG port',
      'CSI camera port'
    ],
    specs: {
      'Wi-Fi': '802.11 b/g/n',
      'Bluetooth': 'Bluetooth 4.1 / BLE',
      'Header': '40-pin Pre-soldered Color Header',
      'Dimensions': '65mm x 30mm x 11.6mm'
    },
    hatCompatibility: 'Plug-and-play compatible with all Raspberry Pi HATs.',
    isFeatured: true
  },
  {
    id: 'prod-rpi-zero-2w',
    name: 'Raspberry Pi Zero 2 W with Header',
    slug: 'raspberry-pi-zero-2-w-header',
    sku: 'SKU-R182943',
    categorySlug: 'development-boards',
    categoryName: 'Development Boards',
    subCategory: 'Raspberry Pi',
    price: 2579,
    originalPrice: 2869,
    discountPercent: 10,
    inStock: true,
    stockCount: 22,
    rating: 5.0,
    reviewCount: 18,
    image: '/logo.jpeg',
    description: 'Quad-core 64-bit ARM Cortex-A53 processor running at 1.0GHz, delivering up to 5x performance of the original Pi Zero Wireless.',
    features: [
      'Quad-core 64-bit ARM Cortex-A53 CPU @ 1.0GHz',
      '512MB LPDDR2 SDRAM',
      '2.4GHz 802.11 b/g/n wireless LAN',
      'Bluetooth 4.2, BLE',
      'Color GPIO pre-soldered header'
    ],
    specs: {
      'SoC': 'Broadcom BCM2710A1',
      'CPU': 'Quad-Core 64-Bit ARM Cortex-A53',
      'RAM': '512MB',
      'Wireless': '2.4GHz Wi-Fi & Bluetooth 4.2'
    },
    isFeatured: true
  },
  {
    id: 'prod-esp32-wroom-32',
    name: 'ESP32 WROOM 32U Wi-Fi + BLE Development Board',
    slug: 'esp32-wroom-32u-wifi-ble-board',
    sku: 'SKU-ESP3201',
    categorySlug: 'iot-wireless-modules',
    categoryName: 'IoT & Wireless Modules',
    subCategory: 'ESP32 & ESP8266',
    price: 349,
    originalPrice: 420,
    discountPercent: 16,
    inStock: true,
    stockCount: 85,
    rating: 4.8,
    reviewCount: 32,
    image: '/logo.jpeg',
    description: 'High-performance dual-core 32-bit LX6 microcontroller with integrated Wi-Fi, Bluetooth v4.2 BR/EDR, and BLE for IoT applications.',
    features: [
      'Dual-core Tensilica LX6 240MHz CPU',
      'Integrated Wi-Fi 802.11 b/g/n & BLE',
      'IPEX external antenna connector',
      'CP2102 USB-to-UART bridge',
      '30 GPIO pins'
    ],
    specs: {
      'Processor': '32-Bit Dual-Core LX6 @ 240MHz',
      'SRAM': '520 KB',
      'Flash Memory': '4MB',
      'Operating Voltage': '3.3V'
    },
    isFeatured: true
  },
  {
    id: 'prod-arduino-uno-r3',
    name: 'Official Arduino Uno R3 Microcontroller Board',
    slug: 'official-arduino-uno-r3-board',
    sku: 'SKU-ARD-UNO-R3',
    categorySlug: 'development-boards',
    categoryName: 'Development Boards',
    subCategory: 'Official Arduino Boards',
    price: 1899,
    originalPrice: 2199,
    discountPercent: 13,
    inStock: true,
    stockCount: 40,
    rating: 4.9,
    reviewCount: 45,
    image: '/logo.jpeg',
    description: 'The standard microcontroller board based on ATmega328P, featuring 14 digital input/output pins, 6 analog inputs, and 16 MHz ceramic resonator.',
    features: [
      'ATmega328P microcontroller',
      '14 digital I/O pins (6 PWM outputs)',
      '6 analog input pins',
      '16 MHz crystal oscillator',
      'USB type B connection'
    ],
    specs: {
      'Microcontroller': 'ATmega328P',
      'Clock Speed': '16 MHz',
      'Digital I/O': '14',
      'Analog Inputs': '6'
    },
    isFeatured: true
  },
  {
    id: 'prod-dht22-sensor',
    name: 'DHT22 Digital Temperature & Humidity Sensor Module',
    slug: 'dht22-digital-temperature-humidity-sensor',
    sku: 'SKU-SNS-DHT22',
    categorySlug: 'sensors',
    categoryName: 'Sensors',
    subCategory: 'Temperature & Humidity',
    price: 299,
    originalPrice: 380,
    discountPercent: 21,
    inStock: true,
    stockCount: 110,
    rating: 4.7,
    reviewCount: 24,
    image: '/logo.jpeg',
    description: 'High precision digital output temperature and humidity sensor module with calibrated digital signal output.',
    features: [
      'Humidity Range: 0-100% RH (±2% accuracy)',
      'Temperature Range: -40 to 80°C (±0.5°C accuracy)',
      '3-pin module board with pull-up resistor',
      'Low power consumption'
    ],
    specs: {
      'Supply Voltage': '3.3V - 5V',
      'Signal Output': 'Single bus digital signal',
      'Sampling Rate': '0.5 Hz'
    },
    isFeatured: true
  }
];
