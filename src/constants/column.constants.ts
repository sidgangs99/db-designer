export const sqlTypeColor: Record<string, any> = {
    text: 'text-cyan-main',
    textarea: 'text-cyan-main',
    number: 'text-orange-main',
    date: 'text-blue-main',
    time: 'text-blue-main',
    'datetime-local': 'text-blue-main'
};

export const defaultValuesOptions: any[] = [
    { label: 'Not set', value: null, id:'notSet', isDefaultValueInputVisible: false },
    { label: 'NULL', value: null, id : "label", isDefaultValueInputVisible: false },
    { label: 'Custom text', value: '', id: "customText", isDefaultValueInputVisible: true },
    { label: 'Expression', value: '', id: "expression", isDefaultValueInputVisible: true }
];
