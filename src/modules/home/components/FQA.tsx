"use client";

import { useState } from "react";
import { faqs } from "../data/fqa";

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto max-w-4xl px-4">
                <h2 className="text-4xl font-bold text-center mb-10 text-yellow-400">
                    FAQs
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className=" bg-gray-100 overflow-hidden"
                        >
                            <button
                                onClick={() =>
                                    setOpenIndex(openIndex === index ? null : index)
                                }
                                className="w-full px-6 py-4 text-left flex justify-between"
                            >
                                {faq.question}
                                <span>{openIndex === index ? "-" : "+"}</span>
                            </button>

                            {openIndex === index && (
                                <div className="px-6 pb-4 text-xs text-gray-600">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}