export const JoinSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
    },
    required: [ 'name', 'email', 'password'],
    additionalProperties: false,
};

export const CompanyJoinSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        address: { type: 'string' },
        description: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
    },
    required: [ 'name', 'email', 'password', 'description', 'address' ],
    additionalProperties: false
};


export const ProfileEditSchema = {
    type: 'object',
    properties: {
        'name': { type: 'string' },
        'bio': { type: 'string' },
    },
    additionalProperties: false,
};

export const OfferSchema = {
    type: 'object',
    properties: {
        to: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        is_remote: { type: 'boolean' },
        schedule: {
            start: { type: 'string' },
            end: { type: 'string' },
            is_negotiable: { type: 'boolean' },
            duration: { type: 'number' },
            days_per_week: { type: 'number' },
        },
        location: String,
    }
}