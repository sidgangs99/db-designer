export const primaryKey = {
    isPrimaryKey: true,
    isPrimaryKeyDisabled: true,
    isPrimaryKeyDisabledTooltip:
        'This key is a copy of your link in UI, please remove the link to update your primary key',
    isNotNull: true,
    isNotNullDisabled: true,
    isNotNullDisabledTooltip: 'This key is primary key, must be valid value',
    isUnique: true,
    isUniqueDisabled: true,
    isUniqueDisabledTooltip: 'This key is primary key, must be unique',
    isDefaultValue: false,
    isDefaultValueDisabled: true,
    isDefaultValueDisabledTooltip:
        'THis key is a primary key, cannot have a default value',
    isAutoIncrement: true
};

export const normalKey = {
    isNotNull: true,
    isNotNullDisabled: false,
    isUnique: true,
    isUniqueDisabled: true,
    isUniqueDisabledTooltip: 'This key is primary key, must be unique',
    isDefaultValue: false,
    isDefaultValueDisabled: true,
    isDefaultValueDisabledTooltip:
        'THis key is a primary key, cannot have a default value',
    isAutoIncrement: true
};

export const numberKey = {
    isNotNull: true,
    isNotNullDisabled: false,
    isUnique: false,
    isUniqueDisabled: false,
    isDefaultValue: false,
    isDefaultValueDisabled: true,
    isDefaultValueDisabledTooltip:
        'THis key is a primary key, cannot have a default value',
    isAutoIncrement: true
};

// Auto Increment - Number data types
// INT (or INTEGER)
// BIGINT
// SMALLINT
// TINYINT

//  Not Null -> Default Value

// Default Value:
// INT (or INTEGER)
// BIGINT
// SMALLINT
// TINYINT
// DECIMAL (or NUMERIC)
// FLOAT
// REAL
// DOUBLE
// DATE
// DATETIME
// TIMESTAMP
// TIME
// CHAR
// VARCHAR

// Limits
// TINYINT: An 8-bit integer that can store values from -128 to 127 or 0 to 255 if unsigned.
// SMALLINT: A 16-bit integer that can store values from -32,768 to 32,767 or 0 to 65,535 if unsigned.
// INT or INTEGER: A 32-bit integer that can store values from -2,147,483,648 to 2,147,483,647 or 0 to 4,294,967,295 if unsigned.
// BIGINT: A 64-bit integer that can store values from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 or 0 to 18,446,744,073,709,551,615 if unsigned.
// FLOAT: A single-precision floating-point number that can store values up to approximately 3.4 x 10^38, with a precision of about 7 digits.
// DOUBLE or REAL: A double-precision floating-point number that can store values up to approximately 1.8 x 10^308, with a precision of about 15-16 digits.
// DECIMAL or NUMERIC: A fixed-point decimal number that can store values up to approximately 10^38, with a precision of up to 38 digits.
// CHAR: A fixed-length character string that can store up to a maximum number of characters, typically between 255 and 8000.
// VARCHAR: A variable-length character string that can store up to a maximum number of characters, typically between 255 and 8000.
