import { useState } from 'react';
import { FormControlProps } from 'react-bootstrap/FormControl';
import { transformToInitialstate } from '../../utils';
import { useUser } from '../../../../../../../../app/slices';

export default function useFormState(
    initialState: ReturnType<typeof transformToInitialstate>
) {
    const [user, setUser] = useState(initialState);
    const { editUser } = useUser();

    const onSubmit = (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();

        if (user.name.length > 20)
            alert('Name must be less than 20 char long.');
        else if (user.name.length < 2)
            alert('Name must be more than 2 char long.');
        else if (user.description && user.description.length > 200)
            alert('Description must be less than 200 char long.');
        else editUser(user);
    };

    const onChange: FormControlProps['onChange'] = (event) => {
        const { name, value } = event.target;

        setUser((_user) => ({ ..._user, [name]: value }));
    };

    return { user, onChange, onSubmit };
}
