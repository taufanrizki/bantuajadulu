"use client";
import NavbarAtas from "@/components/ui/navigation-menu";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Untuk membuat ID unik
import { useRouter } from "next/navigation"; // Tambahkan ini untuk navigasi

const FeedbackPage = () => {
    const router = useRouter(); // Gunakan useRouter dari Next.js
    const [feedbackList, setFeedbackList] = useState<
        { id: string; username: string; rating: number; comment: string }[]
    >([]);
    const [username, setUsername] = useState<string>("");
    const [rating, setRating] = useState<number | null>(null);
    const [comment, setComment] = useState<string>("");
    const [isDeleting, setIsDeleting] = useState<string | null>(null); // Untuk mengatur konfirmasi hapus

    // Load data dari Local Storage saat halaman pertama kali dimuat
    useEffect(() => {
        const storedFeedback = localStorage.getItem("feedbackList");
        if (storedFeedback) {
            setFeedbackList(JSON.parse(storedFeedback));
        }
    }, []);

    // Simpan data feedback ke Local Storage
    const saveFeedbackToLocalStorage = (feedback: any[]) => {
        localStorage.setItem("feedbackList", JSON.stringify(feedback));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!username.trim() || !rating || !comment.trim()) {
            alert("Harap isi username, rating, dan komentar terlebih dahulu!");
            return;
        }

        const newFeedback = {
            id: uuidv4(),
            username,
            rating,
            comment,
        };

        const updatedFeedback = [...feedbackList, newFeedback];
        setFeedbackList(updatedFeedback);
        saveFeedbackToLocalStorage(updatedFeedback); // Simpan ke Local Storage

        // Reset form
        setUsername("");
        setRating(null);
        setComment("");
    };

    const handleDeleteFeedback = (id: string) => {
        const updatedFeedback = feedbackList.filter((fb) => fb.id !== id);
        setFeedbackList(updatedFeedback);
        saveFeedbackToLocalStorage(updatedFeedback); // Simpan ke Local Storage
        setIsDeleting(null); // Tutup dialog konfirmasi
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "20px",
                backgroundColor: "#f4f4f9",
                minHeight: "100vh",
            }}
        >

            {/* Tombol Kembali */}
            <button
                onClick={() => router.back()} // Fungsi untuk kembali ke halaman sebelumnya
                style={{
                    alignSelf: "flex-start",
                    marginBottom: "20px",
                    backgroundColor: "#6c757d",
                    color: "#fff",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "14px",
                }}
            >
                ← Kembali
            </button>

            <h1 style={{ color: "#333", fontSize: "36px", fontWeight: "bold" }}>Feedback</h1>

            <form
                onSubmit={handleSubmit}
                style={{
                    backgroundColor: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    width: "100%",
                    maxWidth: "400px",
                    marginBottom: "20px",
                }}
            >
                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontWeight: "bold", display: "block" }}>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            fontSize: "14px",
                        }}
                        placeholder="Masukkan nama Anda"
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontWeight: "bold", display: "block" }}>Rating (1-5):</label>
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

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontWeight: "bold", display: "block" }}>Komentar:</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            fontSize: "14px",
                        }}
                        placeholder="Tulis komentar Anda di sini..."
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

            <div style={{ width: "100%", maxWidth: "400px" }}>
                {feedbackList.map((feedback) => (
                    <div
                        key={feedback.id}
                        style={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            marginBottom: "15px",
                        }}
                    >
                        <h3 style={{ marginBottom: "5px", color: "#007BFF" }}>
                            {feedback.username}
                        </h3>
                        <p style={{ margin: "5px 0", fontWeight: "bold" }}>Rating: {feedback.rating} ★</p>
                        <p style={{ margin: "5px 0" }}>Komentar: {feedback.comment}</p>
                        <button
                            onClick={() => setIsDeleting(feedback.id)}
                            style={{
                                backgroundColor: "#FF4D4F",
                                color: "#fff",
                                border: "none",
                                padding: "5px 10px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontSize: "14px",
                            }}
                        >
                            Hapus
                        </button>

                        {isDeleting === feedback.id && (
                            <div
                                style={{
                                    marginTop: "10px",
                                    backgroundColor: "#f8f9fa",
                                    padding: "10px",
                                    borderRadius: "4px",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <p style={{ marginBottom: "10px" }}>
                                    Apakah kamu yakin untuk menghapus komentar ini?
                                </p>
                                <button
                                    onClick={() => handleDeleteFeedback(feedback.id)}
                                    style={{
                                        backgroundColor: "#007BFF",
                                        color: "#fff",
                                        border: "none",
                                        padding: "5px 10px",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        marginRight: "10px",
                                    }}
                                >
                                    Ya
                                </button>
                                <button
                                    onClick={() => setIsDeleting(null)}
                                    style={{
                                        backgroundColor: "#6c757d",
                                        color: "#fff",
                                        border: "none",
                                        padding: "5px 10px",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Tidak
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeedbackPage;
