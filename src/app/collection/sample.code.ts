export const find = `{ 
    field1: 'value1',
    field2: 'value2'
}`;
export const aggregate = `[{ 
    $project: {
        item1: { $ifNull: [ '$item1', 'unspecified' ] },
        item2: { $ifNull: [ '$item2', 'unspecified' ] }
    }
}, {
    $match : { 
        item1 : 'condition1' 
    }
}]`;

export const javascript = `db = db.getSiblingDB('dwang_2017-03-07_17h17m29s_test');
var myCursor = db.document.aggregate([
    {
        $project:
        {
            'fraid': '$fraid',
            'envelopenb': '$envelopenb'
        }
    }],
    { allowDiskUse: true }
)
print(' fraid,envelopenb ');
while (myCursor.hasNext()) {
    var myItem = myCursor.next();
    print(
        myItem.fraid + ',' + myItem.envelopenb);
}`;
