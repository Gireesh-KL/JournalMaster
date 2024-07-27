import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    try {
        // Generate a JWT token with the userId
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '15d' // Token expiration time
        });

        // Set the token in an HTTP-only cookie
        res.cookie("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
            httpOnly: true,
            sameSite: "Strict",
            secure: process.env.NODE_ENV === "production", // Secure in production
        });
    } catch (error) {
        console.error("Error generating token or setting cookie:", error);
        throw new Error("Error generating token");
    }
};
