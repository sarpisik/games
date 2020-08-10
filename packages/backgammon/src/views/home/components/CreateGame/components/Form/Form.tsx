import React from 'react';

export default function Form(): React.ReactElement {
    const [value, setValue] = React.useState(0);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(parseInt(event.target.value || '0'));
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(value);
    };

    return (
        <React.Fragment>
            <form onSubmit={onSubmit}>
                <input type="number" onChange={onChange} value={value} />
                <button type="submit">Create Game</button>
            </form>
        </React.Fragment>
    );
}
