// a wrapper for the interaction object

const Interaction = {
    version: 0,
    type: 0,
    token: '',
    member: {
        user: {
            username: 'a',
            public_flags: 0,
            id: '000000000000000000',
            discriminator: '0000',
            avatar: '',
        },
        roles: ['000000000000000000'],
        premium_since: null,
        permissions: '8',
        pending: false,
        nick: 'b',
        mute: false,
        joined_at: '2020-09-25T09:03:47.784000+00:00',
        is_pending: false, // wth is the difference between this and pending? IDK.
        deaf: false,
    },
    id: '000000000000000000',
    guild_id: '000000000000000000',
    data: {
        name: 'test',
        id: '000000000000000000',
        options: [''],
    },
    channel_id: '000000000000000000',
    application_id: '000000000000000000',
};

module.exports = Interaction;
