import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const PMCalculator = () => {
  const [units, setUnits] = useState([
    { type: 'rtu', size: 'small', quantity: 0 },
    { type: 'rtu', size: 'large', quantity: 0 },
    { type: 'split', size: 'any', quantity: 0 },
    { type: 'boiler', size: 'any', quantity: 0 },
    { type: 'wshp', size: '0-5', quantity: 0 },
    { type: 'wshp', size: '6-25', quantity: 0 }
  ]);

  // Base prices per unit
  const basePrices = {
    rtu: {
      small: 2000,  // Up to 20 tons
      large: 3500   // Over 20 tons
    },
    split: {
      any: 1500     // Any size split system
    },
    boiler: {
      any: 2500     // Any size boiler
    },
    wshp: {
      '0-5': 400,   // 0-5 ton water source heat pump
      '6-25': 800   // 6-25 ton water source heat pump
    }
  };

  // Volume discount calculations
  const getVolumeDiscount = (totalUnits) => {
    if (totalUnits >= 20) return 0.20;      // 20% off for 20+ units
    if (totalUnits >= 10) return 0.15;      // 15% off for 10-19 units
    if (totalUnits >= 5) return 0.10;       // 10% off for 5-9 units
    return 0;                               // No discount for <5 units
  };

  const handleQuantityChange = (index, newValue) => {
    const newUnits = [...units];
    newUnits[index].quantity = parseInt(newValue) || 0;
    setUnits(newUnits);
  };

  const calculateTotal = () => {
    let subtotal = 0;
    let totalUnits = 0;

    // Calculate subtotal and count units
    units.forEach(unit => {
      const price = basePrices[unit.type][unit.size];
      subtotal += price * unit.quantity;
      totalUnits += unit.quantity;
    });

    // Apply volume discount
    const discount = getVolumeDiscount(totalUnits);
    const discountAmount = subtotal * discount;
    const total = subtotal - discountAmount;

    return {
      subtotal,
      discountPercent: discount * 100,
      discountAmount,
      total,
      totalUnits
    };
  };

  const formatUnitType = (type, size) => {
    switch(type) {
      case 'rtu':
        return `RTU (${size})`;
      case 'wshp':
        return `Water Source Heat Pump (${size} tons)`;
      case 'split':
        return 'Split System';
      case 'boiler':
        return 'Boiler';
      default:
        return type.toUpperCase();
    }
  };

  const results = calculateTotal();

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>PM Agreement Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {units.map((unit, index) => (
              <div key={index} className="flex items-center space-x-4 p-2 bg-gray-50 rounded">
                <div className="flex-grow">
                  <label className="font-medium">
                    {formatUnitType(unit.type, unit.size)}
                  </label>
                  <div className="text-sm text-gray-500">
                    ${basePrices[unit.type][unit.size]} per unit/year
                  </div>
                </div>
                <input
                  type="number"
                  min="0"
                  value={unit.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  className="w-24 p-2 border rounded"
                />
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2 border-t pt-4">
            <div className="flex justify-between">
              <span>Total Units:</span>
              <span>{results.totalUnits}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${results.subtotal.toLocaleString()}</span>
            </div>
            {results.discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Volume Discount ({results.discountPercent}%):</span>
                <span>-${results.discountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Annual Total:</span>
              <span>${results.total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PMCalculator;