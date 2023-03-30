export const sqlTypes = [
    {
        name: 'varchar',
        type: 'string'
    },
    {
        name: 'char',
        type: 'string'
    },
    {
        name: 'text',
        type: 'string'
    },
    {
        name: 'int',
        type: 'numeric'
    },
    {
        name: 'bigint',
        type: 'numeric'
    },
    {
        name: 'tinyint',
        type: 'numeric'
    },
    {
        name: 'float',
        type: 'numeric'
    },
    {
        name: 'real',
        type: 'numeric'
    },
    {
        name: 'date',
        type: 'dateTime'
    },
    {
        name: 'time',
        type: 'dateTime'
    },
    {
        name: 'datetime',
        type: 'dateTime'
    }
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
    // {
    //     name: 'blob',
    //     type: 'misc'
    // },
    // {
    //     name: 'xml',
    //     type: 'misc'
    // },
    // {
    //     name: 'cursor',
    //     type: 'misc'
    // },
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