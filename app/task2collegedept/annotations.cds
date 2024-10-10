using MyService as service from '../../srv/service';
annotate service.dept with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Department ID',
                Value : deptId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Department Name',
                Value : deptName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Department Phone Number',
                Value : deptPhno,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Department Email',
                Value : deptEmail,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Lecturer',
            ID : 'Lecturer',
            Target : 'deptToLect/@UI.LineItem#Lecturer',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Student',
            ID : 'Student',
            Target : 'deptToStud/@UI.LineItem#Student',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Department ID',
            Value : deptId,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Department Name',
            Value : deptName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Department Phone Number',
            Value : deptPhno,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Department Email',
            Value : deptEmail,
        },
    ],
);

annotate service.lect with @(
    UI.LineItem #Lecturer : [
        {
            $Type : 'UI.DataField',
            Value : lectId,
            Label : 'Lecturer ID',
        },{
            $Type : 'UI.DataField',
            Value : deptId,
            Label : 'Department ID',
        },{
            $Type : 'UI.DataField',
            Value : lectName,
            Label : 'Lecturer Name',
        },{
            $Type : 'UI.DataField',
            Value : lectPhno,
            Label : 'Lecturer Phone Number',
        },{
            $Type : 'UI.DataField',
            Value : lectEmail,
            Label : 'Lecturer Email',
        },]
);
annotate service.stud with @(
    UI.LineItem #Student : [
        {
            $Type : 'UI.DataField',
            Value : studId,
            Label : 'Student ID',
        },{
            $Type : 'UI.DataField',
            Value : deptId,
            Label : 'Department ID',
        },{
            $Type : 'UI.DataField',
            Value : studName,
            Label : 'Student Name',
        },{
            $Type : 'UI.DataField',
            Value : studPhno,
            Label : 'Student Phone Number',
        },{
            $Type : 'UI.DataField',
            Value : studEmail,
            Label : 'Student Email',
        },]
);
annotate service.stud with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Student',
            ID : 'Student',
            Target : '@UI.FieldGroup#Student',
        },
    ],
    UI.FieldGroup #Student : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : studId,
                Label : 'Student ID',
            },{
                $Type : 'UI.DataField',
                Value : deptId,
                Label : 'Department ID',
            },{
                $Type : 'UI.DataField',
                Value : studName,
                Label : 'Student Name',
            },{
                $Type : 'UI.DataField',
                Value : studPhno,
                Label : 'Student Phone Number',
            },{
                $Type : 'UI.DataField',
                Value : studEmail,
                Label : 'Student Email',
            },],
    }
);
annotate service.lect with {
    lectId @Common.FieldControl : #Mandatory
};
annotate service.lect with {
    lectName @Common.FieldControl : #ReadOnly
};
annotate service.lect with {
    lectPhno @Common.FieldControl : #ReadOnly
};
annotate service.lect with {
    lectEmail @Common.FieldControl : #ReadOnly
};
annotate service.dept with {
    deptName @Common.FieldControl : #Mandatory
};
annotate service.dept with {
    deptPhno @Common.FieldControl : #Mandatory
};
annotate service.dept with {
    deptEmail @Common.FieldControl : #Mandatory
};
annotate service.stud with {
    deptId @Common.FieldControl : #ReadOnly
};
annotate service.stud with {
    studName @Common.FieldControl : #Mandatory
};
annotate service.stud with {
    studPhno @Common.FieldControl : #Mandatory
};
annotate service.stud with {
    studEmail @Common.FieldControl : #Mandatory
};
annotate service.lect with {
    lectId @UI.MultiLineText : false
};
annotate service.lect with {
    lectId @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'college',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : lectId,
                    ValueListProperty : 'lectId',
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'lectName',
                    LocalDataProperty : lectName,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'lectPhno',
                    LocalDataProperty : lectPhno,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'lectEmail',
                    LocalDataProperty : lectEmail,
                },
                {
                    $Type : 'Common.ValueListParameterIn',
                    ValueListProperty : 'status',
                    LocalDataProperty : status,
                },
            ],
        },
        Common.ValueListWithFixedValues : true
)};
