export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  icon: string;
  title: string;
  items: FAQItem[];
}

export const faqs: FAQCategory[] = [
  {
    icon: '🌿',
    title: 'About Our Products',
    items: [
      {
        question: 'What are NutriPop snacks made of?',
        answer: 'NutriPop snacks are made from 100% jowar (sorghum) and ragi (finger millet) — ancient Indian grains that are packed with nutrients. We use only natural spices and flavors, with absolutely no maida (refined flour), no preservatives, and no artificial additives.',
      },
      {
        question: 'Are NutriPop snacks gluten-free?',
        answer: 'Yes! All our snacks are naturally gluten-free since they are made from jowar and ragi, which are inherently gluten-free grains. They are safe for people with gluten sensitivity or celiac disease.',
      },
      {
        question: 'Are NutriPop snacks suitable for children?',
        answer: 'Absolutely! Our snacks are made with 100% natural ingredients, making them perfect for children. They\'re great for school tiffins, after-school snacks, or anytime munchies. No artificial additives means you can feel good about what your kids are eating.',
      },
      {
        question: 'Are NutriPop snacks good for weight loss?',
        answer: 'NutriPop snacks are high in fiber and protein, which helps you feel full longer and reduces unnecessary snacking. They are significantly lower in calories than typical fried snacks and contain no maida or trans fats. As part of a balanced diet, they are an excellent guilt-free snack option.',
      },
      {
        question: 'What flavors are available?',
        answer: 'We currently offer Peri Peri (spicy), Achari (tangy), Sweet Corn, and Ragi Sticks. We are constantly innovating and adding new flavors. Subscribe to our newsletter to be the first to know about new launches!',
      },
      {
        question: 'How long do NutriPop snacks stay fresh?',
        answer: 'Our snacks have a shelf life of 6 months from the date of manufacture when stored properly in a cool, dry place. Once opened, we recommend consuming within 7 days for best taste and crunch.',
      },
    ],
  },
  {
    icon: '📦',
    title: 'Orders & Shipping',
    items: [
      {
        question: 'Do you offer free delivery?',
        answer: 'Yes! We offer free delivery on all orders above ₹299. For orders below ₹299, a flat delivery charge of ₹40 is applied.',
      },
      {
        question: 'How long does delivery take?',
        answer: 'Standard delivery takes 3–5 business days. Express delivery (1–2 days) is available for select pin codes at an additional charge.',
      },
      {
        question: 'Do you deliver across India?',
        answer: 'Yes, we deliver to all major cities and most pin codes across India. Enter your pin code at checkout to confirm availability.',
      },
      {
        question: 'Can I track my order?',
        answer: 'Yes! Once your order is shipped, you will receive a tracking link via email and WhatsApp. You can use this to monitor your delivery in real time.',
      },
      {
        question: 'What if my order arrives damaged?',
        answer: 'We take quality very seriously. If your order arrives damaged, please take a photo and contact us within 48 hours via WhatsApp or email. We will arrange a replacement or full refund immediately.',
      },
    ],
  },
  {
    icon: '💳',
    title: 'Payment & Pricing',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept UPI (GPay, PhonePe, Paytm), credit/debit cards, net banking, and Cash on Delivery (COD). All online payments are secured with 256-bit encryption.',
      },
      {
        question: 'Is Cash on Delivery (COD) available?',
        answer: 'Yes! Cash on Delivery is available for all orders across India. Simply select COD at checkout. A small COD handling fee of ₹20 may apply for orders below ₹200.',
      },
      {
        question: 'Do you offer bulk discounts?',
        answer: 'Yes! Our Bulk Box packs already offer up to 25% savings. For orders above ₹2000 or institutional/corporate orders, please fill out our Interest Form for special pricing.',
      },
      {
        question: 'Are prices inclusive of GST?',
        answer: 'Yes, all displayed prices are inclusive of all applicable taxes including GST. No hidden charges.',
      },
    ],
  },
  {
    icon: '🥗',
    title: 'Health & Nutrition',
    items: [
      {
        question: 'Are NutriPop snacks vegan?',
        answer: 'Yes! All NutriPop snacks are 100% vegan. We use no animal-derived ingredients in any of our products.',
      },
      {
        question: 'Are the snacks suitable for diabetics?',
        answer: 'Millets like jowar and ragi have a low glycemic index (GI), which means they cause a slower rise in blood sugar compared to refined flour snacks. However, we recommend consulting with your doctor or nutritionist for personalized dietary advice.',
      },
      {
        question: 'Do the snacks contain any allergens?',
        answer: 'Our snacks are free from peanuts, dairy, eggs, and gluten. However, they are produced in a facility that may also process other ingredients. Please check the product label for the latest allergen information.',
      },
      {
        question: "What's the nutritional value of NutriPop snacks?",
        answer: 'Per 100g serving: approximately 380 kcal, 12g protein, 68g carbohydrates, 8g fiber, 6g fat. High in iron, calcium, and B vitamins. Exact values vary by flavor — see the product label for detailed nutrition information.',
      },
    ],
  },
  {
    icon: '🔄',
    title: 'Returns & Support',
    items: [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 100% satisfaction guarantee. If you are unhappy with your purchase for any reason, contact us within 7 days of delivery and we will arrange a refund or replacement — no questions asked.',
      },
      {
        question: 'How can I contact customer support?',
        answer: 'You can reach us via: WhatsApp at +91 98765 43210, Email at hello@nutripop.in, or through the Contact form on our website. We respond within 24 hours, Monday to Friday.',
      },
      {
        question: 'Can I cancel my order?',
        answer: 'Orders can be cancelled within 2 hours of placing them. After that, the order may already be in processing. Please contact us immediately via WhatsApp for the fastest response.',
      },
      {
        question: 'Do you offer subscription plans?',
        answer: 'We are working on a subscription model! Subscribe to our newsletter to be notified when it launches. In the meantime, you can save by ordering our Bulk Box packs.',
      },
    ],
  },
];
