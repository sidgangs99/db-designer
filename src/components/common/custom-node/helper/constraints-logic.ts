import { sqlTypeCategory } from '../../sql-types/constants';

export class ConstraintsLogic {
    dataType: string = '';

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

    minRange = '';
    maxRange = '';

    formUpdateWatch = undefined;

    constructor(nodeId: string, nodeData: any, edges: any) {
        this.isForeignKey = edges.some((edge: any) => edge.target === nodeId);
        this.dataType = nodeData.dataType;
    }

    setDataType(dataType: string) {
        this.dataType = dataType;
    }

    getDataType() {
        return this.dataType;
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

    getDefaultValueDetails() {
        let value = this.defaultValue;
        let disabled = this.isPrimaryKey;
        let disabledTooltip = '';

        if (this.isPrimaryKey) {
            disabled = true;
            disabledTooltip =
                'This key is primary key, cannot have a default value';
        }

        return {
            label: 'Default Value',
            defaultValue: value,
            formValue: 'constraints.defaultValue',
            disabled,
            type: Text,
            disabledTooltip
        };
    }

    getIsAutoIncrementDetails(dataType = this.dataType) {
        let value = this.isAutoIncrement;
        let disabled = false;
        let disabledTooltip = '';

        if (sqlTypeCategory[dataType] === 'numeric') {
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

    getMinRangeDetails(dataType: string) {
        let minRangeValue: any = '';
        const signedInt = true;

        if (dataType === 'tinyint') minRangeValue = signedInt ? -128 : 0;
        else if (dataType === 'smallint')
            minRangeValue = signedInt ? -32768 : 0;
        else if (dataType === 'int')
            minRangeValue = signedInt ? -2147483648 : 0;
        else if (dataType === 'bigint')
            minRangeValue = signedInt ? -9223372036854775808 : 0;
        else if (dataType === 'float') minRangeValue = -3.40282347e38;
        else if (dataType === 'double') minRangeValue = -1.7976931348623157e308;
        else if (dataType === 'decimal') minRangeValue = -10 ^ (38 + 1);
        else if (dataType === 'char') minRangeValue = 0;
        else if (dataType === 'varchar') minRangeValue = 0;
        else if (dataType === 'date') minRangeValue = '1000-01-01';
        else if (dataType === 'time') minRangeValue = '00:00:00';
        else if (dataType === 'datetime') minRangeValue = '1000-01-01 00:00:00';

        return {
            label: '',
            value: minRangeValue,
            formValue: '',
            disabled: false,
            disabledTooltip: ''
        };
    }

    getMaxRangeDetails(dataType: string) {
        let maxRangeValue: any = 0;
        const signedInt = true;

        if (dataType === 'tinyint') maxRangeValue = signedInt ? 127 : 255;
        else if (dataType === 'smallint')
            maxRangeValue = signedInt ? 32767 : 65535;
        else if (dataType === 'int')
            maxRangeValue = signedInt ? -2147483648 : 4294967295;
        else if (dataType === 'bigint')
            maxRangeValue = signedInt
                ? -9223372036854775808
                : 18446744073709551615;
        else if (dataType === 'float') maxRangeValue = 3.40282347e38;
        else if (dataType === 'double') maxRangeValue = 1.7976931348623157e308;
        else if (dataType === 'decimal') maxRangeValue = 10 ^ (38 - 1);
        else if (dataType === 'char') maxRangeValue = 255;
        else if (dataType === 'varchar') maxRangeValue = 65535;
        else if (dataType === 'date') maxRangeValue = '9999-12-31';
        else if (dataType === 'time') maxRangeValue = '23:59:59.999999';
        else if (dataType === 'datetime') maxRangeValue = '9999-12-31 23:59:59';

        return {
            label: '',
            value: maxRangeValue,
            formValue: '',
            disabled: false,
            disabledTooltip: ''
        };
    }
}
