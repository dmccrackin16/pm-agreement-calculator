# PM Agreement Calculator

A React-based calculator for HVAC Preventive Maintenance agreement pricing. This calculator helps estimate annual PM costs for various types of HVAC equipment including:

- Rooftop Units (RTUs)
- Split Systems
- Boilers
- Water Source Heat Pumps

## Features

- Multiple equipment type support
- Size-based pricing
- Automatic volume discounts
- Real-time calculation updates

## Equipment Pricing

### Base Prices (per unit/year)
- Small RTU (up to 20 tons): $2,000
- Large RTU (over 20 tons): $3,500
- Split System: $1,500
- Boiler: $2,500
- Water Source Heat Pump (0-5 tons): $400
- Water Source Heat Pump (6-25 tons): $800

### Volume Discounts
- 5-9 units: 10% off
- 10-19 units: 15% off
- 20+ units: 20% off

## Installation

1. Clone the repository:
```bash
git clone https://github.com/dmccrackin16/pm-agreement-calculator.git
```

2. Install dependencies:
```bash
cd pm-agreement-calculator
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

Simply input the quantity for each type of equipment you want to include in the PM agreement. The calculator will automatically:
- Calculate the subtotal based on unit prices
- Apply any applicable volume discounts
- Show the final annual total

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.