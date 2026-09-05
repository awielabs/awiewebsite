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

// Store sales gate — flip to true when the AWIE Store officially goes live.
// Controls whether the "My Orders" section is visible to users.
export const STORE_SALE_LIVE = false;

export const STORE_CATEGORIES: StoreCategory[] = [
  {
    id: 'microcontrollers',
    name: 'Microcontrollers',
    slug: 'microcontrollers',
    description: 'High-performance ESP32, ESP8266, and Arduino microcontroller development boards and modules.',
    icon: 'Cpu',
    itemCount: 7,
    color: 'from-[#0066FF] to-[#2563EB]',
    subCategories: ['ESP32 Series', 'Arduino Boards']
  },
  {
    id: 'sensors',
    name: 'Sensors',
    slug: 'sensors',
    description: 'Precision environmental, motion, optical, biometric, gas, and distance sensing modules.',
    icon: 'Wifi',
    itemCount: 10,
    color: 'from-[#0066FF] to-[#0284C7]',
    subCategories: ['Environmental & Gas', 'Motion & Proximity', 'Optical & Sound', 'Biometric']
  },
  {
    id: 'modules',
    name: 'Modules',
    slug: 'modules',
    description: 'Relay drivers, charger controllers, audio amplifiers, wireless transceivers, and RTC modules.',
    icon: 'Layers',
    itemCount: 10,
    color: 'from-blue-600 to-indigo-700',
    subCategories: ['Relays & Drivers', 'Charging & Power', 'Audio & Wireless', 'Timing & Interfaces']
  },
  {
    id: 'displays',
    name: 'Displays',
    slug: 'displays',
    description: 'High-resolution OLED screens, TFT LCD touch displays, 16x2 LCDs, and WS2812B addressable LEDs.',
    icon: 'Monitor',
    itemCount: 10,
    color: 'from-cyan-600 to-blue-700',
    subCategories: ['OLED Displays', 'TFT Displays', 'LCD Displays', 'LED & Matrix']
  },
  {
    id: 'motors-drivers',
    name: 'Motors & Drivers',
    slug: 'motors-drivers',
    description: 'Precision servos, stepper motors, DC gear motors, motor driver ICs, and robot chassis components.',
    icon: 'Cog',
    itemCount: 10,
    color: 'from-slate-700 to-slate-900',
    subCategories: ['Servo Motors', 'Stepper Motors', 'DC Motors', 'Motor Drivers & Chassis']
  },
  {
    id: 'power-battery',
    name: 'Power & Battery',
    slug: 'power-battery',
    description: 'Li-Ion 18650 cells, Li-Po batteries, BMS protection boards, buck/boost converters, and power connectors.',
    icon: 'BatteryCharging',
    itemCount: 22,
    color: 'from-emerald-600 to-teal-700',
    subCategories: ['Li-Ion & Li-Po', 'BMS & Chargers', 'Voltage Regulators & Holders', 'Connectors & Switches']
  }
];

