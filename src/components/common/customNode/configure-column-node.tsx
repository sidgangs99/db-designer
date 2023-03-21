import ButtonContainer from '../buttons/container';

// Header
export function ConfigureColumnNodeHeader({
    tableName
}: {
    tableName: string;
}) {
    return <div className="uppercase">{tableName}</div>;
}

// Body
export function ConfigureColumnNodeBody() {
    return <div>This is a dialog box</div>;
}

// Buttons
export const configureColumnNodeButtons = [
    <ButtonContainer label={'Save'} onClose={() => {}} />,
    <ButtonContainer label={'Cancel'} onClose={() => {}} />
];
