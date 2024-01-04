const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db/index");
const zod = require('zod');
const router = Router();


const userSchema = zod.object({
    username: zod.string().min(4),
    password: zod.string().min(6)
});

const courseScheam = zod.object({
    title: zod.string(),
    description: zod.string(),
    price: zod.number().min(1),
    imageLink: zod.string().url(),
    published: zod.boolean().default(true)
})


// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    try {
        const body = req.body;
        const parsedBody = userSchema.safeParse(body);
        if (!parsedBody.success) {
            res.status(404).send("Invalid username or password!");
            return;
        }
        await Admin.create(body);
        res.status(200).json({ message: 'Admin created successfully' });
    } catch (e) {
        res.status(500).send(e.message);
    }

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    try {
        const body = req.body;
        const parsedBody = courseScheam.safeParse(body);
        if (!parsedBody.success) {
            res.status(404).json('Invalid course details!');
            return;
        }
        const course = await Course.create(body);
        res.status(200).json({ message: 'Course created successfully', courseId: course._id })
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find();
        res.status(200).json({ courses })
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;