export const STORE_PRODUCTS: Product[] = [
  // 1. ESP32-WROOM-32
  {
    id: 'mc-1',
    name: 'ESP32-WROOM-32',
    slug: 'esp32-wroom-32',
    sku: 'SKU-MC-01',
    categorySlug: 'microcontrollers',
    categoryName: 'Microcontrollers',
    subCategory: 'ESP32 Series',
    price: 0,
    originalPrice: 0,
    discountPercent: 0,
    inStock: true,
    stockCount: 0,
    rating: 5.0,
    reviewCount: 0,
    image: 'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248395/awie_store/microcontrollers/esp32-wroom-32-module/side-view.jpg',
    gallery: [
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248395/awie_store/microcontrollers/esp32-wroom-32-module/side-view.jpg',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248396/awie_store/microcontrollers/esp32-wroom-32-module/top-view.jpg',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248394/awie_store/microcontrollers/esp32-wroom-32-module/gpio-view.jpg'
    ],
    description: 'ESP32-WROOM-32 is a powerful, general-purpose Wi-Fi + Bluetooth + BLE MCU module by Espressif. Powered by the ESP32-D0WDQ6 dual-core 32-bit Tensilica Xtensa LX6 processor operating at up to 240 MHz, it integrates 4 MB SPI flash, an onboard PCB antenna, and rich peripheral interfaces. Note: Espressif marks original ESP32-WROOM-32 as NRND (Not Recommended for New Designs); recommended for existing production or replacement needs.',
    features: [
      'Dual-core 32-bit Tensilica Xtensa LX6 processor @ up to 240 MHz',
      '448 KB ROM, 520 KB SRAM, 4 MB integrated SPI Flash',
      '802.11 b/g/n Wi-Fi (2.4 GHz, up to 150 Mbps)',
      'Bluetooth v4.2 BR/EDR & BLE (Bluetooth Low Energy)',
      'Up to 32 configurable GPIO pins',
      'Rich peripherals: 12-bit ADC (18 ch), 2x 8-bit DAC, 3x UART, 3x SPI, 2x I2C, 2x I2S, 16x PWM, TWAI (CAN 2.0)',
      '10x Capacitive Touch sensor channels',
      'Operating Voltage: 3.0 V – 3.6 V (3.3 V Typical)',
      'Ultra-compact module dimensions: 18.00 × 25.50 × 3.10 mm',
      'Integrated PCB trace antenna'
    ],
    specs: {
      'MCU Core': 'ESP32-D0WDQ6 (Dual-Core Xtensa LX6)',
      'Clock Speed': '80 MHz to 240 MHz',
      'Internal SRAM': '520 KB',
      'ROM': '448 KB',
      'Flash Memory': '4 MB SPI Flash',
      'Wi-Fi Standard': '802.11 b/g/n (2.4 GHz)',
      'Bluetooth': 'v4.2 BR/EDR & BLE',
      'GPIO Count': 'Up to 32 Pins',
      'Analog Peripherals': '12-bit ADC (18 Channels), 2x 8-bit DAC',
      'Digital Interfaces': '3x UART, 3x SPI, 2x I2C, 2x I2S, 16x PWM, TWAI (CAN 2.0)',
      'Touch Sensing': '10 Capacitive Touch Pins',
      'Operating Voltage': '3.0 V – 3.6 V (3.3 V Nom.)',
      'Operating Current': '80 mA Average (Deep Sleep < 10 µA)',
      'Module Dimensions': '18.00 × 25.50 × 3.10 mm',
      'Lifecycle Status': 'NRND (Espressif Official)'
    },
    isFeatured: true
  },

  // 2. ESP32-C3 SuperMini
  {
    id: 'mc-3',
    name: 'ESP32-C3 SuperMini',
    slug: 'esp32-c3-supermini',
    sku: 'SKU-MC-03',
    categorySlug: 'microcontrollers',
    categoryName: 'Microcontrollers',
    subCategory: 'ESP32 Series',
    price: 0,
    originalPrice: 0,
    discountPercent: 0,
    inStock: true,
    stockCount: 0,
    rating: 5.0,
    reviewCount: 0,
    image: 'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248398/awie_store/microcontrollers/esp32-c3-supermini/side-view.jpg',
    gallery: [
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248398/awie_store/microcontrollers/esp32-c3-supermini/side-view.jpg',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248399/awie_store/microcontrollers/esp32-c3-supermini/top-view.jpg',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248397/awie_store/microcontrollers/esp32-c3-supermini/gpio-view.jpg'
    ],
    description: 'ESP32-C3 SuperMini is an ultra-compact RISC-V 32-bit single-core development board equipped with native USB Type-C, Wi-Fi 4, and Bluetooth 5.0 LE. Operating at up to 160 MHz, its miniature 22.5 × 18 mm footprint with castellated holes makes it ideal for space-constrained wearables and smart IoT nodes.',
    features: [
      '32-bit RISC-V single-core processor up to 160 MHz',
      '400 KB SRAM, 384 KB ROM, 4 MB integrated SPI Flash',
      '2.4 GHz Wi-Fi 802.11 b/g/n & Bluetooth 5 (LE) / Mesh support',
      'Native USB Type-C interface for CDC/JTAG debugging and power',
      '11x Digital GPIOs, 4x ADC channels, 1x SPI, 1x I2C, 1x UART, PWM on all pins',
      'Castellated holes for SMD surface mounting or pin header usage',
      'Ultra-compact form factor (22.5 × 18.0 mm)'
    ],
    specs: {
      'MCU Architecture': '32-bit RISC-V Single-Core (ESP32-C3)',
      'Clock Speed': 'Up to 160 MHz',
      'SRAM / ROM': '400 KB SRAM / 384 KB ROM',
      'Flash Memory': '4 MB SPI Flash',
      'Wi-Fi': '2.4 GHz 802.11 b/g/n (150 Mbps)',
      'Bluetooth': 'Bluetooth 5.0 LE & Mesh',
      'USB Port': 'Native USB Type-C (Serial / JTAG)',
      'GPIO Count': '11 Digital GPIOs',
      'Analog Inputs': '4-Channel 12-bit ADC',
      'Operating Voltage': '3.3 V Logic (5 V Input via USB/VIN)',
      'Dimensions': '22.5 × 18.0 × 4.5 mm'
    }
  },

  // 5. ESP32-S3 DevKit
  {
    id: 'mc-5',
    name: 'ESP32-S3 DevKit',
    slug: 'esp32-s3-devkit',
    sku: 'SKU-MC-05',
    categorySlug: 'microcontrollers',
    categoryName: 'Microcontrollers',
    subCategory: 'ESP32 Series',
    price: 0,
    originalPrice: 0,
    discountPercent: 0,
    inStock: true,
    stockCount: 0,
    rating: 5.0,
    reviewCount: 0,
    image: 'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248404/awie_store/microcontrollers/esp32-s3-devkit/side-view.jpg',
    gallery: [
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248404/awie_store/microcontrollers/esp32-s3-devkit/side-view.jpg',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248405/awie_store/microcontrollers/esp32-s3-devkit/top-view.jpg',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248403/awie_store/microcontrollers/esp32-s3-devkit/gpio-view.jpg'
    ],
    description: 'ESP32-S3 DevKit is an advanced development board powered by Espressif’s dual-core Xtensa LX7 processor with vector instructions for AI/ML edge computing (TinyML, speech recognition, face detection). Features dual USB ports (Native USB OTG + UART), 8 MB Flash, and Bluetooth 5 LE.',
    features: [
      'Dual-Core Xtensa LX7 32-bit CPU running up to 240 MHz',
      'Vector expansion instructions for hardware AI / ML acceleration',
      '512 KB SRAM, 384 KB ROM, 8 MB SPI Flash (with optional PSRAM support)',
      '2.4 GHz Wi-Fi 802.11 b/g/n & Bluetooth 5 (LE) with Long Range support',
      'Dual USB ports: 1x Native USB 1.1 OTG + 1x USB-to-UART Bridge',
      'Up to 45 GPIO pins with 14 Capacitive Touch channels & 20 ADC channels',
      'Interfaces: SPI, I2C, I2S, UART, PWM, SD/MMC, TWAI (CAN 2.0)'
    ],
    specs: {
      'CPU': 'Dual-Core Xtensa LX7 (240 MHz)',
      'AI Accelerator': 'Vector Instructions for Neural Networks',
      'SRAM / Flash': '512 KB SRAM / 8 MB SPI Flash',
      'Wi-Fi': '2.4 GHz 802.11 b/g/n',
      'Bluetooth': 'Bluetooth 5.0 LE & Long Range',
      'USB Interface': 'Dual USB (Native USB OTG + UART Bridge)',
      'GPIO Count': 'Up to 45 GPIO Pins',
      'Touch Sensing': '14 Touch Capacitive Pins',
      'ADC Inputs': '20 Channels (12-bit)',
      'Board Size': '62.0 × 28.0 × 13.0 mm'
    }
  },

  // 6. ESP32-CAM
  {
    id: 'mc-6',
    name: 'ESP32-CAM Vision & Wi-Fi Board',
    slug: 'esp32-cam',
    sku: 'SKU-MC-06',
    categorySlug: 'microcontrollers',
    categoryName: 'Microcontrollers',
    subCategory: 'ESP32 Series',
    price: 0,
    originalPrice: 0,
    discountPercent: 0,
    inStock: true,
    stockCount: 0,
    rating: 5.0,
    reviewCount: 0,
    image: 'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248401/awie_store/microcontrollers/esp32-cam/side-viwe.jpg',
    gallery: [
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248401/awie_store/microcontrollers/esp32-cam/side-viwe.jpg',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248402/awie_store/microcontrollers/esp32-cam/top-view.webp',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248400/awie_store/microcontrollers/esp32-cam/gpio-view.png'
    ],
    description: 'ESP32-CAM is a compact development board featuring an ESP32 MCU, 4 MB external PSRAM, an onboard MicroSD slot, an ultra-bright White LED flash, and an OV2640 2 MP camera module. Perfect for wireless video streaming, AI face recognition, face tracking, and IoT surveillance.',
    features: [
      'Dual-Core ESP32 processor up to 240 MHz with Wi-Fi & BLE',
      'Includes OV2640 2 Megapixel camera module (UXGA 1600 × 1200 resolution)',
      '4 MB External IPUS PSRAM for high-resolution JPEG frame buffering',
      'Onboard MicroSD card socket (supports up to 4 GB SPI mode storage)',
      'Ultra-bright onboard White LED Flashlight (GPIO4 controlled)',
      'Supports JPEG, BMP, and Grayscale image capture formats',
      'Low power sleep modes down to 6 mA in deep sleep'
    ],
    specs: {
      'MCU': 'ESP32 Dual-Core @ 240 MHz',
      'Camera Sensor': 'OV2640 (2 Megapixel included)',
      'Max Resolution': '1600 × 1200 (UXGA)',
      'PSRAM': '4 MB External PSRAM',
      'Storage': 'MicroSD Slot (Up to 4 GB)',
      'Wi-Fi / BT': '2.4 GHz 802.11 b/g/n + Bluetooth 4.2 BLE',
      'Flash LED': 'Ultra-bright White LED (GPIO4)',
      'Power Supply': '5 V DC / 2 A Recommended',
      'Dimensions': '27.0 × 40.5 × 4.5 mm'
    }
  },

  // 7. ESP8266 NodeMCU
  {
    id: 'mc-7',
    name: 'ESP8266 NodeMCU V2',
    slug: 'esp8266-nodemcu',
    sku: 'SKU-MC-07',
    categorySlug: 'microcontrollers',
    categoryName: 'Microcontrollers',
    subCategory: 'ESP32 Series',
    price: 0,
    originalPrice: 0,
    discountPercent: 0,
    inStock: true,
    stockCount: 0,
    rating: 5.0,
    reviewCount: 0,
    image: 'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248407/awie_store/microcontrollers/esp8266-nodemcu/side-view.jpg',
    gallery: [
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248407/awie_store/microcontrollers/esp8266-nodemcu/side-view.jpg',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248407/awie_store/microcontrollers/esp8266-nodemcu/top-view.webp',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248405/awie_store/microcontrollers/esp8266-nodemcu/gpio-view.webp'
    ],
    description: 'ESP8266 NodeMCU V2 is an open-source Wi-Fi development board built around the ESP8266EX SoC. Featuring 4 MB SPI flash, an onboard CP2102/CH340 USB-to-UART bridge, and 10 GPIO pins, it provides an affordable entry into Wi-Fi IoT projects, Home Assistant integration, and Arduino IDE programming.',
    features: [
      'Tensilica Xtensa 32-bit single-core L106 processor @ 80 / 160 MHz',
      'Integrated 802.11 b/g/n Wi-Fi transceiver (2.4 GHz, WPA/WPA2)',
      '4 MB SPI Flash memory (Winbond 25Q32)',
      'Onboard USB-to-UART converter for plug-and-play programming',
      '17x GPIO pins (10x PWM enabled, SPI, I2C, UART support)',
      '1x 10-bit ADC channel (0 – 3.3V via onboard divider)',
      'Breadboard-friendly 30-pin form factor'
    ],
    specs: {
      'SoC': 'ESP8266EX (32-Bit @ 80/160 MHz)',
      'Flash Memory': '4 MB SPI Flash',
      'SRAM': '64 KB Instruction / 96 KB Data',
      'Wi-Fi Standard': '2.4 GHz 802.11 b/g/n',
      'USB Interface': 'CP2102 / CH340 Bridge',
      'Digital I/O': '17 Pins (10 PWM)',
      'Analog Input': '1 Channel (10-bit ADC)',
      'Operating Voltage': '3.3 V Logic (5 V USB/VIN)',
      'Dimensions': '48.0 × 25.0 × 13.0 mm'
    }
  },

  // 8. Arduino UNO R3 Compatible
  {
    id: 'mc-8',
    name: 'Arduino UNO R3 Compatible Board',
    slug: 'arduino-uno-r3',
    sku: 'SKU-MC-08',
    categorySlug: 'microcontrollers',
    categoryName: 'Microcontrollers',
    subCategory: 'Arduino Boards',
    price: 0,
    originalPrice: 0,
    discountPercent: 0,
    inStock: true,
    stockCount: 0,
    rating: 5.0,
    reviewCount: 0,
    image: 'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248393/awie_store/microcontrollers/arduino-uno-r3/top-view.jpg',
    gallery: [
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248393/awie_store/microcontrollers/arduino-uno-r3/top-view.jpg'
    ],
    description: 'Arduino UNO R3 Compatible Development Board based on the Microchip ATmega328P 8-bit AVR microcontroller. Featuring 14 digital I/O pins, 6 analog inputs, a 16 MHz crystal oscillator, USB Type-B port, and DC barrel jack, this board is the gold standard for electronics learning, robotics, and prototyping.',
    features: [
      'ATmega328P 8-bit AVR RISC microcontroller operating at 16 MHz',
      '14 Digital Input/Output pins (6 PWM outputs: D3, D5, D6, D9, D10, D11)',
      '6 Analog Input channels (A0 to A5 with 10-bit ADC resolution)',
      '32 KB Flash memory (0.5 KB used by Optiboot bootloader), 2 KB SRAM, 1 KB EEPROM',
      '5 V DC operating logic level',
      'CH340G / ATmega16U2 USB interface for seamless PC communication',
      'DC Barrel Jack input supporting 7–12 V DC power supply'
    ],
    specs: {
      'Microcontroller': 'ATmega328P (8-Bit AVR)',
      'Clock Speed': '16 MHz Crystal',
      'Flash Memory': '32 KB (0.5 KB Bootloader)',
      'SRAM / EEPROM': '2 KB SRAM / 1 KB EEPROM',
      'Digital I/O Pins': '14 (6 PWM Channels)',
      'Analog Inputs': '6 Channels (10-bit ADC)',
      'Operating Voltage': '5 V DC Logic',
      'Input Voltage (Recommended)': '7 V – 12 V DC (Barrel Jack / VIN)',
      'USB Connector': 'USB Type-B Standard',
      'Board Dimensions': '68.6 × 53.4 mm'
    }
  },

  // 9. Arduino Nano R3 Compatible
  {
    id: 'mc-9',
    name: 'Arduino Nano R3 Compatible Board',
    slug: 'arduino-nano',
    sku: 'SKU-MC-09',
    categorySlug: 'microcontrollers',
    categoryName: 'Microcontrollers',
    subCategory: 'Arduino Boards',
    price: 0,
    originalPrice: 0,
    discountPercent: 0,
    inStock: true,
    stockCount: 0,
    rating: 5.0,
    reviewCount: 0,
    image: 'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248391/awie_store/microcontrollers/arduino-nano-r3/side-view.jpg',
    gallery: [
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248391/awie_store/microcontrollers/arduino-nano-r3/side-view.jpg',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788248393/awie_store/microcontrollers/arduino-nano-r3/top-view.jpg'
    ],
    description: 'Arduino Nano R3 Compatible is a compact, breadboard-friendly development board based on the ATmega328P microcontroller. Offering 22 I/O pins (including 8 analog inputs) in a tiny 45 × 18 mm layout, it provides full UNO functionality in a miniature footprint.',
    features: [
      'ATmega328P 8-bit AVR RISC processor @ 16 MHz',
      'Breadboard-friendly 30-pin dual inline package layout',
      '14 Digital I/O pins (6 PWM channels)',
      '8 Analog Input channels (A0 to A7, 10-bit ADC resolution)',
      '32 KB Flash memory, 2 KB SRAM, 1 KB EEPROM',
      '5 V DC operating logic level',
      'Mini-USB / USB Type-C connector with CH340G USB interface'
    ],
    specs: {
      'Microcontroller': 'ATmega328P (8-Bit AVR)',
      'Clock Speed': '16 MHz',
      'Flash Memory': '32 KB (2 KB Bootloader)',
      'SRAM / EEPROM': '2 KB SRAM / 1 KB EEPROM',
      'Digital I/O': '14 Pins (6 PWM)',
      'Analog Inputs': '8 Channels (10-bit ADC)',
      'Logic Voltage': '5 V DC',
      'Input Voltage (VIN)': '7 V – 12 V DC',
      'USB Connector': 'Mini-USB / USB Type-C',
      'Board Dimensions': '45.0 × 18.0 mm (Weight ~7 g)'
    }
  },

  // 2. Sensors (10 Items)
  {
    id: 'sn-1',
    name: 'HC-SR04 Ultrasonic Distance Sensor',
    slug: 'hc-sr04-ultrasonic-sensor',
    sku: 'SKU-SN-01',
    categorySlug: 'sensors',
    categoryName: 'Sensors',
    subCategory: 'Motion & Proximity',
    price: 99,
    originalPrice: 99,
    discountPercent: 0,
    inStock: true,
    stockCount: 300,
    rating: 5.0,
    reviewCount: 0,
    image: 'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256080/awie_store/sensors/hc-sr04-ultrasonic-distance-sensor_front-jpg.jpg',
    gallery: [
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256080/awie_store/sensors/hc-sr04-ultrasonic-distance-sensor_front-jpg.jpg',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256079/awie_store/sensors/hc-sr04-ultrasonic-distance-sensor_back-jpg.jpg'
    ],
    description: 'HC-SR04 is an ultrasonic distance-measuring module designed for obstacle detection, distance measurement and robotics applications.',
    features: [
      '2cm to 400cm typical measuring range with 3mm precision',
      '5 V DC operation at 40 kHz frequency',
      '4-pin interface (VCC, Trig, Echo, GND)',
      'Ideal for robot obstacle avoidance, distance measurement, and parking prototypes'
    ],
    specs: {
      'Sensor Type': 'Ultrasonic',
      'Operating Voltage': '5 V DC',
      'Frequency': '40 kHz',
      'Typical Measuring Range': '2–400 cm',
      'Interface': 'VCC, Trig, Echo, GND',
      'Output': 'Echo pulse',
      'Board Width': '40 mm',
      'Board Height': '20 mm',
      'Side Height': '15 mm'
    }
  },
  {
    id: 'sn-2',
    name: 'Infrared IR Obstacle Avoidance Sensor Module',
    slug: 'ir-obstacle-sensor',
    sku: 'SKU-SN-02',
    categorySlug: 'sensors',
    categoryName: 'Sensors',
    subCategory: 'Motion & Proximity',
    price: 49,
    originalPrice: 49,
    discountPercent: 0,
    inStock: true,
    stockCount: 250,
    rating: 5.0,
    reviewCount: 0,
    image: 'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256084/awie_store/sensors/ir-obstacle-avoidance-sensor-module_top-view-jpg.jpg',
    gallery: [
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256084/awie_store/sensors/ir-obstacle-avoidance-sensor-module_top-view-jpg.jpg',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256084/awie_store/sensors/ir-obstacle-avoidance-sensor-module_side-view-jpg.jpg'
    ],
    description: 'An infrared obstacle-detection module that detects nearby objects using reflected infrared light and provides a digital output.',
    features: [
      'Infrared reflective proximity sensor with 2–30 cm detection range',
      '35° detection angle with onboard sensitivity potentiometer adjustment',
      'LM393 voltage comparator with active low digital output',
      'Includes mounting screw holes for line-following robots and proximity automation'
    ],
    specs: {
      'Sensor Type': 'Infrared reflective',
      'Detection Range': '2–30 cm',
      'Detection Angle': '35°',
      'Comparator': 'LM393',
      'Output': 'Digital',
      'Output Logic': 'Active Low',
      'Adjustment': 'Sensitivity adjustable',
      'Mounting': 'Screw holes'
    }
  },
  {
    id: 'sn-3',
    name: 'HC-SR501 PIR Motion Sensor',
    slug: 'pir-motion-sensor',
    sku: 'SKU-SN-03',
    categorySlug: 'sensors',
    categoryName: 'Sensors',
    subCategory: 'Motion & Proximity',
    price: 89,
    originalPrice: 89,
    discountPercent: 0,
    inStock: true,
    stockCount: 160,
    rating: 5.0,
    reviewCount: 0,
    image: 'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256082/awie_store/sensors/hc-sr501-pir-motion-sensor_front-jpg.jpg',
    gallery: [
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256082/awie_store/sensors/hc-sr501-pir-motion-sensor_front-jpg.jpg',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256081/awie_store/sensors/hc-sr501-pir-motion-sensor_back-jpg.jpg',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256083/awie_store/sensors/hc-sr501-pir-motion-sensor_gpio-info-jpg.jpg'
    ],
    description: 'HC-SR501 is a passive infrared motion sensor module designed to detect movement of people and other warm objects.',
    features: [
      '3–7 m adjustable detection distance with <140° detection angle',
      'Ultra-low current drain (<60 µA) with 4.5–20 V DC wide supply voltage',
      '2.5 s default blockade/delay time',
      'Operating temperature range from −20°C to +80°C'
    ],
    specs: {
      'Sensor Type': 'PIR',
      'Operating Voltage': '4.5–20 V DC',
      'Current Drain': '<60 µA',
      'Detection Distance': '3–7 m, adjustable',
      'Detection Angle': '<140°',
      'Default Blockade/Delay': '2.5 s',
      'Operating Temperature': '−20°C to +80°C',
      'Output': 'Digital motion signal'
    }
  },
  {
    id: 'sn-4',
    name: 'LDR Light Sensor Module — LM393',
    slug: 'ldr-sensor-module',
    sku: 'SKU-SN-04',
    categorySlug: 'sensors',
    categoryName: 'Sensors',
    subCategory: 'Optical & Sound',
    price: 39,
    originalPrice: 39,
    discountPercent: 0,
    inStock: true,
    stockCount: 400,
    rating: 5.0,
    reviewCount: 0,
    image: 'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256085/awie_store/sensors/ldr-light-sensor-module_front-jpg.jpg',
    gallery: [
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256085/awie_store/sensors/ldr-light-sensor-module_front-jpg.jpg',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256086/awie_store/sensors/ldr-light-sensor-module_top-info-jpg.jpg'
    ],
    description: 'An LDR-based light sensor module for detecting ambient light intensity. It provides both analog and digital outputs and includes adjustable sensitivity.',
    features: [
      'Photoresistor / LDR sensor element with LM393 voltage comparator',
      '3.3–5 V DC operating range with dual Digital (DO) & Analog (AO) output pins',
      'Adjustable sensitivity potentiometer for setting light detection threshold',
      'Compact 33 × 14 × 8 mm footprint (4 g weight) for smart lamps and ambient light automation'
    ],
    specs: {
      'Sensor': 'LDR / Photoresistor',
      'Comparator': 'LM393',
      'Operating Voltage': '3.3–5 V',
      'Digital Output': 'DO',
      'Analog Output': 'AO',
      'Sensitivity': 'Adjustable potentiometer',
      'Length': '33 mm',
      'Width': '14 mm',
      'Height': '8 mm',
      'Weight': '4 g'
    }
  },
  {
    id: 'sn-5',
    name: 'DHT11 Digital Temperature & Humidity Sensor',
    slug: 'dht11-sensor',
    sku: 'SKU-SN-05',
    categorySlug: 'sensors',
    categoryName: 'Sensors',
    subCategory: 'Environmental & Gas',
    price: 99,
    originalPrice: 99,
    discountPercent: 0,
    inStock: true,
    stockCount: 220,
    rating: 5.0,
    reviewCount: 0,
    image: 'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256076/awie_store/sensors/dht11-temperature-humidity-sensor_top-jpg.jpg',
    gallery: [
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256076/awie_store/sensors/dht11-temperature-humidity-sensor_top-jpg.jpg',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256074/awie_store/sensors/dht11-temperature-humidity-sensor_side-jpg.jpg',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256074/awie_store/sensors/dht11-temperature-humidity-sensor_gpio-jpg.jpg'
    ],
    description: 'DHT11 is a low-cost digital sensor for measuring ambient temperature and relative humidity.',
    features: [
      '0–50°C temperature range (±2°C accuracy)',
      '20–90% RH relative humidity range (±5% RH accuracy)',
      '16-bit digital output with 1 Hz sampling rate',
      '3–5 V supply with single-wire digital interface'
    ],
    specs: {
      'Sensor Type': 'Digital temperature + humidity',
      'Supply': '3–5 V',
      'Temperature Range': '0–50°C',
      'Temperature Accuracy': '±2°C',
      'Humidity Range': '20–90% RH',
      'Humidity Accuracy': '±5% RH',
      'Resolution': '16-bit digital output',
      'Sampling': 'Up to 1 Hz',
      'Interface': 'Single-wire digital'
    }
  },
  {
    id: 'sn-6',
    name: 'DHT22 / AM2302 Digital Temperature & Humidity Sensor',
    slug: 'dht22-sensor',
    sku: 'SKU-SN-06',
    categorySlug: 'sensors',
    categoryName: 'Sensors',
    subCategory: 'Environmental & Gas',
    price: 249,
    originalPrice: 249,
    discountPercent: 0,
    inStock: true,
    stockCount: 150,
    rating: 5.0,
    reviewCount: 0,
    image: 'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256077/awie_store/sensors/dht22-am2302-sensor_top-jpg.jpg',
    gallery: [
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256077/awie_store/sensors/dht22-am2302-sensor_top-jpg.jpg',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256076/awie_store/sensors/dht22-am2302-sensor_back-jpg.jpg'
    ],
    description: 'DHT22 is a digital temperature and humidity sensor offering higher measurement range and accuracy than the basic DHT11.',
    features: [
      '−40 to +80°C temperature range with ±0.5°C accuracy',
      '0–99.9% RH humidity range with ±2% RH accuracy',
      'High 0.1°C / 0.1% RH resolution',
      'Calibrated single-wire digital output for HVAC and weather station prototypes'
    ],
    specs: {
      'Sensor Type': 'Digital temperature + humidity',
      'Model': 'DHT22 / AM2302',
      'Temperature Range': '−40 to +80°C',
      'Humidity Range': '0–99.9% RH',
      'Temperature Accuracy': '±0.5°C',
      'Humidity Accuracy': '±2% RH around 10–90% RH',
      'Temperature Resolution': '0.1°C',
      'Humidity Resolution': '0.1% RH',
      'Output': 'Calibrated digital signal',
      'Interface': 'Single-wire digital'
    }
  },
  {
    id: 'sn-7',
    name: 'DS18B20 Waterproof Temperature Sensor Probe',
    slug: 'ds18b20-temperature-sensor',
    sku: 'SKU-SN-07',
    categorySlug: 'sensors',
    categoryName: 'Sensors',
    subCategory: 'Environmental & Gas',
    price: 119,
    originalPrice: 119,
    discountPercent: 0,
    inStock: true,
    stockCount: 140,
    rating: 5.0,
    reviewCount: 0,
    image: 'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256079/awie_store/sensors/ds18b20-temperature-sensor-prob_top-jpg.jpg',
    gallery: [
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256079/awie_store/sensors/ds18b20-temperature-sensor-prob_top-jpg.jpg',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256078/awie_store/sensors/ds18b20-temperature-sensor-prob_gipo-info-jpg.jpg'
    ],
    description: 'Waterproof digital temperature sensor probe with a stainless-steel housing and 1-Wire interface, suitable for liquid, outdoor, IoT and embedded temperature monitoring.',
    features: [
      'Waterproof stainless-steel probe (approx. 6 mm × 45–50 mm) with sealed housing',
      '1-Wire interface — only one data pin required, supports multi-sensor bus',
      '−55°C to +125°C range with ±0.5°C accuracy, 9–12-bit programmable resolution',
      'Long ~1 m 3-wire cable — suitable for aquarium, soil, liquid, and outdoor environments'
    ],
    specs: {
      'Sensor IC': 'DS18B20',
      'Sensor Type': 'Digital temperature sensor',
      'Interface': '1-Wire',
      'Operating Voltage': '3.0–5.5 V',
      'Temperature Range': '−55°C to +125°C',
      'Accuracy': '±0.5°C from −10°C to +85°C',
      'Resolution': '9-bit to 12-bit programmable',
      'Probe Material': 'Stainless steel',
      'Probe Diameter': 'Approx. 6 mm',
      'Probe Length': 'Approx. 45–50 mm',
      'Cable Length': 'Approx. 1 metre',
      'Cable': '3-wire (Red=VCC, Black=GND, Yellow/White=DATA)',
      'Waterproof': 'Yes — sealed probe',
      'Pull-up resistor': '4.7 kΩ recommended',
      'Conversion Time': 'Up to 750 ms at 12-bit',
      'Unique ID': '64-bit'
    }
  },
  {
    id: 'sn-8',
    name: 'MQ-2 Smoke, LPG & Gas Sensor Module',
    slug: 'mq-2-gas-sensor',
    sku: 'SKU-SN-08',
    categorySlug: 'sensors',
    categoryName: 'Sensors',
    subCategory: 'Environmental & Gas',
    price: 129,
    originalPrice: 129,
    discountPercent: 0,
    inStock: true,
    stockCount: 130,
    rating: 5.0,
    reviewCount: 0,
    image: 'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256089/awie_store/sensors/mq-2-gas-sensor-module_top-jpg.jpg',
    gallery: [
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256089/awie_store/sensors/mq-2-gas-sensor-module_top-jpg.jpg'
    ],
    description: 'MQ-2 is a gas-sensing module commonly used in electronics projects for detecting smoke and several combustible gases.',
    features: [
      'Detects smoke, LPG, butane, hydrogen, and combustible gas concentrations',
      'Dual signal outputs: 0–5 V Analog + TTL Digital',
      'Onboard potentiometer sensitivity threshold adjustment',
      'Compact 36 × 20 × 21 mm breakout board'
    ],
    specs: {
      'Sensor Type': 'Semiconductor gas sensor',
      'Operating Voltage': '5 V',
      'Preheat Duration': '~20 s',
      'Analog Output': '0–5 V',
      'Digital Output': 'TTL',
      'Module Dimensions': '36 × 20 × 21 mm',
      'Detectable gases': 'Smoke, LPG, butane, hydrogen and other combustible gases',
      'Sensitivity': 'Adjustable on module'
    }
  },
  {
    id: 'sn-9',
    name: 'MPU-6050 6-Axis Accelerometer & Gyroscope Module',
    slug: 'mpu-6050-gyroscope',
    sku: 'SKU-SN-09',
    categorySlug: 'sensors',
    categoryName: 'Sensors',
    subCategory: 'Motion & Proximity',
    price: 149,
    originalPrice: 149,
    discountPercent: 0,
    inStock: true,
    stockCount: 160,
    rating: 5.0,
    reviewCount: 0,
    image: 'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256088/awie_store/sensors/mpu-6050_top-jpg.jpg',
    gallery: [
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256088/awie_store/sensors/mpu-6050_top-jpg.jpg',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256087/awie_store/sensors/mpu-6050_side-jpg.jpg'
    ],
    description: 'MPU-6050 combines a 3-axis accelerometer and 3-axis gyroscope in one motion-sensing device for orientation, movement and motion-monitoring projects.',
    features: [
      '6-axis motion tracking (3-axis Gyroscope + 3-axis Accelerometer)',
      'User-programmable gyro range: ±250 / ±500 / ±1000 / ±2000 °/s',
      'User-programmable accel range: ±2g / ±4g / ±8g / ±16g',
      'Standard I2C digital interface for robotics, drones, and orientation tracking'
    ],
    specs: {
      'Sensor': '3-axis accelerometer + 3-axis gyroscope',
      'Axes': '6-axis motion sensing',
      'Interface': 'I²C',
      'Accelerometer': '±2g / ±4g / ±8g / ±16g',
      'Gyroscope': '±250 / ±500 / ±1000 / ±2000 °/s',
      'Digital Interface': 'I²C',
      'Applications': 'Motion/orientation sensing'
    }
  },
  {
    id: 'sn-10',
    name: 'SW-420 Vibration Sensor Module',
    slug: 'sw-420-vibration-sensor',
    sku: 'SKU-SN-10',
    categorySlug: 'sensors',
    categoryName: 'Sensors',
    subCategory: 'Motion & Proximity',
    price: 59,
    originalPrice: 59,
    discountPercent: 0,
    inStock: true,
    stockCount: 170,
    rating: 5.0,
    reviewCount: 0,
    image: 'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256091/awie_store/sensors/sw-420-vibration-sensor_top-jpg.jpg',
    gallery: [
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256091/awie_store/sensors/sw-420-vibration-sensor_top-jpg.jpg',
      'https://res.cloudinary.com/hrmmi1ox/image/upload/v1788256090/awie_store/sensors/sw-420-vibration-sensor_side-jpg.jpg'
    ],
    description: 'SW-420 is a vibration detection module that detects vibration or movement and provides a digital switching output.',
    features: [
      'SW-420 normally-closed vibration sensor element',
      'LM393 comparator with adjustable sensitivity potentiometer',
      '3.3–5 V DC operating range with digital switching output (0/1)',
      'Mounting bolt holes for anti-tamper alarms and machine monitoring'
    ],
    specs: {
      'Sensor': 'SW-420 normally-closed vibration sensor',
      'Comparator': 'LM393',
      'Operating Voltage': '3.3–5 V',
      'Output': 'Digital',
      'Output Logic': '0 / 1 switching',
      'Sensitivity': 'Adjustable',
      'Mounting': 'Bolt holes',
      'Output Drive': '>15 mA'
    }
  },

  // 3. Modules (7 Items)
  {
    id: 'md-1',
    name: '5V 1-Channel Relay Module',
    slug: 'relay-5v-single',
    sku: 'SKU-MD-01',
    categorySlug: 'modules',
    categoryName: 'Modules',
    subCategory: 'Relays & Drivers',
    price: 69,
    originalPrice: 69,
    discountPercent: 0,
    inStock: true,
    stockCount: 280,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/modules/5-relays.jpg',
    description: 'Single-channel 5V relay module for controlling higher-voltage or higher-current loads using Arduino, ESP32, ESP8266 and other microcontrollers.',
    features: [
      'Single electromechanical relay with COM, NO, NC screw terminals',
      '5V coil voltage with digital input control',
      'Power and status LED indicators onboard',
      'Compatible with Arduino, ESP32, ESP8266, and Raspberry Pi'
    ],
    specs: {
      'Channels': '1',
      'Relay Coil Voltage': '5 V DC',
      'Relay Type': 'Electromechanical',
      'Control': 'Digital input',
      'Relay Contacts': 'COM, NO, NC',
      'Typical Contact Rating': 'Up to 10 A',
      'Indicator': 'Power/status LED',
      'Interface': 'VCC, GND, IN'
    }
  },
  {
    id: 'md-2',
    name: '5V 4-Channel Relay Module',
    slug: 'relay-5v-4ch',
    sku: 'SKU-MD-02',
    categorySlug: 'modules',
    categoryName: 'Modules',
    subCategory: 'Relays & Drivers',
    price: 149,
    originalPrice: 149,
    discountPercent: 0,
    inStock: true,
    stockCount: 150,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/modules/5-relays.jpg',
    description: 'Four-channel 5V relay module for independently switching multiple electrical loads from a microcontroller or development board.',
    features: [
      '4 independent electromechanical relays with individual IN1–IN4 control pins',
      '5V coil voltage with COM/NO/NC screw terminals per channel',
      'Individual LED indicator per relay channel',
      'Suitable for home automation, robotics, and multi-load switching projects'
    ],
    specs: {
      'Channels': '4',
      'Coil Voltage': '5 V DC',
      'Relay Type': 'Electromechanical',
      'Inputs': 'IN1–IN4',
      'Contacts': 'COM / NO / NC',
      'Indicator': 'Individual channel LEDs',
      'Power': '5 V DC'
    }
  },
  {
    id: 'md-3',
    name: 'TP4056 1A Li-Ion Charger Module with Protection',
    slug: 'tp4056-charger',
    sku: 'SKU-MD-03',
    categorySlug: 'modules',
    categoryName: 'Modules',
    subCategory: 'Charging & Power',
    price: 49,
    originalPrice: 49,
    discountPercent: 0,
    inStock: true,
    stockCount: 500,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/modules/tp4056.jpg',
    description: 'Compact single-cell lithium-ion battery charging module based on TP4056, designed for charging 3.7V Li-ion/Li-Po cells from a 5V USB supply.',
    features: [
      'TP4056 controller with up to 1A constant-current charging',
      'Integrated battery protection circuit (overcharge, over-discharge)',
      'Charging and full-charge status indicator LEDs',
      'Micro-USB 5V input — suitable for portable electronics and ESP32 power systems'
    ],
    specs: {
      'Controller': 'TP4056',
      'Battery': '1-cell Li-Ion/Li-Po',
      'Nominal Battery': '3.7 V',
      'Charge Voltage': '4.2 V',
      'Charge Current': 'Up to 1 A',
      'Input': '5 V',
      'Input Connector': 'Micro-USB',
      'Protection': 'Overcharge & over-discharge circuit',
      'Charging LED': 'Yes',
      'Full LED': 'Yes'
    }
  },
  {
    id: 'md-4',
    name: 'NRF24L01 2.4GHz Wireless Transceiver Module',
    slug: 'nrf24l01-wireless',
    sku: 'SKU-MD-04',
    categorySlug: 'modules',
    categoryName: 'Modules',
    subCategory: 'Audio & Wireless',
    price: 99,
    originalPrice: 99,
    discountPercent: 0,
    inStock: true,
    stockCount: 200,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/modules/nrf24l01.jpg',
    description: 'Compact 2.4GHz wireless transceiver module for low-power bidirectional communication between microcontrollers.',
    features: [
      'nRF24L01+ IC with 2.4 GHz ISM band operation',
      'SPI interface with up to 2 Mbps data rate',
      '1.9–3.6 V supply with up to 125 configurable channels',
      'Integrated PCB antenna — suitable for sensor networks, RC, and IoT projects'
    ],
    specs: {
      'IC': 'nRF24L01+',
      'Frequency': '2.4 GHz ISM',
      'Communication': 'SPI',
      'Data Rate': '250 kbps / 1 Mbps / 2 Mbps',
      'Supply Voltage': '1.9–3.6 V',
      'Logic': '3.3 V',
      'Channels': 'Up to 125',
      'Antenna': 'Integrated PCB antenna'
    }
  },
  {
    id: 'md-5',
    name: 'HC-05 Bluetooth Serial Communication Module',
    slug: 'hc-05-bluetooth',
    sku: 'SKU-MD-05',
    categorySlug: 'modules',
    categoryName: 'Modules',
    subCategory: 'Audio & Wireless',
    price: 179,
    originalPrice: 179,
    discountPercent: 0,
    inStock: true,
    stockCount: 180,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/modules/hc-05.jpg',
    description: 'HC-05 is a Bluetooth Classic serial communication module commonly used to add wireless UART connectivity to microcontroller projects.',
    features: [
      'Bluetooth Classic SPP profile with master and slave mode support',
      'UART serial interface (TX, RX, VCC, GND) — drop-in wireless serial replacement',
      'Configurable via AT commands for baud rate, name, and pairing mode',
      'Typical ~10 m range for robot control, data telemetry, and wireless projects'
    ],
    specs: {
      'Module': 'HC-05',
      'Bluetooth': 'Classic Bluetooth',
      'Bluetooth Version': '2.0 + EDR',
      'Profile': 'SPP',
      'Communication': 'UART',
      'Operating Logic': '3.3 V',
      'Modes': 'Master/Slave capable',
      'Interface': 'TX, RX, VCC, GND'
    }
  },
  {
    id: 'md-7',
    name: 'DS3231 Precision RTC Module with AT24C32 EEPROM',
    slug: 'ds3231-rtc',
    sku: 'SKU-MD-07',
    categorySlug: 'modules',
    categoryName: 'Modules',
    subCategory: 'Timing & Interfaces',
    price: 149,
    originalPrice: 149,
    discountPercent: 0,
    inStock: true,
    stockCount: 160,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/modules/ds3231-rtc.jpg',
    description: 'High-accuracy real-time clock module using the DS3231 with I²C communication, battery backup and onboard AT24C32 EEPROM.',
    features: [
      'DS3231 temperature-compensated RTC with I²C interface (3.3–5 V)',
      'Battery backup CR2032 coin cell holder for power-loss timekeeping',
      'AT24C32 32 kbit onboard EEPROM for data storage',
      '2 programmable alarms and configurable square-wave output'
    ],
    specs: {
      'RTC IC': 'DS3231',
      'Interface': 'I²C',
      'Supply': '3.3–5 V',
      'Clock': 'Seconds, minutes, hours',
      'Calendar': 'Day, date, month, year',
      'Leap Year': 'Automatic',
      'Battery Backup': 'Yes',
      'EEPROM': 'AT24C32, 32 kbit',
      'Accuracy': 'Temperature-compensated RTC',
      'Alarm': '2 programmable alarms'
    }
  },
  {
    id: 'md-8',
    name: 'PAM8403 5V Stereo Class-D 3W + 3W Audio Amplifier Module',
    slug: 'pam8403-audio',
    sku: 'SKU-MD-08',
    categorySlug: 'modules',
    categoryName: 'Modules',
    subCategory: 'Audio & Wireless',
    price: 89,
    originalPrice: 89,
    discountPercent: 0,
    inStock: true,
    stockCount: 120,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/modules/pam8403.jpg',
    description: 'Compact stereo Class-D audio amplifier module designed to drive small speakers from a low-voltage 5V supply.',
    features: [
      'PAM8403 Class-D stereo amplifier IC with up to 3W + 3W output',
      '5V USB-powered — no heatsink required at typical load levels',
      'Left and right speaker screw terminal outputs',
      'High efficiency Class-D design for Arduino and ESP32 audio projects'
    ],
    specs: {
      'IC': 'PAM8403',
      'Amplifier Type': 'Class-D',
      'Channels': '2',
      'Output': 'Up to 3 W + 3 W',
      'Supply': '5 V',
      'Input': 'Analog audio',
      'Speaker Output': 'Left + Right'
    }
  },

  // 4. Displays (8 Items)
  {
    id: 'dp-1',
    name: '0.96" OLED Display 128×64',
    slug: 'oled-096-128x64',
    sku: 'SKU-DP-01',
    categorySlug: 'displays',
    categoryName: 'Displays',
    subCategory: 'OLED Displays',
    price: 149,
    originalPrice: 149,
    discountPercent: 0,
    inStock: true,
    stockCount: 250,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/displays/oled-096-128x64.png',
    description: 'Compact monochrome OLED display with 128×64 resolution and I²C interface, ideal for showing sensor readings, status information, menus, icons and small graphical interfaces in Arduino, ESP32 and other embedded projects.',
    features: [
      'High-contrast 128×64 pixel graphic OLED display',
      'SSD1306 driver IC with I²C serial communication',
      'Self-illuminating pixels with wide viewing angle (>160°)',
      'Low power consumption (approx. 0.08W during full display)',
      'Ideal for sensor dashboards, mini consoles & wearable UIs'
    ],
    specs: {
      'Display Size': '0.96 inch',
      'Resolution': '128×64 pixels',
      'Display Type': 'OLED (Organic LED)',
      'Color': 'Monochrome',
      'Driver IC': 'SSD1306',
      'Interface': 'I²C (Address 0x3C / 0x3D)',
      'Operating Voltage': '3.3V – 5.0V DC',
      'Applications': 'Arduino, ESP32, IoT, embedded projects'
    }
  },
  {
    id: 'dp-2',
    name: '1.3" OLED Display 128×64',
    slug: 'oled-13-128x64',
    sku: 'SKU-DP-02',
    categorySlug: 'displays',
    categoryName: 'Displays',
    subCategory: 'OLED Displays',
    price: 199,
    originalPrice: 199,
    discountPercent: 0,
    inStock: true,
    stockCount: 180,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/displays/oled-13-128x64.png',
    description: 'Larger monochrome OLED display providing a 128×64 pixel resolution for compact embedded interfaces, menus, sensor dashboards and device status displays.',
    features: [
      'Generous 1.3" diagonal viewing area with 128×64 resolution',
      'SH1106 driver controller with Passive Matrix OLED technology',
      'Simple 4-pin I²C interface (VCC, GND, SCL, SDA)',
      'High contrast ratio for clear readability in ambient light',
      'Wide viewing angle > 160° with minimal current drain'
    ],
    specs: {
      'Display Size': '1.3 inch (approx. 34.5 × 23 mm panel)',
      'Resolution': '128×64 pixels',
      'Display Type': 'OLED',
      'Color': 'Monochrome (White/Blue)',
      'Common Driver': 'SH1106',
      'Interface': 'I²C',
      'Display Technology': 'Passive Matrix',
      'Operating Voltage': '3.3V – 5.0V',
      'Applications': 'ESP32, Arduino, IoT and embedded systems'
    }
  },
  {
    id: 'dp-3',
    name: '0.91" OLED Display 128×32',
    slug: 'oled-091-128x32',
    sku: 'SKU-DP-03',
    categorySlug: 'displays',
    categoryName: 'Displays',
    subCategory: 'OLED Displays',
    price: 129,
    originalPrice: 129,
    discountPercent: 0,
    inStock: true,
    stockCount: 200,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/displays/oled-091-128x32.png',
    description: 'Ultra-compact monochrome OLED display designed for projects where space is limited. Suitable for displaying short text, sensor values, icons and device status.',
    features: [
      'Ultra-compact slim horizontal 0.91-inch form factor',
      '128×32 pixel crisp resolution',
      'I²C serial interface with standard 4-pin header',
      'Extremely low power consumption for portable battery gadgets',
      'Self-illuminating pixels requiring no backlight'
    ],
    specs: {
      'Display Size': '0.91 inch',
      'Resolution': '128×32 pixels',
      'Display Type': 'OLED',
      'Color': 'Blue / Monochrome (Variant Dependent)',
      'Driver IC': 'SSD1306',
      'Interface': 'I²C',
      'Form Factor': 'Ultra-compact slim',
      'Operating Voltage': '3.3V – 5.0V',
      'Applications': 'Wearables, IoT, Arduino and ESP32 projects'
    }
  },
  {
    id: 'dp-5',
    name: '3.5" TFT LCD Touch Display',
    slug: 'tft-35-touch',
    sku: 'SKU-DP-05',
    categorySlug: 'displays',
    categoryName: 'Displays',
    subCategory: 'TFT Displays',
    price: 699,
    originalPrice: 699,
    discountPercent: 0,
    inStock: true,
    stockCount: 75,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/displays/tft-35-touch.png',
    description: 'Large color TFT touchscreen suitable for graphical interfaces, dashboards, control panels and embedded applications requiring a larger interactive display.',
    features: [
      'Generous 3.5" diagonal viewing area with 320×480 HD resolution',
      'Integrated touch overlay with stylus/finger touch support',
      'ILI9486 driver chip for fast screen refreshes',
      'Onboard MicroSD slot for storing bitmap UI assets',
      'Direct plug-in shield support for Arduino Mega / Uno & ESP32'
    ],
    specs: {
      'Display Size': '3.5 inch',
      'Display Type': 'TFT LCD',
      'Touch': 'Yes (Resistive / Capacitive Variant)',
      'Typical Resolution': '320×480 pixels',
      'Color': 'Full Color RGB (65K)',
      'Display Controller': 'ILI9486 / Variant Dependent',
      'Interface': 'SPI / 8-bit Parallel',
      'Operating Voltage': '3.3V – 5.0V DC',
      'Applications': 'Arduino, embedded systems, control panels and IoT'
    }
  },
  {
    id: 'dp-6',
    name: '16×2 LCD Display (Blue)',
    slug: 'lcd-16x2-blue',
    sku: 'SKU-DP-06',
    categorySlug: 'displays',
    categoryName: 'Displays',
    subCategory: 'LCD Displays',
    price: 89,
    originalPrice: 89,
    discountPercent: 0,
    inStock: true,
    stockCount: 300,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/displays/lcd-16x2-blue.png',
    description: 'Classic 16×2 character LCD with blue backlight for displaying text, numbers and basic status information. A simple and reliable choice for Arduino and microcontroller projects.',
    features: [
      '16 characters wide across 2 lines (32 total characters)',
      'High-contrast bright blue backlight with crisp white text',
      'Standard 16-pin interface compatible with HD44780 controller',
      'Support for 4-bit and 8-bit parallel microprocessor modes',
      'Built-in character generator ROM for ASCII & custom symbols'
    ],
    specs: {
      'Display Format': '16 columns × 2 rows',
      'Display Type': 'Character LCD',
      'Backlight': 'Blue LED Backlight',
      'Character Interface': 'Parallel (4-bit / 8-bit)',
      'Character Controller': 'HD44780-compatible commonly',
      'Operating Voltage': '5.0V DC',
      'Applications': 'Arduino, ESP32, automation and embedded projects'
    }
  },
  {
    id: 'dp-7',
    name: '16×2 LCD with I²C Adapter',
    slug: 'lcd-16x2-i2c',
    sku: 'SKU-DP-07',
    categorySlug: 'displays',
    categoryName: 'Displays',
    subCategory: 'LCD Displays',
    price: 119,
    originalPrice: 119,
    discountPercent: 0,
    inStock: true,
    stockCount: 280,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/displays/lcd-16x2-i2c.png',
    description: '16×2 character LCD combined with an I²C adapter, reducing the number of microcontroller pins required for displaying text and values.',
    features: [
      'Pre-soldered PCF8574 I²C backpack module',
      'Requires only 2 micro-controller I/O pins (SDA & SCL)',
      'Integrated contrast trimming potentiometer',
      'Jumper header for backlight power control',
      'Supported by standard LiquidCrystal_I2C libraries'
    ],
    specs: {
      'Display Format': '16×2 characters',
      'Display Type': 'Character LCD',
      'Backlight': 'Blue',
      'Interface': 'I²C',
      'Adapter': 'I²C backpack (PCF8574)',
      'Typical Address': '0x27 or 0x3F depending backpack',
      'Operating Voltage': '5.0V DC',
      'Applications': 'Arduino, ESP32, IoT and automation'
    }
  },
  {
    id: 'dp-8',
    name: '20×4 LCD Display with I²C',
    slug: 'lcd-20x4-i2c',
    sku: 'SKU-DP-08',
    categorySlug: 'displays',
    categoryName: 'Displays',
    subCategory: 'LCD Displays',
    price: 199,
    originalPrice: 199,
    discountPercent: 0,
    inStock: true,
    stockCount: 150,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/displays/lcd-20x4-i2c.png',
    description: '20×4 character LCD with an I²C interface, providing more display space than a standard 16×2 LCD. Suitable for menus, sensor dashboards and automation systems.',
    features: [
      '20 columns × 4 rows (80 total characters) for extensive telemetry',
      'Pre-mounted I²C serial backpack converter',
      'Bright blue backlight with sharp white lettering',
      'Easy 4-wire connection (VCC, GND, SDA, SCL)',
      'Onboard potentiometer for fine contrast calibration'
    ],
    specs: {
      'Display Format': '20 columns × 4 rows',
      'Display Type': 'Character LCD',
      'Backlight': 'Blue',
      'Interface': 'I²C',
      'I²C Adapter': 'Included (PCF8574 backpack)',
      'Typical Address': '0x27 or 0x3F depending module',
      'Operating Voltage': '5.0V DC',
      'Applications': 'Arduino, ESP32, IoT and automation'
    }
  },
  {
    id: 'dp-10',
    name: '8×8 LED Matrix with MAX7219',
    slug: 'led-matrix-8x8',
    sku: 'SKU-DP-10',
    categorySlug: 'displays',
    categoryName: 'Displays',
    subCategory: 'LED & Matrix',
    price: 149,
    originalPrice: 149,
    discountPercent: 0,
    inStock: true,
    stockCount: 160,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/displays/led-matrix-8x8.png',
    description: 'Compact 8×8 LED matrix module driven by the MAX7219 controller. Suitable for displaying numbers, letters, scrolling text, symbols and simple animations.',
    features: [
      '64 individually addressable bright red LED pixels',
      'Integrated MAX7219 serial input/output common-cathode display driver',
      'Cascadable daisy-chain architecture for multi-panel scrolling signs',
      '3-wire SPI digital control saving valuable microcontroller pins',
      'Low power shutdown mode with digital/analog brightness control'
    ],
    specs: {
      'Matrix Size': '8×8 (64 LEDs)',
      'Total LEDs': '64',
      'Driver IC': 'MAX7219',
      'Interface': 'Serial / SPI-style (DIN, CS, CLK)',
      'Control': 'Digital 3-Wire',
      'Daisy-chain Capable': 'Yes (Cascadable)',
      'Operating Voltage': '5.0V DC',
      'Applications': 'Arduino, ESP32, clocks, counters and scrolling displays'
    }
  },

  // 5. Motors & Drivers (8 Items)
  {
    id: 'mt-1',
    name: 'SG90 9g Micro Servo Motor',
    slug: 'sg90-servo',
    sku: 'SKU-MT-01',
    categorySlug: 'motors-drivers',
    categoryName: 'Motors & Drivers',
    subCategory: 'Servo Motors',
    price: 129,
    originalPrice: 129,
    discountPercent: 0,
    inStock: true,
    stockCount: 400,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/motors/sg90-servo.png',
    description: 'Compact 9g micro servo motor suitable for small robotic mechanisms, pan-tilt systems, RC projects and Arduino/ESP32-based applications.',
    features: [
      'Lightweight 9g compact form factor with mounting tabs',
      '180° rotation angle with PWM pulse width modulation control',
      'Includes 3 interchangeable servo arms and mounting screws',
      'Operating voltage compatible with standard 5V microcontroller rails',
      'Ideal for robotic grippers, RC airplanes, and pan-tilt mechanisms'
    ],
    specs: {
      'Motor Type': 'Micro Servo',
      'Model': 'SG90',
      'Weight': 'Approximately 9g',
      'Operating Voltage': 'Typically 4.8V – 6.0V DC',
      'Control Protocol': 'PWM (50Hz standard servo signal)',
      'Rotation Range': 'Approximately 180°',
      'Gear Type': 'Plastic Gear Train',
      'Stall Torque': '1.8 kg-cm @ 4.8V',
      'Applications': 'Robotics, pan-tilt mechanisms, RC projects and IoT'
    }
  },
  {
    id: 'mt-2',
    name: 'MG996R High Torque Servo',
    slug: 'mg996r-servo',
    sku: 'SKU-MT-02',
    categorySlug: 'motors-drivers',
    categoryName: 'Motors & Drivers',
    subCategory: 'Servo Motors',
    price: 299,
    originalPrice: 299,
    discountPercent: 0,
    inStock: true,
    stockCount: 200,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/motors/mg996r-servo.png',
    description: 'High-torque metal-geared servo motor designed for robotic arms, steering mechanisms, pan-tilt systems and other applications requiring greater mechanical force.',
    features: [
      'Full metal gear train for high durability under load',
      'Heavy-duty high torque output (up to 11 kg-cm at 6V)',
      'Dual ball bearings for smooth output shaft stability',
      'Compatible with standard 3-pin hobby servo controllers and Arduino PWM',
      'Includes heavy-duty servo horns and brass eyelet mounting hardware'
    ],
    specs: {
      'Model': 'MG996R',
      'Motor Type': 'Digital Servo',
      'Gear Type': 'Metal Gear Train',
      'Operating Voltage': 'Typically 4.8V – 7.2V DC',
      'Control': 'PWM',
      'Rotation': 'Approximately 180°',
      'High Torque': 'Yes (Up to ~11 kg-cm @ 6V)',
      'Bearing': 'Dual Ball Bearing',
      'Applications': 'Robotics, RC vehicles, robotic arms and mechanisms'
    }
  },
  {
    id: 'mt-3',
    name: '28BYJ-48 Stepper + ULN2003',
    slug: '28byj48-stepper',
    sku: 'SKU-MT-03',
    categorySlug: 'motors-drivers',
    categoryName: 'Motors & Drivers',
    subCategory: 'Stepper Motors',
    price: 149,
    originalPrice: 149,
    discountPercent: 0,
    inStock: true,
    stockCount: 250,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/motors/28byj48-stepper.png',
    description: 'Compact geared stepper motor supplied with a ULN2003 driver board. Suitable for projects requiring controlled incremental movement and positioning.',
    features: [
      'Includes 28BYJ-48 5V stepper motor and matching ULN2003 driver PCB',
      '1:64 reduction gearbox for precise incremental rotational positioning',
      'Onboard 4-channel LED indicators for active phase visualization',
      'Direct plug-and-play wiring header for Arduino & ESP32 GPIOs',
      'Smooth low-noise operation for automation valves, gauges & dials'
    ],
    specs: {
      'Motor Model': '28BYJ-48',
      'Motor Type': 'Geared 4-Phase Stepper Motor',
      'Driver IC': 'ULN2003 Darlington Array Board included',
      'Typical Voltage': '5V DC',
      'Phase': '4-Phase 5-Wire',
      'Gear Ratio': '1:64 Internal Reduction Gearbox',
      'Step Angle': '5.625° / 64',
      'Interface': 'Digital GPIO (IN1–IN4)',
      'Applications': 'Robotics, mechanisms, indicators and Arduino projects'
    }
  },
  {
    id: 'mt-5',
    name: 'L298N Dual H-Bridge Driver',
    slug: 'l298n-motor-driver',
    sku: 'SKU-MT-05',
    categorySlug: 'motors-drivers',
    categoryName: 'Motors & Drivers',
    subCategory: 'Motor Drivers & Chassis',
    price: 149,
    originalPrice: 149,
    discountPercent: 0,
    inStock: true,
    stockCount: 220,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/motors/l298n-motor-driver.png',
    description: 'Dual H-bridge motor driver module for controlling two DC motors or one bipolar stepper motor. Commonly used with Arduino, ESP32 and robotics platforms.',
    features: [
      'Dual full H-bridge driver capable of up to 2A peak per channel',
      'Independent bidirectional speed and direction control for 2 DC motors',
      'Onboard 78M05 5V linear voltage regulator with jumper enable',
      'Heavy-duty aluminum heat sink and screw terminal blocks',
      'Direct PWM input pins for motor speed acceleration control'
    ],
    specs: {
      'Driver IC': 'L298N',
      'Driver Type': 'Dual H-Bridge Driver',
      'Motor Channels': '2 DC Motors or 1 Bipolar Stepper',
      'Motor Supply (Vs)': 'Typically up to 35V DC',
      'Logic Supply (Vss)': '5V DC (Onboard regulator enabled when Vs > 7V)',
      'Peak Current': '2A per channel',
      'Control Signals': 'Digital inputs (IN1-IN4) + PWM Enable pins',
      'Applications': 'Robot cars, DC motors and robotics'
    }
  },
  {
    id: 'mt-6',
    name: 'L293D Motor Driver Shield for Arduino',
    slug: 'l293d-motor-driver',
    sku: 'SKU-MT-06',
    categorySlug: 'motors-drivers',
    categoryName: 'Motors & Drivers',
    subCategory: 'Motor Drivers & Chassis',
    price: 299,
    originalPrice: 299,
    discountPercent: 0,
    inStock: true,
    stockCount: 120,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/motors/l293d-motor-shield.png',
    description: 'Arduino-compatible L293D motor-control shield that sits directly on an Arduino UNO board, with multiple L293D H-bridge driver ICs and screw terminals for M1–M4 motor channels.',
    features: [
      'Arduino UNO & compatible board shield format — stacks directly on the board',
      'Multiple L293D H-bridge driver ICs onboard',
      '4 × DC motor channels (M1, M2, M3, M4) with bidirectional control',
      'Drives up to 2 stepper motors and 2 × 5V servo interfaces (SERVO 1 / SERVO 2)',
      'PWR / EXT PWR selector for external motor power supply',
      'Forward/reverse plus PWM speed control on all motor channels',
      'Accessible digital pins 0–13, analog pins A0–A5 and onboard RESET button'
    ],
    specs: {
      'Product Name': 'DK Electronics L293D Motor Driver Shield',
      'Type': 'Arduino Motor Driver Shield',
      'Controller Compatibility': 'Arduino UNO and compatible boards',
      'Motor Driver': 'L293D H-bridge ICs',
      'DC Motor Channels': '4 (M1, M2, M3, M4) — bidirectional with PWM speed control',
      'Stepper Support': 'Up to 2 stepper motors',
      'Servo Ports': '2 × 5V servo interfaces',
      'Motor Voltage': 'Approximately 4.5–36V DC (implementation dependent)',
      'Driver Current': 'Up to 600 mA per H-bridge, higher peak capability',
      'Main Connections': 'M1–M4, SERVO 1/2, PWR / EXT PWR, 5V / GND, RESET',
      'Arduino Headers': 'Digital pins 0–13, Analog pins A0–A5'
    }
  },
  {
    id: 'mt-7',
    name: 'A4988 Stepper Driver Module',
    slug: 'a4988-stepper-driver',
    sku: 'SKU-MT-07',
    categorySlug: 'motors-drivers',
    categoryName: 'Motors & Drivers',
    subCategory: 'Motor Drivers & Chassis',
    price: 199,
    originalPrice: 199,
    discountPercent: 0,
    inStock: true,
    stockCount: 180,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/motors/a4988-stepper-driver.png',
    description: 'Compact stepper motor driver module supporting microstepping and adjustable current control. Suitable for NEMA-series stepper motors and motion-control projects.',
    features: [
      'Five microstep resolutions: full, 1/2, 1/4, 1/8, and 1/16-step',
      'Adjustable current limiting via onboard trimmer potentiometer',
      'Simple STEP and DIRECTION interface reduces microcontroller pin overhead',
      'Over-temperature thermal shutdown and under-voltage lockout protection',
      'Includes adhesive aluminum heatsink for heat dissipation'
    ],
    specs: {
      'Driver IC': 'Allegro A4988',
      'Motor Type': 'Bipolar Stepper Motor',
      'Microstepping': 'Up to 1/16 microstep',
      'Control Interface': 'STEP / DIR',
      'Operating Voltage': '8V – 35V DC',
      'Adjustable Current': 'Yes (Onboard Potentiometer)',
      'Max Current Output': 'Up to 2A per coil with active cooling',
      'Applications': '3D printers, CNC, robotics and automation',
      'Compatible Motors': 'NEMA stepper motors depending electrical requirements'
    }
  },
  {
    id: 'mt-8',
    name: 'DRV8825 Stepper Driver',
    slug: 'drv8825-stepper-driver',
    sku: 'SKU-MT-08',
    categorySlug: 'motors-drivers',
    categoryName: 'Motors & Drivers',
    subCategory: 'Motor Drivers & Chassis',
    price: 249,
    originalPrice: 249,
    discountPercent: 0,
    inStock: true,
    stockCount: 160,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/motors/drv8825-stepper-driver.png',
    description: 'High-resolution stepper motor driver module designed for precise motion control and applications requiring higher microstepping capability.',
    features: [
      'Six microstep resolutions down to 1/32 microstepping for ultra-smooth motion',
      'Higher current capacity compared to standard A4988 drivers (up to 2.5A peak)',
      '4-layer 2oz copper PCB for improved heat dissipation',
      'Adjustable current threshold potentiometer',
      'Pin-compatible drop-in upgrade for RAMPS 1.4, CNC shields & custom PCB breakouts'
    ],
    specs: {
      'Driver IC': 'TI DRV8825',
      'Motor Type': 'Bipolar Stepper Motor',
      'Microstepping': 'Up to 1/32 microstep (Full, 1/2, 1/4, 1/8, 1/16, 1/32)',
      'Control Interface': 'STEP / DIR',
      'Operating Voltage': '8.2V – 45V DC',
      'Adjustable Current': 'Yes',
      'Max Current Output': 'Up to 2.5A peak with heatsink',
      'Applications': '3D printers, CNC machines, robotics and automation',
      'Compatible Motors': 'Bipolar stepper motors'
    }
  },
  {
    id: 'mt-9',
    name: '300RPM DC Gear Motor',
    slug: 'dc-gear-motor-300rpm',
    sku: 'SKU-MT-09',
    categorySlug: 'motors-drivers',
    categoryName: 'Motors & Drivers',
    subCategory: 'DC Motors',
    price: 199,
    originalPrice: 199,
    discountPercent: 0,
    inStock: true,
    stockCount: 200,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/motors/dc-gear-motor-300rpm.png',
    description: 'Compact geared DC motor designed for robotics, mobile platforms and DIY mechanisms where controlled speed and increased output torque are required.',
    features: [
      'Integrated internal spur gearbox providing balanced speed and torque',
      '300 RPM output speed optimal for robotic rovers and automated mechanisms',
      'D-shaped metal output shaft for non-slip wheel and coupler attachment',
      'Bidirectional reversible rotation by swapping terminal polarity',
      'Compatible with motor driver modules like L298N, L293D, and TB6612'
    ],
    specs: {
      'Motor Type': 'DC Gear Motor',
      'Rated Speed': '300 RPM',
      'Gearbox': 'Integrated Gearbox',
      'Operating Voltage': 'Typically 6V – 12V DC',
      'Output Shaft': 'Geared D-Shaft',
      'Direction': 'Reversible (CW / CCW)',
      'Control': 'Voltage / PWM Speed Control',
      'Applications': 'Robot cars, mobile robots, automation and DIY projects'
    }
  },

  // 6. Power & Battery (12 Items)
  {
    id: 'pb-1',
    name: '3.7V 500mAh Li-Po Battery',
    slug: 'lipo-500mah',
    sku: 'SKU-PB-01',
    categorySlug: 'power-battery',
    categoryName: 'Power & Battery',
    subCategory: 'Li-Ion & Li-Po',
    price: 149,
    originalPrice: 149,
    discountPercent: 0,
    inStock: true,
    stockCount: 300,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/battery/lipo-500mah.png',
    description: 'Compact 3.7V 500mAh rechargeable lithium polymer pouch cell for small wearables and lightweight embedded projects.',
    features: ['Flat pouch form factor', 'Integrated PCM protection board', 'JST connector lead'],
    specs: { 'Voltage': '3.7V', 'Capacity': '500mAh', 'Full Charge Voltage': '4.2V', 'Chemistry': 'Li-Po' }
  },
  {
    id: 'pb-2',
    name: '3.7V 750mAh Li-Po Battery',
    slug: 'lipo-750mah',
    sku: 'SKU-PB-02',
    categorySlug: 'power-battery',
    categoryName: 'Power & Battery',
    subCategory: 'Li-Ion & Li-Po',
    price: 179,
    originalPrice: 179,
    discountPercent: 0,
    inStock: true,
    stockCount: 250,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/battery/lipo-750mah.png',
    description: '3.7V 750mAh high-discharge Li-Po battery pack fitted with protection circuit module.',
    features: ['750mAh power capacity', 'Over-current protection', 'JST connector lead'],
    specs: { 'Voltage': '3.7V', 'Capacity': '750mAh', 'Full Charge Voltage': '4.2V', 'Chemistry': 'Li-Po' }
  },
  {
    id: 'pb-3',
    name: '3.7V 1000mAh Li-Po Battery',
    slug: 'lipo-1000mah',
    sku: 'SKU-PB-03',
    categorySlug: 'power-battery',
    categoryName: 'Power & Battery',
    subCategory: 'Li-Ion & Li-Po',
    price: 219,
    originalPrice: 219,
    discountPercent: 0,
    inStock: true,
    stockCount: 220,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/battery/lipo-1000mah.png',
    description: '3.7V 1000mAh rechargeable lithium polymer pouch battery for portable electronics and microcontroller projects.',
    features: ['1000mAh capacity for extended runtime', 'Rechargeable pouch cell', 'JST connector lead'],
    specs: { 'Voltage': '3.7V', 'Capacity': '1000mAh', 'Full Charge Voltage': '4.2V', 'Chemistry': 'Li-Po' }
  },
  {
    id: 'pb-4',
    name: '3.7V 2000mAh Li-Po Battery',
    slug: 'lipo-2000mah',
    sku: 'SKU-PB-04',
    categorySlug: 'power-battery',
    categoryName: 'Power & Battery',
    subCategory: 'Li-Ion & Li-Po',
    price: 329,
    originalPrice: 329,
    discountPercent: 0,
    inStock: true,
    stockCount: 180,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/battery/lipo-2000mah.png',
    description: 'High-capacity 3.7V 2000mAh rechargeable Li-Po battery pack providing extended power autonomy for IoT devices.',
    features: ['2000mAh heavy duty capacity', 'Integrated short-circuit protection', 'Rechargeable pouch cell'],
    specs: { 'Voltage': '3.7V', 'Capacity': '2000mAh', 'Full Charge Voltage': '4.2V', 'Chemistry': 'Li-Po' }
  },
  {
    id: 'pb-5',
    name: '3.7V 2500mAh Li-Po Battery',
    slug: 'lipo-2500mah',
    sku: 'SKU-PB-05',
    categorySlug: 'power-battery',
    categoryName: 'Power & Battery',
    subCategory: 'Li-Ion & Li-Po',
    price: 399,
    originalPrice: 399,
    discountPercent: 0,
    inStock: true,
    stockCount: 150,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/battery/lipo-2500mah.png',
    description: 'Premium 3.7V 2500mAh lithium polymer battery — the same class of cell used in the AWIE GEM companion device for long operating runtime.',
    features: ['2500mAh high-density capacity', 'Ideal for GEM & companion devices', 'Rechargeable via Type-C chargers', 'JST connector lead'],
    specs: { 'Voltage': '3.7V', 'Capacity': '2500mAh', 'Full Charge Voltage': '4.2V', 'Chemistry': 'Li-Po' }
  },
  {
    id: 'pb-6',
    name: 'TP4056 Type-C Charger Module',
    slug: 'tp4056-charger-module',
    sku: 'SKU-PB-06',
    categorySlug: 'power-battery',
    categoryName: 'Power & Battery',
    subCategory: 'BMS & Chargers',
    price: 39,
    originalPrice: 39,
    discountPercent: 0,
    inStock: true,
    stockCount: 450,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/battery/tp4056-charger-module.png',
    description: 'Single-cell 1A lithium battery charging module with USB Type-C connector and protection IC.',
    features: ['1A charging current', 'Type-C port input', 'Red/Blue status LEDs'],
    specs: { 'Charge Current': '1A', 'Port': 'USB Type-C', 'Charge Voltage': '4.2V' }
  },
  {
    id: 'pb-7',
    name: '3S BMS 11.1V Protection Board',
    slug: '3s-bms-protection-board',
    sku: 'SKU-PB-07',
    categorySlug: 'power-battery',
    categoryName: 'Power & Battery',
    subCategory: 'BMS & Chargers',
    price: 69,
    originalPrice: 69,
    discountPercent: 0,
    inStock: true,
    stockCount: 190,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/battery/3s-bms-protection-board.png',
    description: '3S 11.1V Li-Ion battery BMS protection PCB board for power tools and 12V battery packs.',
    features: ['Balanced charging support', 'Overcharge, over-discharge & short circuit cutoffs', 'High-current MOSFETs'],
    specs: { 'Series': '3S (11.1V / 12.6V)', 'Combined Capacity': '20A continuous discharge' }
  },
  {
    id: 'pb-8',
    name: '18650 Battery Holder (2-Cell)',
    slug: 'battery-holder-2x18650',
    sku: 'SKU-PB-08',
    categorySlug: 'power-battery',
    categoryName: 'Power & Battery',
    subCategory: 'Holders & Connectors',
    price: 35,
    originalPrice: 35,
    discountPercent: 0,
    inStock: true,
    stockCount: 300,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/battery/battery-holder-2x18650.png',
    description: 'Dual-slot 2x18650 battery holder socket case wired in series for 7.4V power supply.',
    features: ['Holds two 18650 cells', 'Series output wiring', 'M3 mounting holes'],
    specs: { 'Slots': '2 x 18650 Cells', 'Output': '7.4V (series wired)' }
  },
  {
    id: 'pb-9',
    name: 'LM2596 Buck Converter Module',
    slug: 'lm2596-buck-converter',
    sku: 'SKU-PB-09',
    categorySlug: 'power-battery',
    categoryName: 'Power & Battery',
    subCategory: 'Converters & Regulators',
    price: 69,
    originalPrice: 69,
    discountPercent: 0,
    inStock: true,
    stockCount: 260,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/battery/buck-converter-lm2596.png',
    description: 'LM2596 adjustable DC-DC step-down voltage regulator module providing stable output voltage.',
    features: ['Input up to 35V DC', 'Output adjustable 1.25V-30V', 'High conversion efficiency'],
    specs: { 'Max Current': '3A', 'Efficiency': 'Up to 92%', 'Topology': 'Buck (Step-Down)' }
  },
  {
    id: 'pb-10',
    name: 'MT3608 Boost Converter Module',
    slug: 'mt3608-boost-converter',
    sku: 'SKU-PB-10',
    categorySlug: 'power-battery',
    categoryName: 'Power & Battery',
    subCategory: 'Converters & Regulators',
    price: 79,
    originalPrice: 79,
    discountPercent: 0,
    inStock: true,
    stockCount: 240,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/battery/boost-converter-mt3608.png',
    description: 'MT3608 micro 2A DC-DC step-up voltage booster board for raising battery voltage.',
    features: ['Steps 2V up to 28V', 'Compact footprint', 'Trimmer potentiometer adjustment'],
    specs: { 'Max Current': '2A', 'Input Voltage': '2V - 24V', 'Output Voltage': 'Up to 28V' }
  },
  {
    id: 'pb-11',
    name: 'Rocker Switch SPST 250V',
    slug: 'rocker-switch-spst',
    sku: 'SKU-PB-11',
    categorySlug: 'power-battery',
    categoryName: 'Power & Battery',
    subCategory: 'Holders & Connectors',
    price: 15,
    originalPrice: 15,
    discountPercent: 0,
    inStock: true,
    stockCount: 600,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/battery/rocker-switch-spst.png',
    description: 'SPST 2-pin ON/OFF rocker power switch rated for AC 250V mains and DC low-voltage projects.',
    features: ['Snap-in panel mounting', 'AC 250V rating', 'Tactile latching click'],
    specs: { 'Switch Type': 'SPST ON-OFF', 'Rating': 'AC 250V' }
  },
  {
    id: 'pb-12',
    name: 'DC Barrel Jack (Male + Female)',
    slug: 'dc-barrel-jack',
    sku: 'SKU-PB-12',
    categorySlug: 'power-battery',
    categoryName: 'Power & Battery',
    subCategory: 'Holders & Connectors',
    price: 15,
    originalPrice: 15,
    discountPercent: 0,
    inStock: true,
    stockCount: 500,
    rating: 5.0,
    reviewCount: 0,
    image: '/store/battery/dc-barrel-jack.png',
    description: 'Standard 5.5mm x 2.1mm DC power barrel jack pair (male plug + female socket) for wall adapter connections.',
    features: ['5.5x2.1mm standard DC dimensions', 'Male plug & female socket pair', 'Durable metal contacts'],
    specs: { 'Dimensions': '5.5mm x 2.1mm', 'Type': 'Male + Female pair' }
  }
];
