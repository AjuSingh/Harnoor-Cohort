const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const zod = require('zod');
const { User, Course } = require("../db");
const { createToken } = require("../utils/jwt")


const userSchema = zod.object({
    username: zod.string().min(4),
    password: zod.string().min(6)
});

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    try {
        const body = req.body;
        const parsedBody = userSchema.safeParse(body);
        if (!parsedBody.success) {
            res.status(404).send("Invalid username or password!");
            return;
        }
        await User.create({ ...body, courses: [] });
        res.status(200).json({ message: 'User created successfully' });
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    try {
        const body = req.body;
        const parsedBody = userSchema.safeParse(body);
        if (!parsedBody.success) {
            res.status(403).send("Invalid crendentials!");
            return;
        }
        const user = await User.findOne(body);
        if (!user) {
            res.status(403).send("Invalid crendentials!");
        } else {
            const token = createToken(body.username);
            res.status(200).json({ token });
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try {
        const courses = await Course.find();
        res.status(200).json({ courses })
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    try {
        const courseID = req.params.courseId;
        const user = req.user;
        await User.findByIdAndUpdate(user['_id'], { $push: { courses: courseID } });
        res.status(200).json({ message: 'Course purchased successfully' });
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    try {
        const user = req.user;
        const courses = await Course.find({ _id: { $in: user.courses } });
        res.status(200).json({ courses })
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router