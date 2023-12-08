const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();
const bodyParser = require('body-parser');
const IndexAPI = require('./apis/index');

const app = express();
// configure middleware
// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.get('/', (req, res) => {
    res.status(200).send('Welcome to my sms! 🥰');
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
  res.header('Access-Control-Allow-Headers', '*');
});
// Set up Multer storage
const storage = multer.diskStorage({
  destination: 'images/',
  filename: (req, file, cb) => {
    cb(null, `IMG-${Date.now()}.${file.mimetype.split('/')[1]}`);
  },
});
const upload = multer({ storage });
app.use(express.static('images'));

// Route School
app.get('/schools', IndexAPI.SchoolAPI.listSchools);
app.post('/schools', IndexAPI.SchoolAPI.createSchool);
app.put('/schools/:schoolId', IndexAPI.SchoolAPI.updateSchool);
app.get('/schools/:schoolId', IndexAPI.SchoolAPI.getSchool);
app.delete('/schools/:schoolId', IndexAPI.SchoolAPI.deleteSchool);

// Route Exam
app.get('/schools/:schoolId/exams', IndexAPI.ExamAPI.listExams);
app.post('/schools/:schoolId/exams', IndexAPI.ExamAPI.createExam);
app.put('/schools/:schoolId/exams/:examId', IndexAPI.ExamAPI.updateExam);
app.get('/schools/:schoolId/exams/:examId', IndexAPI.ExamAPI.getExam);
app.delete('/schools/:schoolId/exams/:examId', IndexAPI.ExamAPI.deleteExam);

// Route Trainer
app.get('/schools/:schoolId/trainers', IndexAPI.TrainerAPI.listTrainers);
app.post('/schools/:schoolId/trainers', IndexAPI.TrainerAPI.createTrainer);
app.put('/schools/:schoolId/trainers/:trainerId', IndexAPI.TrainerAPI.updateTrainer);
app.get('/schools/:schoolId/trainers/:trainerId', IndexAPI.TrainerAPI.getTrainer);
app.delete('/schools/:schoolId/trainers/:trainerId', IndexAPI.TrainerAPI.deleteTrainer);
// Route Courses
app.get('/schools/:schoolId/courses', IndexAPI.CourseAPI.listCourses);
app.post('/schools/:schoolId/courses', IndexAPI.CourseAPI.createCourse);
app.put('/schools/:schoolId/courses/:courseId', IndexAPI.CourseAPI.updateCourse);
app.get('/schools/:schoolId/courses/:courseId', IndexAPI.CourseAPI.getCourse);
app.delete('/schools/:schoolId/courses/:courseId', IndexAPI.CourseAPI.deleteCourse);
// Route Generation
app.get('/schools/:schoolId/generations', IndexAPI.GenerationAPI.listGenerations);
app.post('/schools/:schoolId/generations', IndexAPI.GenerationAPI.createGeneration);
app.put('/schools/:schoolId/generations/:generationId', IndexAPI.GenerationAPI.updateGeneration);
app.get('/schools/:schoolId/generations/:generationId', IndexAPI.GenerationAPI.getGeneration);
app.delete('/schools/:schoolId/generations/:generationId', IndexAPI.GenerationAPI.deleteGeneration);

// Route Classes
app.get('/schools/:schoolId/classes', IndexAPI.ClassAPI.listClasses);
app.post('/schools/:schoolId/classes', IndexAPI.ClassAPI.createClass);
app.put('/schools/:schoolId/classes/:classId', IndexAPI.ClassAPI.updateClass);
app.get('/schools/:schoolId/classes/:classId', IndexAPI.ClassAPI.getClass);
app.delete('/schools/:schoolId/classes/:classId', IndexAPI.ClassAPI.deleteClass);
// Route Rooms
app.get('/schools/:schoolId/rooms', IndexAPI.RoomAPI.listRooms);
app.post('/schools/:schoolId/rooms', IndexAPI.RoomAPI.createRoom);
app.put('/schools/:schoolId/rooms/:roomId', IndexAPI.RoomAPI.updateRoom);
app.get('/schools/:schoolId/rooms/:roomId', IndexAPI.RoomAPI.getRoom);
app.delete('/schools/:schoolId/rooms/:roomId', IndexAPI.RoomAPI.deleteRoom);
// Route Student
app.post('/students/:studentId/upload-images', upload.single('image'), IndexAPI.StudentAPI.uploadImage);
app.get('/schools/:schoolId/generations/:generationId/students', IndexAPI.StudentAPI.listStudents);
app.get('/schools/:schoolId/students', IndexAPI.StudentAPI.listStudentsUnderSchool);
app.post('/schools/:schoolId/generations/:generationId/students', IndexAPI.StudentAPI.createStudent);
app.put('/schools/:schoolId/generations/:generationId/students/:studentId', IndexAPI.StudentAPI.updateStudent);
app.get('/schools/:schoolId/generations/:generationId/students/:studentId', IndexAPI.StudentAPI.getStudent);
app.delete('/schools/:schoolId/generations/:generationId/students/:studentId', IndexAPI.StudentAPI.deleteStudent);
// Route Schedule
app.get('/schools/:schoolId/schedules', IndexAPI.ScheduleAPI.listSchedules);
app.post('/schools/:schoolId/schedules', IndexAPI.ScheduleAPI.createSchedule);
app.put('/schools/:schoolId/schedules/:scheduleId', IndexAPI.ScheduleAPI.updateSchedule);
app.get('/schools/:schoolId/schedules/:scheduleId', IndexAPI.ScheduleAPI.getSchedule);
app.delete('/schools/:schoolId/schedules/:scheduleId', IndexAPI.ScheduleAPI.deleteSchedule);


app.listen(3003, ()=>{
    console.log('Server running:: => http://localhost:3003');
})



module.exports = app;