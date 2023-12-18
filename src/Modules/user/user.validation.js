import joi from 'joi'

export const uservalidation={
    body:joi.object({
        oldpassword:joi.string().required(),
        newpassword:joi.string().invalid(joi.ref('oldpassword')).required(),
        cpassword:joi.string().valid(joi.ref('newpassword')).required()
    }).required()
}

export const shareProfile={
    params:joi.object({
        id:joi.string().min(24).max(24).required()
    }).required()
}