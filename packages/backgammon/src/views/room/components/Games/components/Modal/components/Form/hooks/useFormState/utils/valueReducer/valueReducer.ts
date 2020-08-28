export default function valueReducer(name: string, _value: number | string) {
    switch (name) {
        case 'duration':
        case 'stages': {
            const value = parseInt(_value.toString() || '0');

            if (value < 1) return 1;
            if (value > 10) return 10;
            return value;
        }

        default:
            return _value;
    }
}
