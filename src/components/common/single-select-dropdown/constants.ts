export const varchar = {
    name: 'varchar',
    type: 'string'
};

export const char = {
    name: 'char',
    type: 'string'
};
export const text = {
    name: 'text',
    type: 'string'
};
export const int = {
    name: 'int',
    type: 'numeric'
};
export const bigint = {
    name: 'bigint',
    type: 'numeric'
};
export const tinyint = {
    name: 'tinyint',
    type: 'numeric'
};
export const float = {
    name: 'float',
    type: 'numeric'
};
export const real = {
    name: 'real',
    type: 'numeric'
};
export const date = {
    name: 'date',
    type: 'dateTime'
};
export const time = {
    name: 'time',
    type: 'dateTime'
};
export const datetime = {
    name: 'datetime',
    type: 'dateTime'
};
export const xml = {
    name: 'xml',
    type: 'misc'
};
export const cursor = {
    name: 'cursor',
    type: 'misc'
};
export const blob = {
    name: 'blob',
    type: 'misc'
};

export const mySqlTypes = [
    varchar,
    char,
    text,
    int,
    bigint,
    tinyint,
    float,
    real,
    date,
    time,
    datetime
    // xml,
    // cursor,
    // blob,
    // {
    //     name: 'nchar',
    //     type: 'unicodeString'
    // },
    // {
    //     name: 'nvarchar',
    //     type: 'unicodeString'
    // },
    // {
    //     name: 'ntext',
    //     type: 'unicodeString'
    // },
    // {
    //     name: 'binary',
    //     type: 'binary'
    // },
    // {
    //     name: 'varbinary',
    //     type: 'binary'
    // },
    // {
    //     name: 'clob',
    //     type: 'misc'
    // },
    // ,
    // ,
    //,
    // {
    //     name: 'table',
    //     type: 'misc'
    // }
];

export const sqlTypeCategory: Record<string, string> = {
    varchar: 'string',
    char: 'string',
    text: 'string',
    int: 'numeric',
    bigint: 'numeric',
    tinyint: 'numeric',
    float: 'numericOther',
    real: 'numericOther',
    date: 'dateTime',
    time: 'dateTime',
    datetime: 'dateTime',
    nchar: 'unicodeString',
    nvarchar: 'unicodeString',
    ntext: 'unicodeString',
    binary: 'binary',
    varbinary: 'binary',
    clob: 'misc',
    blob: 'misc',
    xml: 'misc',
    cursor: 'misc',
    table: 'misc'
};

export const sqlTypeColor: Record<string, any> = {
    text: 'text-cyan-main',
    number: 'text-orange-main',
    date: 'text-blue-main',
    time: 'text-blue-main',
    'datetime-local': 'text-blue-main'
};

export const sqlInputType: Record<string, string> = {
    varchar: 'text',
    char: 'text',
    text: 'text',
    int: 'number',
    bigint: 'number',
    tinyint: 'number',
    float: 'number',
    real: 'number',
    date: 'date',
    time: 'time',
    datetime: 'datetime-local'
    // nchar: 'text',
    // nvarchar: 'text',
    // ntext: 'text',
    // binary: 'binary',
    // varbinary: 'binary',
    // clob: 'misc',
    // blob: 'misc',
    // xml: 'misc',
    // cursor: 'misc',
    // table: 'misc'
};

export const defaultValuesOptions: any[] = [
    { label: 'Not set', value: null, id:'notSet', isDefaultValueInputVisible: false },
    { label: 'NULL', value: null, id : "label", isDefaultValueInputVisible: false },
    { label: 'Custom text', value: '', id: "customText", isDefaultValueInputVisible: true },
    { label: 'Expression', value: '', id: "expression", isDefaultValueInputVisible: true }
];
