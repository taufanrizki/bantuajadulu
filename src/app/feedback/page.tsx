"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Untuk navigasi

const FeedbackPage = () => {
    const [rating, setRating] = useState<number | null>(null);
    const [comment, setComment] = useState<string>("");
    const router = useRouter(); // Hook untuk navigasi

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!rating || !comment.trim()) {
            alert("Harap isi rating dan komentar terlebih dahulu!");
            return;
        }

        alert(`Rating: ${rating}, Komentar: ${comment}`);
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100vh",
                backgroundColor: "#f9f9f9",
                padding: "20px",
                position: "relative", // Untuk menempatkan tombol di luar formulir
            }}
        >
            {/* Tombol Kembali */}
            <button
                type="button"
                onClick={() => router.back()} // Navigasi ke halaman sebelumnya
                style={{
                    position: "absolute",
                    top: "20px",
                    left: "20px",
                    backgroundColor: "#e0e0e0",
                    border: "none",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#333",
                }}
            >
                ← Kembali
            </button>

            <form
                onSubmit={handleSubmit}
                style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgb(26, 137, 201)",
                    width: "100%",
                    maxWidth: "400px",
                }}
            >
                {/* Title Section */}
                <h1
                    style={{
                        marginBottom: "20px",
                        color: "#333",
                        fontSize: "36px",
                        fontWeight: "bold",
                        textAlign: "center",
                    }}
                >
                    Feedback
                </h1>

                {/* Rating Section */}
                <div style={{ marginBottom: "20px" }}>
                    <label
                        style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}
                    >
                        Rating (1-5):
                    </label>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        {[5, 4, 3, 2, 1].map((num) => (
                            <span key={num}>
                                <input
                                    type="radio"
                                    id={`star${num}`}
                                    name="rating"
                                    value={num}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                    style={{ display: "none" }}
                                />
                                <label
                                    htmlFor={`star${num}`}
                                    style={{
                                        fontSize: "24px",
                                        cursor: "pointer",
                                        color: rating && rating >= num ? "#f5c518" : "#ccc",
                                    }}
                                >
                                    ★
                                </label>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Comment Section */}
                <div style={{ marginBottom: "20px" }}>
                    <label
                        htmlFor="comment"
                        style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}
                    >
                        Komentar:
                    </label>
                    <textarea
                        id="comment"
                        name="comment"
                        rows={4}
                        placeholder="Tulis komentar Anda di sini..."
                        onChange={(e) => setComment(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            fontSize: "14px",
                        }}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px 15px",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "16px",
                    }}
                >
                    Kirim Feedback
                </button>
            </form>

            {/* Display feedback if available */}
            {rating && comment && (
                <div
                    style={{
                        marginTop: "20px",
                        backgroundColor: "#fff",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        width: "100%",
                        maxWidth: "400px",
                    }}
                >
                    <h2
                        style={{
                            marginBottom: "15px",
                            color: "#333",
                            fontSize: "24px",
                            fontWeight: "bold",
                        }}
                    >
                        Feedback Anda
                    </h2>
                    <p
                        style={{
                            margin: "10px 0",
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "#333",
                        }}
                    >
                        Rating: {rating} ★
                    </p>
                    <p
                        style={{
                            margin: "10px 0",
                            fontSize: "18px",
                            color: "#555",
                        }}
                    >
                        Komentar: {comment}
                    </p>
                </div>
            )}
        </div>
    );
};

export default FeedbackPage;
