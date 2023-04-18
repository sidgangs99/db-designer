import { defaultValuesOptions } from '../components/common/single-select-dropdown/constants';
import { postgresDataTypeInputTypeMapping } from '../components/common/single-select-dropdown/postgres.constants';

export class ConstraintsLogic {
    dataType: Record<string, any>;
    defaultValueOption: Record<string, any>;

    isPrimaryKey = false;
    isPrimaryKeyDisabled = true;

    isForeignKey = false;
    isForeignKeyDisabled = true;

    isNotNull = true;
    isNotNullDisabled = false;

    isUnique = true;
    isUniqueDisabled = false;

    defaultValue = '';
    defaultValueDisabled = false;

    isAutoIncrement = true;
    isAutoIncrementDisabled = false;

    dateTimeInputTypes: string[] = ['date', 'time', 'datetime-local'];
    date = { label: `CURRENT_DATE` };
    time = { label: `CURRENT_TIME` };
    timestampWithTimeZone = { label: `NOW()` };

    constructor(nodeId: string, nodeData: any, edges: any) {
        this.isForeignKey = edges.some((edge: any) => edge.target === nodeId);
        this.dataType =
            nodeData?.dataType || postgresDataTypeInputTypeMapping[0];
        this.defaultValueOption =
            nodeData?.defaultValueOption || defaultValuesOptions[0];
    }

    setDataType(dataType: any) {
        this.dataType = dataType;
    }

    getDataType() {
        return this.dataType;
    }

    setDefaultValueOption(option: any){
        this.defaultValueOption = option;
    }
    
    getDefaultValueOption(){
        return this.defaultValueOption;
    }

    getPrimaryKeyDetails() {
        const value = this.isPrimaryKey;
        const disabled = false;
        const disabledTooltip =
            'Update primary key from link in UI, this is just for reference';

        return {
            label: 'Primary Key',
            defaultValue: value,
            formValue: 'constraints.primaryKey',
            disabled,
            type: Boolean,
            disabledTooltip
        };
    }

    getIsNotNullDetails() {
        let value = this.isNotNull;
        let disabled = this.isNotNullDisabled;
        let disabledTooltip = '';

        if (this.isPrimaryKey) {
            disabled = true;
            disabledTooltip = 'This key is primary key, cannot be a null value';
        }

        return {
            label: 'Not Null',
            defaultValue: value,
            formValue: 'constraints.notNull',
            disabled,
            type: Boolean,
            disabledTooltip
        };
    }

    getIsForeignKeyDetails() {
        let value = this.isForeignKey;
        let disabled = this.isForeignKeyDisabled;
        let disabledTooltip =
            'Update foreign key from links in UI, this is just for reference';

        return {
            label: 'Foreign Key',
            defaultValue: value,
            formValue: 'constraints.foreignKey',
            disabled,
            type: Boolean,
            disabledTooltip
        };
    }

    getIsUniqueDetails() {
        let value = this.isUnique;
        let disabled = false;
        let disabledTooltip = '';

        if (this.isPrimaryKey) {
            disabled = true;
            disabledTooltip = 'This key is primary key, should be unique';
        }

        return {
            label: 'Unique',
            defaultValue: value,
            formValue: 'constraints.unique',
            disabled,
            type: Boolean,
            disabledTooltip
        };
    }

    getDefaultValueDetails(dataType = this.dataType) {
        let value = this.defaultValue;
        let disabled = this.isPrimaryKey;
        let disabledTooltip = '';
        let defaultValues: any[] = defaultValuesOptions;

        if (this.isPrimaryKey) {
            disabled = true;
            disabledTooltip =
                'This key is primary key, cannot have a default value';
        }

        if (this.dateTimeInputTypes.includes(dataType.inputType)) {
        }

        return {
            label: 'Default Value',
            defaultValue: value,
            formValue: 'constraints.defaultValue',
            defaultValues,
            disabled,
            type: Text,
            disabledTooltip
        };
    }

    getIsAutoIncrementDetails(dataType = this.dataType) {
        let value = this.isAutoIncrement;
        let disabled = false;
        let disabledTooltip = '';

        if (dataType?.id?.split('.')?.[1] === 'serial') {
            value = true;
            disabled = true;
            disabledTooltip = 'Serial data types are always autoIncrement';
        } else if (dataType.type === 'number') {
            value = false;
            disabled = false;
        } else {
            value = false;
            disabled = true;
            disabledTooltip =
                'Auto Increment only works with numeric data types';
        }

        return {
            label: 'Auto Increment',
            defaultValue: value,
            formValue: 'constraints.autoIncrement',
            disabled,
            type: Boolean,
            disabledTooltip,
            defaultValueDisabled: false
        };
    }
}
