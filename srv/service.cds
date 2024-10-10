using db from '../db/schema';

service MyService {
    @odata.draft.enabled
    entity dept as projection on db.dept;
    entity lect as projection on db.lect;
    entity stud as projection on db.stud;
    @odata.draft.enabled
    @Common.SideEffects  : {
        $Type : 'Common.SideEffectsType',
        SourceProperties : [
            'lectDOB'
        ],
        TargetProperties : [
            'lectage',
        ]
    }
    entity college as projection on db.college;
    function postattach(p : String)           returns String;
    entity count as projection on db.count;
    entity access as projection on db.access;
    entity Files as projection on db.Files;
    entity Dropdown as projection on db.Dropdown;
}