import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { postUserLogIn as postUserLogInModel } from "./logIn.model.js";

export const postUserLogIn = async(req,res,next) => {
    const { username, password } = req.body;
    try {
        const user = await postUserLogInModel(username);

        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '10d' }
        );

        res.json({ token });
    } catch (error) {
        next(error);
    }
}
