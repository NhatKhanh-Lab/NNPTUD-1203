const mongoose = require('mongoose');
const Role = require('./schemas/roles');
const User = require('./schemas/users');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/NNPTUD-C5')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const seedData = async () => {
    try {
        // Clear existing data
        await Role.deleteMany({});
        await User.deleteMany({});
        console.log('Cleared existing data.');

        // Create Roles
        const roleAdmin = new Role({
            name: "Admin",
            description: "Quản trị viên toàn hệ thống"
        });
        
        const roleTeacher = new Role({
            name: "Giang Vien",
            description: "Quản lý và ra đề cho sinh viên"
        });
        
        const roleStudent = new Role({
            name: "Sinh Vien",
            description: "Sinh viên tham gia làm bài tập"
        });

        // Save Roles
        const savedAdmin = await roleAdmin.save();
        const savedTeacher = await roleTeacher.save();
        const savedStudent = await roleStudent.save();
        
        console.log('Created Roles:');
        console.log(`- Admin ID: ${savedAdmin._id}`);
        console.log(`- Giang Vien ID: ${savedTeacher._id}`);
        console.log(`- Sinh Vien ID: ${savedStudent._id}`);

        // Create Users
        const users = [
            new User({
                username: "admin1",
                password: "password123",
                email: "admin1@gmail.com",
                fullName: "Super Admin",
                role: savedAdmin._id,
                status: true
            }),
            new User({
                username: "gv_nguyenvana",
                password: "password123",
                email: "nguyenvana@university.edu.vn",
                fullName: "Nguyễn Văn A",
                role: savedTeacher._id,
                status: true
            }),
            new User({
                username: "sv_tranvanb",
                password: "password123",
                email: "tranvanb@student.edu.vn",
                fullName: "Trần Văn B",
                role: savedStudent._id,
                status: false
            }),
             new User({
                username: "sv_lethic",
                password: "password123",
                email: "lethic@student.edu.vn",
                fullName: "Lê Thị C",
                role: savedStudent._id,
                status: true
            })
        ];

        // Save Users
        await User.insertMany(users);
        console.log(`Created ${users.length} Users successfully.`);

        console.log('\n--- DATA TẠO XONG ---');
        console.log('Bây giờ anh có thể qua Postman GET lại danh sách Users và Roles nha!');
        
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.disconnect();
    }
};

seedData();
