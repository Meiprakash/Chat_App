import jwt from "jsonwebtoken"

//for token creation
//kela yethuku userId kuduthurkomnaa token create panna unique id venum so that's why.
export const gendrateToken = (userId) => {
    const token = jwt.sign({userId}, process.env.JWT_KEY)
    return token
}