export const userColumns = [
    {
        id: 1,
        title: 'Id',
        fieldName: 'id',
        type: 'number',
        filterType: 'eq',
        data: {}
    },
    {
        id: 2,
        title: 'Name',
        fieldName: 'name',
        type: 'text',
        filterType: 'like',
        data: {}
    },
    {
        id: 3,
        title: 'UserName',
        fieldName: 'username',
        type: 'text',
        filterType: 'like',
        data: {}
    },
    {
        id: 4,
        title: 'Mail',
        fieldName: 'mail',
        type: 'text',
        filterType: 'like',
        data: {}
    },
    {
        id: 5,
        title: 'Role',
        fieldName: 'role',
        type: 'select',
        filterType: 'eq',
        data: {
            items: [
                { title: 'Management', value: 'management' },
                { title: 'Security', value: 'security' },
            ]
        }
    },
    
]


export const parkingUserColumns = [
    {
        id: 1,
        title: 'Id',
        fieldName: 'id',
        type: 'number',
        filterType: 'eq',
        data: {}
    },
    {
        id: 2,
        title: 'Name',
        fieldName: 'name',
        type: 'text',
        filterType: 'like',
        data: {}
    },
    {
        id: 3,
        title: 'Mail',
        fieldName: 'mail',
        type: 'text',
        filterType: 'like',
        data: {}
    },
    {
        id: 4,
        title: 'User Type',
        fieldName: 'type',
        type: 'select',
        filterType: 'eq',
        data: {
            items: [
                { title: 'Employee', value: 'Employee' },
                { title: 'Visitor', value: 'Visitor' },
            ]
        }
    },
]

export const employeeColumns = [
    {
        id: 1,
        title: 'Id',
        fieldName: 'id',
        type: 'number',
        filterType: 'eq',
        data: {}
    },
    {
        id: 2,
        title: 'Name',
        fieldName: 'name',
        type: 'text',
        filterType: 'like',
        data: {}
    },
    {
        id: 3,
        title: 'Mail',
        fieldName: 'mail',
        type: 'text',
        filterType: 'like',
        data: {}
    },
    {
        id: 4,
        title: 'RFID Code',
        fieldName: 'rfidCode',
        type: 'text',
        filterType: 'like',
        data: {}
    },
]


export const visitorColumns = [

    {
        id: 1,
        title: 'Id',
        fieldName: 'id',
        type: 'number',
        filterType: 'eq',
        data: {}
    },
    {
        id: 2,
        title: 'Name',
        fieldName: 'name',
        type: 'text',
        filterType: 'like',
        data: {}
    },
    {
        id: 3,
        title: 'Mail',
        fieldName: 'mail',
        type: 'text',
        filterType: 'like',
        data: {}
    },
    {
        id: 4,
        title: 'QrCode',
        fieldName: 'QrCode',
        type: 'text',
        filterType: 'like',
        data: {}
    },


]

export const siteColumns =[

    {
        id: 1,
        title: 'Id',
        fieldName: 'id',
        type: 'number',
        filterType: 'eq',
        data: {}
    },
    {
        id: 2,
        title: "Name",
        fieldName: "name",
        type: 'text',
        filterType: 'like',
        data: {}
    },
    {
        id: 3,
        title: 'Address',
        fieldName: 'address',
        type: 'text',
        filterType: 'like',
        data: {}
    }
    


]



export const vehicleColumns = [

    {
        id: 1,
        title: 'Id',
        fieldName: 'id',
        type: 'number',
        filterType: 'eq',
        data: {}
    },
    {
        id: 2,
        title: 'Brand',
        fieldName: 'brand',
        type: 'text',
        filterType: 'like',
        data: {}
    },
    {
        id: 3,
        title: 'License Plate Number',
        fieldName: 'licensePlateNumber',
        type: 'text',
        filterType: 'like',
        data: {}
    },
    {
        id: 4,
        title: 'ParkingUserId',
        fieldName: 'ParkingUserId',
        type: 'number',
        filterType: 'eq',
        data: {}
    },

]

export const permissionColumns =[

    {
        id: 1,
        title: 'Id',
        fieldName: 'id',
        type: 'number',
        filterType: 'eq',
        data: {}
    },
    {
        id: 2,
        title: "Access Periods",
        fieldName: "AccessPeriods",
        type: 'text',
        filterType: 'like',
        data: {}
    },
    


]
