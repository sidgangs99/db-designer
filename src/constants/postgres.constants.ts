export const postgresDataTypes = {
    bigint: 'signed eight byte integer',
    bigserial: 'auto incrementing eight byte integer',
    boolean: 'logical Boolean (true/false)',
    date: 'calendar date (year, month, day)',
    doublePrecision: 'double precision floating point number (8 bytes)',
    integer: 'signed four byte integer',
    // interval: 'time span',
    json: 'JSON data',
    jsonb: 'binary JSON data',
    macaddr: 'MAC (Media Access Control) address',
    money: 'currency amount',
    real: 'single precision floating point number (4 bytes)',
    smallint: 'signed two byte integer',
    smallserial: 'auto incrementing two byte integer',
    serial: 'auto incrementing four byte integer',
    text: 'variable length character string (no limit specified)',
    time: 'time of day (hour, minute, second)',
    timeWithTimeZone: 'time of day with time zone',
    timestamp: 'date and time (year, month, day, hour, minute, second)',
    timestampWithTimeZone: 'date and time with time zone',
    tsquery: 'full text search query',
    tsvector: 'full text search document',
    txid_snapshot: 'user level snapshot of a database transaction',
    uuid: 'universally unique identifier (UUID)',
    xml: 'XML data'
    // ------------- NO SUPPORT FOR THESE ------------------
    // box: 'rectangular box on a plane (defined by two points)',
    // bytea: 'binary data (byte array)',
    // circle: 'a circle on a plane (defined by a center point and radius)',
    // cidr: 'IPv4 or IPv6 network address',
    // inet: 'IPv4 or IPv6 host address',
    // line: 'an infinite line on a plane (defined by a point and a slope)',
    // lseg: 'a line segment on a plane (defined by two points)',
    // path: 'a geometric path on a plane (composed of multiple connected segments)',
    // point: 'a point on a plane (defined by two coordinates)',
    // polygon:
    //     'a closed geometric shape on a plane (defined by a sequence of points)',
};

export const postgresDataTypeInputTypeMapping: any[] = [
    {
        id: 'bigint',
        type: 'number',
        dataType: 'bigint',
        regex: /^\d{1,19}$/,
        label: 'Big Int'
    },
    {
        id: 'big.serial',
        type: 'number',
        dataType: 'bigserial',
        regex: /^\d{1,19}$/,
        label: 'Big Serial'
    },
    {
        id: 'boolean',
        type: 'checkbox',
        dataType: 'boolean',
        regex: /^(true|false)$/,
        label: 'Boolean'
    },
    {
        id: 'date',
        type: 'text',
        dataType: 'date',
        regex: /^(\d{4})-(\d{2})-(\d{2})$/,
        label: 'Date'
    },
    {
        id: 'doublePrecision',
        type: 'number',
        dataType: 'doublePrecision',
        regex: /^(\-?\d+(\.\d+)?)$/,
        label: 'Double precision'
    },
    {
        id: 'integer',
        type: 'number',
        dataType: 'integer',
        regex: /^\d{1,10}$/,
        label: 'Integer'
    },
    {
        id: 'json',
        type: 'textarea',
        dataType: 'json',
        regex: /^(\{[\s\S]*\}|\[[\s\S]*\])$/,
        label: 'JSON'
    },
    {
        id: 'jsonb',
        type: 'textarea',
        dataType: 'jsonb',
        regex: /^(\{.*\}|\[.*\])$/,
        label: 'JSONB'
    },
    {
        id: 'money',
        type: 'number',
        dataType: 'money',
        regex: /^\-?\d+(\.\d{1,2})?$/,
        label: 'Money'
    },
    {
        id: 'real',
        type: 'number',
        dataType: 'real',
        regex: /^(\-?\d+(\.\d+)?)$/,
        label: 'Real'
    },
    {
        id: 'smallint',
        type: 'number',
        dataType: 'smallint',
        regex: /^\d{1,5}$/,
        label: 'Small Int'
    },
    {
        id: 'small.serial',
        type: 'number',
        dataType: 'smallserial',
        regex: /^\d{1,5}$/,
        label: 'Small Serial'
    },
    {
        id: '.serial',
        type: 'number',
        dataType: 'serial',
        regex: /^\d{1,10}$/,
        label: 'Serial'
    },
    { id: 'text', type: 'text', dataType: 'text', regex: /.*/, label: 'Text' },
    {
        id: 'macaddr',
        type: 'text',
        dataType: 'macaddr',
        regex: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
        label: 'MAC Address'
    },
    {
        id: 'time',
        type: 'text',
        dataType: 'time',
        regex: /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
        label: 'Time'
    },
    {
        id: 'timeWithTimeZone',
        type: 'text',
        dataType: 'timeWithTimeZone',
        regex: /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9][+-](0?[0-9]|1[0-4]):[0-5][0-9]$/,
        label: 'Time with Time Zone'
    },
    {
        id: 'timestamp',
        type: 'text',
        dataType: 'timestamp',
        regex: /^[0-9]{4}-([0][1-9]|[1][0-2])-([0-2][1-9]|[3][0-1]) ([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/,
        label: 'Timestamp'
    },
    {
        id: 'timestampWithTimeZone',
        type: 'text',
        dataType: 'timestampWithTimeZone',
        regex: /^[0-9]{4}-([0][1-9]|[1][0-2])-([0-2][1-9]|[3][0-1]) ([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])[+-](0?[0-9]|1[0-4]):[0-5][0-9]$/,
        label: 'Time Stamp with Time Zone'
    },
    {
        id: 'tsquery',
        type: 'textarea',
        dataType: 'tsquery',
        // regex: /^[A-Za-z0-9&|!()\\-:]+$/,
        label: 'TS Query'
    },
    {
        id: 'tsvector',
        type: 'textarea',
        dataType: 'tsvector',
        regex: /^[A-Za-z0-9]+(?:_[A-Za-z0-9]+)*$/,
        label: 'TS Vector'
    },
    {
        id: 'txid_snapshot',
        type: 'textarea',
        dataType: 'txid_snapshot',
        regex: /^([0-9]+,)*[0-9]+$/,
        label: 'Txid Snapshot'
    },

    {
        id: 'uuid',
        type: 'text',
        dataType: 'uuid',
        regex: /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/,
        label: 'UUID'
    },
    {
        id: 'varchar',
        type: 'text',
        dataType: 'varchar',
        regex: /.*/,
        label: 'Varchar'
    },
    {
        id: 'xml',
        type: 'textarea',
        dataType: 'xml',
        regex: /^<([a-zA-Z]+:)?[a-zA-Z][a-zA-Z0-9]*([^<]*|\s)+>(.*)<\/\1>$/,
        label: 'XML'
    }
];
