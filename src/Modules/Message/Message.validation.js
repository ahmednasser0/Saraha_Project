import joi from 'joi'

export const SendMessage={
    body:joi.object({
        Message:joi.string().min(5).max(1500).required()
    }).required(),
    params:joi.object({
        receiver_ID:joi.string().min(24).max(24).required()
    }).required()
}