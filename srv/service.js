const { PassThrough } = require('stream');
const axios = require('axios');

module.exports = async function (params) {
    const { college, dept, lect, stud, count, access, Files, lectToCollege } = this.entities;
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    function validateStudentPhoneNumber(phoneNumber) {
        let normalizedPhoneNumber = phoneNumber.replace(/^0/, '');
        return normalizedPhoneNumber.length === 10 && /^\d{10}$/.test(normalizedPhoneNumber) && normalizedPhoneNumber[0] !== '0';
    }
    function calculateAge(dob) {
        const birthDate = new Date(dob); // Parse the DOB
        const today = new Date(); // Get the current date
        let age = today.getFullYear() - birthDate.getFullYear(); // Calculate age in years
        const monthDifference = today.getMonth() - birthDate.getMonth(); // Calculate month difference
    
        // Adjust age if the current date is before the birth date in the current year
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
    
        return age; // Return the calculated age
    }    
    function containsOnlyLetters(input) {
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(input);
    }
    this.before('CREATE', college, async (req) => {
        debugger
        const { lectName,lectPhno, lectEmail, lectDept, lectGender, lectDOB } = req.data;
        if(containsOnlyLetters(lectName) === false){
            req.error(400, `${lectName} is invalid Name.`);
            return;
        }
        req.data.lectName = lectName.trim();
        existingEmail = await (SELECT.from(college).where({ lectEmail: lectEmail }));
        existingStudEmail = await (SELECT.from(stud).where({ studEmail: lectEmail }));
        existingdeptEmail = await (SELECT.from(dept).where({ deptEmail: lectEmail }));
        if (existingEmail.length > 0) {
            req.error(400, `Email ${lectEmail} already exists.`);
            return;
        }
        else if (existingStudEmail.length > 0) {
            req.error(400, `Email ${lectEmail} already exists in Student Table.`);
            return;
        }
        else if (existingdeptEmail.length > 0) {
            req.error(400, `Email ${lectEmail} already exists in Department Table.`);
            return;
        }
        else if (isValidEmail(lectEmail) === false){
            req.error(400, `${lectEmail} is invalid Email.`);
            return;
        }
        
        const existingPhone = await cds.run(SELECT.from(college).where({ lectPhno: lectPhno }));
        const existingStudPhone = await cds.run(SELECT.from(stud).where({ studPhno: lectPhno }));
        const existingDeptPhone = await cds.run(SELECT.from(dept).where({ deptPhno: lectPhno }));
        if (existingPhone.length > 0) {
            req.error(400, `Phone number ${lectPhno} already exists.`);
            return;
        }
        else if (existingStudPhone.length > 0) {
            req.error(400, `Phone number ${lectPhno} already exists in Student Table.`);
            return;
        }
        else if (existingDeptPhone.length > 0) {
            req.error(400, `Phone number ${lectPhno} already exists in Department Table.`);
            return;
        }
        else if (validateStudentPhoneNumber(lectPhno) === false){
            req.error(400, `${lectPhno} is invalid PhoneNo.`);
            return;
        }
        req.data.lectPhno = lectPhno.replace(/^0/, '');
        // req.data.lectGender = lectGender.charAt(0).toUpperCase() + lectGender.slice(1).toLowerCase()
        // if(req.data.lectGender !== 'Male' && req.data.lectGender !== 'Female' && req.data.lectGender !== 'Other'){
        //     req.error(400, `${req.data.lectGender} is not a valid Gender.`);
        // }
        req.data.lectDept = lectDept.toUpperCase();
        // const existingDept = await (SELECT.from(dept).where({ deptName: req.data.lectDept }));
        // if(existingDept.length === 0){
        //     req.error(400, `Department ${lectDept} does not exists.`);
        // }
        
        // if(req.data.status === 'In Process'){
        //     const nextIdNumber = Math.random();
        //     const nextlectId = `L${nextIdNumber}`;
        //     req.data.lectId = nextlectId;
        // }
    });
    this.before('CREATE', dept, async (req) => {
        const { deptId,deptName,deptPhno, deptEmail } = req.data;
        existingEmail = await (SELECT.from(dept).where({ deptEmail: deptEmail }));
        existinglectEmail = await (SELECT.from(college).where({ lectEmail: deptEmail }));
        existingStudEmail = await (SELECT.from(stud).where({ studEmail: deptEmail }));
        if (existingEmail.length > 0) {
            req.error(400, `Email ${deptEmail} already exists.`);
            return;
        }
        else if (existingStudEmail.length > 0) {
            req.error(400, `Email ${deptEmail} already exists in Student Table.`);
            return;
        }
        else if (existinglectEmail.length > 0) {
            req.error(400, `Email ${deptEmail} already exists in Lecturer Table.`);
            return;
        }
        else if (isValidEmail(deptEmail) === false){
            req.error(400, `${deptEmail} is invalid Email.`);
            return;
        }
        const existingPhone = await cds.run(SELECT.from(dept).where({ deptPhno: deptPhno }));
        const existinglectPhone = await (SELECT.from(college).where({ lectPhno: deptPhno }));
        const existingStudPhone = await (SELECT.from(stud).where({ studPhno: deptPhno }));
        req.data.deptPhno = deptPhno.replace(/^0/, '');
        if (existingPhone.length > 0) {
            req.error(400, `Phone number ${deptPhno} already exists.`);
            return;
        }
        else if (existingStudPhone.length > 0) {
            req.error(400, `Phone Number ${deptPhno} already exists in Student Table.`);
            return;
        }
        else if (existinglectPhone.length > 0) {
            req.error(400, `Phone Number ${deptPhno} already exists in Lecturer Table.`);
            return;
        }
        else if (validateStudentPhoneNumber(deptPhno) === false){
            req.error(400, `${deptPhno} is invalid PhoneNo.`);
            return;
        }
        const tx = cds.transaction(req);
        req.data.deptName = req.data.deptName.toUpperCase();
        req.data.deptName = req.data.deptName.trim();
        const existingname = await tx.read(dept).where({ deptName: req.data.deptName });
        if (existingname.length > 0) {
            req.error(409, `Dept Name ${req.data.deptName} already exists.`);
            return;
        }
        else if(containsOnlyLetters(req.data.deptName) === false){
            req.error(400, `${req.data.deptName} is invalid Name.`);
            return;
        }
        const students = await (SELECT.from(stud.drafts).where({ deptId: deptId }));
        var c = 0;
        for (const student of students) {
            const laststud = await tx.read(count).limit(1).columns('studcount');
            const lastId = laststud.length > 0 ? laststud[0].studcount : 'S0';
            const lastIdNumber = parseInt(lastId.substring(1));
            const presentId = parseInt(student.studId.substring(1));
            if(presentId < 1){
            const nextIdNumber = lastIdNumber + 1;
            const nextStudentId = `S${nextIdNumber}`;
            req.data.deptToStud[c].studId = nextStudentId;
            await cds.update(count).set({ studcount: nextStudentId }).where({ studcount: lastId});
            }
            const existingPhone = await tx.read(stud).where({ studPhno: student.studPhno });
            const existinglectPhone = await (SELECT.from(college).where({ lectPhno: student.studPhno }));
            const existingdeptPhone = await (SELECT.from(dept).where({ deptPhno: student.studPhno }));
            const value = existingPhone.length;
            if (existingPhone.length > 1) {
                req.error(409, `Student Phone number ${student.studPhno} already exists.`);
                return;
            }
            else if(existingPhone.length === 1 && existingPhone[0].studId != student.studId){
                req.error(409, `Phone number ${student.studPhno} already exists.`);
                return;
            }
            else if (existingdeptPhone.length > 0) {
                req.error(400, `Phone number ${student.studPhno} already exists in Department Table.`);
                return;
            }
            else if (existinglectPhone.length > 0) {
                req.error(400, `Phone number ${student.studPhno} already exists in Lecturer Table.`);
                return;
            }
            else if (validateStudentPhoneNumber(student.studPhno) === false){
                req.error(400, `${student.studPhno} is invalid PhoneNo.`);
                return;
            }
            const existingEmail = await tx.read(stud).where({ studEmail: student.studEmail });
            const existinglectEmail = await (SELECT.from(college).where({ lectEmail: student.studEmail }));
            const existingdeptEmail = await (SELECT.from(dept).where({ deptEmail: student.studEmail }));
            if (existingEmail.length > 1) {
                req.error(409, `Email ${student.studEmail} is already exists.`);
                return;
            }
            else if(existingEmail.length === 1 && existingEmail[0].studId !== student.studId){
                req.error(409, `Phone number ${student.studEmail} already exists.`);
                return;
            }
            else if (existingdeptEmail.length > 0) {
                req.error(409, `Email ${student.studEmail} already exists in Department Table.`);
                return;
            }
            else if (existinglectEmail.length > 0) {
                req.error(409, `Email ${student.studEmail} already exists in Lecturer Table.`);
                return;
            }
            else if (isValidEmail(student.studEmail) === false){
                req.error(400, `${student.studEmail} is invalid Email.`);
                return;
            }
            if(containsOnlyLetters(student.studName) === false){
                req.error(400, `${student.studName} is invalid Name.`);
                return;
            }
            student.studName = student.studName.trim();
            c = c + 1;
        }
        if(req.data.deptId){
            const tx = cds.transaction(req);
        const lastdept = await tx.read(count)
            .limit(1)
            .columns('deptcount');
        const lastId = lastdept.length > 0 ? lastdept[0].deptcount : 'D0';
        const lastIdNumber = parseInt(lastId.substring(1));
        const nextIdNumber = lastIdNumber + 1;
        const nextdeptId = `D${nextIdNumber}`;
        req.data.deptId = nextdeptId;
        await cds.update(count).set({ deptcount: nextdeptId }).where({ deptcount: lastId});
        }
    });
    this.before('UPDATE', college, async (req) => {
        debugger
        const cds = require('@sap/cds')
        const tx = cds.transaction(req);
        const { lectId, lectName, lectPhno, lectEmail } = req.data;
        if(containsOnlyLetters(lectName) === false){
            req.error(400, `${lectName} is invalid Name.`);
            return;
        }
        req.data.lectName = lectName.trim();
        existingEmail = await (SELECT.from(college).where({ lectEmail: lectEmail }));
        existingStudEmail = await (SELECT.from(stud).where({ studEmail: lectEmail }));
        existingdeptEmail = await (SELECT.from(dept).where({ deptEmail: lectEmail }));
        debugger
        if (existingEmail.length > 1) {
            req.error(400, `Email ${lectEmail} already exists.`);
            return;
        }
        else if(existingEmail.length === 1 && existingEmail[0].lectId !== lectId){
            req.error(400, `Email ${lectEmail} already exists.`);
            return;
        }
        else if (existingStudEmail.length > 0) {
            req.error(400, `Email ${lectEmail} already exists in Student Table.`);
            return;
        }
        else if (existingdeptEmail.length > 0) {
            req.error(400, `Email ${lectEmail} already exists in Department Table.`);
            return;
        }
        else if (isValidEmail(lectEmail) === false){
            req.error(400, `${lectEmail} is invalid Email.`);
            return;
        }
        const existingPhone = await cds.run(SELECT.from(college).where({ lectPhno: lectPhno }));
        const existingStudPhone = await cds.run(SELECT.from(stud).where({ studPhno: lectPhno }));
        const existingDeptPhone = await cds.run(SELECT.from(dept).where({ deptPhno: lectPhno }));
        debugger
        if (existingPhone.length > 1) {
            req.error(409, `Phone number ${lectPhno} already exists.`);
            return;
        }
        else if(existingPhone.length === 1 && existingPhone[0].lectId !== lectId){
            req.error(409, `Phone number ${lectPhno} already exists.`);
            return;
        }
        else if (existingStudPhone.length > 0) {
            req.error(400, `Phone number ${lectPhno} already exists in Student Table.`);
            return;
        }
        else if (existingDeptPhone.length > 0) {
            req.error(400, `Phone number ${lectPhno} already exists in Department Table.`);
            return;
        }
        else if (validateStudentPhoneNumber(lectPhno) === false){
            req.error(400, `${lectPhno} is invalid PhoneNo.`);
            return;
        }
        req.data.lectPhno = lectPhno.replace(/^0/, '');
        const existingData = await (SELECT.from(lect).where({ lectId: lectId }));
        if (existingData){
            await cds.update(lect).set({lectName: lectName, lectPhno: lectPhno, lectEmail: lectEmail }).where({ lectId : req.data.lectId});
        }
    });
    this.after('UPDATE', college, async (req) => {
        debugger
        const tx = cds.transaction(req);
        const isValid = /^L\d+\.\d+$/.test(req.lectId);
        if(req.status === 'Approved' && isValid){
            const lastlect = await tx.read(count).limit(1).columns('lectcount');
            const lastId = lastlect.length > 0 ? lastlect[0].lectcount : 'L0';
            const lastIdNumber = parseInt(lastId.substring(1));
            const nextIdNumber = lastIdNumber + 1;
            const nextlectId = `L${nextIdNumber}`;
            var lectupdate = {
                lectId: nextlectId,
                lectName: req.lectName,
                // lectage: req.lectage,
                lectDOB: req.lectDOB,
                lectGender: req.lectGender,
                lectDept: req.lectDept,
                lectPhno: req.lectPhno,
                lectEmail: req.lectEmail,
                lectSkills: req.lectSkills,
                status: req.status,
                coltofile : null
            }
            req.coltofile = null;
            await INSERT.into(college).entries(lectupdate);
            await cds.update(college).set({ lectage: calculateAge(req.lectDOB) }).where({ lectId: nextlectId});
            await cds.update(Files).set({ LecturerId: nextlectId }).where({ LecturerId: req.lectId});
            await DELETE.from(college.drafts).where({ lectId: req.lectId });
            await DELETE.from(college).where({ lectId: req.lectId });
            await cds.update(count).set({ lectcount: nextlectId }).where({ lectcount: lastId});
        }
    });
    this.before('UPDATE', dept, async (req) => {
        debugger
        const { deptId, deptPhno, deptEmail } = req.data;
        const tx = cds.transaction(req);
        const students = await (SELECT.from(stud.drafts).where({ deptId: deptId }));
        var c = 0
        for (const student of students) {
            // const tx = cds.transaction(req);
            const laststud = await tx.read(count).limit(1).columns('studcount');
            const lastId = laststud.length > 0 ? laststud[0].studcount : 'S0';
            const lastIdNumber = parseInt(lastId.substring(1));
            const presentId = parseInt(student.studId.substring(1));
            if(presentId < 1){
            const nextIdNumber = lastIdNumber + 1;
            const nextStudentId = `S${nextIdNumber}`;
            req.data.deptToStud[c].studId = nextStudentId;
            await cds.update(count).set({ studcount: nextStudentId }).where({ studcount: lastId});
            }
            const existingPhone = await tx.read(stud).where({ studPhno: student.studPhno });
            const existinglectPhone = await (SELECT.from(college).where({ lectPhno: student.studPhno }));
            const existingdeptPhone = await (SELECT.from(dept).where({ deptPhno: student.studPhno }));
            const value = existingPhone.length;
            if (existingPhone.length > 1) {
                req.error(409, `Student Phone number ${student.studPhno} already exists.`);
                return;
            }
            else if(existingPhone.length === 1 && existingPhone[0].studId != student.studId){
                req.error(409, `Phone number ${student.studPhno} already exists.`);
                return;
            }
            else if (existingdeptPhone.length > 0) {
                req.error(400, `Phone number ${student.studPhno} already exists in Department Table.`);
                return;
            }
            else if (existinglectPhone.length > 0) {
                req.error(400, `Phone number ${student.studPhno} already exists in Lecturer Table.`);
                return;
            }
            else if (validateStudentPhoneNumber(student.studPhno) === false){
                req.error(400, `${student.studPhno} is invalid PhoneNo.`);
                return;
            }
            const existingEmail = await tx.read(stud).where({ studEmail: student.studEmail });
            const existinglectEmail = await (SELECT.from(college).where({ lectEmail: student.studEmail }));
            const existingdeptEmail = await (SELECT.from(dept).where({ deptEmail: student.studEmail }));
            if (existingEmail.length > 1) {
                req.error(409, `Email ${student.studEmail} is already exists.`);
                return;
            }
            else if(existingEmail.length === 1 && existingEmail[0].studId !== student.studId){
                req.error(409, `Phone number ${student.studEmail} already exists.`);
                return;
            }
            else if (existingdeptEmail.length > 0) {
                req.error(409, `Email ${student.studEmail} already exists in Department Table.`);
                return;
            }
            else if (existinglectEmail.length > 0) {
                req.error(409, `Email ${student.studEmail} already exists in Lecturer Table.`);
                return;
            }
            else if (isValidEmail(student.studEmail) === false){
                req.error(400, `${student.studEmail} is invalid Email.`);
                return;
            }
            if(containsOnlyLetters(student.studName) === false){
                req.error(400, `${student.studName} is invalid Name.`);
                return;
            }
            student.studName = student.studName.trim();
            c = c + 1;
        }
        existingEmail = await (SELECT.from(dept).where({ deptEmail: deptEmail }));
        existinglectEmail = await (SELECT.from(college).where({ lectEmail: deptEmail }));
        existingStudEmail = await (SELECT.from(stud).where({ studEmail: deptEmail }));
        if (existingEmail.length > 1) {
            req.error(400, `Email ${deptEmail} already exists.`);
            return;
        }
        else if(existingEmail.length === 1 && existingEmail[0].deptId !== req.data.deptId){
            req.error(409, `Dept Name ${deptEmail} already exists.`);
            return;
        }
        else if (existingStudEmail.length > 0) {
            req.error(400, `Email ${deptEmail} already exists in Student Table.`);
            return;
        }
        else if (existinglectEmail.length > 0) {
            req.error(400, `Email ${deptEmail} already exists in Lecturer Table.`);
            return;
        }
        else if (isValidEmail(deptEmail) === false){
            req.error(400, `${deptEmail} is invalid Email.`);
            return;
        }
        const existingPhone = await cds.run(SELECT.from(dept).where({ deptPhno: deptPhno }));
        const existinglectPhone = await (SELECT.from(college).where({ lectPhno: deptPhno }));
        const existingStudPhone = await (SELECT.from(stud).where({ studPhno: deptPhno }));
        if (existingPhone.length > 1) {
            req.error(400, `Department Phone number ${deptPhno} already exists.`);
            return;
        }
        else if(existingPhone.length === 1 && existingPhone[0].deptId !== req.data.deptId){
            req.error(400, `Department Phone number ${deptPhno} already exists.`);
            return;
        }
        else if (existingStudPhone.length > 0) {
            req.error(400, `Phone Number ${deptPhno} already exists in Student Table.`);
            return;
        }
        else if (existinglectPhone.length > 0) {
            req.error(400, `Phone Number ${deptPhno} already exists in Lecturer Table.`);
            return;
        }
        else if (validateStudentPhoneNumber(deptPhno) === false){
            req.error(400, `${deptPhno} is invalid PhoneNo.`);
            return;
        }
        req.data.deptPhno = deptPhno.replace(/^0/, '');
        if (req.data.deptName) {
            const tx = cds.transaction(req);
            req.data.deptName = req.data.deptName.toUpperCase();
            req.data.deptName = req.data.deptName.trim();
            const existingname = await tx.read(dept).where({ deptName: req.data.deptName });
            if (existingname.length > 1) {
                req.error(409, `Dept Name ${req.data.deptName} already exists.`);
                return;
            }
            else if(existingname.length === 1 && existingname[0].deptId !== req.data.deptId){
                req.error(409, `Dept Name ${req.data.deptName} already exists.`);
                return;
            }
        }
        else if(containsOnlyLetters(req.data.deptName) === false){
            req.error(400, `${req.data.deptName} is invalid Name.`);
            return;
        }
    });
    this.before('CREATE', stud.drafts, async (req) => {
        debugger
        const nextIdNumber = Math.random();
        const nextdeptId = `S${nextIdNumber}`;
        req.data.studId = nextdeptId;
    });
    this.before('CREATE', college.drafts, async (req) => {
        debugger
        const nextIdNumber = Math.random();
        const nextlectId = `L${nextIdNumber}`;
        req.data.lectId = nextlectId;
    });
    this.before('CREATE', dept.drafts, async (req) => {
        debugger
        const nextIdNumber = Math.random();
        const nextdeptId = `L${nextIdNumber}`;
        req.data.deptId = nextdeptId;
    });
    
    this.after('CREATE', college, async (req) => {  
        debugger
        const existingDept = await (SELECT.from(dept).where({ deptName: req.lectDept }));
        var hodmail;
        if(existingDept.length !== 0){
            const existingDeptId = await (SELECT.from(access).where({ user: existingDept[0].deptId }));
            if(existingDeptId.length === 0){
                const HRdetails = await (SELECT.from(access).where({ user: "HR" }));
                hodmail = HRdetails[0].userEmail;
            }
            else{
                hodmail = existingDeptId[0].userEmail;
            }
        }
        else{
            const HRdetails = await (SELECT.from(access).where({ user: "HR" }));
            hodmail = HRdetails[0].userEmail;
        }
        const admindetails = await (SELECT.from(access).where({ user: 'admin' }));
        if(req.status === 'In Process'){
            const workflowContent = {        
               "definitionId": "us10.6f55ccb0trial.form01.process01",
                "context": {
                    "iD": req.lectId,
                    "_name": req.lectName,
                    "dateOfBirth": req.lectDOB,
                    "_age": req.lectage,
                    "gender": req.lectGender,
                    "department": req.lectDept,
                    "additionalSkills": req.lectSkills,
                    "phoneNumber": req.lectPhno,
                    "emailId": req.lectEmail,
                    "hodemail": hodmail,
                    "principalemail": admindetails[0].userEmail
                }    
            };
        var BpaDest = await cds.connect.to("spa_api");
        // var result = await BpaDest.post('/workflow/rest/v1/workflow-instances', workflowContent);
        }
    });
    this.on('READ', college.drafts, async (req, next) => {   
        // debugger
        if(req.data.lectDOB !== undefined){
            const today = new Date()
            const dob = new Date(req.data.lectDOB)
            today.setHours(0, 0, 0, 0);
            if(dob <= today){
                req.data.lectage = calculateAge(req.data.lectDOB);
                await cds.update(college.drafts).set({ lectage: req.data.lectage }).where({lectId : req.data.lectId});
            }
            else{
                req.error(400, `Enter Valid DOB.`);
            }
                // if(req.data.lectage < 20){
            //     req.error(400, `Age is less than 20.`);
            // }
        }
        return next();
    });
    this.on('postattach', async (req) => {
        debugger
        if(req.data.p !== undefined){
            const lectdetails = await (SELECT.from(college).where({ lectId: req.data.p }));
            if(lectdetails.length == 1){
                const lectstatus = lectdetails[0].status;
                return { status: lectstatus };
            }
        }
    });
    this.before('CREATE', Files.drafts, async (req) => {
        debugger
        console.log('Create called')
        console.log(JSON.stringify(req.data))
        req.data.url = `Files(ID=${req.data.ID},IsActiveEntity=true)/content`
    });
    this.on('DELETE', Files.drafts, async (req) => {
        debugger
        await DELETE.from(Files.drafts).where({ ID : req.data.ID});
        return {}; 
    });
    // this.after('READ', lectToCollege, async (req) => {
    //     // debugger 
    //     var check = Object.values(req).every(obj => 
    //         obj && typeof obj === 'object' &&
    //         obj.hasOwnProperty('lectEmail') &&
    //         obj.hasOwnProperty('lectId') &&
    //         obj.hasOwnProperty('lectName') &&
    //         obj.hasOwnProperty('lectPhno')
    //       );
    //     const requiredFields = ['lectEmail', 'lectId', 'lectName', 'lectPhno'];
    //     if( check && req.length > 0){
    //         if(Object.keys(req[0]).length === requiredFields.length){
    //             debugger
    //             req = await SELECT.from(college)
    //                             .where({ status: 'Approved' })
    //                             .columns('lectEmail', 'lectId', 'lectName', 'lectPhno');
    //             debugger
    //     }
    //     }
    //     // return req;
    // });
    // this.on('READ', lectToCollege, async (req) => {
    //     // debugger
    //     if (req._queryOptions && req._queryOptions.$select === 'IsActiveEntity,lectEmail,lectId,lectName,lectPhno') {
    //         req.query.where({ status: 'Approved' });
    //     }
    //     return await cds.read(req.query);
    // });
};