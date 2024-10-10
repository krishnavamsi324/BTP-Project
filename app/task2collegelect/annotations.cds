using MyService as service from '../../srv/service';
annotate service.lect with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Lecturer ID',
                Value : lectId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Department ID',
                Value : deptId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Lecturer Name',
                Value : lectName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Lecturer Phone Number',
                Value : lectPhno,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Lecturer Email',
                Value : lectEmail,
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
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'deptId',
            Value : deptId,
        },
        {
            $Type : 'UI.DataField',
            Label : 'lectId',
            Value : lectId,
        },
        {
            $Type : 'UI.DataField',
            Label : 'lectName',
            Value : lectName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'lectPhno',
            Value : lectPhno,
        },
        {
            $Type : 'UI.DataField',
            Label : 'lectEmail',
            Value : lectEmail,
        },
    ],
);

annotate service.college with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Lecturer',
            ID : 'Lecturer',
            Target : '@UI.FieldGroup#Lecturer',
        },
    ],
    UI.FieldGroup #Lecturer : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : lectId,
                Label : 'Lecturer ID',
            },{
                $Type : 'UI.DataField',
                Value : lectName,
                Label : 'Lecturer Name',
            },
            {
                $Type : 'UI.DataField',
                Value : lectGender,
                Label : 'Lecturer Gender',
            },
            {
                $Type : 'UI.DataField',
                Value : lectage,
                Label : 'Lecturer Age',
            },
            {
                $Type : 'UI.DataField',
                Value : lectDOB,
                Label : 'Lecturer DOB',
            },
            {
                $Type : 'UI.DataField',
                Value : lectDept,
                Label : 'Graduated Department',
            },
            {
                $Type : 'UI.DataField',
                Value : lectSkills,
                Label : 'Lecturer Skills',
            },{
                $Type : 'UI.DataField',
                Value : lectPhno,
                Label : 'Lecturer Phone Number',
            },{
                $Type : 'UI.DataField',
                Value : lectEmail,
                Label : 'Lecturer Email',
            },],
    },
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Approved',
                        },
                    ],
                },
            ],
        },
        Text : 'Hired Lecturers',
    },
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : lectName,
            Label : 'Lecturer Name',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectDOB,
            Label : 'Lecturer DOB',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectage,
            Label : 'Lecturer Age',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectGender,
            Label : 'Lecturer Gender',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectDept,
            Label : 'Graduated Department',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectSkills,
            Label : 'Lecturer Skills',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectPhno,
            Label : 'Lecturer Phone Number',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectEmail,
            Label : 'Lecturer Email',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : rejectedBy,
            Label : 'Rejected By',
            ![@UI.Importance] : #High,
        },
    ],
    UI.SelectionPresentationVariant #tableView1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Rejected',
                        },
                    ],
                },
            ],
        },
        Text : 'Rejected Lecturers',
    },
    UI.HeaderInfo : {
        TypeName : '{i18n>LecturerDetails}',
        TypeNamePlural : '',
    },
    UI.Identification : [
        
    ],
    UI.LineItem #tableView1 : [
        {
            $Type : 'UI.DataField',
            Value : lectName,
            Label : 'Lecturer Name',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectGender,
            Label : 'Lecturer Gender',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectDOB,
            Label : 'Lecturer DOB',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectage,
            Label : 'Lecturer Age',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectDept,
            Label : 'Graduated Department',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectSkills,
            Label : 'Lecturer Skills',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectPhno,
            Label : 'Lecturer Phone Number',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectEmail,
            Label : 'Lecturer Email',
            ![@UI.Importance] : #High,
        },
    ],
    UI.SelectionPresentationVariant #tableView2 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView1',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : status,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'In Process',
                        },
                    ],
                },
            ],
        },
        Text : 'In Process Lecturers',
    },
);
annotate service.college with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : lectId,
            Label : 'Lecturer ID',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectName,
            Label : 'Lecturer Name',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectage,
            Label : 'Lecturer Age',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectDOB,
            Label : 'Lecturer DOB',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectGender,
            Label : 'Lecturer Gender',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectPhno,
            Label : 'Lecturer Phone Number',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectEmail,
            Label : 'Lecturer Email',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectDept,
            Label : 'Graduated Department',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : lectSkills,
            Label : 'Lecturer Skills',
            ![@UI.Importance] : #High,
        },
    ]
);

annotate service.college with {
    lectEmail @Common.FieldControl : #Mandatory
};
annotate service.college with {
    lectPhno @Common.FieldControl : #Mandatory
};
annotate service.college with {
    lectName @Common.FieldControl : #Mandatory
};
annotate service.college with @(
    UI.SelectionFields : []
);
annotate service.college with {
    lectId @Common.Label : 'lectId'
};
annotate service.college with {
    lectage @Common.FieldControl : #ReadOnly
};

annotate service.college with {
    lectDOB @Common.FieldControl : #Mandatory
};

annotate service.college with {
    lectDept @Common.FieldControl : #Mandatory
};

annotate service.college with {
    lectGender @(
        Common.FieldControl : #Mandatory,
        Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'Dropdown',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : lectGender,
                    ValueListProperty : 'gender',
                },
            ],
            Label : 'gender',
        },
        Common.ValueListWithFixedValues : true,
    )
};

annotate service.college with {
    lectSkills @Common.FieldControl : #Mandatory
};

