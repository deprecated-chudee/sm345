const router = require('express').Router();

const Student = require('../../db/models/student');
const Department = require('../../db/models/department');
const User = require('../../db/models/user');

router.post('/', async (req, res, next) => {
    try {
        // 기말 예제 엑셀 순서
        // 0:학과, 1:학번, 2:이름, 3:번호, 4:이메일
        const studentArray = await req.body;
        for(let e of studentArray) {
            const user = await User.addUser(e[1], '0000', 0); // 비밀번호 0000 초기화
            
            const getMajor = await Department.getDepartmentByName(e[0]);
            // const getMinor = await Department.getDepartmentByName();

            // 유저, 이름, 이메일, 번호, (주소), 학과, 부학과(null)
            const student = await Student.addStudent(user, e[2], e[4], e[3], getMajor, null);

            await Department.insertStudentByName(student, getMajor.name);
            // if(getMinor) {
            //     await Department.insertStudentByName(student, getMinor.name);
            // }
        }
        await res.status(200).json({ success: true, msg: 'Student Excel registered' });
    }
    catch(e) {
        console.log(e)
        res.status(401).json({ success: false, msg: 'Failed to register excel student' });
    }
});

module.exports = router;