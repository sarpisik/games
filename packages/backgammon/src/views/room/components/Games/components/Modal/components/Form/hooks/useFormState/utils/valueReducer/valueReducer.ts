export default function valueReducer(name: string, _value: number | string) {
    switch (name) {
        case 'duration':
        case 'stages': {
            const value = parseInt(_value.toString() || '0');
            return value;
        }

        default:
            return _value;
    }
}
