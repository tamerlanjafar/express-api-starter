import * as yup from 'yup';

export const UserSchema = yup
    .object()
    .shape({
        user_id: yup.number().integer(),
        email: yup.string().required('emailIsRequired').email('invalidEmail').lowercase().trim(),
        first_name: yup.string().required('firstNameIsRequired'),
        last_name: yup.string().required('lastNameIsRequired'),
        password: yup.string().when('$validatePassword', {
            is: true,
            then: yup
                .string()
                .required('passwordIsRequired')
                .min(6, 'passwordLessThanXCharacters')
                .max(30, 'passwordGreaterThanXCharacters')
        }),
        created_at: yup.string(),
        updated_at: yup.string()
    })
    .noUnknown();
