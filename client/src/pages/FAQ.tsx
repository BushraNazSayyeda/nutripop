import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqs } from '../data/faqs';

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`accordion-item${open ? ' open' : ''}`}>
      <button className="accordion-question" onClick={() => setOpen(!open)}>
        <span>{question}</span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      {open && (
        <div className="accordion-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="page-bg">
      <section className="section">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="faq-hero-icon">❓</div>
          <h1 className="story-h1">
            Frequently Asked <span style={{ color: '#C8860A' }}>Questions</span>
          </h1>
          <p className="story-subtitle">
            Everything you need to know about NutriPop snacks. Can't find what you're looking for?{' '}
            Feel free to contact us!
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="faq-sections">
          {faqs.map(category => (
            <div key={category.title} className="faq-category fade-in">
              <h2 className="faq-category-title">
                <span>{category.icon}</span> {category.title}
              </h2>
              <div className="accordion-group">
                {category.items.map(item => (
                  <AccordionItem key={item.question} question={item.question} answer={item.answer} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="faq-cta-card">
          <h3 className="faq-cta-title">Still have questions?</h3>
          <p className="faq-cta-sub">We're here to help! Reach out to our friendly support team.</p>
          <div className="faq-cta-btns">
            <Link to="/contact" className="btn-primary">Contact Us</Link>
            <Link to="/interest-form" className="btn-gold">Interest Form</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
