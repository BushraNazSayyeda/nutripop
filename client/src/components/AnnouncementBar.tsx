import React from 'react';
import { Truck, Banknote, Leaf, ShieldCheck } from 'lucide-react';

const items = [
  { icon: <Truck size={14} />, text: 'Free Shipping Above ₹299' },
  { icon: <Banknote size={14} />, text: 'Cash on Delivery Available' },
  { icon: <Leaf size={14} />, text: '100% Natural Ingredients' },
  { icon: <ShieldCheck size={14} />, text: 'No Maida, No Junk' },
];

export default function AnnouncementBar() {
  return (
    <div style={{ background: '#2C1A0E', overflow: 'hidden', padding: '8px 0' }}>
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item">
            {item.icon}
            <span>{item.text}</span>
            <span className="marquee-dot">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
