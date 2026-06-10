"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function InquirySection() {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement
        >
    ) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await fetch(
                "/api/backend/inquiries",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            toast.success("Inquiry sent successfully!");

            setForm({
                fullName: "",
                email: "",
                phoneNumber: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto max-w-4xl px-4">
                <h2 className="text-4xl font-bold text-center mb-10 text-yellow-400">
                    Get In Touch
                </h2>

                <p className="mb-6 text-gray-500 text-sm text-center">
                    Have questions about classes,
                    schedules, or registration?
                    Send us a message.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 bg-white p-6"
                >
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={form.fullName}
                        onChange={handleChange}
                        className="w-full bg-gray-100 p-3"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-gray-100 p-3"
                        required
                    />

                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={form.phoneNumber}
                        onChange={handleChange}
                        className="w-full bg-gray-100 p-3"
                        required
                    />

                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full bg-gray-100 p-3"
                        required
                    />

                    <textarea
                        rows={5}
                        name="message"
                        placeholder="Message"
                        value={form.message}
                        onChange={handleChange}
                        className="w-full bg-gray-100 p-3"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary py-3 text-white"
                    >
                        {loading
                            ? "Sending..."
                            : "Send Message"}
                    </button>
                </form>
            </div>
        </section>
    );
}