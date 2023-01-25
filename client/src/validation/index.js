export const FirstNameBusinessSchema = [
    { required: true, pattern: /^[A-Z]/, message: 'First name in business account must start with a capital letter' },
    { whitespace: true },
]

export const LastNameBusinessSchema = [
    { required: true, pattern: /^[A-Z]/, message: 'Last name in business account must start with a capital letter' },
    { whitespace: true },
]