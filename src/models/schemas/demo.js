import * as yup from 'yup';

export const DemoSchema = yup
    .object()
    .shape({
        demo_id: yup.number().integer(),
        demo_name: yup.string().required('demoNameIsRequired'),
        created_at: yup.string(),
        updated_at: yup.string(),
        user_id: yup.number().integer()
    })
    .noUnknown();
