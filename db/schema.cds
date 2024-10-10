namespace db;

entity dept{ 
    key deptId: String @readonly default 'D0';
    deptName: String;
    deptPhno: String;
    deptEmail: String;
    deptToLect: Composition of many lect on deptToLect.lectToDept = $self;
    deptToStud: Composition of many stud on deptToStud.studToDept = $self;
}
entity college{
    key lectId: String @readonly default '';
    lectName: String;
    lectage: Integer;
    lectDOB: Date;
    lectGender: String @UI.Placeholder : 'Choose Gender';
    lectDept: String;
    lectPhno: String;
    lectEmail: String;
    lectSkills: LargeString;
    rejectedBy: String;
    status: String default 'In Process';
    collegeTolect: Association to  many lect on collegeTolect.lectToCollege = $self;
    coltofile: Composition of many Files on coltofile.filetocol = $self;
}
entity lect{
    key lectId: String @UI.Placeholder : 'Choose LecturerId';
    key deptId: String @readonly default '';
    lectName: String;
    lectPhno: String;
    lectEmail: String;
    status: String default 'Approved';
    lectToCollege: Association to one  college on lectToCollege.lectId = lectId;
    lectToDept: Association to one dept on lectToDept.deptId = deptId;
}
entity stud{
    key studId: String @readonly default 'S0';
    deptId: String;
    studName: String;
    studPhno: String;
    studEmail: String;
    studToDept: Association to one dept on studToDept.deptId = deptId;
}
entity count {
    studcount: String;
    lectcount: String;
    deptcount: String;
}
entity access{
    key user : String;
    userEmail : String;
}


using {
    cuid,
    managed
} from '@sap/cds/common';

entity Files: cuid, managed{
    @Core.MediaType: mediaType
    content: LargeBinary;
    @Core.IsMediaType: true
    mediaType: String;
    fileName: String;
    size: Integer;
    url: String;
    LecturerId : String;
    filetocol: Association to one college on filetocol.lectId = LecturerId;
}

entity Dropdown{
    gender: String;
}